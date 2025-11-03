import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from "@angular/router";
import { MatCard, MatCardContent } from "@angular/material/card";
import { MatTab, MatTabGroup } from "@angular/material/tabs";
import { MatIcon } from "@angular/material/icon";
import { MatButton } from "@angular/material/button";
import { ProjetsOcrComponent } from '../projets-ocr/projets-ocr.component';
import { UdemyComponent } from '../udemy/udemy.component';
import { TrainingComponent } from '../training/training.component';
import { CvComponent } from '../cv/cv.component';

@Component({
  selector: 'app-me',
  imports: [
    CommonModule,
    MatCard,
    MatCardContent,
    MatTab,
    MatTabGroup,
    MatIcon,
    RouterLink,
    CvComponent,
    ProjetsOcrComponent,
    UdemyComponent,
    TrainingComponent
  ],
  templateUrl: './me.component.html',
  styleUrls: ['./me.component.css']
})
export class MeComponent implements OnInit {

  // Données pour les métriques
  metrics = [
    { icon: 'timeline', value: '50+', label: 'Formations Techniques' },
    { icon: 'architecture', value: '100%', label: 'Architecture Réactive' },
    { icon: 'speed', value: '6', label: 'Projets Déployés' },
    { icon: 'star', value: '1er', label: 'Innovation WebFlux' }
  ];

  // Compétences techniques organisées par catégorie
  skills = {
    frontend: [
      { name: 'Angular 19 + Signals', level: '' },
      { name: 'TypeScript', level: 'expert' },
      { name: 'RxJS Reactive', level: 'advanced' },
      { name: 'Angular Material', level: 'expert' }
    ],
    backend: [
      { name: 'Spring WebFlux', level: 'expert' },
      { name: 'Spring Boot 3', level: 'expert' },
      { name: 'R2DBC Reactive', level: 'advanced' },
      { name: 'PostgreSQL', level: 'expert' }
    ],
    devops: [
      { name: 'Docker', level: 'expert' },
      { name: 'GitHub Actions', level: 'advanced' },
      { name: 'SonarQube', level: 'advanced' },
      { name: 'Kubernetes', level: 'intermediate' }
    ]
  };

  // Timeline du parcours professionnel
  timeline = [
    {
      date: '2024 - 2025',
      title: 'Certification Développeur Full-Stack',
      description: 'OpenClassrooms - Niveau 7 (BAC+5)',
      highlights: ['13 projets validés', 'Architecture réactive', 'Innovation pédagogique'],
      icon: 'school',
      current: true
    },
    {
      date: '2020 - 2024',
      title: 'Directeur Pôle Business Intelligence',
      description: 'Management d\'équipe de 15 personnes',
      highlights: ['Leadership technique', 'Méthodologies Agile'],
      icon: 'work',
      current: false
    },
    {
      date: '2015 - 2020',
      title: 'Team Lead & Ingénieur Commercial',
      description: 'Expertise technique et développement commercial',
      highlights: ['Gestion d\'équipes', 'Relation clients'],
      icon: 'trending_up',
      current: false
    }
  ];

  // Liens de contact
  contactLinks = [
    {
      type: 'github',
      title: 'GitHub',
      description: 'Repositories & Projets',
      url: 'https://github.com/cpierres',
      icon: 'code'
    },
    {
      type: 'linkedin',
      title: 'LinkedIn',
      description: 'Profil Professionnel',
      url: 'https://www.linkedin.com/in/christophe-pierres',
      icon: 'business_center'
    },
    {
      type: 'email',
      title: 'Email',
      description: 'Contact Professionnel',
      url: 'mailto:christophe@pierres.ovh',
      icon: 'email'
    },
    {
      type: 'location',
      title: 'Localisation',
      description: 'France • Remote',
      url: null,
      icon: 'location_on'
    }
  ];

  ngOnInit(): void {
    // Animation d'apparition des éléments au chargement
    this.animateOnLoad();
  }

  private animateOnLoad(): void {
    // Logique d'animation si nécessaire
    console.log('Page À Propos chargée avec animations');
  }

  /**
   * Retourne la classe CSS appropriée pour le niveau de compétence
   */
  getSkillLevelClass(level: string): string {
    return `level-bar ${level}`;
  }

  /**
   * Retourne le texte d'affichage pour le niveau de compétence
   */
  getSkillLevelText(level: string): string {
    const levels: { [key: string]: string } = {
      'expert': 'Expert',
      'advanced': 'Avancé',
      'intermediate': 'Intermédiaire',
      'beginner': 'Débutant'
    };
    return levels[level] || 'N/A';
  }

  /**
   * Gestion des clics sur les liens de contact
   */
  onContactClick(link: any): void {
    if (link.url) {
      window.open(link.url, '_blank');
    }
  }

  /**
   * Scroll vers une section spécifique
   */
  scrollToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
