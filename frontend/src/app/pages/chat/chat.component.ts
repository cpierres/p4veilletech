import {Component, signal, computed, effect, ViewChild, ElementRef, AfterViewChecked} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {NgForOf, NgIf, DatePipe, SlicePipe} from '@angular/common';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatIconModule} from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';
import {marked} from 'marked';

interface ChatMessage {
  role: 'user' | 'assistant';
  text: string;
  audioUrl?: string | null;
  metadata?: ChatMetadata | null;
  conversationId?: string | null; // ID de la conversation en base de données
}

interface ChatMetadata {
  provider?: string;
  model?: string;
  temperature?: number;
  processingTimeMs?: number;
}

interface ChatConversation {
  id: string;
  userId: string | null;
  sessionId: string;
  userMessage: string;
  assistantResponse: string;
  provider: string;
  model: string;
  temperature?: number;
  topP?: number;
  maxTokens?: number;
  ragTopK?: number;
  ragSimilarityThreshold?: number;
  tokensUsed?: number;
  createdAt: string;
  updatedAt: string;
  metadata: any;
}

interface ModelOption {
  value: string;
  label: string;
}

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [FormsModule, NgForOf, NgIf, DatePipe, SlicePipe, MatFormFieldModule, MatInputModule, MatButtonModule, MatSelectModule, MatIconModule, MatTooltipModule, MatSlideToggleModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent implements AfterViewChecked {
  // Paramètres de base
  lang = signal<'fr' | 'en'>('fr');
  _input = signal<string>('');
  loading = signal<boolean>(false);
  _ttsEnabled = signal<boolean>(false);
  showHistory = signal<boolean>(false); // Afficher/masquer l'historique
  conversationHistory = signal<ChatConversation[]>([]); // Historique des conversations
  loadingHistory = signal<boolean>(false); // Chargement de l'historique

  // Paramètres AI
  _provider = signal<'openai' | 'mistral' | 'mistral-cloud'>('mistral-cloud');
  _model = signal<string>('mistral-medium-latest');
  showAdvancedSettings = signal<boolean>(false);

  // Paramètres avancés
  _temperature = signal<number | null>(0.5);
  _topP = signal<number | null>(null);
  _maxTokens = signal<number | null>(null);
  _ragTopK = signal<number>(50);
  _ragSimilarityThreshold = signal<number>(0.4);

  // Propriétés pour ngModel (compatibilité avec two-way binding)
  get input(): string {
    return this._input();
  }
  set input(value: string) {
    this._input.set(value);
  }

  get ttsEnabled(): boolean {
    return this._ttsEnabled();
  }
  set ttsEnabled(value: boolean) {
    this._ttsEnabled.set(value);
  }

  get provider(): 'openai' | 'mistral' | 'mistral-cloud' {
    return this._provider();
  }
  set provider(value: 'openai' | 'mistral' | 'mistral-cloud') {
    this._provider.set(value);
  }

  get model(): string {
    return this._model();
  }
  set model(value: string) {
    this._model.set(value);
  }

  get temperature(): number | null {
    return this._temperature();
  }
  set temperature(value: number | null) {
    this._temperature.set(value);
  }

  get topP(): number | null {
    return this._topP();
  }
  set topP(value: number | null) {
    this._topP.set(value);
  }

  get maxTokens(): number | null {
    return this._maxTokens();
  }
  set maxTokens(value: number | null) {
    this._maxTokens.set(value);
  }

  get ragTopK(): number {
    return this._ragTopK();
  }
  set ragTopK(value: number) {
    this._ragTopK.set(value);
  }

  get ragSimilarityThreshold(): number {
    return this._ragSimilarityThreshold();
  }
  set ragSimilarityThreshold(value: number) {
    this._ragSimilarityThreshold.set(value);
  }

  // Modèles disponibles selon le provider
  availableModels = computed<ModelOption[]>(() => {
    if (this._provider() === 'mistral') {
      return [
        { value: 'http://192.168.10.1:1234/mistralai/ministral-3-3b', label: 'Ministral 3B (local)' },
        { value: 'http://192.168.10.1:1234/mistralai/mistral-small-3.2', label: 'Mistral Small 3.2 (local)' },
        { value: 'http://192.168.10.1:1234/mistralai/mistral-nemo-instruct-2407', label: 'Mistral Nemo Instruct 2407 (local)' },
        { value: 'http://192.168.10.1:1234/mistralai/mistral-7b-instruct-v0.3', label: 'Mistral 7B Instruct v0.3 (local)' },
      ];
    }
    if (this._provider() === 'mistral-cloud') {
      return [
        { value: 'mistral-medium-latest', label: 'Mistral Medium' },
        { value: 'mistral-small-latest', label: 'Mistral Small' },
        { value: 'mistral-large-latest', label: 'Mistral Large' },
        { value: 'open-mistral-7b', label: 'Open Mistral 7B' },
        { value: 'open-mixtral-8x7b', label: 'Open Mixtral 8x7B' },
        { value: 'open-mixtral-8x22b', label: 'Open Mixtral 8x22B' },
      ];
    }
    return [
      { value: 'gpt-4o-mini', label: 'GPT-4o Mini' },
      { value: 'gpt-4o', label: 'GPT-4o' },
      { value: 'gpt-4-turbo', label: 'GPT-4 Turbo' },
      { value: 'gpt-3.5-turbo', label: 'GPT-3.5 Turbo' },
    ];
  });

  messages = signal<ChatMessage[]>([
    {role: 'assistant', text: "Bonjour ! Posez-moi vos questions sur l'expérience professionnelle de Christophe Pierrès.", audioUrl: null}
  ]);

  isRecording = false;
  private mediaRecorder: MediaRecorder | null = null;
  private audioChunks: BlobPart[] = [];
  private currentAudio: HTMLAudioElement | null = null;

  @ViewChild('messagesContainer') private messagesContainer!: ElementRef;
  private shouldScroll = true;

  constructor(private http: HttpClient, private sanitizer: DomSanitizer) {
    // Configuration de marked pour plus de sécurité
    const renderer = new marked.Renderer();
    const linkRenderer = renderer.link.bind(renderer);
    renderer.link = (token: any) => {
      const html = linkRenderer(token);
      return html.replace('<a', '<a target="_blank" rel="noopener noreferrer"');
    };

    marked.setOptions({
      renderer: renderer,
      breaks: true, // Convertit les sauts de ligne en <br>
      gfm: true // Markdown
    });

    // Effet pour changer le modèle par défaut quand le provider change
    effect(() => {
      const currentProvider = this._provider();
      const models = this.availableModels();
      if (models.length > 0) {
        // Sélectionner le premier modèle disponible pour ce provider
        const currentModel = this._model();
        const modelExists = models.some(m => m.value === currentModel);
        if (!modelExists) {
          this._model.set(models[0].value);
        }
      }
    });
  }

  // Méthode pour convertir le Markdown en HTML sécurisé
  renderMarkdown(text: string): SafeHtml {
    const html = marked.parse(text) as string;
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

  // Méthode pour obtenir le temps de traitement en toute sécurité
  getProcessingTime(message: ChatMessage): string {
    return message.metadata?.processingTimeMs ? (message.metadata.processingTimeMs + 'ms') : '';
  }

  // Méthode pour obtenir l'ID de conversation en toute sécurité
  getShortConversationId(message: ChatMessage): string {
    return message.conversationId ? (message.conversationId.substring(0, 8) + '...') : '';
  }

  // Méthode pour obtenir le texte du message en toute sécurité
  getMessageText(message: ChatMessage): string {
    return message.text || '';
  }

  onTtsToggle(event: Event) {
    const target = event.target as HTMLInputElement | null;
    const checked = !!target && !!target.checked;
    this._ttsEnabled.set(checked);
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  private scrollToBottom(): void {
    if (this.shouldScroll && this.messagesContainer) {
      try {
        this.messagesContainer.nativeElement.scrollTop =
          this.messagesContainer.nativeElement.scrollHeight;
      } catch (err) {
        // Ignorer les erreurs potentielles
      }
    }
  }

  async send() {
    const text = this._input().trim();
    if (!text || this.loading()) return;
    this.messages.update((m: ChatMessage[]) => [...m, {role: 'user', text}]);
    this._input.set('');
    this.loading.set(true);

    // Ajouter un message assistant vide qui sera rempli progressivement
    const assistantIndex = this.messages().length;
    this.messages.update((m: ChatMessage[]) => [...m, {role: 'assistant', text: '', metadata: null, conversationId: null}]);

    let eventSource: EventSource | null = null;
    let hasReceivedData = false;
    let buffer = '';
    let timeoutId: any = null;
    let lastMetadata: ChatMetadata | null = null;

    const flushBuffer = () => {
      if (buffer) {
        this.messages.update((m: ChatMessage[]) => {
          const updated = [...m];
          updated[assistantIndex] = {
            role: 'assistant',
            text: updated[assistantIndex].text + buffer,
            metadata: lastMetadata
          };
          return updated;
        });
        buffer = '';
      }
    };

    try {
      // Construire l'URL avec tous les paramètres avancés
      const params = new URLSearchParams();
      params.set('message', text);
      params.set('lang', this.lang());
      params.set('provider', this._provider());
      params.set('model', this._model());
      params.set('ragTopK', this._ragTopK().toString());
      params.set('ragSimilarityThreshold', this._ragSimilarityThreshold().toString());
      // Utiliser 'anonymous' comme userId pour la cohérence avec le backend
      params.set('userId', 'anonymous');

      if (this._temperature() !== null) {
        params.set('temperature', this._temperature()!.toString());
      }
      if (this._topP() !== null) {
        params.set('topP', this._topP()!.toString());
      }
      if (this._maxTokens() !== null) {
        params.set('maxTokens', this._maxTokens()!.toString());
      }

      const url = `/api/chat/advanced?${params.toString()}`;
      eventSource = new EventSource(url);

      eventSource.onmessage = (event) => {
        try {
          // Le nouvel endpoint retourne du JSON avec content et metadata
          const data = JSON.parse(event.data);

          // Gestion des erreurs retournées par le backend
          if (data.error) {
            hasReceivedData = true;
            const errorMessage = data.errorMessage || (this.lang() === 'fr' ? 'Une erreur est survenue.' : 'An error occurred.');
            this.messages.update((m: ChatMessage[]) => {
              const updated = [...m];
              updated[assistantIndex] = {
                role: 'assistant',
                text: `⚠️ ${errorMessage}`,
                audioUrl: null,
                metadata: { provider: data.provider }
              };
              return updated;
            });
            if (eventSource) eventSource.close();
            this.loading.set(false);
            return;
          }

          const chunk = (data.content || '').replace(/\u00A0/g, ' ');

          // Stocker les métadonnées
          if (data.provider || data.model) {
            lastMetadata = {
              provider: data.provider,
              model: data.model,
              temperature: data.temperature,
              processingTimeMs: data.processingTimeMs
            };
          }

          if (!chunk) return;

          hasReceivedData = true;
          buffer += chunk;

          if (timeoutId) clearTimeout(timeoutId);
          if (buffer.length > 15) {
            flushBuffer();
          } else {
            timeoutId = setTimeout(flushBuffer, 30);
          }
        } catch (e) {
          // Fallback pour l'ancien format (texte simple)
          const chunk = event.data.replace(/\u00A0/g, ' ');
          if (!chunk) return;
          hasReceivedData = true;
          buffer += chunk;
          if (timeoutId) clearTimeout(timeoutId);
          if (buffer.length > 15) {
            flushBuffer();
          } else {
            timeoutId = setTimeout(flushBuffer, 30);
          }
        }
      };

      eventSource.onerror = (error) => {
        if (timeoutId) {
          clearTimeout(timeoutId);
        }
        flushBuffer();

        if (eventSource) {
          eventSource.close();
        }
        this.loading.set(false);

        if (hasReceivedData) {
          if (!this.messages()[assistantIndex].text.trim()) {
            const emptyMsg = this.lang() === 'fr' ? 'Aucune réponse reçue.' : 'No response received.';
            this.messages.update((m: ChatMessage[]) => {
              const updated = [...m];
              updated[assistantIndex] = {role: 'assistant', text: emptyMsg, audioUrl: null, metadata: lastMetadata, conversationId: null};
              return updated;
            });
          } else {
            // Essayer de récupérer l'ID de la conversation depuis le backend
            this.fetchConversationId(assistantIndex, lastMetadata);
            if (this._ttsEnabled()) {
              this.playMessageTts(assistantIndex, true);
            }
          }
        } else {
          const err = this.lang() === 'fr' ? "Une erreur est survenue côté serveur." : "A server error occurred.";
          this.messages.update((m: ChatMessage[]) => {
            const updated = [...m];
            updated[assistantIndex] = {role: 'assistant', text: err, audioUrl: null, metadata: null, conversationId: null};
            return updated;
          });
        }
      };

    } catch (e) {
      if (eventSource) {
        eventSource.close();
      }
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      const err = this.lang() === 'fr' ? "Une erreur est survenue côté serveur." : "A server error occurred.";
      this.messages.update((m: ChatMessage[]) => {
        const updated = [...m];
        updated[assistantIndex] = {role: 'assistant', text: err, metadata: null, conversationId: null};
        return updated;
      });
      this.loading.set(false);
    }
  }

  async toggleRecording() {
    if (this.isRecording) {
      this.stopRecording();
    } else {
      await this.startRecording();
    }
  }

  private async startRecording() {
    if (!('MediaRecorder' in window)) {
      alert(this.lang() === 'fr' ? 'La capture audio n\'est pas supportée par ce navigateur.' : 'Audio recording is not supported in this browser.');
      return;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      this.audioChunks = [];
      this.mediaRecorder = new MediaRecorder(stream, { mimeType: this.chooseMimeType() });
      this.mediaRecorder.ondataavailable = (e: BlobEvent) => {
        if (e.data && e.data.size > 0) {
          this.audioChunks.push(e.data);
        }
      };
      this.mediaRecorder.onstop = async () => {
        const blob = new Blob(this.audioChunks, { type: this.mediaRecorder?.mimeType || 'audio/webm' });
        await this.transcribeBlob(blob);
        // stop tracks
        stream.getTracks().forEach(t => t.stop());
      };
      this.mediaRecorder.start();
      this.isRecording = true;
    } catch (err) {
      console.error(err);
      alert(this.lang() === 'fr' ? 'Impossible de démarrer l\'enregistrement audio.' : 'Unable to start audio recording.');
    }
  }

  async playMessageTts(index: number, autoPlay: boolean = false) {
    const msgs = this.messages();
    if (!msgs[index] || msgs[index].role !== 'assistant') return;
    const text = this.getMessageText(msgs[index]).trim();
    if (!text) return;

    try {
      // Stop current audio if any
      if (this.currentAudio) {
        this.currentAudio.pause();
        this.currentAudio = null;
      }

      let audioUrl = msgs[index].audioUrl;
      if (!audioUrl) {
        const blob = await this.http.get(`/api/chat/tts?text=${encodeURIComponent(text)}&lang=${this.lang()}&format=mp3`, { responseType: 'blob' }).toPromise();
        if (!blob) return;
        audioUrl = URL.createObjectURL(blob);
        this.messages.update((m: ChatMessage[]) => {
          const updated = [...m];
          updated[index] = { ...updated[index], audioUrl };
          return updated;
        });
      }

      const audio = new Audio(audioUrl!);
      this.currentAudio = audio;
      await audio.play();
    } catch (e) {
      console.error(e);
      if (!autoPlay) {
        alert(this.lang() === 'fr' ? 'Lecture TTS impossible.' : 'Unable to play TTS.');
      }
    }
  }

  private stopRecording() {
    if (this.mediaRecorder && this.isRecording) {
      this.isRecording = false;
      this.mediaRecorder.stop();
    }
  }

  private chooseMimeType(): string {
    const types = ['audio/webm', 'audio/webm;codecs=opus', 'audio/ogg', 'audio/mp4'];
    for (const t of types) {
      if ((window as any).MediaRecorder && MediaRecorder.isTypeSupported && MediaRecorder.isTypeSupported(t)) {
        return t;
      }
    }
    return 'audio/webm';
  }

  private async transcribeBlob(blob: Blob) {
    try {
      const form = new FormData();
      const filename = (blob.type.includes('ogg') ? 'audio.ogg' : blob.type.includes('mp4') ? 'audio.m4a' : 'audio.webm');
      form.append('file', blob, filename);
      const text = await this.http.post(`/api/chat/transcribe?lang=${this.lang()}`, form, { responseType: 'text' }).toPromise();
      if (text) {
        const current = this._input();
        const sep = current && !current.endsWith(' ') ? ' ' : '';
        this._input.set((current || '') + sep + text);
      }
    } catch (e) {
      console.error(e);
      alert(this.lang() === 'fr' ? 'Échec de la transcription audio.' : 'Audio transcription failed.');
    }
  }

  /**
   * Récupère l'ID de la conversation depuis le backend
   */
  private async fetchConversationId(assistantIndex: number, metadata: ChatMetadata | null) {
    try {
      // Récupérer les 10 dernières conversations pour cet utilisateur
      const userId = 'anonymous'; // À remplacer par l'ID utilisateur réel si authentifié
      this.loadingHistory.set(true);

      const conversations = await this.http.get<ChatConversation[]>(`/api/chat/conversations/user/${userId}/recent`).toPromise();

      if (conversations && conversations.length > 0) {
        // Trouver la conversation qui correspond à cette réponse
        const matchingConversation = conversations.find(c =>
          c.provider === metadata?.provider &&
          c.model === metadata?.model &&
          c.assistantResponse === this.messages()[assistantIndex].text
        );

        if (matchingConversation) {
          // Mettre à jour le message avec l'ID de conversation
          this.messages.update((m: ChatMessage[]) => {
            const updated = [...m];
            updated[assistantIndex] = {
              ...updated[assistantIndex],
              conversationId: matchingConversation.id
            };
            return updated;
          });
        }
      }

      // Charger l'historique complet
      await this.loadConversationHistory();
    } catch (error) {
      console.error('Erreur lors de la récupération de l\'ID de conversation:', error);
    } finally {
      this.loadingHistory.set(false);
    }
  }

  /**
   * Charge l'historique des conversations
   */
  async loadConversationHistory() {
    try {
      this.loadingHistory.set(true);
      const userId = 'anonymous'; // À remplacer par l'ID utilisateur réel si authentifié

      const conversations = await this.http.get<ChatConversation[]>(`/api/chat/conversations/user/${userId}`).toPromise();

      if (conversations) {
        this.conversationHistory.set(conversations);
      }
    } catch (error) {
      console.error('Erreur lors du chargement de l\'historique:', error);
      this.conversationHistory.set([]);
    } finally {
      this.loadingHistory.set(false);
    }
  }

  /**
   * Basculer l'affichage de l'historique
   */
  toggleHistory() {
    this.showHistory.update(show => !show);
    if (this.showHistory() && this.conversationHistory().length === 0) {
      this.loadConversationHistory();
    }
  }

  /**
   * Supprimer une conversation de l'historique
   */
  async deleteConversation(conversationId: string) {
    try {
      await this.http.delete(`/api/chat/conversations/${conversationId}`).toPromise();
      // Recharger l'historique
      await this.loadConversationHistory();
    } catch (error) {
      console.error('Erreur lors de la suppression de la conversation:', error);
      alert(this.lang() === 'fr' ? 'Échec de la suppression de la conversation.' : 'Failed to delete conversation.');
    }
  }

  /**
   * Afficher une conversation de l'historique
   */
  showConversation(conversation: ChatConversation) {
    // Ajouter les messages à la conversation actuelle
    this.messages.update((m: ChatMessage[]) => [
      ...m,
      {role: 'user', text: conversation.userMessage, metadata: null, conversationId: conversation.id},
      {role: 'assistant', text: conversation.assistantResponse, metadata: {
        provider: conversation.provider,
        model: conversation.model,
        temperature: conversation.temperature
      }, conversationId: conversation.id}
    ]);
    this.showHistory.set(false);
  }
}
