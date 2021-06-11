import { Recipe } from './recipe.model';
import { Store } from './store.model';

export interface Ingredient {
    id?: any;
    name?: string;
    price?: number;
    quantity?: number;    
    reference?: string;
    recipe?: Recipe;
    store?:Store;
}
