import { Component, OnInit } from '@angular/core';
import { AuthService } from '@core/auth-service/services/auth.service';
import { HttpErrorService } from '@core/auth-service/services/http-error.service';
import { LocalStorageService } from '@core/auth-service/services/localstorage.service';
import { ModalService } from '@services/modal.service';
import { NotificationSocketService } from '@services/notification-socket.service';
import { ToastService } from '@services/toast.service';
import { timer } from 'rxjs';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  constructor(
    private localStorage: LocalStorageService,
    private modalService: ModalService,
    private authService: AuthService,
    private toastService: ToastService,
    private httpErrorService: HttpErrorService,
  ) { }

  ngOnInit() {
  }

  logout(){
    this.authService.updateUser({ authInfo: {auth: false} }, (res) => {
      timer(300).subscribe(() => {
        this.authService.logout();
      })
    }, 
    async (error) => {
      const statusCode = error.error.error.statusCode;
      await this.toastService.showErrorToast(await this.httpErrorService.getError(statusCode));
    }, false)
  }

  async deleteAccount(){
    await this.modalService.openActionModal((res) => {
      this.authService.deleteAccount((res) => {
        timer(300).subscribe(() => {
          this.authService.logout();
        })
      }, 
      async (error) => {
        const statusCode = error.error.error.statusCode;
        await this.toastService.showErrorToast(await this.httpErrorService.getError(statusCode));
      })
    }, 
    (rej) => {
    })
  }

}
