import { Ingredient } from './ingredient.model';

export interface Store {
    id?: number;
    address?: string;
    name?: string;
    ingredients?: Ingredient[];
}
