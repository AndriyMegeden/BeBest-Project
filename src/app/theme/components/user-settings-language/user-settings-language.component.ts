import { Component, OnInit } from '@angular/core';
import { AuthService } from '@core/auth-service/services/auth.service';
import { HttpErrorService } from '@core/auth-service/services/http-error.service';
import { LocalStorageService } from '@core/auth-service/services/localstorage.service';
import { environment } from '@environments/environment';
import { TranslateService } from '@ngx-translate/core';
import { ToastService } from '@services/toast.service';
import { languages } from '@static/custom.settings';

@Component({
  selector: 'app-user-settings-language',
  templateUrl: './user-settings-language.component.html',
  styleUrls: ['./user-settings-language.component.scss'],
})
export class UserSettingsLanguageComponent implements OnInit {

  public languages: Array<String> = languages;
  public currentLang: string;

  constructor(
    private authService: AuthService,
    private translate: TranslateService,
    private localStorage: LocalStorageService,
    private toastService: ToastService,
    private httpErrorService: HttpErrorService,
  ) { }

  ngOnInit() {
    const storageLang = this.localStorage.getCurrentLanguage();
    if(storageLang){
      this.currentLang = this.localStorage.getCurrentLanguage();
    }
    else{
      this.currentLang = environment.languages.default;
    }

  }

  changeLang(event){
    console.log(this.translate.getLangs());
    const value = event.detail.value;
    this.localStorage.setCurrentLanguage(value);
    this.translate.use(value);
    this.authService.updateUser({authInfo: {langId: value}}, (res) => {
      console.log(res);
    }, 
    async (error) => {
      const statusCode = error.error.error.statusCode;
      await this.toastService.showErrorToast(await this.httpErrorService.getError(statusCode));
    }, false)
  }

}
