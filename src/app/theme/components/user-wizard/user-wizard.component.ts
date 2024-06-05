import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { AuthService } from "@core/auth-service/services/auth.service";
import { HttpErrorService } from "@core/auth-service/services/http-error.service";
import { WizardEvent, WizardSettings, WizardType } from "@interfaces/custom.interface";
import { ToastService } from "@services/toast.service";
import { wizardStep1, wizardStep2, wizardStep3, wizardStep4, wizardStep5, wizardSteps } from "@static/custom.settings";
import { Observable } from "rxjs";


@Component({
  selector: "app-user-wizard",
  templateUrl: "./user-wizard.component.html",
  styleUrls: ["./user-wizard.component.scss"],
})
export class UserWizardComponent implements OnInit {

  @Input() page: Observable<WizardEvent>
  @Output() private onSkipStep: EventEmitter<WizardEvent> = new EventEmitter<WizardEvent>();
  @Output() private onFormValid: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() private onGetData: EventEmitter<any> = new EventEmitter<any>();

  public steps: Array<WizardType> = wizardSteps;
  public currentMode: WizardSettings;
  public currentModeIndex: number = 0;
  public type: WizardType;
  public form: FormGroup;

  private phoneNumber: string = null;
  public avatar: string = null;
  private dateBirth: Date = null;
  private location: string = null;
  private facebook: string = null;
  private instagram: string = null;
  private telegram: string = null;

  constructor(
    private authService: AuthService,
    private httpErrorService: HttpErrorService,
    private toastService: ToastService
  ) {}

  ngOnInit() {
    this.page.subscribe(res => {
      this.currentModeIndex = res.index;
      this.type = res.type;
      this.setCurrentMode(res.type);
    })
  }

  setCurrentMode(type: WizardType){
    if(type === 'wizard-step-1'){
      delete this.form;
      this.currentMode = wizardStep1;
      this.createForm();
      
      if(this.phoneNumber){
        this.form.get('phoneNumber').setValue(this.phoneNumber);
        this.onFormValid.emit(true);
      }
      else{
        this.onFormValid.emit(false);
      }
    }
    if(type === 'wizard-step-2'){
      this.phoneNumber = this.form.value.phoneNumber;
      delete this.form;
      this.currentMode = wizardStep2;
      this.createForm()
      if(this.avatar){
        this.form.get('avatar').setValue(this.avatar);
        this.onFormValid.emit(true);
      }
      else{
        this.onFormValid.emit(false);
      }
    }
    if(type === 'wizard-step-3'){
      this.avatar = this.avatar || this.avatar !== '' ? this.avatar : '' ;
      delete this.form;
      this.currentMode = wizardStep3;
      this.createForm()

      console.log(this.form.value);
      console.log(this.form.valid);
      console.log(this.dateBirth);
      
      if(this.dateBirth){
        this.form.get('dateBirth').setValue(new Date(this.dateBirth).toISOString());
        this.onFormValid.emit(true);
      }
      else{
        this.onFormValid.emit(false);
      }
    }
    if(type === 'wizard-step-4'){
      this.dateBirth = this.form.value.dateBirth;
      delete this.form;
      this.currentMode = wizardStep4;
      this.createForm()
      if(this.location){
        this.form.get('location').setValue(this.location);
        this.onFormValid.emit(true);
      }
      else{
        this.onFormValid.emit(false);
      }
    }
    if(type === 'wizard-step-5'){
      this.location = this.form.value.location;
      delete this.form;
      this.currentMode = wizardStep5;
      this.createForm()
      if(this.facebook || this.instagram || this.telegram){
        if(this.facebook){
          this.form.get('facebook').setValue(this.facebook);
        }
        if(this.facebook){
          this.form.get('instagram').setValue(this.instagram);
        }
        if(this.facebook){
          this.form.get('telegram').setValue(this.telegram);
        }
        this.onFormValid.emit(true);
      }
      else{
        this.onFormValid.emit(false);
      }
    }
    if(type === 'completed'){
      this.facebook = this.form.value.facebook;
      this.instagram = this.form.value.instagram;
      this.telegram = this.form.value.telegram;
      this.onGetData.emit({
        phoneNumber: this.phoneNumber ? this.phoneNumber : null,
        avatar: this.avatar ? this.avatar : null,
        dateBirth: this.dateBirth ? this.dateBirth : null,
        location: this.location ? this.location : null,
        facebook: this.facebook ? this.facebook : null,
        instagram: this.instagram ? this.instagram : null,
        telegram: this.telegram ? this.telegram : null
      })
    }

    this.form.valueChanges.subscribe(() => {
      if (this.form.valid) {
        // Форма стала валидной, вызываем событие и передаем его снаружи компонента
        this.onFormValid.emit(true);
      } else {
        // Форма больше не валидна, вызываем событие и передаем его снаружи компонента
        this.onFormValid.emit(false);
      }
    });
    if(this.form.valid){
      this.onFormValid.emit(true);
    }
  }

  createForm() {
    const formControlsConfig = {};
    this.currentMode.fields.forEach(field => {
      if(field.fieldId === 'phoneNumber'){
        if(this.phoneNumber){
          field.value = this.phoneNumber;
        }
      }
      if(field.fieldId === 'avatar'){
        if(this.avatar){
          field.value = this.avatar;
        }
      }
      if(field.fieldId === 'dateBirth'){
        if(this.dateBirth){
          field.value = new Date(this.dateBirth).toISOString();
        }
      }
      if(field.fieldId === 'location'){
        if(this.location){
          field.value = this.location;
        }
      }
      if(field.fieldId === 'facebook'){
        if(this.facebook){
          field.value = this.facebook;
        }
      }
      if(field.fieldId === 'instagram'){
        if(this.instagram){
          field.value = this.instagram;
        }
      }
      if(field.fieldId === 'telegram'){
        if(this.telegram){
          field.value = this.telegram;
        }
      }
      formControlsConfig[field.fieldId] = new FormControl(field.value, field.validators);
    });

    this.form = new FormGroup(formControlsConfig);
  }

  checkFormValidity() {
    if (this.form && this.form.valid) {
      this.onFormValid.emit(true); // Форма стала валидной, генерируем событие
    } else {
      this.onFormValid.emit(false); // Форма больше не валидна, генерируем событие
    }
  }

  check(type: 'sections' | 'fields', id: string){
    if(type === 'sections'){
      if(this.currentMode.sections.includes(id)){
        return true;
      } else {
        return false;
      }
    }
  
    if(type === 'fields'){
      const foundField = this.currentMode.fields.find(field => field.fieldId === id);
      return !!foundField; // Вернуть true, если поле было найдено, иначе false
    }
  }

  skipStep(){
    if(this.type === 'completed'){
      this.onGetData.emit({
        phoneNumber: this.phoneNumber ? this.phoneNumber : null,
        avatar: this.avatar ? this.avatar : null,
        dateBirth: this.dateBirth ? this.dateBirth : null,
        location: this.location ? this.location : null,
        facebook: this.facebook ? this.facebook : null,
        instagram: this.instagram ? this.instagram : null,
        telegram: this.telegram ? this.telegram : null
      })
    }
    else{
      this.currentModeIndex = this.currentModeIndex + 1;
      this.setCurrentMode(this.steps[this.currentModeIndex])
      this.onSkipStep.emit({
        type: this.steps[this.currentModeIndex],
        index: this.currentModeIndex
      })
    }
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.authService.updateUserAvatar(file, (res) => {
        this.avatar = res.data.authInfo.avatar
        this.form.get('avatar').setValue(this.avatar);
      },
      async (error) => {
        const statusCode = error.error.error.statusCode;
        await this.toastService.showErrorToast(await this.httpErrorService.getError(statusCode));
      })
    }
  }

}
