import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-content-article',
  templateUrl: './content-article.component.html',
  styleUrls: ['./content-article.component.scss'],
})
export class ContentArticleComponent  implements OnInit {

  public isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);

  @Input() title: string;
  @Input() description: string;
  @Input() createdAt: string;
  @Input() articleType: 'system' | 'article';

  constructor() { }

  ngOnInit() {}

}
