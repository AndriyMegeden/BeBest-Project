import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServerResponseArticle } from '@interfaces/content.interface';
import { ContentArticle } from '@interfaces/media.interface';
import { ContentRestService } from '@services/content.service';
import { GlassfyService } from '@services/glassfy.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.page.html',
  styleUrls: ['./article-list.page.scss'],
})
export class ArticleListPage implements OnInit {

  private $state: Observable<object>;
  private categoryId: number;

  public articles: ContentArticle[] = [];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private contentService: ContentRestService,
    private glassfyService: GlassfyService
  ) { }

  ngOnInit() {
    this.$state = this.activatedRoute.paramMap.pipe(map(() => window.history.state));
    this.$state.subscribe((res: any) => {
      if (res.categoryId) {
        this.categoryId = res.categoryId;
        this.contentService.getContentByCategoryId(this.categoryId, (res: ServerResponseArticle[]) => {
          this.articles = res.map((item: ServerResponseArticle) => ({
            title: item.acf.title,
            description: item.acf.description,
            articleImage: item.acf.articleImage,
            createdAt: item.date,
            lock: this.glassfyService.getSubscriptionStatus().pro ? false : Boolean(item.acf.lock),
          }));
        }, (err) => {
          // Обработайте ошибку
        });
      }
    });
  }

  navigate(article){
    if(article.lock){
      this.router.navigateByUrl('/settings-subscriptions');
    }
    else{
      this.router.navigate([`/article`], { state: { article: article, articleType: 'article' } });
    }
  }

}
