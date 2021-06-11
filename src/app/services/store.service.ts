import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '../models/store.model';
import {Observable} from "rxjs";

//import {PlatPersoModel} from "../models/PlatPerso.model";

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  constructor(private http: HttpClient) { }

  base_url = 'http://localhost:8085/SpringMVC/servlet/api/v1/';
  createHeaders(headers: HttpHeaders) {
    // headers.append('Authorization', 'Bearer '+localStorage.getItem('token')); // token headers
    headers.append('Content-Type' , 'application/json');
    headers.append('Access-Control-Allow-Origin' , '*'); // Access-Control-Allow-Origin: https://www.mydomain.com
    headers.append('Access-Control-Allow-Methods' , 'GET, POST, PUT')  
    
  }


  // get
  //works
  getAll():Promise<Store[]>{
    const headers = new HttpHeaders();
    this.createHeaders(headers);
    return this.http.get<Store[]>(`${this.base_url}Resto`, {headers}).toPromise();
  }
  



  // post
  create(store: Store): any {
    return this.http.post<any>(`${this.base_url}Resto`,JSON.stringify(store));
  }


  update(store: Store): Observable<Store> {
    return this.http.put<Store>(`${this.base_url}/${store.idResto}`, store);
  }



  // delete
  //works
  delete(store_id: number): any{
    return this.http.delete('http://localhost:8085/SpringMVC/servlet/api/v1/Resto/'+store_id);
  }


  // get by id
  getById(store_id: number): Promise<Store> | null {
    const headers = new HttpHeaders();
    return this.http.get<Store>(`${this.base_url}stores/${store_id}`, {headers}).toPromise();
  }
  getstoreById(store_id: number): Observable<Store> {
    return this.http.get<Store>(`${this.base_url}/${store_id}`);
  }

  /*getPlatByResto(Restoid: number): Observable<PlatPersoModel[]>{
    return this.http.get<PlatPersoModel[]>(`${this.base_url}/platByReso/${Restoid}`);
  }*/
}
