import {Component, Input, OnInit} from '@angular/core';
import {RssfeedService} from '../../core/services/rssfeed.service';
import {RssData} from '../../core/models/RssData';
import {Observable} from 'rxjs';
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-rssfeed',
  templateUrl: './rssfeed.component.html',
  styleUrls: ['./rssfeed.component.css'],
  imports: [
    AsyncPipe,
    NgIf,
    NgForOf
  ],
  standalone: true,
})
export class RssfeedComponent implements OnInit {
  @Input() rssUrl!: string;
  feedItems$!: Observable<RssData[]>;

  constructor(private rssfeedService: RssfeedService) {
  }

  ngOnInit(): void {
    if (this.rssUrl) {
      this.feedItems$ = this.rssfeedService.getRssFeed(this.rssUrl); // Exposer l'Observable
    }
  }
}
