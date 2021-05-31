import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Article} from '../models/article.model';
import {Category} from '../models/category.model';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {



  constructor(private http: HttpClient) { }

  base_url = 'http://localhost:8085/SpringMVC/servlet/api/v1/';

  createHeaders(headers: HttpHeaders) {
    // headers.append('Authorization', 'Bearer '+localStorage.getItem('token')); // token headers
    headers.append('Content-Type' , 'application/json');
    headers.append('Access-Control-Allow-Origin' , '*'); // Access-Control-Allow-Origin: https://www.mydomain.com
  }
  // get
  getAll(): Promise<Article[]> {
    const headers = new HttpHeaders();
    this.createHeaders(headers);
    return this.http.get<Article[]>(`${this.base_url}platPrin`, {headers}).toPromise();
  }

  // post http://localhost:8085/SpringMVC/servlet/api/v1/platPrin/
  create(article: Article): Promise<Article> {
    const headers = new HttpHeaders();
    this.createHeaders(headers);
    return this.http.post<Article>(`${this.base_url}platPrin`, article, {headers}).toPromise();

    /*createActivity(body: any, userId: number){
      return this.apiService.post('/activities/add/'+userId,body);
    }*/
  }

  // put (update) ${articleId}
  update(article: Article, idPlat: number,  idCateg: number): Promise<any> | null {
    const headers = new HttpHeaders();
    this.createHeaders(headers);
    return this.http.put<Article>(`${this.base_url}articles/${idCateg}`, article, {headers}).toPromise();
  }

  // delete  http://localhost:8085/SpringMVC/servlet/api/v1/platPrin/{id}
  delete(id: number): Promise<any> | null {
    const headers = new HttpHeaders();
    this.createHeaders(headers);
    return this.http.delete<Article>(`${this.base_url}platPrin/${id}`, {headers}).toPromise();
  }
  // get by id
  getArticleById(id: number): Promise<Article> {
    const headers = new HttpHeaders();
    this.createHeaders(headers);
    return this.http.get<Article>(`${this.base_url}articles/${id}`, {headers}).toPromise();
  }
}
