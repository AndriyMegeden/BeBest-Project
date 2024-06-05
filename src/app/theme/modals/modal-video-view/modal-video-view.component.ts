import { Component, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2, ViewChild } from '@angular/core';
import { Orientation } from '@interfaces/custom.interface';
import { ScreenOrientationService } from '@services/screen-orientation.service';
import { ModalController } from '@ionic/angular';
import { ContentMedia, ControlAction, MediaAction } from '@interfaces/media.interface';
import { VideoService } from '@services/video.service';
import { VideoPlayerService } from '@services/video.player.service';
@Component({
  selector: 'app-modal-video-view',
  templateUrl: './modal-video-view.component.html',
  styleUrls: ['./modal-video-view.component.scss'],
})
export class ModalVideoViewComponent  implements OnInit {

  @ViewChild('videoPlayer', { static: true }) videoPlayer: ElementRef;

  @Input() id: number;
  @Input() index: number;
  @Input() medias: ContentMedia[];
  @Input() currentTime: number;

  @Output() resolveEvent = new EventEmitter();

  public videoName: string;
  public videoPlayingAction: MediaAction = 'play';
  public videoControlAction: ControlAction;
  public countMedias: number;
  public formattedDuration: string;
  public duration: number;
  public formattedCurrentTime: string = '0';


  orientation!: Orientation;

  constructor(
    private screenOrientationService: ScreenOrientationService,
    private videoService: VideoService,
    private videoPlayerService: VideoPlayerService,
    private renderer: Renderer2,
  ) { }

  ngOnInit() {
    this.videoName = this.medias[this.index].contentName;
    this.countMedias = this.medias.length;
    this.load(this.medias[this.index].media);
    this.screenOrientationService.getScreenOrientation().subscribe((res) => {
      this.orientation = res;
    })
  }

  play(){
    this.videoService.playVideo()
    this.videoPlayingAction = 'pause';
    this.videoPlayerService.next({
      id: this.id,
      videoName: this.videoName,
      videoPlayingAction: this.videoPlayingAction,
      videoControlAction: this.videoControlAction,
    }) 
  }

  pause(){
    this.videoService.pauseVideo()
    this.videoPlayingAction = 'play';
    this.videoPlayerService.next({
      id: this.id,
      videoName: this.videoName,
      videoPlayingAction: this.videoPlayingAction,
      videoControlAction: this.videoControlAction,
    })
  }

  async next(){
    this.videoPlayingAction = 'pause';
    this.videoControlAction = 'next';
    this.id = this.id >= this.countMedias ? 1 : this.id + 1;
    this.index = this.id - 1;
    this.load(this.medias[this.index].media);
    this.videoService.playVideo()
    this.videoPlayerService.next({
      id: this.id,
      videoName: this.videoName,
      videoPlayingAction: this.videoPlayingAction,
      videoControlAction: this.videoControlAction,
    })
  }

  prev(){
    this.videoPlayingAction = 'pause';
    this.videoControlAction = 'prev';
    this.id = this.id <= 1 ? this.countMedias : this.id - 1;
    this.index = this.id - 1;
    this.load(this.medias[this.index].media);
    this.videoService.playVideo()
    this.videoPlayerService.next({
      id: this.id,
      videoName: this.videoName,
      videoPlayingAction: this.videoPlayingAction,
      videoControlAction: this.videoControlAction,
    })
  }

  async load(media){
    this.formattedCurrentTime = '0:0';
    this.videoService.loadVideo(media).then(() => {
      this.duration = this.videoService.duration;
      this.formattedDuration = this.videoService.formattedDuration;
      this.renderer.appendChild(this.videoPlayer.nativeElement, this.videoService.video);
      this.videoService.video.currentTime = this.currentTime;
      this.videoService.video.addEventListener('timeupdate', (time) => {
        const currentTime = this.videoService.video.currentTime;
        const minutes = Math.floor(currentTime / 60);
        const seconds = Math.floor(currentTime % 60);
        const formattedTime = `${minutes}:${seconds}`;
        this.formattedCurrentTime = formattedTime;
        this.currentTime = Math.round(currentTime);
      });
    });
  }

  closeModal() {
    this.resolveEvent.emit({
      id: this.id,
      index: this.index,
      currentTime: this.currentTime
    })
  }
  
}
