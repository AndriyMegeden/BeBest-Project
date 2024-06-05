import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DoughnutChartDayComponent } from './doughnut-chart-day.component';

describe('DoughnutChartDayComponent', () => {
  let component: DoughnutChartDayComponent;
  let fixture: ComponentFixture<DoughnutChartDayComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DoughnutChartDayComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DoughnutChartDayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
