import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '../models/store.model';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  constructor(private http: HttpClient) { }

  base_url = 'http://127.0.0.1:8082/koujinti/api/v1/';

  createHeaders(headers: HttpHeaders) {
    // headers.append('Authorization', 'Bearer '+localStorage.getItem('token')); // token headers
    headers.append('Content-Type' , 'application/json');
    headers.append('Access-Control-Allow-Origin' , '*'); // Access-Control-Allow-Origin: https://www.mydomain.com
  }


  // get
  getAll(): Promise<Store[]> {
    const headers = new HttpHeaders();
    this.createHeaders(headers);
    return this.http.get<Store[]>(`${this.base_url}stores`, {headers}).toPromise();
  }

  // post
  create(store: Store): Promise<Store> {
    const headers = new HttpHeaders();
    this.createHeaders(headers);
    return this.http.post<Store>(`${this.base_url}stores`, store, {headers}).toPromise();
  }

  // put (update)
  update(store: Store): Promise<any> | null {
    const headers = new HttpHeaders();
    this.createHeaders(headers);
    return this.http.put<Store>(`${this.base_url}stores/${store.id}`, store, {headers}).toPromise();
  }

  // delete
  delete(store_id: number): Promise<any> | null {
    const headers = new HttpHeaders();
    this.createHeaders(headers);
    return this.http.delete<Store>(`${this.base_url}stores/${store_id}`, {headers}).toPromise();
  }

  // get by id
  getById(store_id: number): Promise<Store> | null {
    const headers = new HttpHeaders();
    this.createHeaders(headers);
    return this.http.get<Store>(`${this.base_url}stores/${store_id}`, {headers}).toPromise();
  }
}
