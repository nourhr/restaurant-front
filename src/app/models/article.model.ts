
import { Category } from './category.model';

export interface Article{
    idPlat?: number;
    nomPlat?: string;
    description?: string;
    categories?: Category[];
    /* idPlat?: number;
    nomPlat?: string;
    description?: string;
    author?: number;
    category?: Category; */
    
}
