import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

export interface Formation {
  nom: string;
  categorie: string;
  duree: string;
  fichierPdf: string;
}

@Component({
  selector: 'app-training',
  imports: [MatTableModule, MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './training.component.html',
  styleUrl: './training.component.css'
})
export class TrainingComponent {
  //displayedColumns: string[] = ['nom', 'categorie', 'duree', 'fichierPdf', 'actions'];
  displayedColumns: string[] = ['nom', 'categorie', 'duree', 'fichierPdf'];

  formations: Formation[] = [
    {
      nom: ' Apache Kafka, centraliser les flux de données en temps réel',
      categorie: 'Backend',
      duree: '3 jours',
      fichierPdf: 'assets/pdf/presentiel/2023-formationKafka.pdf'
    },
    {
      nom: 'DESIGN PATTERNS JAVA EE ',
      categorie: 'Conception',
      duree: '3 jours',
      fichierPdf: 'assets/pdf/presentiel/Form-DesignPatterns.pdf'
    },
    {
      nom: 'Certification java',
      categorie: 'Backend',
      duree: '',
      fichierPdf: 'assets/pdf/certifications/Certif-SunJava.pdf'
    },
    {
      nom: 'Certification Web components',
      categorie: 'Frontend',
      duree: '',
      fichierPdf: 'assets/pdf/certifications/Certif-SunWebComponent.pdf'
    },
    {
      nom: 'SOA : fondements des architectures orientées services',
      categorie: 'Conception',
      duree: '5 jours',
      fichierPdf: 'assets/pdf/presentiel/Form-soa.PDF'
    },
    {
      nom: 'Analyse et conception avec le langage de modélisation UML',
      categorie: 'Conception',
      duree: '5 jours',
      fichierPdf: 'assets/pdf/presentiel/Form-umlPascalLaroque.PDF'
    },
    {
      nom: 'Développement sécurisé',
      categorie: 'Sécurité',
      duree: '3 jours',
      fichierPdf: 'assets/pdf/presentiel/Form-devSecurise.PDF'
    },
    {
      nom: 'Le management par les processus',
      categorie: 'Conception',
      duree: '3 jours',
      fichierPdf: 'assets/pdf/presentiel/Form-managementParProcessus.PDF'
    },
    {
      nom: 'Angular',
      categorie: 'Frontend',
      duree: '3 jours',
      fichierPdf: 'assets/pdf/presentiel/2023-certificat_pierres_christophe-angular.pdf'
    },
    {
      nom: 'Essentiels (IntelliJ, Docker)',
      categorie: 'Frontend',
      duree: '2 jours',
      fichierPdf: 'assets/pdf/presentiel/2023-certificat_pierres_christophe-essentiels.pdf'
    },
    {
      nom: 'Javascript et Typescript',
      categorie: 'Frontend',
      duree: '3 jours',
      fichierPdf: 'assets/pdf/presentiel/2023-certificat_pierres_christophe-js-ts.pdf'
    },
    {
      nom: 'Spring / REST / JPA : Les fondamentaux',
      categorie: 'Backend',
      duree: '3 jours',
      fichierPdf: 'assets/pdf/presentiel/2023-certificat_pierres_christophe-spring-jpa-rest.pdf'
    },
    {
      nom: 'Oracle Enterprise Server : Administration',
      categorie: 'Conception',
      duree: '4 jours',
      fichierPdf: 'assets/pdf/presentiel/Form-OracleDbAdmin.PDF'
    },
    {
      nom: 'Oracle Developer Reports Builder',
      categorie: 'Reporting',
      duree: '5 jours',
      fichierPdf: 'assets/pdf/presentiel/Form-OracleReports.PDF'
    },
    {
      nom: 'Oracle langage PL/SQL',
      categorie: 'Backend',
      duree: '5 jours',
      fichierPdf: 'assets/pdf/presentiel/Form-plsql.PDF'
    },
    {
      nom: 'Weblogic Server',
      categorie: 'Infrastructure Server',
      duree: '5 jours',
      fichierPdf: 'assets/pdf/presentiel/Form-weblogic.PDF'
    },
    {
      nom: 'Certification réseau linux Cisco : CCNA1',
      categorie: 'Certification',
      duree: '1 mois',
      fichierPdf: 'assets/pdf/certifications/Certif-CCNA1.pdf'
    },
    {
      nom: 'Anglais - certification Bulat 2 (Common european scale of reference)',
      categorie: 'Langue',
      duree: '1 mois et 15 jours',
      fichierPdf: 'assets/pdf/certifications/2007-03AnglaisBulatB2.pdf'
    },
    {
      nom: 'Anglais - TOEIC : 760',
      categorie: 'Langue',
      duree: '',
      fichierPdf: 'assets/pdf/certifications/TOEIC2007.pdf'
    },
    {
      nom: 'Oracle ADF (framework JEE java fullstack - Frontend : JSF)',
      categorie: 'Certification',
      duree: '',
      fichierPdf: 'assets/pdf/certifications/Certif-OracleADF.pdf'
    },
    {
      nom: 'Diplôme Universitaire de Technologie option Marketing',
      categorie: 'Diplôme',
      duree: '2 ans',
      fichierPdf: 'assets/pdf/certifications/DUT.pdf'
    },
  ];

  ajouterFormation(): void {
    // Méthode pour ajouter une nouvelle formation
    const nouvelleFormation: Formation = {
      nom: 'Nouvelle Formation',
      categorie: 'À définir',
      duree: '1 jour',
      fichierPdf: 'assets/formations/nouveau.pdf'
    };
    this.formations.push(nouvelleFormation);
  }

  ouvrirPdf(fichierPdf: string): void {
    window.open(fichierPdf, '_blank');
  }
}
