import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-article-photo',
  templateUrl: './article-photo.component.html',
  styleUrls: ['./article-photo.component.scss'],
})
export class ArticlePhotoComponent  implements OnInit {

  @Input() categoryImage: string;

  constructor() { }

  ngOnInit() {}

}
