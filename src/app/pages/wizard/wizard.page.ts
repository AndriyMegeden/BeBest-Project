import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UpdateUserAuthInfoRequest, UpdateUserRequest } from '@core/auth-service/dto/user.dto';
import { AuthService } from '@core/auth-service/services/auth.service';
import { HttpErrorService } from '@core/auth-service/services/http-error.service';
import { LocalStorageService } from '@core/auth-service/services/localstorage.service';
import { WizardEvent, WizardType } from '@interfaces/custom.interface';
import { ToastService } from '@services/toast.service';
import { wizardSteps } from '@static/custom.settings';
import { BehaviorSubject, timer } from 'rxjs';

@Component({
  selector: 'app-wizard',
  templateUrl: './wizard.page.html',
  styleUrls: ['./wizard.page.scss'],
})
export class WizardPage implements OnInit {

  public isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);

  public $currentStep: BehaviorSubject<WizardEvent> = new BehaviorSubject({
    type: wizardSteps[0],
    index: 0
  })

  public $formValid: BehaviorSubject<boolean> = new BehaviorSubject(null)

  constructor(
    private router: Router,
    private authService: AuthService,
    private httpErrorService: HttpErrorService,
    private toastService: ToastService,
  ) { }

  ngOnInit() {
    if (this.isIOS) {
      document.body.classList.add('safe--area');
    } else {
      document.body.classList.remove('safe--area');
    }
  }

  changeStep(event){
    this.$currentStep.next({
      type: event.type,
      index: event.index
    })
  }

  skipStep(event){
    this.$currentStep.next({
      type: event.type,
      index: event.index
    })
  }

  formValid(event){
    this.$formValid.next(event)
  }

  getData(event){
    const updateUserAuthInfoRequest: UpdateUserAuthInfoRequest = {
      phoneNumber: event.phoneNumber,
      dateBirth: event.dateBirth,
      location: event.location,
      facebook: event.facebook,
      instagram: event.instagram,
      telegram: event.telegram,
    }

    const updateUserRequest: UpdateUserRequest = {
      authInfo: updateUserAuthInfoRequest
    }

    this.authService.updateUser(updateUserRequest,(result) => {
      this.router.navigateByUrl('/main')
    }, 
    async (error) => {
      const statusCode = error.error.error.statusCode;
      await this.toastService.showErrorToast(await this.httpErrorService.getError(statusCode));
    })
  }

}
