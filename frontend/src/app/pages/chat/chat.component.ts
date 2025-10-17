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

    try {
      const resp = await this.http.get('/api/chat', {
        params: {message: text, lang: this.lang()},
        responseType: 'text'
      }).toPromise();
      const answer = resp ?? (this.lang() === 'fr' ? 'Désolé, aucune réponse.' : 'Sorry, no answer.');
      this.messages.update((m: ChatMessage[]) => [...m, {role: 'assistant', text: answer as string}]);
    } catch (e) {
      const err = this.lang() === 'fr' ? "Une erreur est survenue côté serveur." : "A server error occurred.";
      this.messages.update((m: ChatMessage[]) => [...m, {role: 'assistant', text: err}]);
    } finally {
      this.loading.set(false);
    }
  }
}
