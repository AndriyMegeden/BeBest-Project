import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServerResponseMedia } from '@interfaces/content.interface';
import { ContentMedia } from '@interfaces/media.interface';
import { ContentRestService } from '@services/content.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-video',
  templateUrl: './video.page.html',
  styleUrls: ['./video.page.scss'],
})
export class VideoPage implements OnInit {

  private $state: Observable<object>;
  private categoryId: number;

  public medias: ContentMedia[] = [];
  public countMedias: number;

  constructor(
    private activatedRoute: ActivatedRoute,
    private contentService: ContentRestService,
  ) { 
    
  }

  ngOnInit() {
    this.$state = this.activatedRoute.paramMap.pipe(map(() => window.history.state));
    this.$state.subscribe((res: any) => {
      if (res.categoryId) {
        this.categoryId = res.categoryId;
        this.contentService.getContentByCategoryId(this.categoryId, (res: ServerResponseMedia[]) => {
          console.log(res);
          
          this.medias = res.map((item: ServerResponseMedia) => ({
            contentName: item.acf.contentName,
            media: item.acf.media,
          }));
        }, (err) => {
          // Обработайте ошибку
        });
      }
    });
  }
}
