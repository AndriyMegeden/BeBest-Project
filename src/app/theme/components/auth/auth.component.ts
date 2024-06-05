import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AuthSettings, AuthType } from '@interfaces/custom.interface';
import { forgotPasswordSettingsStep1, forgotPasswordSettingsStep2, forgotPasswordSettingsStep3, loginSetting, privatePoliceContentId, registerSetting, termOfUseContentId } from '@static/custom.settings';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';
import { isPlatform } from '@ionic/angular';
import { AuthService } from '@core/auth-service/services/auth.service';
import { HttpErrorService } from '@core/auth-service/services/http-error.service';
import { ToastService } from '@services/toast.service';
import { FacebookLogin, FacebookLoginResponse } from '@capacitor-community/facebook-login';

import {
  SignInWithApple,
  SignInWithAppleResponse,
  SignInWithAppleOptions,
} from '@capacitor-community/apple-sign-in';
import { environment } from '@environments/environment';
import { ModalService } from '@services/modal.service';
import { ContentRestService } from '@services/content.service';
import { ServerResponseArticle } from '@interfaces/content.interface';
import { TranslateService } from '@ngx-translate/core';
import { LangId } from '@core/auth-service/dto/user.dto';
import { LocalStorageService } from '@core/auth-service/services/localstorage.service';
import { AppConfigService } from '@services/app-config.service';

type LoginType = 'local' | 'social';
type SocialProvider = 'google' | 'facebook' | 'apple';
type ChangeFormPages = 'forgot-password-step-1' | 'forgot-password-step-2' | 'forgot-password-step-3';

isPlatform
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {

  public isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
  public passwordShow: boolean = false;
  public repeatPasswordShow: boolean = false;
  public passwordMatch: boolean = false;
  public resetEmail: string = '';
  public resetId: string = '';
  public resetSecret: string = '';
  
  @Input() page: AuthType;
  @Output() onGetData = new EventEmitter<{
    page: string,
    type: LoginType,
    provider: SocialProvider,
    data: any
  }>()

  @Output() onResetData = new EventEmitter()

  public currentMode: AuthSettings;
  public form: FormGroup;
  public appConfig: {[key:string]: string}

  constructor(
    private router: Router,
    private authService: AuthService,
    private modalService: ModalService,
    private contentService: ContentRestService,
    private httpErrorService: HttpErrorService,
    private localStorage: LocalStorageService,
    private appConfigService: AppConfigService,
    private translate: TranslateService,
    private toastService: ToastService,
  ) { }

  ngOnInit() {
    this.appConfigService.getAppConfigObserable().subscribe((res) => {
      if(res){
        this.appConfig = res;
      }
    })
    if (this.isIOS) {
      document.body.classList.add('margin');
    } else {
      document.body.classList.remove('margin');
    }

    if (this.isIOS) {
      document.body.classList.add('apple-auth');
    } else {
      document.body.classList.remove('apple-auth');
    }
    if(this.page === 'login'){
      this.currentMode = loginSetting;
      this.createForm();
    }
    if(this.page === 'register'){
      this.currentMode = registerSetting;
      this.createForm();
    }
    if(this.page === 'forgot-password-step-1'){
      this.currentMode = forgotPasswordSettingsStep1;
      this.createForm();
    }
  }

  createForm() {
    const formControlsConfig = {};
    this.currentMode.fields.forEach(field => {
      formControlsConfig[field.fieldId] = new FormControl(field.value, field.validators);
    });

    this.form = new FormGroup(formControlsConfig);
  }

  check(type: 'sections' | 'fields', id: string){
    if(type === 'sections'){
      if(this.currentMode.sections.includes(id)){
        return true;
      } else {
        return false;
      }
    }
  
    if(type === 'fields'){
      const foundField = this.currentMode.fields.find(field => field.fieldId === id);
      return !!foundField; // Вернуть true, если поле было найдено, иначе false
    }
  }

  navigate(route: string){
    this.router.navigateByUrl(route)
  }

  prevForm(){
    if(this.page === 'forgot-password-step-3'){
      this.page = 'forgot-password-step-2';
      delete this.form;
      this.currentMode = forgotPasswordSettingsStep2;
      this.createForm();
    }
    else if(this.page === 'forgot-password-step-2'){
      this.page = 'forgot-password-step-1';
      this.resetEmail = '';
      this.resetId = '';
      delete this.form;
      this.currentMode = forgotPasswordSettingsStep1;
      this.createForm();
    }
    else if(this.page === 'forgot-password-step-1'){
      this.router.navigateByUrl('')
    }
  }

  nextForm(){
    if(this.page === 'forgot-password-step-1' || this.page === 'forgot-password-step-2'){
      return true;
    }
    else{
      return false;
    }
  }

  changeForm(){
    if(this.page === 'forgot-password-step-1'){
      this.authService.generateRefreshPasswordCode({
        authFieldType: 'email',
        authFieldValue: this.form.value.email,
        langId: this.translate.currentLang as LangId
      }, (result) => {
        this.resetEmail = this.form.value.email;
        this.resetId = result.data.resetId;
        this.page = 'forgot-password-step-2';
        delete this.form;
        this.currentMode = forgotPasswordSettingsStep2;
        this.createForm();
      }, 
      async (error) => {
        const statusCode = error.error.error.statusCode;
        await this.toastService.showErrorToast(await this.httpErrorService.getError(statusCode));
      })
    }
    else if(this.page === 'forgot-password-step-2'){
      this.authService.checkRefreshPasswordCode({
        authFieldType: 'email',
        authFieldValue: this.resetEmail,
        resetId: this.resetId,
        resetSecret: `${this.form.value.code1 + this.form.value.code2 + this.form.value.code3 + this.form.value.code4}`
      }, (result) => {
        this.resetSecret = `${this.form.value.code1 + this.form.value.code2 + this.form.value.code3 + this.form.value.code4}`;
        this.currentMode = forgotPasswordSettingsStep3;
        this.page = 'forgot-password-step-3';
        delete this.form;
        this.createForm();
      }, 
      async (error) => {
        const statusCode = error.error.error.statusCode;
        await this.toastService.showErrorToast(await this.httpErrorService.getError(statusCode));
      })
    }
  }

  async signInWithGoogle() {
    let googleUser = await GoogleAuth.signIn();
    this.onGetData.emit({
      page: this.page,
      type: 'social',
      provider: 'google',
      data: googleUser,
    })
  }

  async signInWithFB() {
    const result = await (<FacebookLoginResponse><unknown>(
      FacebookLogin.login({ permissions: environment.facebookPermissions })
    ));
    if (result.accessToken) {
      const accessToken = result.accessToken.token;
      console.log(`Facebook access token is ${accessToken}`);
      const facebookUser = await FacebookLogin.getProfile<{
        email: string;
      }>({ fields: ['email'] });
      console.log(facebookUser);
      
      this.onGetData.emit({
        page: this.page,
        type: 'social',
        provider: 'facebook',
        data: {
          accessToken: accessToken,
          ...facebookUser
        }
      })
    }
  }

  async signInWithApple(){
    let options: SignInWithAppleOptions = {
      clientId: 'bebest.petrishin.com',
      redirectURI: 'https:/localhost:8100/main',
      scopes: 'email name',
      state: '12345',
      nonce: 'nonce',
    };
    
    SignInWithApple.authorize(options)
      .then((result: SignInWithAppleResponse) => {
        console.log('success');
        console.log(result);
        this.onGetData.emit({
          page: this.page,
          type: 'social',
          provider: 'apple',
          data: {
            accessToken: result.response.identityToken,
            authorizationCode: result.response.authorizationCode,
            email: result.response.email,
            id: result.response.user
          }
        })
      })
      .catch(error => {
        console.log('error');
        console.log(error);
      });
  }

  getError(){
    if(this.form.controls.password && this.form.controls.repeatPassword){
      if(this.form.controls.password.value === this.form.controls.repeatPassword.value){
        return false
      }
      else{
        return true;
      }
    }
    else{
      false
    }
  }

  getForm(){
    if(this.page === 'login' || this.page === 'register'){
      this.onGetData.emit({
        page: this.page,
        type: 'local',
        provider: null,
        data: this.form.value
      })
      this.form.reset()
    }
    else if(this.page === 'forgot-password-step-3'){
      this.authService.refreshPassword({
        authFieldType: 'email',
        authFieldValue: this.resetEmail,
        resetId: this.resetId,
        resetSecret: this.resetSecret,
        password: this.form.value.password
      }, async (result) => {
        await this.toastService.showSuccessToast()
        this.onResetData.emit()
      }, 
      async (error) => {
        const statusCode = error.error.error.statusCode;
        await this.toastService.showErrorToast(await this.httpErrorService.getError(statusCode));
      })
    }
  }

  async openSystemArticleModal(type: 'private_police' | 'term_of_use'){
    const categoryId = type === 'private_police' ? privatePoliceContentId : termOfUseContentId;
    await this.modalService.openSystemArticleModal(categoryId);
  }

}
