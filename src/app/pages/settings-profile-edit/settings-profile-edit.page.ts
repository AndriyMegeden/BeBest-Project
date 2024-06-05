import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UpdateUserAuthInfoRequest, UpdateUserRequest } from '@core/auth-service/dto/user.dto';
import { AuthService } from '@core/auth-service/services/auth.service';
import { HttpErrorService } from '@core/auth-service/services/http-error.service';
import { AuthInfo } from '@interfaces/user.interface';
import { ToastService } from '@services/toast.service';

@Component({
  selector: 'app-settings-profile-edit',
  templateUrl: './settings-profile-edit.page.html',
  styleUrls: ['./settings-profile-edit.page.scss'],
})
export class SettingsProfileEditPage implements OnInit {

  public authInfo: AuthInfo;

  constructor(
    private router: Router,
    private authService: AuthService,
    private httpErrorService: HttpErrorService,
    private toastService: ToastService,
  ) { }

  ngOnInit() {}

  getData(event){
    const updateUserAuthInfoRequest: UpdateUserAuthInfoRequest = {
      firstName: event.firstName,
      phoneNumber: event.phoneNumber,
      dateBirth: event.dateBirth,
      location: event.location,
      facebook: event.facebook,
      instagram: event.instagram,
      telegram: event.telegram,
    }

    const updateUserRequest: UpdateUserRequest = {
      authInfo: updateUserAuthInfoRequest
    }

    this.authService.updateUser(updateUserRequest,(result) => {
      this.router.navigateByUrl('/settings-profile')
      this.toastService.showSuccessToast();
    }, 
    async (error) => {
      const statusCode = error.error.statusCode;
      await this.toastService.showErrorToast(await this.httpErrorService.getError(statusCode));
    })
  }

}
