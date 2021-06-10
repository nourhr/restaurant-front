import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Store } from 'src/app/models/store.model';
import { StoreService } from 'src/app/services/store.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-store',
  templateUrl: './create-store.component.html',
  styleUrls: ['./create-store.component.css']
})
export class CreateStoreComponent implements OnInit {

  // Attributes
  store: Store;

  // Form groupe add store
  storeForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    address: new FormControl('', [Validators.required])
  });


  constructor(private storeServie: StoreService, private router: Router) { }

  ngOnInit(): void {
  }

  // getters
  get name() {
    return this.storeForm.get('name');
  }

  get address() {
    return this.storeForm.get('address');
  }

  // Add Store function
  async addStore() {
    // init object with data from form
    this.store = {
      name: this.name.value,
      address: this.address.value,
    };
    await this.storeServie.create(this.store).then(
      store => this.router.navigate(['/stores'])
    );
  }
}
