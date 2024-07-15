import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'; // Import Observable
import { postnews } from '../data-type';

@Injectable({
  providedIn: 'root'
})
export class PostNewsService {
  private apiUrl = 'http://localhost:3000'; // Define apiUrl here

  constructor(private http: HttpClient) { }

  postNews(data: postnews) {
    return this.http.post('http://localhost:3000/postnews', data);
  }

  postList() {
    return this.http.get<postnews[]>('http://localhost:3000/postnews');
  }

  deletePost(id: number) {
    return this.http.delete(`http://localhost:3000/postnews/${id}`);
  }
  getNews(id: string) {
    return this.http.get<postnews>(`http://localhost:3000/postnews/${id}`);
  }
  updateNews(postnews: postnews) {
    return this.http.put<postnews>(`http://localhost:3000/postnews/${postnews.id}`, postnews);
  }

  categorypost(typeid: number): Observable<postnews[]> {
    return this.http.get<postnews[]>(`${this.apiUrl}/postnews/typeid/${typeid}`);
  }
}
