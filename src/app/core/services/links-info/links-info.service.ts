import {Injectable} from '@angular/core';
import {LinkInfo} from '../../models/LinkInfo';

@Injectable({
  providedIn: 'root'
})
export class LinksInfoService {

  getSitesDockerKubernetes(): LinkInfo[] {
    return this.sitesDockerKubernetes;
  }

  sitesDockerKubernetes: LinkInfo[] = [
    {
      name: 'Kubernetes.io: Documentation Officielle',
      link: 'https://kubernetes.io/'
    },
    {
      name: 'Kubernetes.io: Tutoriels',
      link: 'https://kubernetes.io/docs/tutorials/'
    },
    {
      name: 'learnk8s.io',
      link: 'https://learnk8s.io/'
    },
    {
      name: 'udemy : Docker for Java Developers',
      link: 'https://www.udemy.com/course/docker-for-java-developers/'
    },
    {
      name: 'udemy : spring-core-devops-on-aws',
      link: 'https://www.udemy.com/course/spring-core-devops-on-aws/'
    },
    {
      name: 'udemy : kube-by-example-building-spring-boot-docker-image  (gratuit)',
      link: 'https://www.udemy.com/course/kube-by-example-building-spring-boot-docker-images/'
    },
    {
      name: 'udemy : kube-by-example-spring-boot-on-kubernetes (gratuit)',
      link: 'https://www.udemy.com/course/kube-by-example-spring-boot-on-kubernetes/'
    },
    {
      name: 'udemy : kube-by-example-spring-boot-microservices-on-kubernetes  (gratuit)',
      link: 'https://www.udemy.com/course/kube-by-example-spring-boot-microservices-on-kubernetes/'
    },
  ];

  getSitesMicroServices(): LinkInfo[] {
    return this.sitesMicroServices;
  }

  sitesMicroServices: LinkInfo[] = [
    {
      name: 'microservices.io',
      link: 'https://microservices.io/'
    },
    {
      name: 'Martin Fowler: Microservices',
      link: 'https://martinfowler.com/articles/microservices.html'
    },
    {
      name: 'udemy : Spring Boot Microservices with Spring Cloud Beginner to Guru',
      link: 'https://www.udemy.com/course/spring-boot-microservices-with-spring-cloud-beginner-to-guru/'
    },
    {
      name: 'udemy : kube-by-example-spring-boot-microservices-on-kubernetes  (gratuit)',
      link: 'https://www.udemy.com/course/kube-by-example-spring-boot-microservices-on-kubernetes/'
    },
  ];

  getSitesEventDriven(): LinkInfo[] {
    return this.sitesEventDriven;
  }

  sitesEventDriven: LinkInfo[] = [
    {
      name: 'Martin Fowler: Event-Driven Architecture',
      link: 'https://martinfowler.com/articles/201701-event-driven.html'
    },
    {
      name: 'AWS: Event-Driven Architecture',
      link: 'https://aws.amazon.com/event-driven-architecture/'
    },
    {
      name: 'udemy : introduction to kafka with spring-boot',
      link: 'https://www.udemy.com/course/introduction-to-kafka-with-spring-boot/'
    },
  ];

  getSitesArchiMonolith(): LinkInfo[] {
    return this.sitesArchiMonolith;
  }

  sitesArchiMonolith: LinkInfo[] = [
    {
      name: 'Martin Fowler: Monolithic Architecture',
      link: 'https://martinfowler.com/bliki/MonolithFirst.html'
    },
    {
      name: 'Martin Fowler: stratégie de migration du Monolithe aux Microservices',
      link: 'https://martinfowler.com/articles/break-monolith-into-microservices.html',
      title: 'Lorsque cela devient nécessaire !'
    }
  ];

  getSitesBackTest(): LinkInfo[] {
    return this.sitesBackTest;
  }

  sitesBackTest: LinkInfo[] = [
    {
      name: 'udemy : Testing Spring Boot Beginner to Guru',
      link: 'https://www.udemy.com/course/testing-spring-boot-beginner-to-guru/'
    },
  ];

  getSitesFrontTest(): LinkInfo[] {
    return this.sitesFrontTest;
  }

  sitesFrontTest: LinkInfo[] = [
    {
      name: 'Reddit : Discussion intéressante',
      link: 'https://www.reddit.com/r/Angular2/comments/u7w0q0/is_unit_testing_in_angular_overrated/?tl=fr',
      title: 'Les tests unitaires dans Angular sont-ils surfaits ?',
    },
    {
      name: 'reddit: jasmine vs jest',
      link: 'https://www.reddit.com/r/Angular2/comments/oa800b/which_one_is_better_for_unit_test_jest_or_jasmine/'
    },
    {
      name: 'reddit: avis jasmine, karma vs jest',
      link: 'https://www.reddit.com/r/Angular2/comments/eix8lw/opinions_on_jasmine_karma_vs_jest_others/?tl=fr',
    },
    {
      name: 'Reddit : Comparatif JEST / Jasmine',
      link: 'https://www.reddit.com/r/Angular2/comments/oa800b/which_one_is_better_for_unit_test_jest_or_jasmine/',
      title: 'Which one is better for unit test? JEST or Jasmine ?',
    },
    {
      name: 'Reddit : Autre linkInfo JEST / Jasmine',
      link: 'https://www.reddit.com/r/Angular2/comments/yc7as1/jest_vs_karmajasmine_which_testing_library_you/',
      title: 'Which one is better for unit test? JEST or Jasmine ?',
    },
    {
      name: 'lemagit : linkInfo Cypress / Playwright',
      link: 'https://www.lemagit.fr/conseil/Cypress-et-Playwright-Quand-utiliser-lun-ou-lautre',
      title: 'Quand utiliser l\'un ou l\'autre',
    },
    {
      name: 'udemy : Angular Testing Course (Angular 19)',
      link: 'https://www.udemy.com/course/angular-testing-course/'
    },
    {
      name: 'udemy : Angular with Test-Driven Development (comparatif Jasmine/Jest)',
      link: 'https://www.udemy.com/course/angular-with-test-driven-development/'
    },
  ];

  getSitesPrgReactiveFront(): LinkInfo[] {
    return this.sitesPrgReactiveFront;
  }

  sitesPrgReactiveFront: LinkInfo[] = [
    {
      name: 'RxJS Marbles : Interactive diagrams of Rx Observables',
      link: 'https://rxmarbles.com/'
    },
    {
      name: 'RxJS : Operator Decision Tree',
      link: 'https://rxjs.dev/operator-decision-tree'
    },
    {
      name: 'Learn RxJS',
      link: 'https://www.learnrxjs.io/'
    },
    {
      name: 'RxJS : API Reference',
      link: 'https://rxjs.dev/api'
    },
    {
      name: 'udemy : Reactive Angular Course (with RxJs, Angular 19)',
      link: 'https://www.udemy.com/course/rxjs-reactive-angular-course/'
    },
    {
      name: 'udemy : RXjs7',
      link: 'https://www.udemy.com/course/rxjs-and-observables/'
    },
    {
      name: 'udemy : Angular 6, Angular Material et RxJS 6 par la pratique',
      link: 'https://www.udemy.com/course/angular-6-angular-material-et-rxjs-6-par-la-pratique/'
    },
  ];

  getSitesPrgFonctionnelleEtReactiveBack(): LinkInfo[] {
    return this.sitesPrgFonctionnelleEtReactiveBack;
  }

  sitesPrgFonctionnelleEtReactiveBack: LinkInfo[] = [
    {
      name: 'Mon doudou(x) préféré : chapitre 22 - Streams',
      link: 'https://www.jmdoudoux.fr/java/dej/indexavecframes.htm'
    },
    {
      name: 'Mon doudou(x) préféré : chapitre 12 - Expressions lambda - Interfaces fonctionnelles - Références de méthodes',
      link: 'https://www.jmdoudoux.fr/java/dej/indexavecframes.htm'
    },
    {
      name: 'udemy : Java 21, Java 17, Java 11, Java 8 (advanced) and Spring Boot 3 - préparation certification OCP',
      link: 'https://www.udemy.com/course/ocp11_from_oca8/'
    },
    {
      name: 'Spring Web stack pour la programmation réactive (Spring WebFlux, WebClient)',
      link: 'https://docs.spring.io/spring-framework/reference/web-reactive.html'
    },
    {
      name: 'Projet Reactor',
      link: 'https://projectreactor.io/'
    },
    {
      name: 'Blog VinsGuru : spécialisé dans les tutoriels sur Project Reactor, Spring WebFlux, et API réactives',
      link: 'https://www.vinsguru.com/category/spring/spring-webflux/'
    },
    {
      name: 'StackOverflow (questions) : tag java',
      link: 'https://stackoverflow.com/questions/tagged/java'
    },
    {
      name: 'Medium : tag java',
      link: 'https://medium.com/javarevisited/tagged/java'
    },
    {
      name: 'Librairie ReactiveX',
      link: 'https://reactivex.io/intro.html'
    },
    {
      name: 'Github : ReactiveX/RxJava',
      link: 'https://github.com/ReactiveX/RxJava'
    },
    {
      name: 'Baeldung : Programmation Java Fonctionnelle ... combinée à POO',
      link: 'https://www.baeldung.com/java-functional-programming'
    },
  ];

}
