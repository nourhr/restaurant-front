import { Ingredient } from './ingredient.model';

export interface Recipe {
    idPlatPerso?: number;
    nomPlatPerso?: string;
    descrPlatPerso?: string;   
    ingredients?: Ingredient[];
}
