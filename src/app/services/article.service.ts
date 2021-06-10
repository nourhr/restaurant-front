import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Article} from '../models/article.model';
import {Category} from '../models/category.model';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {



  constructor(private http: HttpClient) { }

  base_url = 'http://127.0.0.1:8082/koujinti/api/v1/';

  createHeaders(headers: HttpHeaders) {
    // headers.append('Authorization', 'Bearer '+localStorage.getItem('token')); // token headers
    headers.append('Content-Type' , 'application/json');
    headers.append('Access-Control-Allow-Origin' , '*'); // Access-Control-Allow-Origin: https://www.mydomain.com
  }
  // get
  getAll(): Promise<Article[]> {
    const headers = new HttpHeaders();
    this.createHeaders(headers);
    return this.http.get<Article[]>(`${this.base_url}articles`, {headers}).toPromise();
  }

  // post
  create(article: Article, idCateg: number): Promise<Article> {
    const headers = new HttpHeaders();
    this.createHeaders(headers);
    return this.http.post<Article>(`${this.base_url}articles/${idCateg}`, article, {headers}).toPromise();
  }

  // put (update)
  update(article: Article, articleId: number,  idCateg: number): Promise<any> | null {
    const headers = new HttpHeaders();
    this.createHeaders(headers);
    return this.http.put<Article>(`${this.base_url}articles/${articleId}/${idCateg}`, article, {headers}).toPromise();
  }

  // delete
  delete(article_id: number): Promise<any> | null {

    return this.http.delete<Article>(`${this.base_url}articles/${article_id}`).toPromise();
  }
  // get by id
  getArticleById(id: number): Promise<Article> {
    const headers = new HttpHeaders();
    this.createHeaders(headers);
    return this.http.get<Article>(`${this.base_url}articles/${id}`, {headers}).toPromise();
  }
}
