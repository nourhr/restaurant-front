import { RecipeIngredient } from './recipe-ingredient.model';

export interface Recipe {
    id?: number;
    name?: string;
    description?: string;
    time?: string;
    nbrPersons?: number;
    ingredients?: RecipeIngredient[];
}
