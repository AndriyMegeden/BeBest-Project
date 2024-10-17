import { Component, Input, OnInit } from "@angular/core";
// для активного маршруту даних
import { ActivatedRoute } from "@angular/router";
import { ServerResponseArticle } from "@interfaces/content.interface";
import { ContentArticle } from "@interfaces/media.interface";
import { ModalController } from "@ionic/angular";
import { ContentRestService } from "@services/content.service";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Component({
  selector: "app-article",
  templateUrl: "./article.page.html",
  styleUrls: ["./article.page.scss"],
})
export class ArticlePage implements OnInit {
  @Input() articleData: ContentArticle;
  @Input() modal: boolean = false;
  @Input() categoryId: number;

  public isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
  public articleType: "system" | "article";

  private $state: Observable<object>;
  private catId: number;
  public article: ContentArticle;

  constructor(
    private activatedRoute: ActivatedRoute,
    private modalController: ModalController,
    private contentService: ContentRestService
  ) {}

  ngOnInit() {
    if (!this.modal) {
      this.$state = this.activatedRoute.paramMap.pipe(
        map(() => window.history.state)
      );
      this.$state.subscribe((res: any) => {
        this.articleType = res.articleType;
        if (this.articleType === "system") {
          this.catId = res.categoryId;
          this.loadSystemArticle(this.catId);
        } else {
          this.article = res.article;
        }
      });
    } else {
      this.articleType = "system";
      this.loadSystemArticle(this.categoryId);
    }

    
    if (this.isIOS) {
      document.body.classList.add("safe--area");
    } else {
      document.body.classList.remove("safe--area");
    }
  }

  loadSystemArticle(catId: number) {
    this.contentService.getContentByPostId(
      catId,
      (res: ServerResponseArticle[]) => {
        const firstArticle = res[0];
        this.article = {
          title: firstArticle.acf.title,
          description: firstArticle.acf.description,
          articleImage: firstArticle.acf.articleImage,
          createdAt: firstArticle.date,
          lock: !!firstArticle.acf.lock, // Преобразуем в boolean
        };
      },
      (error) => {
        // Обработка ошибок
      }
    );
  }

  dismiss() {
    this.modalController.dismiss();
  }
}
