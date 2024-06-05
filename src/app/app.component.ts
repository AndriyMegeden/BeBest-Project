import { Component, OnInit } from '@angular/core';
import { Router, RoutesRecognized } from '@angular/router';
import { FacebookLogin } from '@capacitor-community/facebook-login';
import { SplashScreen } from '@capacitor/splash-screen'
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';
import { AuthService } from '@core/auth-service/services/auth.service';
import { LocalStorageService } from '@core/auth-service/services/localstorage.service';
import { environment } from '@environments/environment';
import { LoadingController, Platform } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { FcmService } from '@services/fcm.service';
import { BehaviorSubject, timer } from 'rxjs';
import { ConfigSocketService } from '@services/config-socket.service';
import { AppConfigService } from '@services/app-config.service';
import { GlassfyService } from '@services/glassfy.service';
import { App } from '@capacitor/app';
import { PushNotifications } from '@capacitor/push-notifications';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  public notificationStatus: boolean;
  public auth: boolean = false;
  public navbar: boolean;
  private currentLang: string;

  private loading: HTMLIonLoadingElement;
  public showContent: boolean = true;

  constructor(
    private platform: Platform,
    private router: Router,
    private loadingCtrl: LoadingController,
    private translate: TranslateService,
    private authService: AuthService,
    private localStorage: LocalStorageService,
    private configSocketService: ConfigSocketService,
    private appConfigService: AppConfigService,
    private fcmService: FcmService,
    private glassfyService: GlassfyService
  ) {
    console.log(new Date().toISOString());
    
    this.configSocketService.init(environment.socketConfigApi,'config', false, (socket) => {
      this.configSocketService.onGetConfig((res) => {
        this.appConfigService.setAppConfig(res)
       })
    });
    this.authService.init()
    this.authService.getAuthStatus().subscribe(async status => {
      if(status){
        this.auth = status;
        const firstInit = this.localStorage.getFirstInitStatus()
        if(!firstInit){
          this.localStorage.setFirstInitStatus(true);
        }
        await this.fcmService.initPush();
        timer(500).subscribe(async () => {
          const fcmToken = this.localStorage.getFcmToken();
          const platformLang = window.navigator.language.split('-')[0];
          const storageLang = await this.localStorage.getCurrentLanguage();
          const lang = !storageLang ? (environment.languages.available.includes(platformLang) ? platformLang : environment.languages.default) : storageLang;
          this.localStorage.setCurrentLanguage(lang);
          if(fcmToken){
            console.log('token exist');
            this.authService.updateUser({authInfo: {fcmToken: fcmToken, langId: lang, auth: true}}, (res) => {
              console.log(res);
            }, (err) => {console.log(err)}, false)
          }
        })
      }
    })
    this.router.events.subscribe(async (data) => {
      if (data instanceof RoutesRecognized) {
        if(data.state.root.firstChild.data.navbar){
          this.navbar = data.state.root.firstChild.data.navbar
        }
        else{
          this.navbar = false;
        }
        if(data.state.root.firstChild.data.loader){
          await this.initLoading(data.state.root.firstChild.data.loaderTimeOut ? data.state.root.firstChild.data.loaderTimeOut : 300 );
        }
      }
    });
    this.initializeApp();
  }

  async initLanguages(){
    this.translate.addLangs(environment.languages.available);
    const platformLang = window.navigator.language.split('-')[0];
    const storageLang = await this.localStorage.getCurrentLanguage();
    environment.languages.available.forEach(lang => {
      this.translate.reloadLang(lang)
    });
    if(!storageLang){
      if(environment.languages.available.includes(platformLang)){
        this.currentLang = platformLang;
        this.translate.use(this.currentLang);
      }
      else{
        this.currentLang = environment.languages.default;
        this.translate.use(this.currentLang);
      }
    }
    else{
      this.translate.use(storageLang);
    }
  }

  initGoogle(){
    this.platform.ready().then(() => {
      GoogleAuth.initialize({
        scopes: ["profile", "email"],
        clientId: environment.googleClientId,
      })
    })
  }

  initFacebook(){
    this.platform.ready().then(async () => {
      await FacebookLogin.initialize({ appId: environment.facebookCLientId });
    })
  }

  async initLoading(timeout) {
    if(environment.production){
      this.showContent = false;
      this.loading = await this.loadingCtrl.create({
        cssClass: 'loading'
      });
      
      await this.loading.present();
      timer(timeout).subscribe(async () => {
        this.showContent = true;
        await this.loading.dismiss()
      })
    }
  }

  

  async initAppState(){
  const prevNotificationStatusSubject = new BehaviorSubject<boolean>(false);

  // Спостереження за змінами стану додатка
  App.addListener('appStateChange', async (state) => {
    if (!state.isActive) {
      console.log('collapse', 'app component');
      const status = (await PushNotifications.checkPermissions()).receive !== 'granted' ? false : true;
      console.log(status, 'app component');
      prevNotificationStatusSubject.next(status); // Оновлення значення prevNotificationStatusSubject
    } else {
      console.log('expand', 'app component');
      const status = (await PushNotifications.checkPermissions()).receive !== 'granted' ? false : true;
      console.log(status, 'app component');

      // Спостереження за змінами prevNotificationStatusSubject
      prevNotificationStatusSubject.subscribe(async (prevNotificationStatus) => {
        const currentStatus = (await PushNotifications.checkPermissions()).receive !== 'granted' ? false : true;
        if(prevNotificationStatus !== currentStatus){
          // Оновлення notificationStatus
          this.notificationStatus = currentStatus;

          // Оновлення статусу користувача в сервісі authService
          this.authService.updateUser({authInfo: { notificationStatus: currentStatus }}, 
            (res) => {
              console.log('updateNotificationStatus after change settings', currentStatus, 'app component');
            }, 
            (err) => {
              console.log(err, 'app component');
            }, 
            false);
        }
      });
    }
  });
}

  initializeApp() {
    /* To make sure we provide the fastest app loading experience
       for our users, hide the splash screen automatically
       when the app is ready to be used:

        https://capacitor.ionicframework.com/docs/apis/splash-screen#hiding-the-splash-screen
    */
    this.initLanguages();
    this.initGoogle()
    this.initFacebook();
    this.initAppState();
    this.glassfyService.initGlassfy()
    SplashScreen.hide();
  }
}
