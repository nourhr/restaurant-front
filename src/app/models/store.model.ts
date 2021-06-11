import { Ingredient } from './ingredient.model';

export interface Store {
    idResto?: number;
    adresseResto?: string;
    nomResto?: string;
    ingredients?: Ingredient[];
}
