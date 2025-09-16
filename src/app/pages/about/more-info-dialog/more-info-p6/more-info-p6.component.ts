import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-more-info-p6',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  template: `
    <div class="project-details">
      <div class="section">
        <h3><mat-icon>architecture</mat-icon> Architecture Full-Réactive</h3>
        <p>
          Ce projet implémente une architecture 100% non-bloquante, de la base de données jusqu'au frontend :
        </p>
        <ul>
          <li><strong>Spring WebFlux :</strong> Framework réactif pour le backend avec support des flux de données asynchrones</li>
          <li><strong>R2DBC :</strong> Driver réactif pour PostgreSQL, permettant des opérations base de données non-bloquantes</li>
          <li><strong>Angular Signals :</strong> Gestion d'état réactive côté frontend avec détection de changements optimisée</li>
          <li><strong>Server-Side Events (SSE) :</strong> Communication temps réel unidirectionnelle pour les mises à jour live</li>
        </ul>
        <!-- TODO: Ajouter plus de détails sur l'architecture -->
      </div>

      <div class="section">
        <h3><mat-icon>code</mat-icon> Technologies Avancées</h3>
        <p>
          Stack technique complète utilisant les dernières innovations :
        </p>
        <ul>
          <li><strong>Spring Boot 3.4.4 :</strong> Version la plus récente avec support natif</li>
          <li><strong>Project Reactor :</strong> Librairie de programmation réactive avec Mono et Flux</li>
          <li><strong>Angular 19.2.5 :</strong> Dernière version avec standalone components et signals</li>
          <li><strong>PostgreSQL + R2DBC :</strong> Base de données relationnelle avec accès réactif</li>
        </ul>
        <!-- TODO: Ajouter plus de détails techniques -->
      </div>

      <div class="section">
        <h3><mat-icon>speed</mat-icon> Performances & Scalabilité</h3>
        <p>
          Les performances obtenues grâce à l'architecture réactive :
        </p>
        <ul>
          <li><strong>Threads :</strong> Utilisation optimisée avec un pool réduit de threads</li>
          <li><strong>Mémoire :</strong> Consommation réduite grâce au streaming des données</li>
          <li><strong>Latence :</strong> Réponses instantanées même sous forte charge</li>
          <li><strong>Backpressure :</strong> Gestion automatique de la surcharge</li>
        </ul>
        <!-- TODO: Ajouter des métriques concrètes -->
      </div>

      <div class="section">
        <h3><mat-icon>security</mat-icon> Sécurité Renforcée</h3>
        <p>
          Mesures de sécurité implémentées après la soutenance :
        </p>
        <ul>
          <li><strong>JWT :</strong> Authentification stateless avec tokens sécurisés</li>
          <li><strong>CORS :</strong> Configuration stricte des origines autorisées</li>
          <li><strong>Validation :</strong> Validation des données côté backend et frontend</li>
          <li><strong>HTTPS :</strong> Chiffrement de bout en bout via reverse proxy</li>
        </ul>
        <!-- TODO: Ajouter plus de détails sur la sécurité -->
      </div>

      <div class="section">
        <h3><mat-icon>integration_instructions</mat-icon> Intégrations & Déploiement</h3>
        <p>
          Infrastructure et outils de déploiement :
        </p>
        <ul>
          <li><strong>Docker :</strong> Containerisation avec profils multi-environnements</li>
          <li><strong>Docker Compose :</strong> Orchestration locale et production</li>
          <li><strong>Nginx :</strong> Reverse proxy avec SSL/TLS</li>
          <li><strong>Synology NAS :</strong> Déploiement sur infrastructure personnelle</li>
        </ul>
        <!-- TODO: Ajouter détails sur le CI/CD -->
      </div>
      <div class="section">
        <h3><mat-icon>info</mat-icon>Remarques diverses</h3>
        <p>
          Cela devait être un développement full-stack ... et je l'ai fait en plus <b>full-réactive</b> : de la base de
          données, au backend et bien sûr jusqu'au frontend.</p>
        <p>Les fonctionnalités attendues sont relativement limitées mais suffisent à définir une architecture top niveau.</p>
         <p>
          C'est le projet qui m'a motivé le plus car le besoin étant un réseau social pour les développeurs, cela
          suppose :
        </p>
        <ul>
          <li>une très forte capacité de montée en charge</li>
          <li>être capable de gérer potentiellement tous les canaux de communication modernes, tels que des dialogues
            vidéos entre développeurs par exemple,
          </li>
          <li>pourquoi pas, télécharger des grosses vidéos et de les diffuser en streaming, sans scotcher les threads
            ...
          </li>
          <li>de réaliser facilement des chats en temps réel.</li>
        </ul>
        <p>
          C'est d'ailleurs ce que j'ai fait dans ce projet puisque les ajouts d'articles et commentaires étant vus par
          tous les utilisateurs en temps réel, on peut se servir des commentaires comme d'un chat entre tous les
          utilisateurs !
        </p>
        <p>
        <p>
          J'allais donc pouvoir mettre en oeuvre Spring WebFlux ainsi qu'une base de données au standard R2DBC, tous
          basés sur des paradigmes non bloquants.<br>
          <strong>D'après mon mentor et mon évaluateur de soutenance, je suis encore une fois le premier "étudiant" à
            leur connaissance
            à avoir mis en oeuvre ces technologies avancées !</strong>
        </p>
        <p>L'évaluateur avait vu un point d'amélioration concernant la sécurité.
          J'avais simplement appliqué la recette du projet 5 (tests sur une application full-stack existante).
          Cette solution n'étant pas suffisante, j'ai modifié le projet, après la soutenance, <u>afin de renforcer la sécurité</u> :
          Voici les <a href="https://github.com/cpierres/p6mdd?tab=readme-ov-file#s%C3%A9curit%C3%A9-renforc%C3%A9e-et-meilleures-pratiques" target="_blank">
            Bonnes pratiques de sécurité appliquées dans ce projet (README)
          </a>
        </p>
        <p>
          L'aspect "scolaire" de la validation réclamait le respect stricte des maquettes (critère d'évaluation).<br>
          J'ai néanmoins proposé d'ajouter certains éléments afin de mieux démontrer les avantages de l'architecture
          choisie (statistiques de popularité en temps réel par exemple).<br>
          J'ai respecté les spécifications fonctionnelles tout en offrant de la souplesse grâce à des capacités de
          filtrages et de tris (pour faciliter la démo de certains scénarios).<br>
          Le temps réel n'est certes pas une nouveauté puisqu'on sait déjà le faire depuis longtemps avec des Websockets
          en bidirectionnel (ou d'une manière moins élégante avec du polling).<br>
          L'aspect intéressant désormais est qu'on peut le faire avec des SSE (Server Side Events), un canal
          unidirectionnel qui, associé à Spring WebFlux autorise la montée en charge !<br>
          Par ailleurs, Angular lui-même a beaucoup travaillé l'aspect performance grâce aux "Signal" (signaux ...)
          lesquels permettent de cibler d'une manière précise les éléments à mettre à jour dans l'arbre des
          composants.<br>
        </p>
        <p>
          J'ai donc mis en oeuvre les dernières technologies disponibles pour Angular et Spring, sachant qu'elles sont
          mûres pour de la production puisqu'elles existent depuis un certains temps :
        </p>
        <ul>
          <li>Spring Webflux a été introduit avec <strong>Spring Framework 5.0</strong>, qui est sorti en <strong>septembre
            2017</strong>. Donc déjà 5 années de maturité !
          </li>
          <li>L'API Signal d'Angular a été introduite officiellement à partir de la version <strong>16</strong>
            d'Angular, publiée en <strong>mai 2023</strong>.
          </li>
        </ul>
        <p>
          En terme de complexité de développement avec WebFlux, il y a pas mal de similarités de concepts avec Spring Data JPA/MVC concernant :
        <p>
        <ul>
          <li>le principe de fonctionnement des controllers</li>
          <li>les repository de base</li>
          <li>et c'est bien entendu du Spring ...</li>
        </ul>
        <p>
          cependant, il faut savoir qu'il y a moins d'automatismes :
        </p>
        <ul>
          <li>pas de gestion déclarative/automatique des relations</li>
          <li>les repository réactifs sont uniquement mono-table</li>
        </ul>
        <p>
          Personnellement, cela ne me pose pas de problèmes et je dirais même au contraire !<br>
          Ainsi, on peut mettre en oeuvre librement ses connaissances Java et SQL pour des situations complexes.<br>
          Certes, on perd une certaine capacité à rendre le backend agnostique par rapport à la base de données, ce que permet bien JPA.<br>
          Mais une base comme Postgresql est très standard en terme de norme SQL.<br>
          Avoir la capacité de changer de base de données a moins d'intérêt à partir du moment où celle-ci est solide et gratuite.<br>
        </p>
        <p>
          Il faut prendre le temps de maitriser les fonctionnalités de gestion des flux de Reactor.<br>
          Ceci dit, Spring WebFlux automatise et simplifie beaucoup d'aspects de la programmation réactive (backpressure).<br>
          C'est une architecture particulièrement adaptée aux Micro-services pour absorber les latences potentielles et aussi synchroniser les résultats.<br>
        </p>
        <p>
          Il n'y a jamais de blocage au niveau de l'IHM, en cas d'attente, on informe avec un message mais on ne bloque rien et on ne monopolise pas des threads.
          On peut aussi facilement intégrer du messaging ou streaming Kafka.
        </p>
        <p>
          Les threads virtuels permettront certainement d'améliorer la capacité de montée en charge de Spring Data JPA/MVC mais cela demeurera du "paradigme bloquant optimisé".</p>
        <p>
          <strong>L'architecture de Spring WebFlux associée à Angular 19 est une solution d'excellence pour les microservices et les applications hautement scalables.</strong><br>
          J'espère me faire une spécialité pour migrer des développements JEE (de type Oracle ADF en particulier) vers
          cette architecture "full-stack ET full-réactive de bout en bout", nettement plus performante et résiliente par rapport à mes pratiques
          passées avec JEE.<br>
          Ou encore mieux : pas de migration mais un tout nouveau projet chez un éditeur de logiciels !
        </p>
        <p>Pour l'anecdote, beaucoup de modules relatifs à la gestion des microservices reposent sur Spring Webflux, tel est le cas de Spring Cloud Gateway par exemple.</p>

      </div>

    </div>
  `,
  styles: [`
    .project-details {
      display: flex;
      flex-direction: column;
      gap: 24px;
    }

    .section {
      background: white;
      border-radius: 8px;
      padding: 20px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.05);
      border-left: 4px solid var(--primary-color);
    }

    .section h3 {
      display: flex;
      align-items: center;
      gap: 8px;
      color: var(--primary-color);
      margin: 0 0 16px 0;
      font-size: 1.1em;
    }

    .section p {
      margin: 0 0 12px 0;
      line-height: 1.6;
      color: #555;
    }

    .section ul {
      margin: 12px 0 0 0;
      padding-left: 20px;
    }

    .section li {
      margin-bottom: 8px;
      line-height: 1.5;
    }

    .section li strong {
      color: var(--primary-color);
    }

    /* Responsive */
    @media (max-width: 768px) {
      .section {
        padding: 16px;
      }

      .section h3 {
        font-size: 1em;
      }
    }
  `]
})
export class MoreInfoP6Component {}
