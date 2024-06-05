import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UserSettingsSubscriptionsComponent } from './user-settings-subscriptions.component';

describe('UserSettingsSubscriptionsComponent', () => {
  let component: UserSettingsSubscriptionsComponent;
  let fixture: ComponentFixture<UserSettingsSubscriptionsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ UserSettingsSubscriptionsComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(UserSettingsSubscriptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
