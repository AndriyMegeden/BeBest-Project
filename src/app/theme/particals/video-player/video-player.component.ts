import { Component, ElementRef, Input, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ContentFullScreen, ContentMedia, ControlAction, MediaAction } from '@interfaces/media.interface';
import { ModalService } from '@services/modal.service';
import { VideoPlayerService } from '@services/video.player.service';
import { VideoService } from '@services/video.service';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.scss'],
})
export class VideoPlayerComponent  implements OnInit {

  @Input() medias: ContentMedia[];

  @ViewChild('videoPlayer', { static: true }) videoPlayer: ElementRef;

  public id: number;
  public index: number;
  public videoName: string;
  public videoPlayingAction: MediaAction = 'play';
  public videoControlAction: ControlAction;
  public countMedias: number;
  public formattedDuration: string;
  public duration: number;
  public formattedCurrentTime: string = '0';
  public currentTime: number = 0;
  
  private modalOpen: boolean = false;
  
  constructor(
    private modalService: ModalService,
    private videoService: VideoService,
    private videoPlayerService: VideoPlayerService,
    private renderer: Renderer2,
  ) {}

  ngOnInit() {
    this.id = 1;
    this.index = this.id - 1;
    this.videoName = this.medias[this.index].contentName;
    this.countMedias = this.medias.length;
    this.load(this.medias[this.index].media);
    this.videoPlayerService.getCurrentVideoObservable().subscribe(res => {
      if(res && !this.modalOpen){
        if(res.videoPlayingAction === 'pause' || res.videoPlayingAction === 'play'){
          if(res.id === this.id){
            if(res.videoPlayingAction === 'pause'){
              this.videoService.playVideo()
              this.videoPlayingAction = 'pause';
            }
            else if(res.videoPlayingAction === 'play'){
              this.videoService.pauseVideo()
              this.videoPlayingAction = 'play';
            }
          }
          
          else if(res.id !== this.id){
            if(res.videoPlayingAction === 'pause'){
              this.id = res.id;
              this.index = res.id - 1;
              this.load(this.medias[this.index].media);
              this.videoService.playVideo()
              this.videoPlayingAction = 'pause';
            }
          }
        }
      }
    })
  }

  play(){
    this.videoService.playVideo()
    this.videoPlayingAction = 'pause';
    this.videoPlayerService.playVideoSubject({
      id: this.id,
      videoName: this.videoName,
      videoPlayingAction: this.videoPlayingAction,
      videoControlAction: null,
    }) 
  }

  pause(){
    this.videoService.pauseVideo()
    this.videoPlayingAction = 'play';
    this.videoPlayerService.pauseVideoSubject({
      id: this.id,
      videoName: this.videoName,
      videoPlayingAction: this.videoPlayingAction,
      videoControlAction: null,
    })
  }

  next(){
    this.videoPlayingAction = 'pause';
    this.videoControlAction = 'next';
    this.id = this.id >= this.countMedias ? 1 : this.id + 1;
    this.index = this.id - 1;
    this.load(this.medias[this.index].media);
    this.videoService.playVideo()
    this.videoPlayerService.next({
      id: this.id ,
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

  async toggleFullScreen() {
    const config: ContentFullScreen = {
      id: this.id,
      index: this.index,
      medias: this.medias,
      currentTime: this.currentTime,
    }
    this.modalOpen = true;
    await this.modalService.openVideoViewModal(config, (res) => {
      this.modalOpen = false;
      this.id = res.id;
      this.videoPlayingAction = 'play';
      this.videoPlayerService.pauseVideoSubject({
        id: this.id,
        videoName: this.videoName,
        videoPlayingAction: this.videoPlayingAction,
        videoControlAction: null,
      })
      this.index = res.index;
      this.load(this.medias[this.index].media, res.currentTime);
    })
  }

  load(media, currentTime = 0){
    this.formattedCurrentTime = '0:0';
    this.videoService.loadVideo(media).then(() => {
      this.duration = this.videoService.duration;
      this.formattedDuration = this.videoService.formattedDuration;
      this.renderer.appendChild(this.videoPlayer.nativeElement, this.videoService.video);
      this.videoService.video.currentTime = currentTime;
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

}
