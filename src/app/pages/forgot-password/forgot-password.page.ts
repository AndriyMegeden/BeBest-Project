import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {

  public isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);

  constructor(private router: Router) { }

  ngOnInit() {
    if (this.isIOS) {
      document.body.classList.add('safe--area');
    } else {
      document.body.classList.remove('safe--area');
    }
  }

  resetData(event){
    this.router.navigateByUrl('');
  }

}
