import { Component, OnInit } from '@angular/core';
import { PostNewsService } from '../services/post-news.service';
import { ActivatedRoute } from '@angular/router';
import { postnews } from '../data-type';
import { AngularEditorConfig } from '@kolkov/angular-editor';

@Component({
  selector: 'app-updatenews',
  templateUrl: './updatenews.component.html',
  styleUrls: ['./updatenews.component.css']
})
export class UpdatenewsComponent implements OnInit {
  postnewsData: postnews | undefined;

  constructor(private PostNewsService: PostNewsService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    let postId = this.route.snapshot.paramMap.get('id');
    console.warn(postId);
    if (postId) {
      this.PostNewsService.getNews(postId).subscribe((data) => {
        console.warn(data);
        this.postnewsData = data;
      });
    }
  }

  submit(data: postnews) {
    console.warn(data);
    if (this.postnewsData) {
      data.id = this.postnewsData.id;
    }
    this.PostNewsService.updateNews(data).subscribe((result) => {
      if (result) {
        alert("Successfully updated post")
      }
    })
  }

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
