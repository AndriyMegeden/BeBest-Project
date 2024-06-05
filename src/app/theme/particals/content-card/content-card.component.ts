import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-content-card',
  templateUrl: './content-card.component.html',
  styleUrls: ['./content-card.component.scss'],
})
export class ContentCardComponent implements OnInit {

  @Input() public title: string;
  @Input() public subtitle: string;
  @Input() public subtitle2: string;
  @Input() public thumbnail: string;
  @Input() public icon: string;
  @Input() public lock: boolean;

  constructor() { }


  ngOnInit() {}

}
