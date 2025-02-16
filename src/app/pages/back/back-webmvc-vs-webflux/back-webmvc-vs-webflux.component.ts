import {Component} from '@angular/core';
import {MatCard} from '@angular/material/card';
import {MatDivider} from '@angular/material/divider';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
  MatTable
} from '@angular/material/table';

@Component({
  selector: 'app-back-webmvc-vs-webflux',
  imports: [
    MatCard,
    MatDivider,
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderCellDef,
    MatCell,
    MatCellDef,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow,
    MatRowDef
  ],
  templateUrl: './back-webmvc-vs-webflux.component.html',
  styleUrl: './back-webmvc-vs-webflux.component.css'
})
export class BackWebmvcVsWebfluxComponent {
  displayedColumns: string[] = ['fonctionnalite', 'springWebMvc', 'springWebFlux'];

  comparatifData: Array<{ fonctionnalite: string, springWebMvc: string, springWebFlux: string }> = [
    {
      fonctionnalite: 'Modèle d\'exécution',
      springWebMvc: 'Basé sur un modèle bloquant (thread-per-request).',
      springWebFlux: 'Basé sur un modèle réactif et non bloquant.'
    },
    {
      fonctionnalite: 'Programmation',
      springWebMvc: 'Synchronisée, intuitive et facile à apprendre.',
      springWebFlux: 'Asynchrone et réactive avec `Mono` et `Flux`.'
    },
    {
      fonctionnalite: 'Gestion des relations (ORM)',
      springWebMvc: 'Support complet avec JPA/Hibernate (relations, lazy loading).',
      springWebFlux: 'Nécessite R2DBC, mais relations souvent gérées manuellement.'
    },
    {
      fonctionnalite: 'Transactions',
      springWebMvc: 'Gérées via @Transactional (bloquant).',
      springWebFlux: 'Transactions réactives possibles (plus complexes).'
    },
    {
      fonctionnalite: 'Performances',
      springWebMvc: 'Adapté pour des charges modérées.',
      springWebFlux: 'Idéal pour charges élevées grâce à la programmation non bloquante.'
    },
    {
      fonctionnalite: 'Support des API REST',
      springWebMvc: 'Parfait pour les API REST traditionnelles avec `@RestController`.',
      springWebFlux: 'Utilise `Mono`/`Flux` pour un REST non bloquant.'
    },
    {
      fonctionnalite: 'Debug et traçabilité des erreurs',
      springWebMvc: 'Débogage plus facile avec traitements synchrones.',
      springWebFlux: 'Débogage complexe dû aux stacks non linéaires.'
    },
    {
      fonctionnalite: 'Serveur Web supporté',
      springWebMvc: 'Fonctionne avec des serveurs bloquants comme Tomcat, Jetty, Undertow.',
      springWebFlux: 'Fonctionne avec des serveurs réactifs comme Netty, mais aussi Jetty ou Undertow en mode réactif.'
    },
    {
      fonctionnalite: 'Gestion des formulaires HTML',
      springWebMvc: 'Liaison automatique des données via `@ModelAttribute`, avec validation et gestion simples.',
      springWebFlux: 'Nécessite une configuration manuelle et un traitement asynchrone des formulaires HTML.'
    },
    {
      fonctionnalite: 'Compatibilité avec JDBC et bases relationnelles',
      springWebMvc: 'Compatible nativement avec JDBC/JPA pour des bases de données relationnelles synchrones.',
      springWebFlux: 'JDBC bloquant incompatible. Utilise Spring Data R2DBC pour les bases relationnelles en mode réactif.'
    },
    {
      fonctionnalite: 'Scalabilité',
      springWebMvc: 'Scalabilité limitée à cause du modèle bloquant (nombre de threads/pool dans le serveur).',
      springWebFlux: 'Scalabilité accrue grâce à la gestion optimisée des threads avec un modèle non bloquant.'
    },
    {
      fonctionnalite: 'Sécurité (Spring Security)',
      springWebMvc: 'Support synchronisé via un modèle basé sur des filtres servlets bloquants.',
      springWebFlux: 'Support réactif avec des abstractions comme `ReactiveAuthenticationManager` et WebFilter.'
    },
    {
      fonctionnalite: "Agnostique de bases de données",
      springWebMvc: "Grâce à JPA (Hibernate), abstraction de la base avec le SQL généré automatiquement.",
      springWebFlux: "Compatible avec plusieurs bases (relationnelles et NoSQL) via R2DBC ou MongoDB avec des outils réactifs, mais dépend davantage de leur implémentation."
    },
    {
      fonctionnalite: 'Cas d\'utilisation recommandé',
      springWebMvc: 'Idéal pour les applications classiques, telles que les systèmes CRUD, modérément chargées, où le bloquant est suffisant.',
      springWebFlux: 'Idéal pour des applications temps réel nécessitant des connexions longues ou des charges élevées.'
    },

  ];

}
