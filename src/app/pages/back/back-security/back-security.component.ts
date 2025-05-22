import {Component} from '@angular/core';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
  MatTable
} from '@angular/material/table';
import {ComparatifSolution} from '../../../core/models/ComparatifSolution';
import {MatCard} from '@angular/material/card';
import {MatDivider} from '@angular/material/divider';
import {NgForOf} from '@angular/common';
import {ClassementComponent} from '../../../component/classement/classement.component';
import {MatTab, MatTabGroup} from '@angular/material/tabs';
import {LinkInfo} from '../../../core/models/LinkInfo';
import {LinkInfoComponent} from '../../../component/link-info/link-info.component';

@Component({
  selector: 'app-back-security',
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
    MatRowDef,
    MatCard,
    MatDivider,
    NgForOf,
    ClassementComponent,
    MatTab,
    MatTabGroup,
    LinkInfoComponent
  ],
  templateUrl: './back-security.component.html',
  styleUrl: './back-security.component.css'
})
export class BackSecurityComponent {
  displayedColumns: string[] = [
    'name',
    'principles',
    'useCases',
    'advantages',
    'disadvantages',
    'references'
  ];

  securitySolutions: ComparatifSolution[] = [
    {
      name: 'Spring Security',
      link: 'https://spring.io/projects/spring-security',
      title: 'Module principal de sécurité (spring-boot-starter-security)',
      choice: '',
      advantages: [
        'Framework de sécurité complet et flexible',
        'Intégration native avec Spring Boot et Spring MVC',
        'Support pour l\'authentification et l\'autorisation',
        'Communauté active et documentation complète'
      ],
      disadvantages: [
        'Courbe d\'apprentissage assez raide pour les débutants',
        'Configuration parfois verbeuse pour des cas complexes',
        'Peut nécessiter beaucoup de code pour personnaliser certains comportements'
      ],
      features: [
        'Authentification et autorisation basées sur les rôles',
        'Protection contre les attaques CSRF, XSS, et autres vulnérabilités web',
        'Intégration avec différentes sources d\'authentification (LDAP, OAuth2, etc.)',
        'Sécurité au niveau des méthodes avec les annotations @Secured, @PreAuthorize'
      ],
      useCases: [
        'Applications web nécessitant une authentification utilisateur',
        'APIs REST sécurisées',
        'Applications d\'entreprise avec des besoins de sécurité complexes',
        'Systèmes nécessitant une gestion fine des autorisations'
      ],
      references: {
        github: {
          repo: 'https://github.com/spring-projects/spring-security',
          title: 'Dépôt officiel de Spring Security',
        },
        siteAvis: [
          {
            name: 'Baeldung Spring Security',
            link: 'https://www.baeldung.com/security-spring',
            title: 'Tutoriels Spring Security sur Baeldung'
          },
          {
            name: 'Documentation officielle',
            link: 'https://docs.spring.io/spring-security/reference/index.html',
            title: 'Documentation Spring Security'
          }
        ]
      }
    },
    {
      name: 'OAuth2 Authorization Server',
      link: 'https://docs.spring.io/spring-authorization-server/docs/current/reference/html/index.html',
      title: 'Module pour implémenter un serveur d\'autorisation OAuth2/OIDC (spring-boot-starter-oauth2-authorization-server)',
      choice: '',
      advantages: [
        'Implémentation officielle du standard OAuth2 et OpenID Connect (OIDC)',
        'Permet de créer un serveur d\'autorisation complet et conforme aux spécifications',
        'Intégration native avec l\'écosystème Spring Security',
        'Support pour différents types de grants OAuth2 (authorization code, client credentials, etc.)'
      ],
      disadvantages: [
        'Configuration plus complexe que les autres modules de sécurité',
        'Nécessite une bonne compréhension des concepts OAuth2/OIDC',
        'Responsabilité importante en matière de sécurité des tokens et des données d\'authentification',
        'Courbe d\'apprentissage importante pour une utilisation avancée'
      ],
      features: [
        'Émission de tokens JWT et opaques',
        'Support complet pour les flux OAuth2 et OIDC',
        'Gestion des clients, des scopes et des consentements',
        'Endpoints conformes aux spécifications OAuth2/OIDC',
        'Personnalisation des processus d\'authentification et d\'autorisation'
      ],
      useCases: [
        'Centralisation de l\'authentification pour un écosystème d\'applications',
        'Implémentation d\'une solution SSO (Single Sign-On)',
        'Sécurisation d\'APIs avec une gestion fine des autorisations',
        'Systèmes nécessitant une séparation entre authentification et ressources'
      ],
      references: {
        github: {
          repo: 'https://github.com/spring-projects/spring-authorization-server',
          title: 'Dépôt officiel de Spring Authorization Server',
        },
        siteAvis: [
          {
            name: 'Baeldung Authorization Server',
            link: 'https://www.baeldung.com/spring-security-oauth-auth-server',
            title: 'Guide d\'implémentation d\'un serveur d\'autorisation OAuth2'
          },
        ]
      }
    },
    {
      name: 'OAuth2 Resource Server',
      link: 'https://docs.spring.io/spring-security/reference/servlet/oauth2/resource-server/index.html',
      title: 'Module pour sécuriser les API REST (spring-boot-starter-oauth2-resource-server)',
      choice: '',
      advantages: [
        'Implémentation standard de OAuth2 pour les API REST',
        'Support pour JWT et tokens opaques',
        'Intégration facile avec les fournisseurs d\'identité externes',
        'Configuration simplifiée avec Spring Boot'
      ],
      disadvantages: [
        'Nécessite une compréhension des concepts OAuth2',
        'Dépend d\'un serveur d\'autorisation externe pour la gestion des tokens',
        'Peut être complexe à déboguer en cas de problème'
      ],
      features: [
        'Validation des JWT et extraction des claims',
        'Support pour les scopes OAuth2',
        'Intégration avec Spring Security pour les autorisations',
        'Personnalisation des convertisseurs de tokens'
      ],
      useCases: [
        'Microservices sécurisés par tokens JWT',
        'APIs consommées par des applications mobiles ou SPA',
        'Architectures distribuées avec authentification centralisée',
        'Intégration avec des services cloud'
      ],
      references: {
        github: {
          repo: 'https://github.com/spring-projects/spring-security',
          title: 'Dépôt officiel de Spring Security',
        },
        siteAvis: [
          {
            name: 'Baeldung OAuth2',
            link: 'https://www.baeldung.com/spring-security-oauth-resource-server',
            title: 'Guide Resource Server OAuth2'
          },
          {
            name: 'Documentation officielle',
            link: 'https://docs.spring.io/spring-security/reference/servlet/oauth2/resource-server/index.html',
            title: 'Documentation OAuth2 Resource Server'
          }
        ]
      }
    },
    {
      name: 'Spring Security Reactive',
      link: 'https://docs.spring.io/spring-security/reference/reactive/index.html',
      title: 'Module principal de sécurité pour applications réactives (spring-boot-starter-security avec WebFlux)',
      choice: '',
      advantages: [
        'Support complet pour les applications WebFlux réactives',
        'Performances améliorées pour les applications à forte charge',
        'Modèle non-bloquant pour la sécurité',
        'API fluide et fonctionnelle'
      ],
      disadvantages: [
        'Documentation moins complète que pour la version servlet',
        'Moins d\'exemples et de ressources disponibles',
        'Nécessite une bonne compréhension de la programmation réactive'
      ],
      features: [
        'Authentification et autorisation réactives',
        'Support pour les flux de données réactifs',
        'Intégration avec WebFlux et Reactor',
        'Sécurité au niveau des méthodes avec annotations réactives'
      ],
      useCases: [
        'Applications WebFlux à haute performance',
        'Microservices réactifs',
        'APIs streaming avec sécurité',
        'Applications nécessitant une scalabilité élevée'
      ],
      references: {
        github: {
          repo: 'https://github.com/spring-projects/spring-security',
          title: 'Dépôt officiel de Spring Security',
        },
        siteAvis: [
          {
            name: 'Documentation officielle Spring Security Reactive',
            link: 'https://docs.spring.io/spring-security/reference/reactive/index.html',
            title: 'Documentation Spring Security Reactive'
          }
        ]
      }
    },
    {
      name: 'Spring Security OAuth2 JOSE (JSON Object Signing and Encryption)',
      link: 'https://docs.spring.io/spring-security/reference/servlet/oauth2/resource-server/jwt.html',
      title: 'Module pour le support des standards JOSE (JWT, JWS, JWE) (spring-security-oauth2-jose)',
      choice: '',
      advantages: [
        'Support complet pour les standards JOSE (JWT, JWS, JWE)',
        'Facilite la création, validation et manipulation des tokens JWT',
        'Intégration native avec Spring Security et les serveurs de ressources OAuth2',
        'Implémentation conforme aux spécifications RFC pour JWT'
      ],
      disadvantages: [
        'Nécessite une bonne compréhension des concepts JWT et de cryptographie',
        'Configuration parfois complexe pour les cas d\'utilisation avancés',
        'Dépendance à des bibliothèques cryptographiques qui peuvent évoluer',
        'Responsabilité importante dans la gestion des clés de signature et de chiffrement'
      ],
      features: [
        'Encodage et décodage des tokens JWT',
        'Support pour la signature (JWS) et le chiffrement (JWE) des tokens',
        'Validation des claims JWT (expiration, émetteur, audience, etc.)',
        'Intégration avec différents algorithmes cryptographiques (RSA, HMAC, etc.)',
        'Conversion entre formats JWT et objets Java'
      ],
      useCases: [
        'Applications utilisant JWT comme mécanisme d\'authentification',
        'Microservices nécessitant une validation avancée des tokens',
        'Systèmes avec échange sécurisé d\'informations via tokens',
        'Implémentations personnalisées de flux OAuth2/OIDC'
      ],
      references: {
        github: {
          repo: 'https://github.com/spring-projects/spring-security',
          title: 'Dépôt officiel de Spring Security',
        },
        siteAvis: [
          {
            name: 'Baeldung JWT',
            link: 'https://www.baeldung.com/spring-security-oauth-2-jws-jwk',
            title: 'Guide d\'utilisation de JWS et JWK avec Spring Security'
          },
          {
            name: 'Documentation officielle',
            link: 'https://docs.spring.io/spring-security/reference/servlet/oauth2/resource-server/jwt.html',
            title: 'Documentation JWT avec Spring Security'
          }
        ]
      }
    },
    {
      name: 'Application autonome incluant serveur de ressources OAuth2+JOSE',
      link: 'https://docs.spring.io/spring-security/reference/servlet/oauth2/resource-server/index.html',
      title: 'Le projet implémente sa propre logique de génération et validation des tokens JWT',
      choice: '4',
      advantages: [
        'Contrôle total sur le processus d\'authentification',
        'Pas de dépendance à un service externe',
        'Simplicité de déploiement'
      ],
      disadvantages: [
        'Responsabilité accrue en matière de sécurité',
        'Maintenance des fonctionnalités d\'authentification',
        'Moins adapté aux écosystèmes d\'applications'
      ],
      features: [
        'L\'application agit à la fois comme serveur d\'autorisation et serveur de ressources',
        'Gère elle-même l\'émission et la validation des tokens',
        'Combine authentification et autorisation'
      ],
      useCases: [
        'Applications autonomes avec API',
        'Prototypes et MVPs',
        'Applications avec besoins d\'authentification spécifiques'
      ],
      references: {
        github: {
          repo: 'https://github.com/spring-projects/spring-security',
          title: 'Dépôt officiel de Spring Security',
        },
        siteAvis: [
          {
            name: 'Cours Openclassrooms (partie 2 - point 5)',
            link: 'https://openclassrooms.com/fr/courses/7137776-securisez-votre-application-web-avec-spring-security',
            title: 'Sécurisez votre application web avec Spring Security'
          }
        ]
      }
    },
    {
      name: 'OAuth2 Client',
      link: 'https://docs.spring.io/spring-security/reference/servlet/oauth2/client/index.html',
      title: 'Module pour l\'authentification OAuth2 côté client (spring-boot-starter-oauth2-client)',
      choice: '5',
      advantages: [
        'Intégration facile avec les fournisseurs d\'identité externes (Google, Facebook, GitHub, etc.)',
        'Gestion automatique du flux d\'authentification OAuth2/OIDC',
        'Support pour différents types de grants (authorization code, client credentials, etc.)',
        'Configuration simplifiée avec Spring Boot'
      ],
      disadvantages: [
        'Dépendance à des services d\'authentification externes',
        'Complexité de configuration pour des scénarios avancés',
        'Nécessite une gestion des redirections et des callbacks',
        'Peut être difficile à tester en environnement de développement'
      ],
      features: [
        'Permet à l\'application d\'agir comme client OAuth2/OIDC',
        'Gère les flux d\'authentification avec les fournisseurs d\'identité',
        'Support pour l\'obtention et le rafraîchissement des tokens',
        'Intégration avec Spring Security pour l\'autorisation basée sur les scopes'
      ],
      useCases: [
        'Applications nécessitant une authentification via des fournisseurs externes',
        'Single Sign-On (SSO) avec des systèmes existants',
        'Applications web avec login social',
        'Microservices nécessitant d\'accéder à des APIs protégées'
      ],
      references: {
        github: {
          repo: 'https://github.com/spring-projects/spring-security',
          title: 'Dépôt officiel de Spring Security',
        },
        siteAvis: [
          {
            name: 'Baeldung OAuth2 Client',
            link: 'https://www.baeldung.com/spring-security-5-oauth2-login',
            title: 'Guide d\'implémentation OAuth2 Login avec Spring Security'
          },
          {
            name: 'Documentation officielle',
            link: 'https://docs.spring.io/spring-security/reference/servlet/oauth2/client/index.html',
            title: 'Documentation OAuth2 Client avec Spring Security'
          }
        ]
      }
    },
  ];

  titleLink: string = 'Sites de référence sur la sécurité Spring :';
  sites: LinkInfo[] = [
    {
      name: 'Spring Security Reference',
      link: 'https://docs.spring.io/spring-security/reference/index.html'
    },
    {
      name: 'Baeldung Spring Security Guides',
      link: 'https://www.baeldung.com/security-spring'
    },
    {
      name: 'UDEMY Spring Security Core: Beginner to Guru (John Thompson)',
      link: 'https://www.udemy.com/course/spring-security-core-beginner-to-guru/'
    },
    {
      name: 'UDEMY Spring Boot 3, Spring Framework 6: Beginner to Guru - Sections sécurité (John Thompson)',
      link: 'https://www.udemy.com/course/spring-framework-6-beginner-to-guru/?couponCode=KEEPLEARNING'
    },
  ];
}
