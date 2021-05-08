import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {Article} from '../../../models/article.model';
import {ArticleService} from '../../../services/article.service';
import {Category} from '../../../models/category.model';
import {CategoryService} from '../../../services/category.service';

@Component({
  selector: 'app-update-article',
  templateUrl: './update-article.component.html',
  styleUrls: ['./update-article.component.css']
})
export class UpdateArticleComponent implements OnInit {


  // Attributes
  article: Article;
  article_id: any;
  listCateg: Category[];
  categ: Category;
  idCateg: any;
  // Form groupe add Category project
  articleForm1: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(5)]),
    content: new FormControl('', [Validators.required]),
    author: new FormControl('', [Validators.required]),
    category: new FormControl('', [Validators.required])
  });
  constructor(private articleService: ArticleService,
              private categoryService: CategoryService,
              private router: Router,
              private readonly route: ActivatedRoute) { }

  ngOnInit(): void {
    this.init();
    this.show();
  }


  // getters
  get title() {
    return this.articleForm1.get('title');
  }

  get content() {
    return this.articleForm1.get('content');
  }
  get author() {
    return this.articleForm1.get('author');
  }
  get category() {
    return this.articleForm1.get('category');
  }
  async init() {
    this.listCateg = await this.categoryService.getAll();
  }
  async show()  {
    this.route.paramMap.subscribe(params => {
      this.article_id = params.get('id');
    });
    this.article = await this.articleService.getArticleById(this.article_id);
    //this.title.setValue(this.category.title);
    //this.categoryForm1.controls['title'].setValue(this.category.title);
    console.log(this.category);
  }

  async updateArticle() {
    this.idCateg = this.category.value;
    this.article = {
      title: this.title.value,
      content: this.content.value,
      author: this.author.value,
    };
    const r = await this.articleService.update(this.article, this.article_id, this.idCateg);
    this.router.navigate(['/articles']);
    console.log(r);
  }

}
