package com.cpierres.p4veilletech.backend.config;

/**
 * Pourquoi ce fichier existe et pourquoi il est « vide » ?
 *
 * - Le projet dispose déjà d'une conservation de contexte via ChatHistoryService (en mémoire process),
 *   intégrée dans ChatRagService. Cela fonctionne sans dépendre d'APIs de mémoire Spring AI
 *   et garantit la compilation actuelle.
 * - Lors d'essais précédents, l'ajout de beans Spring AI (ChatMemory/Advisors) a échoué à la compilation
 *   car certaines classes/constructeurs différaient selon les versions et starters réellement présents.
 *
 * Ce fichier sert donc de point d'extension documenté: vous pouvez activer une mémoire « officielle »
 * Spring AI (persistante si souhaité) en décommentant l'exemple ci-dessous et en vérifiant vos dépendances.
 *
 * Exemple (commenté) avec Spring AI 1.1.0 — à adapter au contexte:
 *
 *  @Configuration
 *  public class AiMemoryConfig {
 *
 *    // 1) Store de mémoire (choisissez UNE option):
 *    // Option A — InMemory (simple, non persistant)
 *    // @Bean
 *    // ChatMemoryStore chatMemoryStore() {
 *    //   return new InMemoryChatMemoryStore();
 *    // }
 *
 *    // Option B — JDBC (persistant, nécessite un DataSource JDBC configuré)
 *    // @Bean
 *    // ChatMemoryStore chatMemoryStore(DataSource dataSource) {
 *    //   return new JdbcChatMemoryStore(dataSource);
 *    // }
 *
 *    // 2) Advisor « fenêtre de tokens » (recommandé pour contrôler le coût)
 *    // @Bean
 *    // TokenWindowChatMemoryAdvisor tokenWindowChatMemoryAdvisor(ChatMemoryStore store) {
 *    //   return TokenWindowChatMemoryAdvisor.builder(store)
 *    //     .withMaxTokens(8000)
 *    //     .withOverlap(400)
 *    //     .build();
 *    // }
 *
 *    // 3) Construction du ChatClient avec l'advisor par défaut
 *    // @Bean
 *    // ChatClient chatClient(ChatClient.Builder baseBuilder,
 *    //                      TokenWindowChatMemoryAdvisor memoryAdvisor) {
 *    //   return baseBuilder
 *    //     .defaultAdvisors(memoryAdvisor)
 *    //     .build();
 *    // }
 *
 *    // Utilisation côté appel:
 *    // chatClient.prompt()
 *    //   .advisors(a -> a.param(TokenWindowChatMemoryAdvisor.CONVERSATION_ID, conversationId))
 *    //   .user(message)
 *    //   .call();
 *
 *    // Note: Si vous préférez MessageChatMemoryAdvisor + InMemoryChatMemory, adaptez selon votre version.
 *    // Assurez-vous d'avoir les bons starters Spring AI dans le pom.xml.
 *  }
 */
public class AiMemoryConfig {
  // Intentionnellement sans @Configuration/beans actifs pour ne pas casser le build actuel.
  // Voir le bloc de commentaire ci-dessus pour activer une configuration Spring AI mémoire.
}
