import { Component } from '@angular/core';
import { ModuleRole } from '../../../core/models/ModuleRole';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
  MatTable
} from '@angular/material/table';
import {MatCard} from '@angular/material/card';
import {MatDivider} from '@angular/material/divider';

@Component({
  selector: 'app-back-microservices',
  imports: [
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderCellDef,
    MatCell,
    MatCellDef,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow,
    MatRowDef,
    MatCard,
    MatDivider
  ],
  templateUrl: './back-microservices.component.html',
  styleUrl: './back-microservices.component.css'
})
export class BackMicroservicesComponent {
  displayedColumns: string[] = ['module', 'role'];

  // Liste des modules avec URL de documentation et description
  modules: ModuleRole[] = [
    {
      name: 'Spring Boot Starter Web',
      role: 'Permet de créer des APIs REST en exposant des endpoints HTTP.',
      link: 'https://docs.spring.io/spring-boot/docs/current/reference/htmlsingle/#web',
    },
    {
      name: 'Spring Boot Starter Actuator',
      role: 'Fournit des endpoints de monitoring (santé, métriques, etc.) pour gérer chaque microservice.',
      link: 'https://docs.spring.io/spring-boot/docs/current/reference/htmlsingle/#actuator',
    },
    {
      name: 'Spring Cloud Netflix Eureka',
      role: 'Met en place un service de découverte pour que les microservices puissent s\'enregistrer et se découvrir dynamiquement.',
      link: 'https://cloud.spring.io/spring-cloud-netflix/reference/html/#spring-cloud-eureka-server',
    },
    {
      name: 'Spring Cloud Gateway',
      role: 'Agit comme un point d\'entrée unique (API Gateway) pour router les requêtes vers les différents microservices.',
      link: 'https://docs.spring.io/spring-cloud-gateway/docs/current/reference/html/',
    },
    {
      name: 'Spring Cloud Config',
      role: 'Permet une gestion centralisée de la configuration pour tous les microservices.',
      link: 'https://cloud.spring.io/spring-cloud-config/reference/html/',
    },
    {
      name: 'Spring Security',
      role: 'Implémente des mécanismes de sécurité comme l\'authentification et l\'autorisation pour chaque microservice.',
      link: 'https://docs.spring.io/spring-security/reference/',
    },
    {
      name: 'Spring Cloud Sleuth',
      role: 'Fournit des outils pour le traçage distribué afin de suivre les requêtes à travers différents microservices.',
      link: 'https://spring.io/projects/spring-cloud-sleuth',
    },
    {
      name: 'Spring Boot DevTools',
      role: 'Facilite le développement avec un redémarrage automatique et un flux de travail simplifié.',
      link: 'https://docs.spring.io/spring-boot/docs/current/reference/htmlsingle/#using.devtools',
    },
    {
      name: 'Spring Data',
      role: 'Fournit des abstractions pour accéder aux bases de données dans chaque microservice.',
      link: 'https://spring.io/projects/spring-data',
    },
    {
      name: 'Spring Cloud OpenFeign',
      role: 'Permet de configurer des clients HTTP pour la communication entre microservices de manière déclarative.',
      link: 'https://spring.io/projects/spring-cloud-openfeign',
    },
  ];

}
