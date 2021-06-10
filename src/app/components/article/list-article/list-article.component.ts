import { Component, OnInit } from '@angular/core';
import {Article} from '../../../models/article.model';
import {ArticleService} from '../../../services/article.service';

@Component({
  selector: 'app-list-article',
  templateUrl: './list-article.component.html',
  styleUrls: ['./list-article.component.css']
})
export class ListArticleComponent implements OnInit {
  articles: Article[] = [];
  loading: Boolean = false;
  error: string | null = null;
  constructor(private articleService: ArticleService) { }

  ngOnInit() {
    this.getAllArticles();
  }

  async getAllArticles() {
    try {
      this.loading = true;
      this.articles = await this.articleService.getAll();
    } catch (error) {
      this.error = ` ${error.message} !`;
      console.error(`error while get posts : ${error.message} !`, error);
    } finally {
      this.loading = false;
      console.log('done !');
    }
  }

  deleteArticle(id: number) {
    console.log(id);
    this.articleService.delete(id).then(
      value => this.getAllArticles()
    );
  }


}
