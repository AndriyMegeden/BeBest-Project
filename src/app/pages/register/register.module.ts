import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { RegisterPageRoutingModule } from './register-routing.module';
import { RegisterPage } from './register.page';
import { ComponentsModule } from '@theme/components/components.module';
import { LocalStorageService } from '@core/auth-service/services/localstorage.service';
import { AuthService } from '@core/auth-service/services/auth.service';
import { RestApiService } from '@core/auth-service/services/rest-api.service';
import { LayoutsModule } from '@theme/layouts/layouts.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegisterPageRoutingModule,
    ComponentsModule,
    LayoutsModule
  ],
  declarations: [RegisterPage],
})
export class RegisterPageModule {}
