import { NgModule } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { NgxTranslateModule } from "src/app/_core/plugins/ngx-translate/ngx-translate.module";
import { ModalChoseCategoryComponent } from "./modal-chose-category/modal-chose-category.component";
import { ModalAddCategoryComponent } from "./modal-add-category/modal-add-category.component";
import { ParticalsModule } from "@theme/particals/particals.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ModalActionComponent } from "./modal-action/modal-action.component";
import { ModalVideoViewComponent } from "./modal-video-view/modal-video-view.component";

@NgModule({
    imports: [
      CommonModule,
      RouterModule,
      IonicModule,
      NgxTranslateModule,
      RouterModule,
      FormsModule,
      ReactiveFormsModule,
      ParticalsModule,
    ],
    declarations: [
      ModalChoseCategoryComponent,
      ModalAddCategoryComponent,
      ModalActionComponent,
      ModalVideoViewComponent
    ],
    exports: [
      ModalChoseCategoryComponent,
      ModalAddCategoryComponent,
      ModalActionComponent,
      ModalVideoViewComponent
    ]
})
export class ModalsModule {}
  