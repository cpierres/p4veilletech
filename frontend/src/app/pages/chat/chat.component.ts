import {Component, signal} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {NgForOf} from '@angular/common';
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
  imports: [FormsModule, NgForOf, MatFormFieldModule, MatInputModule, MatButtonModule, MatSelectModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent {
  lang = signal<'fr' | 'en'>('fr');
  input = signal<string>('');
  loading = signal<boolean>(false);
  messages = signal<ChatMessage[]>([
    {role: 'assistant', text: "Bonjour ! Posez-moi vos questions sur l'expérience professionnelle de Christophe PIERRES."}
  ]);

  constructor(private http: HttpClient) {}

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
}
