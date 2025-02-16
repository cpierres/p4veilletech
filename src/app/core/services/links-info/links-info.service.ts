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
}
