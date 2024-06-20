import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy, } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { TranslateModule, TranslateLoader, MissingTranslationHandler } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { AuthGuard } from '@core/auth-service/guards/auth.guard';
// import { FacebookLoginProvider, GoogleLoginProvider, SocialAuthServiceConfig } from '@abacritt/angularx-social-login';
import { ParticalsModule } from '@theme/particals/particals.module';
import { AuthService } from '@core/auth-service/services/auth.service';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
    declarations: [AppComponent],
    imports: [
      BrowserModule,
      IonicModule.forRoot({
        swipeBackEnabled: false
      }),
      ParticalsModule,
      AppRoutingModule,
      HttpClientModule,
      TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      },
      }),
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: AuthService, multi: true },
        { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
        // {
        //     provide: 'SocialAuthServiceConfig',
        //     useValue: {
        //       autoLogin: false,
        //       providers: [
        //         {
        //           id: FacebookLoginProvider.PROVIDER_ID,
        //           provider: new FacebookLoginProvider('1282185142663634'),
                  
        //         }
        //       ],
        //       onError: (err) => {
        //         console.error(err);
        //       }
        //     } as SocialAuthServiceConfig,
        // },
        AuthGuard
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
