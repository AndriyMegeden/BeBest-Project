import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { AudioPage } from './audio.page';

describe('AudioPage', () => {
  let component: AudioPage;
  let fixture: ComponentFixture<AudioPage>;

  beforeEach(waitForAsync () => {
    fixture = TestBed.createComponent(AudioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
