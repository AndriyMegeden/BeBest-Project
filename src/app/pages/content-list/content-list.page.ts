import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServerResponseCategory } from '@interfaces/content.interface';
import { ContentCategory, ContentType } from '@interfaces/media.interface';
import { ContentRestService } from '@services/content.service';
import { GlassfyService } from '@services/glassfy.service';
import { excludeСategories } from '@static/custom.settings';

@Component({
  selector: 'app-content-list',
  templateUrl: './content-list.page.html',
  styleUrls: ['./content-list.page.scss'],
})
export class ContentListPage implements OnInit {

  public categories: ContentCategory[] = [];

  constructor(
    private router: Router,
    private contentService: ContentRestService,
    private glassfyService: GlassfyService
  ) { }

  ngOnInit() {
    this.contentService.getCategories(
      (res: ServerResponseCategory[]) => {
        this.categories = res.map(item => ({
          categoryId: item.id,
          categoryImage: item.acf.categoryImage,
          categoryTitle: item.acf.categoryTitle,
          categorySubtitle: item.acf.categorySubtitle,
          contentType: item.acf.contentType[0] as ContentType,
          lock: this.glassfyService.getSubscriptionStatus().pro ? false : Boolean(item.acf.lock),
        }));
        this.categories = this.categories.filter(elem => !excludeСategories.includes(elem.categoryId));
      },
      (err) => {
        // Обработка ошибки
      }
    );
  }
  

  navigate(category){
    if(category.lock){
      this.router.navigateByUrl('/settings-subscriptions');
    }
    else{
      this.router.navigate([`/${category.contentType}`], { state: { categoryId: category.categoryId } });
    }
  }

}
