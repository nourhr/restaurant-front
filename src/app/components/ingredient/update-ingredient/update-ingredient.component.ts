import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Ingredient } from 'src/app/models/ingredient.model';
import { Store } from 'src/app/models/store.model';
import { IngredientsService } from 'src/app/services/ingredients.service';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-update-ingredient',
  templateUrl: './update-ingredient.component.html',
  styleUrls: ['./update-ingredient.component.css']
})
export class UpdateIngredientComponent implements OnInit {

  // initial data
  ingredient: Ingredient;
  idIngredient: number;
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
    private storeService: StoreService,
    private ingredientService: IngredientsService,
    private activatedrouter: ActivatedRoute,
    private router: Router

  ) { }

  ngOnInit(): void {
    //this.getStores();
    //this.getIngredientById();
  }
  /*
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


   // initial store
   getIngredientById() {
     this.ingredient = {
       name: '',
       price: null,
       reference: '',
       quantity: null,
       store: {id: null} };
     this.activatedrouter.paramMap.subscribe(result => {
       this.idIngredient = Number(result.get('id'));
       this.ingredientService.getById(this.idIngredient).then(
         ingredient => {
           this.ingredient = ingredient;
         }
       );
     });
   }

   Get list stores
   async getStores() {
     await this.storeService.getAll().then(
       stores => this.stores = stores
     );
   }



   updateIngredient() {
     this.ingredient.store = {id: this.store.value};
     this.ingredientService.update(this.ingredient).then(
       ingredient => this.router.navigate(['/ingredients'])
     );
   }
  */
}
