import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CalendarTodayPage } from './calendar-today.page';

describe('CalendarTodayPage', () => {
  let component: CalendarTodayPage;
  let fixture: ComponentFixture<CalendarTodayPage>;

  beforeEach(waitForAsync () => {
    fixture = TestBed.createComponent(CalendarTodayPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
