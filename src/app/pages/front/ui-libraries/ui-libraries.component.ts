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
    MatHeaderRowDef
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
    'links'
  ];

  libraries = [
    {
      name: 'Angular Material',
      advantages:
        'Intégration native avec Angular, fiable, communauté active.',
      disadvantages:
        'Manque parfois de personnalisation comparée à d’autres librairies.',
      features:
        'Prise en charge des bonnes pratiques Material Design, mise à jour régulière.',
      useCases:
        'Applications Angular nécessitant une interface utilisateur conforme aux normes de Material Design.',
      link: 'https://material.angular.io/',
      sources: [
        'https://github.com/angular/components',
        'https://blog.angular.io/',
        'https://material.angular.io/components/table/overview',
      ]
    },
    {
      name: 'PrimeNG',
      advantages:
        'Large éventail de composants riches en fonctionnalités, composants premium.',
      disadvantages:
        'Plus complexe à personnaliser, la qualité esthétique dépend des thèmes.',
      features:
        'Plus de 80 composants, thèmes prêts à l’emploi, support d’accessibilité.',
      useCases:
        'Lorsque vous nécessitez un large choix de fonctionnalités et des thèmes prédéfinis.',
      link: 'https://www.primefaces.org/primeng/',
      sources: [
        'https://github.com/primefaces/primeng',
        'https://primeng.org/',
        'https://medium.com/search?q=primeng',
      ]
    },
    {
      name: 'NG Zorro',
      advantages:
        'Basé sur Ant Design, dispose de composants élégants et modernes.',
      disadvantages:
        'Moins connu que d’autres librairies comme Angular Material. Moindre communauté francophone.',
      features:
        'Prise en charge d’Ant Design, système de composants riche pour des interfaces complexes.',
      useCases:
        'Applications d’administration, dashboards, ou projets nécessitant des interfaces élégantes.',
      link: 'https://ng.ant.design/',
      sources: [
        'https://github.com/NG-ZORRO/ng-zorro-antd',
        'https://ng.ant.design/docs/introduce/en/',
        'https://medium.com/ng-zorro/'
      ]
    },
    {
      name: 'AG-Grid',
      advantages:
        'Performances élevées pour le rendu de données volumineuses, fonctionnalités avancées pour les tableaux (tri, filtrage, édition).',
      disadvantages:
        'Licence payante nécessaire pour les fonctionnalités avancées, apprentissage assez difficile.',
      features:
        'Composants de tableaux dynamiques et hautement personnalisables, idéal pour des applications data-centric.',
      useCases:
        'Applications nécessitant des tableaux complexes et interactifs manipulant de larges volumes de données.',
      link: 'https://www.ag-grid.com/',
      sources: [
        'https://github.com/ag-grid/ag-grid',
        'https://www.ag-grid.com/documentation/',
        'https://medium.com/ag-grid/',
      ]
    },
    {
      name: 'NG Bootstrap',
      advantages:
        'Utilisation native des composants Bootstrap, fidèle à la simplicité.',
      disadvantages:
        'Basé uniquement sur Bootstrap, ce qui limite la personnalisation.',
      features:
        'Composants Bootstrap pour Angular, respect des bonnes pratiques Bootstrap.',
      useCases:
        'Applications nécessitant une compatibilité ou une construction rapide avec Bootstrap.',
      link: 'https://ng-bootstrap.github.io/',
      sources: [
        'https://github.com/ng-bootstrap/ng-bootstrap',
        'https://blog.angular-university.io/',
        'https://ng-bootstrap.github.io/#/components/accordion/overview'
      ]
    },
    {
      name: 'ngx-bootstrap',
      advantages:
        'Extension de Bootstrap pour Angular avec un large éventail de composants.',
      disadvantages:
        'Certaines fonctionnalités sont limitées comparées à d’autres librairies spécialisées.',
      features:
        'Composants Bootstrap Angular prêts à l’emploi avec prise en charge de l’accessibilité.',
      useCases:
        'Interfaces utilisateur basées sur Bootstrap, mais nécessitant une flexibilité supplémentaire.',
      link: 'https://valor-software.com/ngx-bootstrap/',
      sources: [
        'https://github.com/valor-software/ngx-bootstrap',
        'https://valor-software.com/ngx-bootstrap/components',
        'https://medium.com/ngx-bootstrap/'
      ]
    },
    {
      name: 'DevExtreme Angular',
      advantages:
        'Large collection de widgets performants.',
      disadvantages:
        'Licence payante. Fonctionnalités avancées.',
      features:
        'Composants hautement personnalisables avec prise en charge des frameworks modernes (pas seulement Angular).',
      useCases:
        'Applications d’entreprises nécessitant beaucoup de données interactives.',
      link: 'https://js.devexpress.com/Overview/Angular/',
      sources: [
        'https://github.com/DevExpress/devextreme-angular',
        'https://js.devexpress.com/Angular/Demos/WidgetsGallery/',
        'https://js.devexpress.com/Documentation/'
      ]
    }
  ];
}
