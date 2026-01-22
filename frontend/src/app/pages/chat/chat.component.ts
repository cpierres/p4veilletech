import {Component, signal, computed, effect, ViewChild, ElementRef, AfterViewChecked} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {NgForOf, NgIf} from '@angular/common';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatIconModule} from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';
import {marked} from 'marked';

interface ChatMessage {
  role: 'user' | 'assistant';
  text: string;
  audioUrl?: string | null;
  metadata?: ChatMetadata | null;
}

interface ChatMetadata {
  provider?: string;
  model?: string;
  temperature?: number;
  processingTimeMs?: number;
}

interface ModelOption {
  value: string;
  label: string;
}

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [FormsModule, NgForOf, NgIf, MatFormFieldModule, MatInputModule, MatButtonModule, MatSelectModule, MatIconModule, MatTooltipModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent implements AfterViewChecked {
  // Paramètres de base
  lang = signal<'fr' | 'en'>('fr');
  input = signal<string>('');
  loading = signal<boolean>(false);
  ttsEnabled = signal<boolean>(false);

  // Paramètres AI
  provider = signal<'openai' | 'mistral'>('openai');
  model = signal<string>('gpt-4o-mini');
  showAdvancedSettings = signal<boolean>(false);

  // Paramètres avancés
  temperature = signal<number | null>(0.7);
  topP = signal<number | null>(null);
  maxTokens = signal<number | null>(null);
  ragTopK = signal<number>(12);
  ragSimilarityThreshold = signal<number>(0.4);

  // Modèles disponibles selon le provider
  availableModels = computed<ModelOption[]>(() => {
    if (this.provider() === 'mistral') {
      return [
        { value: 'mistral-small-latest', label: 'Mistral Small' },
        { value: 'mistral-medium-latest', label: 'Mistral Medium' },
        { value: 'mistral-large-latest', label: 'Mistral Large' },
        { value: 'open-mistral-nemo', label: 'Mistral Nemo' },
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
      const currentProvider = this.provider();
      const models = this.availableModels();
      if (models.length > 0) {
        // Sélectionner le premier modèle disponible pour ce provider
        const currentModel = this.model();
        const modelExists = models.some(m => m.value === currentModel);
        if (!modelExists) {
          this.model.set(models[0].value);
        }
      }
    });
  }

  // Méthode pour convertir le Markdown en HTML sécurisé
  renderMarkdown(text: string): SafeHtml {
    const html = marked.parse(text) as string;
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

  onTtsToggle(event: Event) {
    const target = event.target as HTMLInputElement | null;
    const checked = !!target && !!target.checked;
    this.ttsEnabled.set(checked);
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
    const text = this.input().trim();
    if (!text || this.loading()) return;
    this.messages.update((m: ChatMessage[]) => [...m, {role: 'user', text}]);
    this.input.set('');
    this.loading.set(true);

    // Ajouter un message assistant vide qui sera rempli progressivement
    const assistantIndex = this.messages().length;
    this.messages.update((m: ChatMessage[]) => [...m, {role: 'assistant', text: '', metadata: null}]);

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
      params.set('provider', this.provider());
      params.set('model', this.model());
      params.set('ragTopK', this.ragTopK().toString());
      params.set('ragSimilarityThreshold', this.ragSimilarityThreshold().toString());

      if (this.temperature() !== null) {
        params.set('temperature', this.temperature()!.toString());
      }
      if (this.topP() !== null) {
        params.set('topP', this.topP()!.toString());
      }
      if (this.maxTokens() !== null) {
        params.set('maxTokens', this.maxTokens()!.toString());
      }

      const url = `/api/chat/advanced?${params.toString()}`;
      eventSource = new EventSource(url);

      eventSource.onmessage = (event) => {
        try {
          // Le nouvel endpoint retourne du JSON avec content et metadata
          const data = JSON.parse(event.data);
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
              updated[assistantIndex] = {role: 'assistant', text: emptyMsg, audioUrl: null, metadata: lastMetadata};
              return updated;
            });
          } else {
            if (this.ttsEnabled()) {
              this.playMessageTts(assistantIndex, true);
            }
          }
        } else {
          const err = this.lang() === 'fr' ? "Une erreur est survenue côté serveur." : "A server error occurred.";
          this.messages.update((m: ChatMessage[]) => {
            const updated = [...m];
            updated[assistantIndex] = {role: 'assistant', text: err, audioUrl: null, metadata: null};
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
        updated[assistantIndex] = {role: 'assistant', text: err, metadata: null};
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
    const text = msgs[index].text?.trim();
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
        const current = this.input();
        const sep = current && !current.endsWith(' ') ? ' ' : '';
        this.input.set((current || '') + sep + text);
      }
    } catch (e) {
      console.error(e);
      alert(this.lang() === 'fr' ? 'Échec de la transcription audio.' : 'Audio transcription failed.');
    }
  }
}
