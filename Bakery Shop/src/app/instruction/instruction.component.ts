import { Component, OnInit } from '@angular/core';
import { NewsService } from '../services/news.service';
@Component({
  selector: 'app-instruction',
  templateUrl: './instruction.component.html',
  styleUrls: ['./instruction.component.css']
})
export class InstructionComponent implements OnInit{
  newsData: any[] = []; // Khởi tạo giá trị mảng rỗng

  constructor(private newsService: NewsService) { }

  ngOnInit(): void {
    this.newsService.getNewsByTypeId(2).subscribe(data => {
      this.newsData = data;
    });
  }
}
