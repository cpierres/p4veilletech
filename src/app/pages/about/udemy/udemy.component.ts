import { Component, OnInit } from '@angular/core';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef, MatHeaderRow,
  MatHeaderRowDef, MatRowDef,
  MatTable, MatTableModule
} from '@angular/material/table';
import { ClassementComponent } from '../../../component/classement/classement.component';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-udemy',
  templateUrl: './udemy.component.html',
  imports: [
    MatTableModule, // Ajout du module matériel
    MatTable,
    MatHeaderCellDef,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderRowDef,
    MatRowDef,
    MatCell,
    MatHeaderRow,
    ClassementComponent,
    NgClass // Ajout pour utiliser ngClass dans le template
  ],
  styleUrls: ['./udemy.component.css']
})
export class UdemyComponent implements OnInit {
  displayedColumns: string[] = ['categorie', 'titre', 'lien', 'duree', 'commentaire', 'classement'];
  formations = [
    // Catégorie Backend
    { categorie: 'Back', titre: '', lien: 'https://www.udemy.com/course/api-first-engineering-with-spring-boot/', duree: '13h', commentaire: '', classement: '1' },
    { categorie: 'Back', titre: '', lien: 'https://www.udemy.com/course/openapi-beginner-to-guru/', duree: '5h', commentaire: '', classement: '1' },
    { categorie: 'Back', titre: 'Spring Framework 6: Beginner to Guru w/ Spring Boot 3', lien: 'https://www.udemy.com/course/spring-framework-6-beginner-to-guru/', duree: '46h', commentaire: '', classement: '1' },
    { categorie: 'Back', titre: '', lien: 'https://www.udemy.com/course/hibernate-and-spring-data-jpa-beginner-to-guru', duree: '31h', commentaire: '', classement: '1' },
    { categorie: 'Back', titre: '', lien: 'https://www.udemy.com/course/testing-spring-boot-beginner-to-guru/', duree: '21h', commentaire: '', classement: '1' },
    { categorie: 'Back', titre: '', lien: 'https://www.udemy.com/course/introduction-to-kafka-with-spring-boot', duree: '6h', commentaire: '', classement: '1' },
    { categorie: 'Back', titre: '', lien: 'https://www.udemy.com/course/reactive-programming-with-spring-framework-5', duree: '13h', commentaire: '', classement: '1' },
    { categorie: 'Back', titre: '', lien: 'https://www.udemy.com/course/spring-boot-microservices-with-spring-cloud-beginner-to-guru', duree: '43h', commentaire: '', classement: '1' },
    { categorie: 'Back', titre: '', lien: 'https://www.udemy.com/course/spring-security-core-beginner-to-guru', duree: '13h', commentaire: '', classement: '1' },
    { categorie: 'Back', titre: '', lien: 'https://www.udemy.com/course/spring-ai-beginner-to-guru/', duree: '6h', commentaire: '', classement: '1' },
    { categorie: 'Back', titre: 'Ready for Production with Spring Boot Actuator | Udemy', lien: 'https://www.udemy.com/course/ready-for-production-with-spring-boot-actuator/', duree: '3h', commentaire: '', classement: '1' },
    { categorie: 'Back', titre: '', lien: 'https://www.udemy.com/course/spring-core-devops-on-aws/', duree: '7h', commentaire: '', classement: '1' },

    // Catégorie DevOps (reclassement et ajout)
    { categorie: 'DevOps', titre: '', lien: 'https://www.udemy.com/course/kube-by-example-spring-boot-on-kubernetes/', duree: '1h (Gratuit)', commentaire: 'Kubernetes', classement: '1' },
    { categorie: 'DevOps', titre: '', lien: 'https://www.udemy.com/course/kube-by-example-spring-boot-microservices-on-kubernetes/', duree: '2h (Gratuit)', commentaire: 'Kubernetes', classement: '1' },
    { categorie: 'DevOps', titre: '', lien: 'https://www.udemy.com/course/kube-by-example-building-spring-boot-docker-images/', duree: '1h (Gratuit)', commentaire: 'Docker', classement: '1' },
    { categorie: 'DevOps', titre: '', lien: 'https://www.udemy.com/course/docker-for-java-developers/', duree: '11h', commentaire: 'Docker', classement: '1' },
    { categorie: 'DevOps', titre: '', lien: 'https://www.udemy.com/course/apache-maven-beginner-to-guru/', duree: '9h', commentaire: 'Maven', classement: '1' },
    { categorie: 'DevOps', titre: '', lien: 'https://www.udemy.com/course/docker-and-kubernetes-the-complete-guide/', duree: '22h', commentaire: 'Docker et Kubernetes', classement: '1' },
    { categorie: 'DevOps', titre: '', lien: 'https://www.udemy.com/course/jenkins-from-zero-to-hero/', duree: '6h', commentaire: 'CI/CD avec Jenkins', classement: '1' },

    // Catégorie Frontend
    { categorie: 'Front', titre: 'Développer Votre Première Application avec Angular (2024)', lien: 'https://www.udemy.com/course/angular-developper-tutoriel-application-typescript/', duree: '12h', commentaire: 'Angular 14 et 15', classement: '1' },
    { categorie: 'Front', titre: '', lien: 'https://www.udemy.com/course/angular-course/', duree: '12h', commentaire: 'Débutant à avancé (angular 19)', classement: '1' },
    { categorie: 'Front', titre: 'Reactive Angular Course (with RxJs, Angular 19)', lien: 'https://www.udemy.com/course/rxjs-reactive-angular-course/', duree: '6h', commentaire: '', classement: '1' },
    { categorie: 'Front', titre: 'NgRx (with NgRx Data) - The Complete Guide (Angular 19)', lien: 'https://www.udemy.com/course/ngrx-course/', duree: '5h', commentaire: '', classement: '1' },
    { categorie: 'Front', titre: '', lien: 'https://www.udemy.com/course/angular-material-course', duree: '7h', commentaire: '', classement: '1' },
    { categorie: 'Front', titre: '', lien: 'https://www.udemy.com/course/angular-forms-course/', duree: '7h', commentaire: '', classement: '1' },
    { categorie: 'Front', titre: '', lien: 'https://www.udemy.com/course/angular-signals/', duree: '7h', commentaire: '', classement: '1' },
    { categorie: 'Front', titre: '', lien: 'https://www.udemy.com/course/angular-security/', duree: '8h', commentaire: '', classement: '1' },
    { categorie: 'Front', titre: '', lien: 'https://www.udemy.com/course/angular-pwa-course/', duree: '4h', commentaire: '', classement: '1' },
    // Catégorie IA
    { categorie: 'IA', titre: '', lien: 'https://www.udemy.com/course/spring-ai-beginner-to-guru/', duree: '6h', commentaire: '', classement: '1' },
  ];

  ngOnInit(): void {
    // Remplir les titres vides en les extrayant des liens
    this.formations = this.formations.map(formation => {
      // Si le titre est vide, on tente de l'extraire du lien
      if (!formation.titre) {
        formation.titre = this.extraireTitreDepuisLien(formation.lien);
      }

      // Assurer que classement est toujours une chaîne de caractères
      formation.classement = String(formation.classement);

      return formation;
    });
  }

  /**
   * Extrait un titre formaté à partir d'un lien Udemy
   * @param lien URL de la formation Udemy
   * @returns Titre formaté
   */
  extraireTitreDepuisLien(lien: string): string {
    try {
      // Extrait la partie significative de l'URL (après 'course/')
      const match = lien.match(/course\/([^\/]+)/);
      if (match && match[1]) {
        const slug = match[1];

        // Remplace les tirets par des espaces et met en forme
        let titre = slug.replace(/-/g, ' ')
          // Remplace les éventuels underscores
          .replace(/_/g, ' ')
          // Capitalise chaque mot
          .split(' ')
          .map(mot => mot.charAt(0).toUpperCase() + mot.slice(1))
          .join(' ');

        // Nettoie les mots courts spécifiques
        titre = titre.replace(/With /g, 'with ')
          .replace(/And /g, 'and ')
          .replace(/By /g, 'by ')
          .replace(/To /g, 'to ')
          .replace(/On /g, 'on ')
          .replace(/For /g, 'for ');

        return titre;
      }
    } catch (e) {
      console.error('Erreur lors de l\'extraction du titre:', e);
    }

    return "Cours Udemy";  // Titre par défaut
  }
}
