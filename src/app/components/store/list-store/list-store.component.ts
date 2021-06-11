import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from 'src/app/models/store.model';
import { StoreService } from 'src/app/services/store.service';
import {Observable} from "rxjs";

@Component({
  selector: 'app-list-store',
  templateUrl: './list-store.component.html',
  styleUrls: ['./list-store.component.css']
})
export class ListstoreComponent implements OnInit {

  stores: Store[] =[]
  loading: Boolean = false;
  error: string | null = null;
  constructor(private storeService: StoreService, private router: Router) { }

  ngOnInit() {
    this.getAllStores();
  }

  async getAllStores() {
    
    try {
      this.loading = true;
      this.stores = await this.storeService.getAll();
    } catch (error) {
      this.error = ` ${error.message} !`;
      console.error(`error while get posts : ${error.message} !`, error);
    } finally {
      this.loading = false;
      console.log('done !');
    }
  }
  deleteStore(id: number) {
    console.log(id);
    this.storeService.delete(id).subscribe(
      response => {
        console.log(response);



      },
      error => {
        console.log(error); });
    window.location.reload();
     this.router.navigate(['/stores']);
  }

}
