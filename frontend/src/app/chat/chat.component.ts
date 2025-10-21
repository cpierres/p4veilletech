import {async} from 'rxjs';

async send() {
    const text = this.input().trim();
    if (!text || this.loading()) return;
    this.messages.update((m: ChatMessage[]) => [...m, {role: 'user', text}]);
    this.input.set('');
    this.loading.set(true);

    // Ajouter un message assistant vide qui sera rempli progressivement
    const assistantIndex = this.messages().length;
    this.messages.update((m: ChatMessage[]) => [...m, {role: 'assistant', text: ''}]);

    try {
      const eventSource = new EventSource(`/api/chat?message=${encodeURIComponent(text)}&lang=${this.lang()}`);
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

      eventSource.onmessage = (event) => {
        const chunk = event.data;

        // Si le chunk est vide ou undefined, ignorer
        if (!chunk || chunk.trim() === '') {
          return;
        }

        hasReceivedData = true;

        // Ajouter au buffer
        buffer += chunk;

        // Annuler le timeout précédent
        if (timeoutId) {
          clearTimeout(timeoutId);
        }

        // Flush le buffer après 50ms d'inactivité ou si on a accumulé assez de caractères
        if (buffer.length > 10) {
          flushBuffer();
        } else {
          timeoutId = setTimeout(flushBuffer, 50);
        }
      };

      eventSource.onerror = (error) => {
        // Flush le buffer restant avant de fermer
        if (timeoutId) {
          clearTimeout(timeoutId);
        }
        flushBuffer();

        eventSource.close();
        this.loading.set(false);

        // Si on a reçu des données, c'est juste la fin normale du stream
        if (hasReceivedData) {
          // Si le message est vide, afficher un message par défaut
          if (!this.messages()[assistantIndex].text.trim()) {
            const emptyMsg = this.lang() === 'fr' ? 'Aucune réponse reçue.' : 'No response received.';
            this.messages.update((m: ChatMessage[]) => {
              const updated = [...m];
              updated[assistantIndex] = {role: 'assistant', text: emptyMsg};
              return updated;
            });
          }
        } else {
          // Erreur réelle
          const err = this.lang() === 'fr' ? "Une erreur est survenue côté serveur." : "A server error occurred.";
          this.messages.update((m: ChatMessage[]) => {
            const updated = [...m];
            updated[assistantIndex] = {role: 'assistant', text: err};
            return updated;
          });
        }
      };

    } catch (e) {
      const err = this.lang() === 'fr' ? "Une erreur est survenue côté serveur." : "A server error occurred.";
      this.messages.update((m: ChatMessage[]) => {
        const updated = [...m];
        updated[assistantIndex] = {role: 'assistant', text: err};
        return updated;
      });
      this.loading.set(false);
    }
  }
