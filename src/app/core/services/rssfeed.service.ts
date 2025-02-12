import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, BehaviorSubject } from 'rxjs';
import { RssData } from '../models/RssData';
import { XMLParser } from 'fast-xml-parser';

@Injectable({
  providedIn: 'root',
})
export class RssfeedService {
  private parser: XMLParser;
  private cache = new Map<string, BehaviorSubject<RssData[]>>(); // Cache pour le flux RSS

  constructor(private http: HttpClient) {
    // Initialisation de fast-xml-parser avec une configuration appropriée
    this.parser = new XMLParser({
      ignoreAttributes: false, // Garder les attributs XML si nécessaire
      attributeNamePrefix: '', // Supprime le préfixe pour les attributs
      parseTagValue: true, // Activer la conversion automatique des valeurs (numériques, booléennes)
    });
  }

  /**
   * Méthode pour lire et parser un flux RSS avec gestion du cache
   * @param url URL du flux RSS
   * @returns Observable d'un tableau de RssData (via cache ou HTTP)
   */
  getRssFeed(url: string): Observable<RssData[]> {
    if(url != null && url.includes("blog.angular.dev/feed")) {
      //url = "blog.angular.dev/feed";//traiter via proxy.conf.json pour éviter CORS
      url = '/blogangulardevfeed';
    }

    // Vérifier si l'URL existe déjà dans le cache
    if (this.cache.has(url)) {
      // Si présent dans le cache, renvoyer l'Observable du BehaviorSubject
      return this.cache.get(url)!.asObservable();
    }

    // Sinon, créer un nouveau BehaviorSubject
    const feedSubject = new BehaviorSubject<RssData[]>([]);

    // Ajouter au cache
    this.cache.set(url, feedSubject);

    // Effectuer la requête HTTP pour charger le flux RSS
    //this.http.get(proxyUrl, { responseType: 'text' }).pipe(
    this.http.get(url, { responseType: 'text' }).pipe(
      map((response: string) => {
        // Convertir le XML en JSON
        const parsedResult = this.parser.parse(response);

        // Extraire les éléments RSS du flux
        const items = parsedResult.rss.channel.item;

        // Mappage vers le modèle RssData
        const rssData: RssData[] = items.map((item: any) => ({
          title: item.title,
          link: item.link,
          //description: item.description,
        }));

        return rssData;
      })
    ).subscribe({
      next: (data: RssData[]) => {
        // Mettre à jour le BehaviorSubject avec les nouvelles données
        feedSubject.next(data);
      },
      error: (err) => {
        console.error('Erreur lors de la récupération du flux RSS :', err);
        this.cache.delete(url); // Supprimer l'entrée du cache en cas d'erreur
      }
    });

    // Retourner l'Observable associé au BehaviorSubject
    return feedSubject.asObservable();
  }
}
