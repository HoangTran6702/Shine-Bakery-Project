// src/app/detail-news/detail-news.component.ts

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NewsService } from '../services/news.service';

@Component({
  selector: 'app-detail-news',
  templateUrl: './detail-news.component.html',
  styleUrls: ['./detail-news.component.css'],
})
export class DetailNewsComponent implements OnInit {
  newsId: string | null = '';
  newsData: any = {};

  constructor(
    private route: ActivatedRoute,
    private newsService: NewsService
  ) {}

  ngOnInit() {
    this.newsId = this.route.snapshot.paramMap.get('id');

    if (this.newsId) {
      this.newsService.getNewsById(this.newsId).subscribe((data) => {
        this.newsData = data;
      });
    }
  }
  getFormattedType(): string {
    return this.newsData.type.toUpperCase();
  }
}
