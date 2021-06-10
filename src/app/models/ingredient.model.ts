import { Recipe } from './recipe.model';
import { Store } from './store.model';

export interface Ingredient {
    id?: number;
    name?: string;
    price?: number;
    quantity?: number;    
    reference?: string;
    recipe?: Recipe;
}
