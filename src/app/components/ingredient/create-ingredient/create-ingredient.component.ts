import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Ingredient } from 'src/app/models/ingredient.model';
import { Store } from 'src/app/models/store.model';
import { IngredientsService } from 'src/app/services/ingredients.service';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-create-ingredient',
  templateUrl: './create-ingredient.component.html',
  styleUrls: ['./create-ingredient.component.css']
})
export class CreateIngredientComponent implements OnInit {


  // initial data
  ingredient: Ingredient;
  store_id: number;
  stores: Store[];

  // Form groupe add ingredient
  ingredientForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    reference: new FormControl('', [Validators.required, Validators.minLength(3)]),
    quantity: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required]),
    store: new FormControl('')
  });


  constructor(
    private ingredientService: IngredientsService,
    private storeService: StoreService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getStores();
  }

  // Get list stores
  async getStores() {
    //this.stores = await this.storeService.getAll();
  }

    // getters
    get name() {
      return this.ingredientForm.get('name');
    }

    get reference() {
      return this.ingredientForm.get('reference');
    }

    get quantity() {
      return this.ingredientForm.get('quantity');
    }

    get price() {
      return this.ingredientForm.get('price');
    }

    get store() {
      return this.ingredientForm.get('store');
    }


  addIngredient() {
    this.ingredient = {
      name: this.name.value,
      reference: this.reference.value,
      quantity: this.quantity.value,
      price: this.price.value,
     // store: {
        //id: this.store.value,
      //}
    };
    this.ingredientService.create(this.ingredient).then(
      value => this.router.navigate(['/ingredients'])
    );
  }

}
