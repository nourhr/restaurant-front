import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Ingredient } from 'src/app/models/ingredient.model';
import { Recipe } from 'src/app/models/recipe.model';
import { Store } from 'src/app/models/store.model';
import { IngredientsService } from 'src/app/services/ingredients.service';
import { RecipeService } from 'src/app/services/recipe.service';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-update-ingredient',
  templateUrl: './update-ingredient.component.html',
  styleUrls: ['./update-ingredient.component.css']
})
export class UpdateIngredientComponent implements OnInit {

  // initial data
  ingredient: Ingredient;
  id;
  recipes: Recipe[];
  idPlatPerso;
  recipe:Recipe;

  // Form groupe add ingredient
  ingredientForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    reference: new FormControl('', [Validators.required, Validators.minLength(3)]),
    quantity: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required]),
    platPersonalise: new FormControl('')
  });

  constructor(
    private storeService: RecipeService,
    private ingredientService: IngredientsService,
    private activatedrouter: ActivatedRoute,
    private router: Router

  ) { }

  ngOnInit(): void {
    this.getStores();
    this.getIngredientById();
    this.show();
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

  get platPersonalise() {
    return this.ingredientForm.get('platPersonalise');
  }


  // initial store
  getIngredientById() {
    this.ingredient = {
      
      name: this.name.value,
      price: this.price.value,
      reference: this.reference.value,
      quantity: this.quantity.value,
      recipe:{
        idPlatPerso:this.platPersonalise.value,
      } 
    };
      
    this.activatedrouter.paramMap.subscribe(result => {
      this.id = Number(result.get('id'));
      this.ingredientService.getById(this.id).then(
        ingredient => {
          this.ingredient = ingredient;
        }
      );
    });
  }

  // Get list stores
  async getStores() {
    this.recipes = await this.storeService.getAll();
  }
  async show()  {
    this.activatedrouter.paramMap.subscribe(params => {
      this.id = params.get("id");
      });
      this.recipe = await this.storeService.getRecipeById(this.idPlatPerso);
      this.name.setValue(this.ingredient.name);
      this.price.setValue(this.ingredient.price);
      this.quantity.setValue(this.ingredient.quantity);
      this.reference.setValue(this.ingredient.reference);      
  }

  async updateIngredient() {
    // init object with data from form

    this.ingredient= {

      name: this.name.value,
      price: this.price.value,
      reference: this.quantity.value,
      quantity: this.quantity.value,
      recipe:{
        idPlatPerso:this.platPersonalise.value,
      }  
    };
    const r = await this.ingredientService.updateIngredient(this.ingredient,this.id);
    this.router.navigate(['/ingredients']);
    console.log(r);
  }


}
