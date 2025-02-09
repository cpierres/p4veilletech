import {Component} from '@angular/core';
import {
  MatCell,
  MatCellDef, MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef, MatHeaderRow, MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable
} from '@angular/material/table';
import {DecimalPipe, NgForOf, NgIf} from '@angular/common';
import {MatDivider} from '@angular/material/divider';
import {UiLibrary} from '../../../core/models/UiLibrary';
import {LinkInfo} from '../../../core/models/LinkInfo';

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
    NgIf,
    DecimalPipe,
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
    'references'
  ];

  libraries: UiLibrary[] = [
    {
      name: 'Angular Material',
      link: 'https://material.angular.io/',
      title: 'Médaille d\'or pour application simple (pas de coût de licence)',
      choice: '1',
      advantages: 'Intégration native avec Angular, fiable, communauté active.',
      disadvantages: 'Manque parfois de personnalisation comparée à d’autres librairies.',
      features: 'Prise en charge des bonnes pratiques Material Design, mise à jour régulière.',
      useCases: 'Applications Angular nécessitant une interface utilisateur conforme aux normes de Material Design.',
      references: {
        github: {
          repo: 'https://github.com/angular/components',
          title: 'Angular Components Repository',
          stars: 24500,
          forks: 6800
        },
        siteAvis: [
          {name: 'Angular Blog', link: 'https://blog.angular.io/', title: 'Angular Blog'},
          {
            name: 'Material Table',
            link: 'https://material.angular.io/components/table/overview',
            title: 'Table Overview'
          }
        ]
      }
    },
    {
      name: 'PrimeNG',
      link: 'https://www.primefaces.org/category/primeng/',
      title: 'Médaille d\'or pour application complexité moyenne (pas de coût de licence)',
      choice: '1',
      advantages: 'Large éventail de composants riches en fonctionnalités, composants premium.',
      disadvantages: 'Plus complexe à personnaliser (sauf depuis v18), la qualité esthétique dépend des thèmes. Réputé assez buggé (reddit) ?',
      features: 'Plus de 80 composants gratuits, thèmes prêts à l’emploi, support d’accessibilité. PrimeTek propose version payante avec support.',
      useCases: 'Lorsque vous nécessitez un large choix de fonctionnalités et des thèmes prédéfinis.',
      references: {
        github: {
          repo: 'https://github.com/primefaces/primeng',
          title: 'PrimeNG Repository',
          stars: 11000,
          forks: 4700
        },
        siteAvis: [
          {name: 'Site officiel', link: 'https://primeng.org/', title: 'PrimeNG Official Site'},
          {name: 'Medium Article', link: 'https://medium.com/search?q=primeng', title: 'PrimeNG on Medium'}
        ]
      }
    },
    {
      name: 'NG Zorro',
      link: 'https://ng.ant.design/',
      title: 'Pour application complexe, bonne réputation, + de 60 composants',
      choice: '2',
      advantages: 'Basé sur Ant Design, dispose de composants élégants et modernes.',
      disadvantages: 'Moins connu que d’autres librairies comme Angular Material. Moindre communauté francophone.',
      features: 'Prise en charge d’Ant Design, système de composants riche pour des interfaces complexes.',
      useCases: 'Applications d’administration, dashboards, ou projets nécessitant des interfaces élégantes.',
      references: {
        github: {
          repo: 'https://github.com/NG-ZORRO/ng-zorro-antd',
          title: 'NG Zorro Repository',
          stars: 8900,
          forks: 4000
        },
        siteAvis: [
          {name: 'Documentation', link: 'https://ng.ant.design/docs/introduce/en/', title: 'NG Zorro Docs'},
          {name: 'Medium Articles', link: 'https://medium.com/ng-zorro/', title: 'NG Zorro Blog'}
        ]
      }
    },
    {
      name: 'Taiga UI',
      link: 'https://taiga-ui.dev/',
      title: 'Très bonne réputation, en forte progression depuis 2020, réputée fiable et bien conçue. Application complexité moyenne à complexe.',
      choice: '2',
      advantages: '130 composants. Moderne, hautement personnalisable, support complet pour Angular, documentation détaillée. En forte progression.',
      disadvantages: 'Moins de support communautaire comparé à des librairies plus populaires comme Angular Material.',
      features: 'Large gamme de composants flexibles avec des animations subtiles, support thématique, légèreté.',
      useCases: 'Applications modernes nécessitant un design minimaliste et flexible.',
      references: {
        github: {
          repo: 'https://github.com/Tinkoff/taiga-ui',
          title: 'Taiga UI Repository',
          stars: 3400,
          forks: 482
        },
        siteAvis: [
          {
            name: 'Documentations et composants',
            link: 'https://taiga-ui.dev/components',
            title: 'Explore Taiga UI Components'
          },
          {
            name: 'Comparaison avec Angular Material',
            link: 'https://blog.example.com/taiga-vs-material/',
            title: 'Blog: Taiga UI vs Angular Material'
          }
        ]
      }
    },
    {
      name: 'AG-Grid',
      link: 'https://www.ag-grid.com/',
      title: 'Médaille d\'or pour application complexe et avec gros volumes. Licence payante, pas de support communautaire.',
      choice: '1',
      advantages: 'Performances élevées pour le rendu de données volumineuses, fonctionnalités avancées pour les tableaux (tri, filtrage, édition).',
      disadvantages: 'Licence payante nécessaire pour les fonctionnalités avancées, apprentissage assez difficile.',
      features: 'Composants de tableaux dynamiques et hautement personnalisables, idéal pour des applications data-centric.',
      useCases: 'Applications nécessitant des tableaux complexes et interactifs manipulant de larges volumes de données.',
      references: {
        github: {
          repo: 'https://github.com/ag-grid/ag-grid',
          title: 'AG-Grid Repository',
          stars: 13400,
          forks: 1900
        },
        siteAvis: [
          {name: 'Documentation officielle', link: 'https://www.ag-grid.com/documentation/', title: 'AG-Grid Docs'},
          {name: 'Medium Articles', link: 'https://medium.com/ag-grid/', title: 'AG-Grid Blog'}
        ]
      }
    },
    {
      name: 'NG Bootstrap',
      link: 'https://ng-bootstrap.github.io/',
      advantages: 'Utilisation native des composants Bootstrap, fidèle à la simplicité.',
      disadvantages: 'Basé uniquement sur Bootstrap, ce qui limite la personnalisation.',
      features: 'Composants intuitifs basés sur Bootstrap.',
      useCases: 'Applications qui utilisent déjà Bootstrap et nécessitent une intégration rapide.',
      references: {
        github: {
          repo: 'https://github.com/ng-bootstrap/ng-bootstrap',
          title: 'NG Bootstrap Repository',
          stars: 8200,
          forks: 1600
        },
        siteAvis: [
          {name: 'NG Bootstrap Site', link: 'https://ng-bootstrap.github.io/', title: 'Official Site'}
        ]
      }
    },
    {
      name: 'ngx-bootstrap',
      link: 'https://valor-software.com/ngx-bootstrap/',
      title: 'Site officiel de ngx-bootstrap',
      advantages: 'Grande collection de composants Bootstrap réutilisables pour Angular.',
      disadvantages: 'Moins fréquent dans les projets modernes comparé à Angular Material.',
      features: 'Prise en charge des fonctionnalités de Bootstrap 3 et 4, large éventail de composants comme les Modals, Alerts, Tabs, etc.',
      useCases: 'Applications nécessitant une approche basée sur Bootstrap avec une intégration facile.',
      references: {
        github: {
          repo: 'https://github.com/valor-software/ngx-bootstrap',
          title: 'ngx-bootstrap Repository',
          stars: 5500,
          forks: 1700
        },
        siteAvis: [
          {
            name: 'Site officiel',
            link: 'https://valor-software.com/ngx-bootstrap/',
            title: 'ngx-bootstrap Official Documentation'
          },
          {
            name: 'Github Issues',
            link: 'https://github.com/valor-software/ngx-bootstrap/issues',
            title: 'Issues (ngx-bootstrap)'
          }
        ]
      }
    }
  ];

  comparatifsUi: LinkInfo[] = [
    {
      name: 'Comparaison star-history.com',
      link: 'https://star-history.com/#primefaces/primeng&ng-bootstrap/ng-bootstrap&valor-software/ngx-bootstrap&Tinkoff/taiga-ui&NG-ZORRO/ng-zorro-antd&angular/components&Date',
      title: 'Historique des étoiles des librairies',
    },
    {
      name: 'Reddit : Comparaison des meilleures librairies UI pour Angular',
      link: 'https://www.reddit.com/r/Angular2/comments/1gku1jh/the_best_ui_libraries_for_angular/?tl=fr',
      title: 'Guide complet des librairies pour Angular',
    },
    {
      name: '10 Angular UI Libraries to Create a World-Class User Experience',
      link: 'https://geekflare.com/dev/angular-ui-libraries/',
      title: 'Guide complet des librairies pour Angular',
    },
    {
      name: '9 bibliothèques de composants Angular',
      link: 'https://kinsta.com/fr/blog/bibliotheques-composants-angular/',
      title: 'Guide complet des librairies pour Angular',
    },
    {
      name: 'PrimeNg vs NgBootstrap vs NgxBootstrap',
      link: 'https://www.youtube.com/watch?v=5dUfWgFlhO4',
      title: 'Comparatif youtube sur ces 3 librairies populaires',
    },
  ];


}
