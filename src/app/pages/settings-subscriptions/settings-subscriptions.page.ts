import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-settings-subscriptions',
  templateUrl: './settings-subscriptions.page.html',
  styleUrls: ['./settings-subscriptions.page.scss'],
})
export class SettingsSubscriptionsPage implements OnInit {

  public isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);

  constructor() { }

  ngOnInit() {
    if (this.isIOS) {
      document.body.classList.add('safe--area');
    } else {
      document.body.classList.remove('safe--area');
    }
  }

}
