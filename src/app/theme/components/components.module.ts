import { NgModule } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { AuthComponent } from "./auth/auth.component";
import { UserSettingsComponent } from "./user-settings/user-settings.component";
import { UserSettingsLanguageComponent } from "./user-settings-language/user-settings-language.component";
import { UserSettingsSubscriptionsComponent } from "./user-settings-subscriptions/user-settings-subscriptions.component";
import { ContentArticleComponent } from "@theme/particals/content-article/content-article.component";
import { DoughnutChartDayComponent } from "./doughnut-chart-day/doughnut-chart-day.component";
import { GoalViewSuccessComponent } from "./goal-view-success/goal-view-success.component";
import { GoalViewProgressComponent } from "./goal-view-progress/goal-view-progress.component";
import { GoalCardComponent } from "./goal-card/goal-card.component";
import { GoalNewEditComponent } from "./goal-new-edit/goal-new-edit.component";
import { UserWizardComponent } from "./user-wizard/user-wizard.component";
import { UserSettingsProfileEditComponent } from "./user-settings-profile-edit/user-settings-profile-edit.component";
import { UserSettingsProfileComponent } from "./user-settings-profile/user-settings-profile.component";
import { NgxTranslateModule } from "@core/plugins/ngx-translate/ngx-translate.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { DirectivesModule } from "src/app/directives/directives.module";

@NgModule({
    imports: [
      CommonModule,
      RouterModule,
      IonicModule,
      NgxTranslateModule,
      FormsModule,
      ReactiveFormsModule,
      DirectivesModule
    ],
    declarations: [
      AuthComponent,
      UserSettingsComponent,
      UserSettingsLanguageComponent,
      UserSettingsSubscriptionsComponent,
      UserSettingsProfileComponent,
      UserSettingsProfileEditComponent,
      UserWizardComponent,
      GoalNewEditComponent,
      GoalCardComponent,
      GoalViewProgressComponent,
      GoalViewSuccessComponent,
      ContentArticleComponent,
      DoughnutChartDayComponent,
    ],
    exports: [
      AuthComponent,
      UserSettingsComponent,
      UserSettingsLanguageComponent,
      UserSettingsSubscriptionsComponent,
      UserSettingsProfileComponent,
      UserSettingsProfileEditComponent,
      UserWizardComponent,
      GoalNewEditComponent,
      GoalCardComponent,
      GoalViewProgressComponent,
      GoalViewSuccessComponent,
      ContentArticleComponent,
      DoughnutChartDayComponent,
    ]
})
export class ComponentsModule {}
  