import { Component } from '@angular/core';
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
  selector: 'app-back-presentation',
  imports: [
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatCell,
    MatHeaderRow,
    MatHeaderCellDef,
    MatCellDef,
    MatHeaderRowDef,
    MatRow,
    MatRowDef
  ],
  templateUrl: './back-presentation.component.html',
  styleUrl: './back-presentation.component.css'
})
export class BackPresentationComponent {
  // Données du tableau
  backTableData = [
    {
      possibilite: 'REST API',
      description: 'Permet de créer facilement des APIs RESTful pour répondre aux besoins des clients.',
      avantages: 'Facilité de configuration, flexibilité, et support JSON natif.'
    },
    {
      possibilite: 'Spring Data JPA',
      description: 'Framework pour gérer les opérations sur la base de données grâce à JPA/Hibernate.',
      avantages: 'Évite d\'écrire beaucoup de code pour les DAO ; support des bases SQL et NoSQL.'
    },
    {
      possibilite: 'Spring WebFlux',
      description: 'Framework réactif pour construire des applications asynchrones non-bloquantes.',
      avantages: 'Performances accrues pour les systèmes ayant un trafic élevé et nécessitant une gestion optimisée des ressources. Support des bases ORDB'
    },
    {
      possibilite: 'Spring Security',
      description: 'Framework pour gérer la sécurité des applications (Authentification, OAuth, JWT, etc.).',
      avantages: 'Support natif pour les standards de sécurité, extensibilité.'
    },
    {
      possibilite: 'Spring Cloud',
      description: 'Outils pour développer des systèmes distribués et des microservices.',
      avantages: 'Support natif pour Netflix Eureka, Ribbon, Hystrix, etc.'
    }
  ];

  // Colonnes affichées
  displayedColumns: string[] = ['possibilite', 'description', 'avantages'];

}
