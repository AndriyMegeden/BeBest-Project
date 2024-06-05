import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-back-button',
  templateUrl: './back-button.component.html',
  styleUrls: ['./back-button.component.scss'],
})
export class BackButtonComponent implements OnInit {

  @Input() public disabled: boolean = false;
  @Input() public title: string;
  @Input() public controls: boolean = false;
  @Input() public archiveStatus: boolean = false;
  @Input() public all: boolean = false;
  @Input() public settings: boolean = false;

  @Output() onEdit = new EventEmitter();
  @Output() onArchive = new EventEmitter()
  
  constructor(private navCtrl: NavController) { }
  
  ngOnInit() {}

  backTo(){
    if(!this.disabled){
      this.navCtrl.pop()
    }
  }

  edit(){
    this.onEdit.emit();
  }

  archive(){
    this.onArchive.emit();
  }

}
