import { RecipeIngredient } from './recipe-ingredient.model';

export interface Recipe {
  idPlatPerso?: number;
    nomPlatPerso?: string;
    description?: string;
    descrPlatPerso?: string;
    resto?: number;
    categorie?: number;
    ingredients?: RecipeIngredient[];
}
