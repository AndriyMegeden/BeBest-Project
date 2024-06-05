import { NgModule } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { ParticalsModule } from "@theme/particals/particals.module";
import { MainLayoutComponent } from "./main-layout/main-layout.component";
import { ListLayoutComponent } from "./list-layout/list-layout.component";
import { NgxTranslateModule } from "@core/plugins/ngx-translate/ngx-translate.module";
import { SliderLayoutComponent } from "./slider-layout/slider-layout.component";

@NgModule({
    imports: [
      CommonModule,
      RouterModule,
      IonicModule,
      ParticalsModule,
      NgxTranslateModule,
    ],
    declarations: [
      MainLayoutComponent,
      ListLayoutComponent,
      SliderLayoutComponent,
    ],
    exports: [
      MainLayoutComponent,
      ListLayoutComponent,
      SliderLayoutComponent,
    ]
})
export class LayoutsModule {}
  