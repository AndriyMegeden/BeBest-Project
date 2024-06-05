import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { Router } from "@angular/router";
import { Capacitor } from "@capacitor/core";
import { PushNotifications } from "@capacitor/push-notifications";
import { AuthService } from "@core/auth-service/services/auth.service";
import { HttpErrorService } from "@core/auth-service/services/http-error.service";
import { SystemArticleType } from "@interfaces/custom.interface";
import { AuthInfo } from "@interfaces/user.interface";
import { GlassfyService } from "@services/glassfy.service";
import { ToastService } from "@services/toast.service";
import {
  rateAndroidAppLink,
  rateIosAppLink,
  systemArticle,
} from "@static/custom.settings";

@Component({
  selector: "app-user-settings",
  templateUrl: "./user-settings.component.html",
  styleUrls: ["./user-settings.component.scss"],
})
export class UserSettingsComponent implements OnInit {
  @Output() onLogout = new EventEmitter();
  @Output() onDeleteAccount = new EventEmitter();

  public authInfo: AuthInfo;
  public systemArticle: { key: SystemArticleType; categoryId: number }[] =
    systemArticle;
  public notificationStatus: boolean;
  public notificationDisabled: boolean;
  public rateLink: string;
  public isIOS: boolean;
  public subscription: { pro: boolean } = null;

  constructor(
    private router: Router,
    private authService: AuthService,
    private toastService: ToastService,
    private httpErrorService: HttpErrorService,
    private glassfyService: GlassfyService
  ) {}

  async ngOnInit() {
    this.authService.getAuthUser().subscribe(async (user) => {
      if (user) {
        this.authInfo = user;
        this.notificationStatus = this.authInfo.notificationStatus || false;
        this.notificationDisabled =
      (await PushNotifications.checkPermissions()).receive !== "granted"
        ? true
        : false;
        console.log("notificationStatus", 'user settings');
        console.log(this.notificationStatus, 'user settings status');
        console.log(this.notificationDisabled, 'user settings disabled');
      }
    });
    this.subscription = this.glassfyService.getSubscriptionStatus();
    this.notificationDisabled =
      (await PushNotifications.checkPermissions()).receive !== "granted"
        ? true
        : false;

    if (Capacitor.getPlatform() === "ios") {
      this.rateLink = rateIosAppLink;
      this.isIOS = true;
    } else {
      this.rateLink = rateAndroidAppLink;
      this.isIOS = false;
    }

    this.notificationStatus = !this.notificationDisabled;
  }

  async changeNotificationStatus(
    event,
    valueType: "event" | "boolean" = "event"
  ) {
    console.log("change");

    this.notificationStatus =
      valueType === "event" ? event.detail.checked : event;
    this.authService.updateUser(
      { authInfo: { notificationStatus: this.notificationStatus } },
      (res) => {
        console.log(res);
      },
      async (error) => {
        const statusCode = error.error.error.statusCode;
        await this.toastService.showErrorToast(
          await this.httpErrorService.getError(statusCode)
        );
      },
      true
    );
  }

  public logout() {
    this.onLogout.emit();
  }

  public deleteAccount() {
    this.onDeleteAccount.emit();
  }

  openLink(link: string) {
    window.open(link);
  }

  navigate(article: { categoryId: number }) {
    this.router.navigate([`/article`], {
      state: { categoryId: article.categoryId, articleType: "system" },
    });
  }
}
