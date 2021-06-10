
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Article } from 'src/app/models/article.model';
import { ArticleService } from 'src/app/services/article.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Category} from '../../../models/category.model';
import {CategoryService} from '../../../services/category.service';
@Component({
  selector: 'app-create-article',
  templateUrl: './create-article.component.html',
  styleUrls: ['./create-article.component.css']
})
export class CreateArticleComponent implements OnInit {


  // Attributes
  article: Article;
  idCateg: any;
  listCateg: Category[];
  // Form groupe add Category project
  articleForm: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(5)]),
    content: new FormControl('', [Validators.required]),
    author: new FormControl('', [Validators.required]),
    category: new FormControl('', [Validators.required])
  });


  constructor(private articleService: ArticleService, private router: Router,
              private readonly route: ActivatedRoute, private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.init();
  }

  // getters
  get title() {
    return this.articleForm.get('title');
  }

  get content() {
    return this.articleForm.get('content');
  }
  get author() {
    return this.articleForm.get('author');
  }
  get category() {
    return this.articleForm.get('category');
  }
  async init() {
    this.listCateg = await this.categoryService.getAll();
  }
  // Add Article function
  async addArticle() {
    // init object with data from form
    this.idCateg = this.category.value;
    this.article = {
      title: this.title.value,
      content: this.content.value,
      author: this.author.value,
    };
    const s = await this.articleService.create(this.article, this.idCateg);
    this.router.navigate(['/articles']);
    console.log(s);
  }

}
