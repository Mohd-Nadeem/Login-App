import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Article } from './article';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  private _url:string = '/assets/data/articles.json'
  constructor(private http: HttpClient) { }

  getArticles() {
    return this.http.get<Article[]>(this._url) 
  }
}
