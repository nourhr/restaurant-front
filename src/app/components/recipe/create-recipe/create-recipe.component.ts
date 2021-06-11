import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Recipe } from 'src/app/models/recipe.model';
import { CategoryService } from 'src/app/services/category.service';
import { RecipeService } from 'src/app/services/recipe.service';
import { Category } from '../../../models/category.model';

@Component({
  selector: 'app-create-recipe',
  templateUrl: './create-recipe.component.html',
  styleUrls: ['./create-recipe.component.css']
})
export class CreateRecipeComponent implements OnInit {

  // Attributes
  recipe: Recipe;
  idCat: Number;
  nomCat: String;
  categories: Category[];

  // Form groupe add Category project
  recipeForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(4)]),
    //time: new FormControl('', [Validators.required]),
    //nbrPersons: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    categorie: new FormControl('')
  });

  constructor(private recipeService: RecipeService, private router: Router, private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.getCategories();

  }
  async getCategories() {

    this.categories = await this.categoryService.getAll();

  }

  get name() {
    return this.recipeForm.get('name');
  }

  get description() {
    return this.recipeForm.get('description');
  }
  get categorie() {
    return this.recipeForm.get('categorie');
  }


  async addRecipe() {
    // init object with data from form
    this.recipe = {
      nomPlatPerso: this.name.value,
      descrPlatPerso: this.description.value,
      categorie: {
        idCat: this.categorie.value,
      }

    };
    const r = await this.recipeService.create(this.recipe);
    this.router.navigate(['/recipes']);
    console.log(r);
  }

}
