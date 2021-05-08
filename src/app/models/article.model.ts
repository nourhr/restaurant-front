
import { Category } from './category.model';

export interface Article {
    id?: number;
    title?: string;
    content?: string;
    author?: number;
    category?: Category;
}
