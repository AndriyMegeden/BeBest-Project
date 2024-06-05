import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '@core/auth-service/services/auth.service';
import { AuthInfo } from '@interfaces/user.interface';

@Component({
  selector: 'app-user-settings-profile',
  templateUrl: './user-settings-profile.component.html',
  styleUrls: ['./user-settings-profile.component.scss'],
})
export class UserSettingsProfileComponent implements OnInit {

  @Input() public all: number;
  @Input() public inProgress: number;
  @Input() public completed: number;

  public authInfo: AuthInfo;

  constructor(
    private authService: AuthService,
  ) { }

  ngOnInit() {
    this.authService.getAuthUser().subscribe((user) => {
      if(user){
        console.log(user)
        this.authInfo = user;
      }
    })
  }

}
