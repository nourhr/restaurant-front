import { Recipe} from './recipe.model';

export interface Ingredient {
    id?: number;
    reference?: string;
    name?: string;
    recipe?: Recipe;
    quantity?: number;
    price?: number;
}
