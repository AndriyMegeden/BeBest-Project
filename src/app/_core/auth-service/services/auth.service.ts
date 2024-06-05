/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable quote-props */
/* eslint-disable @typescript-eslint/naming-convention */
import { Injectable, NgZone } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { LocalStorageService } from './localstorage.service';
import { BehaviorSubject, fromEvent, Observable, throwError, timer } from 'rxjs';
import { Router } from '@angular/router';
import { catchError, filter, finalize, map, switchMap, take } from 'rxjs/operators';
import { Base64 } from 'js-base64';
import { CheckRefreshPasswordCodeRequest, CreateUserAuthInfoRequest, CreateUserRequest, GenerateRefreshPasswordCodeRequest, LoginSocialUserRequest, LoginUserRequest, RefreshPasswordRequest, UpdateUserRequest, VerificationAuthFieldsRequest } from '../dto/user.dto';
import { AuthInfo } from 'src/app/interfaces/user.interface';
import { RestApiService } from './rest-api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends RestApiService implements HttpInterceptor{

  private $authStatus: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)
  private $authUser: BehaviorSubject<AuthInfo> = new BehaviorSubject<AuthInfo>(null);
  // Catch many http request
  private $refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  private refreshTokenInProgress = false;

  constructor(
    http: HttpClient,
    localStorage: LocalStorageService,
    private router: Router,
  ){
    super(http, localStorage);
  }
  

  private loginRoute = '/auth/login';
  private loginSocialRoute = '/auth/loginSocial';
  private createUserRoute = '/auth/createUser';
  private updateUserRoute = '/auth/updateUser';
  private updateAvatarUserRoute = '/fs/uploadAvatar';
  private verificationEmailRoute = '/auth/verificationAuthFieldsRequest';
  private generateRefreshPasswordCodeRoute = '/auth/generateRefreshPasswordCode';
  private checkRefreshPasswordCodeRoute = '/auth/checkRefreshPasswordCode';
  private refreshPasswordRoute = '/auth/refreshPassword';
  private refreshTokenRoute = '/auth/refreshToken';
  private logoutRoute = '/auth/logout';
  private deleteUserRoute = '/auth/deleteUser';


  public init(): void {
    if(this.localStorage.checkToken() && this.localStorage.checkUser()){
      this.$authStatus.next(true);
      this.$authUser.next(this.localStorage.getUser())
      this.router.navigateByUrl('main')
    }
  }
  
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          const url = this.remoteApi + this.refreshTokenRoute;
          if (url === request.url) {
            this.logout()
            return throwError(error);
          }
          if (!this.refreshTokenInProgress) {
            this.refreshTokenInProgress = true;
            this.$refreshTokenSubject.next(null);
            return this.refreshToken(request,next).pipe(
              switchMap(() => {
                const authReq = request.clone({
                  setHeaders: {
                    Authorization: `Bearer ${this.localStorage.getToken().token}`,
                  },
                });
                return next.handle(authReq);
              }),
              catchError((err: any) => {
                // Handle any errors that occur while handling the updated request
                return throwError(err);
              }),
              finalize(() => {
                this.refreshTokenInProgress = false;
                this.$refreshTokenSubject.next(true);

              })
            );
          } else {
            return this.$refreshTokenSubject.pipe(
              filter(result => result !== null),
              take(1),
              switchMap(() => {
                const authReq = request.clone({
                  setHeaders: {
                    Authorization: `Bearer ${this.localStorage.getToken().token}`,
                  },
                });
                return next.handle(authReq);
              })
            );
          }
        } else {
          return throwError(error);
        }
      })
    );
  }
  
  public setAuth(data, next?, updateUser = true) : void{
    this.localStorage.setToken(data.authToken);
    this.localStorage.setUser(data.authInfo);
    if(updateUser){
      this.$authStatus.next(true);
      this.$authUser.next(data.authInfo);
    }
    if(next){
      timer(500).subscribe(() => {
        next()
      })
    }
  }

  public unsetAuth(): void {
    this.localStorage.removeToken()
    this.localStorage.removeUser();
    this.$authUser.next(null);
    this.$authStatus.next(false);
    this.router.navigateByUrl('');
  }

  public getAuthStatus(): Observable<boolean> {
    return this.$authStatus.asObservable()
  }

  public getAuthUser(): Observable<AuthInfo> {
    return this.$authUser.asObservable()
  }

  public login(data: LoginUserRequest, resFn, errFn): void {
    this.post<LoginUserRequest>(false,this.loginRoute, {}, data, (res) => {
      this.setAuth(res.data, resFn(res));
      
    }, errFn);
  }

  public loginSocial(data: LoginSocialUserRequest, resFn, errFn): void {
    this.post<LoginSocialUserRequest>(true,this.loginSocialRoute, {}, data, (res) => {
      this.setAuth(res.data, resFn(res));
    }, errFn);
  }

  public createUser(data: CreateUserRequest, resFn, errFn): void {
    this.post<CreateUserRequest>(false,this.createUserRoute, {}, data, (res) => {
      this.setAuth(res.data, resFn);
    }, errFn);
  }

  public updateUser(data: UpdateUserRequest, resFn, errFn, updateUser = true): void {
    this.post<UpdateUserRequest>(true,this.updateUserRoute, {}, data, (res) => {
      this.setAuth(res.data, resFn(res), updateUser);
    }, errFn)
  }

  // public updateUserFcmToken(data: UpdateUserFcmRequest, resFn, errFn): void {
  //   this.post<UpdateUserFcmRequest>(true,this.updateUserRoute, {}, data, (res) => {
  //     this.setAuth(res.data, resFn(res), false);
  //   }, errFn)
  // }

  // public updateNotificationStatus(data: UpdateUserNotificationStatusRequest, resFn, errFn): void {
  //   this.post<UpdateUserNotificationStatusRequest>(true,this.updateUserRoute, {}, data, (res) => {
  //     this.setAuth(res.data, resFn(res), true);
  //   }, errFn)
  // }

  public updateUserAvatar(file: File, resFn, errFn): void {
    const formData = new FormData();
    formData.append('avatar', file);
    this.post<FormData>(true, this.updateAvatarUserRoute, {}, formData, (res) => {
      this.setAuth(res.data, resFn(res));
    }, errFn);
  }

  public verificationAuthFieldsRequest(data: VerificationAuthFieldsRequest, resFn, errFn): void {
    this.post<VerificationAuthFieldsRequest>(false,this.verificationEmailRoute, {},data, resFn, errFn);
  }

  public generateRefreshPasswordCode(data: GenerateRefreshPasswordCodeRequest, resFn, errFn): void {
    this.post<GenerateRefreshPasswordCodeRequest>(false,this.generateRefreshPasswordCodeRoute, {}, data, resFn, errFn);
  }

  public checkRefreshPasswordCode(data: CheckRefreshPasswordCodeRequest, resFn, errFn): void {
    this.post<CheckRefreshPasswordCodeRequest>(false,this.checkRefreshPasswordCodeRoute, {}, data, resFn, errFn);
  }

  public refreshPassword(data: RefreshPasswordRequest, resFn, errFn): void {
    this.post<RefreshPasswordRequest>(false,this.refreshPasswordRoute, {}, data, resFn, errFn);
  }
  
  public refreshToken(request,next): Observable<HttpEvent<any>> {
    return this.post<any>(true, this.refreshTokenRoute, {}, {}, null, null, true).pipe(
      map((res: any) => {
        this.setAuth(res.data, () => {});
        return next.handle(request);
      }),
    );
  }

  public logout() : void {
    this.unsetAuth()
    // this.post(true,this.logoutRoute,{},{},(res) => {
    //   this.localStorage.removeToken();
    // }, (err) => {
    //   this.localStorage.removeToken();
    // });
  }

  public deleteAccount(resFn, errFn) : void {
    this.post(false,this.deleteUserRoute, {}, {}, resFn, errFn);
  }

}
