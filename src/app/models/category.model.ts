import { Article } from "./article.model";

export interface Category {
  idCat?: number;
  nomCat?: string;
  article?: Article;
}
