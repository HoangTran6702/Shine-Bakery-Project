// news.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  private apiUrl = 'http://localhost:3000/postnews'; // Thay đổi đường dẫn thực tế đến file JSON của bạn

  constructor(private http: HttpClient) { }

  getNewsByTypeId(typeId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}?typeid=${typeId}`);
  }

  getNewsById(newsId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${newsId}`);
  }
}
