import { Component, OnInit } from '@angular/core';
import { NewsService } from '../services/news.service';
@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit{
  newsData: any[] = []; // Khởi tạo giá trị mảng rỗng

  constructor(private newsService: NewsService) { }

  ngOnInit(): void {
    this.newsService.getNewsByTypeId(1).subscribe(data => {
      this.newsData = data;
    });
  }
}
