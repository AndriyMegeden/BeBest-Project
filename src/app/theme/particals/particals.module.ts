import { NgModule } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { NgxTranslateModule } from "src/app/_core/plugins/ngx-translate/ngx-translate.module";
import { BackButtonComponent } from "./back-button/back-button.component";
import { BottomMenuComponent } from "./bottom-menu/bottom-menu.component";
import { AddGoalControlComponent } from "./add-goal-control/add-goal-control.component";
import { GoalCategoryComponent } from "./goal-category/goal-category.component";
import { ListSwitcherComponent } from "./list-switcher/list-switcher.component";
import { ContentCardComponent } from "./content-card/content-card.component";
import { StepperComponent } from "./stepper/stepper.component";
import { HeadTitleComponent } from "./head-title/head-title.component";
import { AudioPlayerComponent } from "./audio-player/audio-player.component";
import { VideoPlayerComponent } from "./video-player/video-player.component";
import { AudioFileComponent } from "./audio-file/audio-file.component";
import { VideoFileComponent } from "./video-file/video-file.component";
import { ContentHeadlineComponent } from "./content-headline/content-headline.component";
import { ArticlePhotoComponent } from "./article-photo/article-photo.component";
import { CalendarComponent } from "./calendar/calendar.component";

@NgModule({
    imports: [
      CommonModule,
      RouterModule,
      IonicModule,
      NgxTranslateModule,
      RouterModule
    ],
    declarations: [
      CalendarComponent,
      BackButtonComponent,
      BottomMenuComponent,
      AddGoalControlComponent,
      GoalCategoryComponent,
      ListSwitcherComponent,
      ContentCardComponent,
      ContentHeadlineComponent,
      StepperComponent,
      HeadTitleComponent,
      AudioPlayerComponent,
      AudioFileComponent,
      VideoPlayerComponent,
      VideoFileComponent,
      ArticlePhotoComponent
    ],
    exports: [
      CalendarComponent,
      BackButtonComponent,
      BottomMenuComponent,
      AddGoalControlComponent,
      GoalCategoryComponent,
      ListSwitcherComponent,
      ContentCardComponent,
      ContentHeadlineComponent,
      StepperComponent,
      HeadTitleComponent,
      AudioPlayerComponent,
      AudioFileComponent,
      VideoPlayerComponent,
      VideoFileComponent,
      ArticlePhotoComponent
    ]
})
export class ParticalsModule {}
  