import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NewsService } from '../services/news.service';
@Component({
  selector: 'app-promotion',
  templateUrl: './promotion.component.html',
  styleUrls: ['./promotion.component.css']
})
export class PromotionComponent implements OnInit {
  newsData: any[] = []; // Khởi tạo giá trị mảng rỗng

  constructor(private newsService: NewsService) { }

  ngOnInit(): void {
    this.newsService.getNewsByTypeId(3).subscribe(data => {
      this.newsData = data;
    });
  }
}

