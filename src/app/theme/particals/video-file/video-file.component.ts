import { Component, Input, OnInit } from "@angular/core";
import { MediaAction } from "@interfaces/media.interface";
import { AudioService } from "@services/audio.service";
import { VideoPlayerService } from "@services/video.player.service";
import { VideoService } from "@services/video.service";

@Component({
  selector: "app-video-file",
  templateUrl: "./video-file.component.html",
  styleUrls: ["./video-file.component.scss"],
})
export class VideoFileComponent implements OnInit {

  @Input() id: number;
  @Input() contentName: string;
  @Input() media: string;

  public videoPlayingAction: MediaAction = 'play';

  constructor(
    private videoPlayerService: VideoPlayerService
  ) {}

  async ngOnInit() {
    this.videoPlayerService.getCurrentVideoObservable().subscribe((res) => {
      if(res){
        if(res.id === this.id){
          if(res.videoControlAction === 'next' || res.videoControlAction === 'prev'){
            this.videoPlayingAction = 'pause';
          }
          if(res.videoPlayingAction === 'play' || res.videoPlayingAction === 'pause'){
            if(res.videoPlayingAction === 'play'){
              this.videoPlayingAction = 'play';
            }
            if(res.videoPlayingAction === 'pause'){
              this.videoPlayingAction = 'pause';
            }
          }
        }
        else{
          this.videoPlayingAction = 'play';
        }
      }
    })
  }

  play(){
    this.videoPlayingAction = 'pause';
    this.videoPlayerService.playVideoSubject({
      id: this.id,
      videoName: this.contentName,
      videoPlayingAction: this.videoPlayingAction,
      videoControlAction: null,
    })
  }

  pause(){
    this.videoPlayingAction = 'play';
    this.videoPlayerService.pauseVideoSubject({
      id: this.id,
      videoName: this.contentName,
      videoPlayingAction: this.videoPlayingAction,
      videoControlAction: null,
    })
  }

}
