import { Component } from '@angular/core';
import {
  MatCell,
  MatCellDef, MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef, MatHeaderRow, MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable
} from '@angular/material/table';
import {NgForOf} from '@angular/common';
import {MatDivider} from '@angular/material/divider';
import {UiLibrary} from '../../../core/models/UiLibrary';

@Component({
  selector: 'app-ui-libraries',
  imports: [
    MatTable,
    MatHeaderCell,
    MatRow,
    MatCell,
    NgForOf,
    MatCellDef,
    MatRowDef,
    MatHeaderCellDef,
    MatHeaderRow,
    MatColumnDef,
    MatHeaderRowDef,
    MatDivider,
  ],
  templateUrl: './ui-libraries.component.html',
  styleUrl: './ui-libraries.component.css'
})
export class UiLibrariesComponent {
  displayedColumns: string[] = [
    'name',
    'advantages',
    'disadvantages',
    'features',
    'useCases',
    'sources'
  ];

  libraries: UiLibrary[] = [
    {
      name: 'Angular Material',
      link: 'https://material.angular.io/',
      title: 'Site officiel Material Design',
      advantages: 'Intégration native avec Angular, fiable, communauté active.',
      disadvantages: 'Manque parfois de personnalisation comparée à d’autres librairies.',
      features: 'Prise en charge des bonnes pratiques Material Design, mise à jour régulière.',
      useCases: 'Applications Angular nécessitant une interface utilisateur conforme aux normes de Material Design.',
      sources: [
        'https://github.com/angular/components',
        'https://blog.angular.io/',
        'https://material.angular.io/components/table/overview'
      ]
    },
    {
      name: 'PrimeNG',
      link: 'https://www.primefaces.org/primeng/',
      title: 'Site officiel de PrimeNG',
      advantages: 'Large éventail de composants riches en fonctionnalités, composants premium.',
      disadvantages: 'Plus complexe à personnaliser, la qualité esthétique dépend des thèmes.',
      features: 'Plus de 80 composants, thèmes prêts à l’emploi, support d’accessibilité.',
      useCases: 'Lorsque vous nécessitez un large choix de fonctionnalités et des thèmes prédéfinis.',
      sources: [
        'https://github.com/primefaces/primeng',
        'https://primeng.org/',
        'https://medium.com/search?q=primeng'
      ]
    },
    {
      name: 'NG Zorro',
      link: 'https://ng.ant.design/',
      advantages: 'Basé sur Ant Design, dispose de composants élégants et modernes.',
      disadvantages: 'Moins connu que d’autres librairies comme Angular Material. Moindre communauté francophone.',
      features: 'Prise en charge d’Ant Design, système de composants riche pour des interfaces complexes.',
      useCases: 'Applications d’administration, dashboards, ou projets nécessitant des interfaces élégantes.',
      sources: [
        'https://github.com/NG-ZORRO/ng-zorro-antd',
        'https://ng.ant.design/docs/introduce/en/',
        'https://medium.com/ng-zorro/'
      ]
    },
    {
      name: 'AG-Grid',
      link: 'https://www.ag-grid.com/',
      advantages: 'Performances élevées pour le rendu de données volumineuses, fonctionnalités avancées pour les tableaux (tri, filtrage, édition).',
      disadvantages: 'Licence payante nécessaire pour les fonctionnalités avancées, apprentissage assez difficile.',
      features: 'Composants de tableaux dynamiques et hautement personnalisables, idéal pour des applications data-centric.',
      useCases: 'Applications nécessitant des tableaux complexes et interactifs manipulant de larges volumes de données.',
      sources: [
        'https://github.com/ag-grid/ag-grid',
        'https://www.ag-grid.com/documentation/',
        'https://medium.com/ag-grid/'
      ]
    },
    {
      name: 'NG Bootstrap',
      link: 'https://ng-bootstrap.github.io/',
      advantages: 'Utilisation native des composants Bootstrap, fidèle à la simplicité.',
      disadvantages: 'Basé uniquement sur Bootstrap, ce qui limite la personnalisation.',
      features: 'Composants Bootstrap pour Angular, respect des bonnes pratiques de Bootstrap.',
      useCases: 'Applications Angular nécessitant une implémentation simple et rapide avec Bootstrap.',
      sources: [
        'https://github.com/ng-bootstrap/ng-bootstrap',
        'https://ng-bootstrap.github.io/',
        'https://medium.com/search?q=ng-bootstrap'
      ]
    }
  ];
}
