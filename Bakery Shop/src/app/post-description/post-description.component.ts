// Import thư viện và module cần thiết
import { Component, OnInit } from '@angular/core';
import { PostNewsService } from '../services/post-news.service';
import { postnews } from '../data-type';
import { AngularEditorConfig } from '@kolkov/angular-editor';

@Component({
  selector: 'app-post-description',
  templateUrl: './post-description.component.html',
  styleUrls: ['./post-description.component.css']
})
export class PostDescriptionComponent implements OnInit {
  postnewsData: postnews = { id: '' , type: '', typeid: '', title: '', image: '', date: '', description: '', detail: '' };

  // Inject service trong constructor
  constructor(private postNewsService: PostNewsService) { }

  ngOnInit(): void {
    // Logic khởi tạo nếu cần
  }

  // Hàm submit với dữ liệu postnews
  submit(data: postnews) {
    // Sử dụng postNewsService để gửi dữ liệu và xử lý kết quả
    this.postNewsService.postNews(data).subscribe((result) => {
      if (result) {
        // Reset dữ liệu sau khi submit thành công
        this.postnewsData = { id: '', type: '', typeid: '', title: '', image: '', date: '', description: '', detail: '' };
        alert('Successful update')
      }
    });
  }

  // Cấu hình cho AngularEditor
  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '15rem',
    minHeight: '5rem',
    placeholder: 'Enter text here...',
    translate: 'no',
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Arial',
  };
}
