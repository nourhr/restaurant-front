import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Store } from 'src/app/models/store.model';
import { StoreService } from 'src/app/services/store.service';
import {ActivatedRoute, Router} from '@angular/router';
import {takeUntil} from 'rxjs/operators';
import {Subject} from "rxjs";

@Component({
  selector: 'app-create-store',
  templateUrl: './create-store.component.html',
  styleUrls: ['./create-store.component.css']
})
export class CreatestoreComponent implements OnInit {
  unsibscribe = new Subject<void>();

  // Attributes
  store: Store;

  // Form groupe add store
  storeFrom: FormGroup ;
  storeId : number
  showForm =false
  editAdd :string = "Add"
  constructor(private storeServie: StoreService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
    this.activatedRoute.params.subscribe(
      (params) => {
        console.log(params,params.id !== "add")
        if(params.id != 'add'){
          this.editAdd = "Edit"
          this.storeServie.getstoreById(params.id).subscribe(
            (store)=>{
              this.initUpdate(store.nomResto,store.adresseResto,store.idResto);
              this.showForm = true;
            }
          )
        }else {
          this.initCreate();
          this.showForm = true;
        }

      }
    )
  }

  ngOnInit(): void {
  }

  // getters
  get name() {
    return this.storeFrom.get('name');
  }

  get address() {
    return this.storeFrom.get('address');
  }


  // Add Store function
  addStore() {
    const store :Store=null
    store.nomResto = this.storeFrom.controls.name.value;
    store.adresseResto = this.storeFrom.controls.address.value;
    if (this.editAdd == "Add"){
      this.storeServie.create(store).pipe(takeUntil(this.unsibscribe)).subscribe(
        (rep) => {
          
          this.router.navigate(['/stores'])
        },
        (error) => {
          this.router.navigate(['/stores'])
        }
      );
    }else{
      store.idResto = this.storeFrom.controls.id.value;
      this.storeServie.update(store).pipe(takeUntil(this.unsibscribe)).subscribe(
        (rep) => {
          this.router.navigate(['/stores'])
        },
        (error) => {
          console.log(error);
        }
      );
    }


  }
  initCreate():void {
    this.storeFrom = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      address: new FormControl('', [Validators.required])
    });
  }
  initUpdate(name, address,id):void {
    this.storeFrom = new FormGroup({
      name: new FormControl(name, [Validators.required, Validators.minLength(3)]),
      id: new FormControl(id, []),
      address: new FormControl(address, [Validators.required])
    });
  }
  get f() { 
    return this.storeFrom.controls;
  }
}
