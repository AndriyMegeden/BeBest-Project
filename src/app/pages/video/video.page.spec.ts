import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { VideoPage } from './video.page';

describe('VideoPage', () => {
  let component: VideoPage;
  let fixture: ComponentFixture<VideoPage>;

  beforeEach(waitForAsync () => {
    fixture = TestBed.createComponent(VideoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
