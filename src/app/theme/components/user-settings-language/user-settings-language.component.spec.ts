import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UserSettingsLanguageComponent } from './user-settings-language.component';

describe('UserSettingsLanguageComponent', () => {
  let component: UserSettingsLanguageComponent;
  let fixture: ComponentFixture<UserSettingsLanguageComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ UserSettingsLanguageComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(UserSettingsLanguageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
