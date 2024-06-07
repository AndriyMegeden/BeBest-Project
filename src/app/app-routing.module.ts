import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "@core/auth-service/guards/auth.guard";

const routes: Routes = [
  // Not auth page
  {
    path: "",
    redirectTo: "",
    pathMatch: "full",
  },
  {
    path: "",
    loadChildren: () =>
      import("./pages/login/login.module").then((m) => m.LoginPageModule),
    data: {
      loader: true,
    },
  },
  {
    path: "register",
    loadChildren: () =>
      import("./pages/register/register.module").then(
        (m) => m.RegisterPageModule
      ),
  },
  {
    path: "forgot-password",
    loadChildren: () =>
      import("./pages/forgot-password/forgot-password.module").then(
        (m) => m.ForgotPasswordPageModule
      ),
  },
  // Auth page
  {
    path: "main",
    loadChildren: () =>
      import("./pages/main/main.module").then((m) => m.MainPageModule),
    // canActivate: [AuthGuard],
    data: {
      navbar: true,
      loader: true,
      loaderTimeOut: 0,
    },
  },
  {
    path: "calendar-progress",
    loadChildren: () =>
      import("./pages/calendar-progress/calendar-progress.module").then(
        (m) => m.CalendarProgressPageModule
      ),
    canActivate: [AuthGuard],
    data: {
      loader: true,
    },
  },
  {
    path: "settings-language",
    loadChildren: () =>
      import("./pages/settings-language/settings-language.module").then(
        (m) => m.SettingsLanguagePageModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: "settings-subscriptions",
    loadChildren: () =>
      import(
        "./pages/settings-subscriptions/settings-subscriptions.module"
      ).then((m) => m.SettingsSubscriptionsPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: "settings-profile",
    loadChildren: () =>
      import("./pages/settings-profile/settings-profile.module").then(
        (m) => m.SettingsProfilePageModule
      ),
    canActivate: [AuthGuard],
    data: {
      navbar: true,
    },
  },
  {
    path: "settings-profile-edit",
    loadChildren: () =>
      import("./pages/settings-profile-edit/settings-profile-edit.module").then(
        (m) => m.SettingsProfileEditPageModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: "settings",
    loadChildren: () =>
      import("./pages/settings/settings.module").then(
        (m) => m.SettingsPageModule
      ),
    canActivate: [AuthGuard],
    data: {
      navbar: true,
    },
  },
  {
    path: "goal-view",
    loadChildren: () =>
      import("./pages/goal-view/goal-view.module").then(
        (m) => m.GoalViewPageModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: "goals-list",
    loadChildren: () =>
      import("./pages/goals-list/goals-list.module").then(
        (m) => m.GoalsListPageModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: "goals-today",
    loadChildren: () =>
      import("./pages/goals-today/goals-today.module").then(
        (m) => m.GoalsTodayPageModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: "add-goal",
    loadChildren: () =>
      import("./pages/add-goal/add-goal.module").then(
        (m) => m.AddGoalPageModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: "goal-complete",
    loadChildren: () =>
      import("./pages/goal-complete/goal-complete.module").then(
        (m) => m.GoalCompletePageModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: "video",
    loadChildren: () =>
      import("./pages/video/video.module").then((m) => m.VideoPageModule),
    canActivate: [AuthGuard],
    data: {
      loader: true,
    },
  },
  {
    path: "article",
    loadChildren: () =>
      import("./pages/article/article.module").then((m) => m.ArticlePageModule),
    canActivate: [AuthGuard],
    data: {
      loader: true,
      loaderTimeOut: 700,
    },
  },
  {
    path: "audio",
    loadChildren: () =>
      import("./pages/audio/audio.module").then((m) => m.AudioPageModule),
    canActivate: [AuthGuard],
    data: {
      loader: true,
    },
  },
  {
    path: "wizard",
    loadChildren: () =>
      import("./pages/wizard/wizard.module").then((m) => m.WizardPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: "calendar-today",
    loadChildren: () =>
      import("./pages/calendar-today/calendar-today.module").then(
        (m) => m.CalendarTodayPageModule
      ),
    canActivate: [AuthGuard],
    data: {
      navbar: true,
      loader: true,
    },
  },
  {
    path: "content-list",
    loadChildren: () =>
      import("./pages/content-list/content-list.module").then(
        (m) => m.ContentListPageModule
      ),
    canActivate: [AuthGuard],
    data: {
      loader: true,
    },
  },
  {
    path: "article-list",
    loadChildren: () =>
      import("./pages/article-list/article-list.module").then(
        (m) => m.ArticleListPageModule
      ),
    data: {
      loader: true,
    },
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
