import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '../models/store.model';
import {Observable} from "rxjs";
import {PlatPersoModel} from "../models/PlatPerso.model";

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  constructor(private http: HttpClient) { }

  base_url = 'http://localhost:8080/SpringMVC/servlet/api/v1/Resto';


  // get
  //works
  getAll():Observable<any> {
    return this.http.get<any>('http://localhost:8080/SpringMVC/servlet/api/v1/Resto');
  }


  // post
  create(store: Store): any {
    return this.http.post<any>('http://localhost:8080/SpringMVC/servlet/api/v1/Resto/',JSON.stringify(store));
  }


  update(store: Store): Observable<Store> {
    return this.http.put<Store>(`${this.base_url}/${store.idResto}`, store);
  }



  // delete
  //works
  delete(store_id: number): any{
    return this.http.delete('http://localhost:8080/SpringMVC/servlet/api/v1/Resto/'+store_id);
  }


  // get by id
  getById(store_id: number): Promise<Store> | null {
    const headers = new HttpHeaders();
    return this.http.get<Store>(`${this.base_url}stores/${store_id}`, {headers}).toPromise();
  }
  getRestaurantById(store_id: number): Observable<Store> {
    return this.http.get<Store>(`${this.base_url}/${store_id}`);
  }

  getPlatByResto(Restoid: number): Observable<PlatPersoModel[]>{
    return this.http.get<PlatPersoModel[]>(`${this.base_url}/platByReso/${Restoid}`);
  }
}
