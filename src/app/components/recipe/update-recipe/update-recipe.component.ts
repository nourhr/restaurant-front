import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/models/category.model';
import { Recipe } from 'src/app/models/recipe.model';
import { CategoryService } from 'src/app/services/category.service';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-update-recipe',
  templateUrl: './update-recipe.component.html',
  styleUrls: ['./update-recipe.component.css']
})
export class UpdateRecipeComponent implements OnInit {

   // Attributes
   recipe: Recipe;
   idPlatPerso;
   idCat: Number;
   nomCat: String;
   categories: Category[];
 

// Form groupe add Category project
  recipeForm: FormGroup = new FormGroup({
  nomPlatPerso: new FormControl('', [Validators.required, Validators.minLength(5)]),
  descrPlatPerso: new FormControl('', [Validators.required]),
  categorie: new FormControl('', [Validators.required]),
  

});
constructor(private recipeService: RecipeService, private route: Router ,
  private readonly router: ActivatedRoute, private categoryService: CategoryService) { }

ngOnInit(): void {
  this.getCategories();

}
async getCategories() {

  this.categories = await this.categoryService.getAll();

}

get nomPlatPerso() {
  return this.recipeForm.get('nomPlatPerso');
}

get descrPlatPerso() {
  return this.recipeForm.get('descrPlatPerso');
}
get categorie() {
  return this.recipeForm.get('categorie');
}

getRecipeById() {
  this.recipe = {
    
    nomPlatPerso: this.nomPlatPerso.value,
    descrPlatPerso: this.descrPlatPerso.value,
    categorie: {
    idCat: this.categorie.value,
    }
  };
    
  this.router.paramMap.subscribe(result => {
    this.idPlatPerso = Number(result.get('id'));
    this.recipeService.getRecipeById(this.idPlatPerso).then(
      recipe => {
        this.recipe = recipe;
      }
    );
  });

}

async show()  {
    this.router.paramMap.subscribe(params => {
      this.idPlatPerso = params.get("id");
      });
      this.recipe = await this.recipeService.getRecipeById(this.idPlatPerso);
      this.nomPlatPerso.setValue(this.recipe.nomPlatPerso);
      this.descrPlatPerso.setValue(this.recipe.descrPlatPerso);
      
  }
  async updateRecipe() {
    // init object with data from form

    this.recipe = {
      
      nomPlatPerso: this.nomPlatPerso.value,
      descrPlatPerso: this.descrPlatPerso.value,
      categorie: {
      idCat: this.categorie.value,
      }
    };
    const r = await this.recipeService.update(this.recipe,this.idPlatPerso);
    this.route.navigate(['/recipes']);
    console.log(r);
  }

}
