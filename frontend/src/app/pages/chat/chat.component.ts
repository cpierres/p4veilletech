import {Component, signal, ViewChild, ElementRef, AfterViewChecked} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {NgForOf, NgIf} from '@angular/common';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';

interface ChatMessage {
  role: 'user' | 'assistant';
  text: string;
}

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [FormsModule, NgForOf, NgIf, MatFormFieldModule, MatInputModule, MatButtonModule, MatSelectModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent implements AfterViewChecked {
  lang = signal<'fr' | 'en'>('fr');
  input = signal<string>('');
  loading = signal<boolean>(false);
  messages = signal<ChatMessage[]>([
    {role: 'assistant', text: "Bonjour ! Posez-moi vos questions sur l'expérience professionnelle de Christophe PIERRES."}
  ]);

  isRecording = false;
  private mediaRecorder: MediaRecorder | null = null;
  private audioChunks: BlobPart[] = [];

  @ViewChild('messagesContainer') private messagesContainer!: ElementRef;
  private shouldScroll = true;

  constructor(private http: HttpClient) {}

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
    this.messages.update((m: ChatMessage[]) => [...m, {role: 'assistant', text: ''}]);

    let eventSource: EventSource | null = null;
    let hasReceivedData = false;
    let buffer = '';
    let timeoutId: any = null;

    const flushBuffer = () => {
      if (buffer) {
        this.messages.update((m: ChatMessage[]) => {
          const updated = [...m];
          updated[assistantIndex] = {
            role: 'assistant',
            text: updated[assistantIndex].text + buffer
          };
          return updated;
        });
        buffer = '';
      }
    };

    try {
      const url = `/api/chat?message=${encodeURIComponent(text)}&lang=${this.lang()}`;
      eventSource = new EventSource(url);

      eventSource.onmessage = (event) => {
// Dans onmessage, décode les espaces
        const chunk = event.data.replace(/\u00A0/g, ' ');
        //console.log(`Chunk décodé : "${chunk}"`);
        if (!chunk) return;

        hasReceivedData = true;
        buffer += chunk; // Concaténation directe

        if (timeoutId) clearTimeout(timeoutId);
        if (buffer.length > 15) {
          flushBuffer();
        } else {
          timeoutId = setTimeout(flushBuffer, 30);
        }
      };

      eventSource.onerror = (error) => {
        // Flush le buffer restant avant de fermer
        if (timeoutId) {
          clearTimeout(timeoutId);
        }
        flushBuffer();

        if (eventSource) {
          eventSource.close();
        }
        this.loading.set(false);

        // Si on a reçu des données, c'est juste la fin normale du stream
        if (hasReceivedData) {
          // Si le message est vide après tout, afficher un message par défaut
          if (!this.messages()[assistantIndex].text.trim()) {
            const emptyMsg = this.lang() === 'fr' ? 'Aucune réponse reçue.' : 'No response received.';
            this.messages.update((m: ChatMessage[]) => {
              const updated = [...m];
              updated[assistantIndex] = {role: 'assistant', text: emptyMsg};
              return updated;
            });
          }
        } else {
          // Erreur réelle - aucune donnée reçue
          const err = this.lang() === 'fr' ? "Une erreur est survenue côté serveur." : "A server error occurred.";
          this.messages.update((m: ChatMessage[]) => {
            const updated = [...m];
            updated[assistantIndex] = {role: 'assistant', text: err};
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
        updated[assistantIndex] = {role: 'assistant', text: err};
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
