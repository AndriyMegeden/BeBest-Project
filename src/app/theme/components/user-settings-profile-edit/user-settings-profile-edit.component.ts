import { Component,  EventEmitter,  Input,  OnInit, Output,  } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '@core/auth-service/services/auth.service';
import { HttpErrorService } from '@core/auth-service/services/http-error.service';
import { AuthInfo } from '@interfaces/user.interface';
import { ToastService } from '@services/toast.service';

@Component({
  selector: 'app-user-settings-profile-edit',
  templateUrl: './user-settings-profile-edit.component.html',
  styleUrls: ['./user-settings-profile-edit.component.scss'],
})

export class UserSettingsProfileEditComponent implements OnInit {

  @Output() onGetData = new EventEmitter()

  public authInfo: AuthInfo = {};
  public form: FormGroup;

  constructor(
    private authService: AuthService,
    private httpErrorService: HttpErrorService,
    private toastService: ToastService
  ) {}

  ngOnInit() {
    this.form = new FormGroup({
      firstName: new FormControl('',[Validators.required, Validators.minLength(3)]),
      phoneNumber: new FormControl('', [Validators.minLength(19)]),
      dateBirth: new FormControl('',),
      location: new FormControl('', [Validators.minLength(4)]),
      facebook: new FormControl('', [Validators.minLength(4)]),
      instagram: new FormControl('', [Validators.minLength(4)]),
      telegram: new FormControl('', [Validators.minLength(4)]),
    })

    this.authService.getAuthUser().subscribe((user: AuthInfo) => {
      if(user){
        this.authInfo.firstName = user.firstName || '';
        this.authInfo.phoneNumber = user.phoneNumber || '';
        this.authInfo.avatar = user.avatar !== null ? user.avatar : '/assets/images/default-avatar.png';
        this.authInfo.dateBirth = user.dateBirth || null;
        this.authInfo.location = user.location || '';
        this.authInfo.facebook = user.facebook || '';
        this.authInfo.instagram = user.instagram || '';
        this.authInfo.telegram = user.telegram || '';
        this.form.patchValue(this.authInfo)
      }
    })
  }

  getData(){
    this.onGetData.emit({
      firstName: this.form.value.firstName ? this.form.value.firstName: null,
      phoneNumber: this.form.value.phoneNumber ? this.form.value.phoneNumber : null,
      avatar: this.form.value.avatar ? this.form.value.avatar : null,
      dateBirth: this.form.value.dateBirth ? this.form.value.dateBirth : null,
      location: this.form.value.location ? this.form.value.location : null,
      facebook: this.form.value.facebook ? this.form.value.facebook : null,
      instagram: this.form.value.instagram ? this.form.value.instagram : null,
      telegram: this.form.value.telegram ? this.form.value.telegram : null
    })
  }


  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.authService.updateUserAvatar(file,
      (res) => {},
      async (error) => {
        const statusCode = error.error.error.statusCode;
        await this.toastService.showErrorToast(await this.httpErrorService.getError(statusCode));
      })
    }
  }


  formHeight = '1000px';
  isFormHeightAdjusted = false;
  onInputFocus() {
    if (!this.isFormHeightAdjusted) {
      this.formHeight = '1300px';
      this.isFormHeightAdjusted = true;
    }
  }
  onInputBlur() {
    this.isFormHeightAdjusted = false;
    this.formHeight = '1000px'; // Возвращаем форму к начальным размерам
  }

}