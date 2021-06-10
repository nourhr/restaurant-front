import { Store } from './store.model';

export interface Ingredient {
    id?: number;
    reference?: string;
    name?: string;
    store?: Store;
    quantity?: number;
    price?: number;
}
