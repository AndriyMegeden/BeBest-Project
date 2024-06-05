import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServerResponseMedia } from '@interfaces/content.interface';
import { ContentMedia } from '@interfaces/media.interface';
import { ContentRestService } from '@services/content.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-audio',
  templateUrl: './audio.page.html',
  styleUrls: ['./audio.page.scss'],
})
export class AudioPage implements OnInit {
  
  private $state: Observable<object>;
  private categoryId: number;

  public medias: ContentMedia[] = [];
  public countMedias: number;
  public list: boolean = true;

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
          this.medias = res.map((item: ServerResponseMedia) => ({
            contentName: item.acf.contentName,
            media: item.acf.media,
          }));
          this.countMedias = this.medias.length;
        }, (err) => {
          // Обработайте ошибку
        });
      }
    });
  }

  toggleList(event){
    this.list = event;
  }

  

}
