import { Component } from '@angular/core';
import {MatCard} from '@angular/material/card';
import {MatDivider} from '@angular/material/divider';
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
  selector: 'app-back-webmvc-webflux',
  templateUrl: './back-webmvc-webflux.component.html',
  imports: [
    MatCard,
    MatDivider,
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderCellDef,
    MatCell,
    MatCellDef,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow,
    MatRowDef
  ],
  styleUrl: './back-webmvc-webflux.component.css'
})
export class BackWebmvcWebfluxComponent {

  displayedColumns: string[] = ['automatisme', 'springWebMvc', 'springWebFlux'];

  automatismes: Array<{ automatisme: string, springWebMvc: string, springWebFlux: string }> = [
    {
      automatisme: "Annotations de mapping HTTP",
      springWebMvc: "Support complet des annotations @RequestMapping, @GetMapping, @PostMapping, etc.",
      springWebFlux: "Même annotations, mais avec des retours réactifs comme Mono et Flux."
    },
    {
      automatisme: "Gestion des paramètres de requêtes",
      springWebMvc: "Support de @PathVariable, @RequestParam et @RequestBody pour récupérer les paramètres.",
      springWebFlux: "Idem, mais @RequestBody peut accepter des Mono ou Flux pour les données entrantes."
    },
    {
      automatisme: "Gestion des réponses JSON/XML",
      springWebMvc: "Conversion automatique des objets Java en JSON ou XML via Jackson ou JAXB.",
      springWebFlux: "Conversion réactive similaire avec support de Mono et Flux."
    },
    {
      automatisme: "Validation des entrées",
      springWebMvc: "Support de @Valid et @Validated pour valider les objets des requêtes.",
      springWebFlux: "Même support, mais adapté pour les corps de requêtes réactifs (Mono/Flux)."
    },
    {
      automatisme: "Configuration des contrôleurs",
      springWebMvc: "Création de contrôleurs REST avec @RestController et @Controller.",
      springWebFlux: "Même utilisation, aucun changement dans les annotations."
    },
    {
      automatisme: "Gestion globale des exceptions",
      springWebMvc: "Gestion avec @ControllerAdvice et @ExceptionHandler pour capter et gérer les erreurs.",
      springWebFlux: "Identique, mais peut inclure des flux réactifs (Mono/Flux) dans les exceptions gérées."
    },
    {
      automatisme: "Support de Spring Security",
      springWebMvc: "Authentification synchronisée basée sur Servlet Filters.",
      springWebFlux: "Utilise des WebFilters réactifs pour un modèle d'authentification non bloquant."
    },
    {
      automatisme: "Injection des Beans (DI)",
      springWebMvc: "Injection et gestion des Beans Spring avec @Component, @Service, etc.",
      springWebFlux: "Identique, aucun changement dans la gestion des Beans."
    },
    {
      automatisme: "Gestion des requêtes (Repositories/Automatisation)",
      springWebMvc: "Supporte JpaRepository pour les requêtes CRUD automatiques avec possibilité de JPQL.",
      springWebFlux: "Utilise ReactiveCrudRepository pour des requêtes non bloquantes adaptées à un modèle réactif."
    }
  ];
}
