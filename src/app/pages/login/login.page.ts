import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginSocialUserRequest, LoginUserRequest } from '@core/auth-service/dto/user.dto';
import { AuthService } from '@core/auth-service/services/auth.service';
import { HttpErrorService } from '@core/auth-service/services/http-error.service';
import { LocalStorageService } from '@core/auth-service/services/localstorage.service';
import { ToastService } from '@services/toast.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  
  public isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);

  constructor(
    private router: Router,
    private authService: AuthService,
    private localService: LocalStorageService,
    private httpErrorService: HttpErrorService,
    private toastService: ToastService,
  ) { }

  ngOnInit() {
    if (this.isIOS) {
      document.body.classList.add('safe--area');
    } else {
      document.body.classList.remove('safe--area');
    }
  }

  async getData(event){
    if(event.page === 'login'){
      if(event.type === 'local'){
        const loginUserRequest: LoginUserRequest = {
          authFieldType: 'email',
          authFieldValue: event.data.email,
          password: event.data.password
        }
        this.authService.login(loginUserRequest, (result) => {
          this.router.navigateByUrl('/main');
        },
        async (error) => {
          const statusCode = error.error.error.statusCode;
          await this.toastService.showErrorToast(await this.httpErrorService.getError(statusCode));
        })
      }
      if(event.type === 'social'){
        if(event.provider === 'google'){
          const socialLoginUserRequest: LoginSocialUserRequest = {
            authSocialType: event.provider,
            authFieldType: 'email',
            authFieldValue: event.data.email,
            authInfo: {
              firstName: event.data.givenName,
              email: event.data.email,
            }
          }
          this.localService.setToken(event.data.authentication.idToken);
          this.authService.loginSocial(socialLoginUserRequest, (result) => {
            if(result.data.action){
              this.router.navigateByUrl('/wizard');
            }
            else{
              this.router.navigateByUrl('/main');
            }
          }, async (error) => {
            const statusCode = error.error.error.statusCode;
            await this.toastService.showErrorToast(await this.httpErrorService.getError(statusCode));
          })
        }
        if(event.provider === 'facebook'){
          const socialLoginUserRequest: LoginSocialUserRequest = {
            authSocialType: event.provider,
            authFieldType: event.data.email ? 'email' : 'socialId',
            authFieldValue: event.data.id,
            authInfo: {
              firstName: event.data.firstName ? event.data.firstName : 'TestFacebookUser',
              ...(event.data.email && { email: event.data.email })
            }
          }
          this.localService.setToken(event.data.accessToken);
          this.authService.loginSocial(socialLoginUserRequest, (result) => {
            if(result.data.action){
              this.router.navigateByUrl('/wizard');
            }
            else{
              this.router.navigateByUrl('/main');
            }
          }, async (error) => {
            const statusCode = error.error.statusCode;
            await this.toastService.showErrorToast(await this.httpErrorService.getError(statusCode));
          })
        }
        if(event.provider === 'apple'){
          const socialLoginUserRequest: LoginSocialUserRequest = {
            authSocialType: event.provider,
            authFieldType: 'socialId',
            authFieldValue: event.data.id,
          }
          this.localService.setToken(event.data.accessToken);
          this.authService.loginSocial(socialLoginUserRequest, (result) => {
            if(result.data.action){
              this.router.navigateByUrl('/wizard');
            }
            else{
              this.router.navigateByUrl('/main');
            }
          }, async (error) => {
            const statusCode = error.error.statusCode;
            await this.toastService.showErrorToast(await this.httpErrorService.getError(statusCode));
          })
        }
      }
    }
   }

}
