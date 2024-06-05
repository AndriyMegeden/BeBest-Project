import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from "@angular/core";
import { ControlAction, MediaAction } from "@interfaces/media.interface";
import { AudioPlayerService } from "@services/audio.player.service";
import { AudioService } from "@services/audio.service";
import { Subscription, of } from "rxjs";
import { startWith, switchMap } from "rxjs/operators";

@Component({
  selector: "app-audio-player",
  templateUrl: "./audio-player.component.html",
  styleUrls: ["./audio-player.component.scss"],
})
export class AudioPlayerComponent implements OnInit {
  @Input() countMedias: number;
  @Output() onShowList: EventEmitter<boolean> = new EventEmitter<boolean>();
  @ViewChild("rangeInput", { static: false })
  rangeInput: ElementRef<HTMLInputElement>;
  // @ViewChild("rangeInput") rangeInput: ElementRef<HTMLInputElement>;
  private getCurrentAudioSubscription: Subscription;
  private getCurrentAudioDataSubscription: Subscription;
  private getCurrentTimeSubscription: Subscription;

  constructor(
    private audioPlayerService: AudioPlayerService,
    public audioService: AudioService
  ) {}

  public id: number;
  public audioName: string;
  public audioPlayingAction: MediaAction = "play";
  public audioControlAction: ControlAction;
  public formattedDuration: string;
  public duration: number;
  public formattedCurrentTime: string = "0";
  public currentTime: number = 500;
  public isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);

  public share: boolean = false;
  public list: boolean = true;
  public mix: boolean = false;
  public repeat: boolean = false;

  ngOnInit() {
    this.getCurrentAudioSubscription = this.audioPlayerService
      .getCurrentAudioObservable()
      .subscribe((res) => {
        if (res) {
          console.log("Current Audio");
          console.log(res);
          this.id = res.id;
          this.audioPlayingAction = res.audioPlayingAction;
          this.audioControlAction = res.audioControlAction;
          this.setMediaSession();
        }
      });
    this.getCurrentAudioDataSubscription = this.audioPlayerService
      .getCurrentAudioDataObservable()
      .subscribe((res) => {
        if (res) {
          this.audioName = res.audioName;
          const durationMinutes = Math.floor(res.duration / 60);
          const durationSeconds = Math.floor(res.duration % 60);
          const formattedDuration = `${durationMinutes}:${durationSeconds}`;
          this.formattedDuration = formattedDuration;
          this.duration = Math.round(res.duration);
          this.setMediaSessionMetaData();
          console.log("Current Audio Data");
          console.log(res);
        }
      });
    this.getCurrentTimeSubscription = this.audioPlayerService
      .getCurrentTimeObservable()
      .subscribe((time) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        // Форматуємо числа менше 10 з ведучими нулями
        const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;
        const formattedSeconds = seconds < 10 ? "0" + seconds : seconds;
        const formattedTime = `${formattedMinutes}:${formattedSeconds}`;
        this.formattedCurrentTime = formattedTime;
        this.currentTime = Math.round(time);
      });

    this.rangeInput.nativeElement.addEventListener("input", () => {
      const value = this.rangeInput.nativeElement.value;
      const rangeInput = this.rangeInput.nativeElement;
      rangeInput.value = "0";
    });
  }

  changeCurrentTime(event: Event) {
    const newTime = parseFloat((event.target as HTMLInputElement).value);

    // Відписатись від попередньої підписки
    this.getCurrentTimeSubscription.unsubscribe();

    // Оновити значення currentTime
    this.audioPlayerService.setChangeCurrentTime(newTime);
    this.audioPlayerService.setCurrentTime(newTime);

    // Підписатись на новий потік даних
    this.getCurrentTimeSubscription = this.audioPlayerService.getCurrentTimeObservable()
        .pipe(
          startWith(newTime), // Спочатку відправляємо нове значення
          switchMap(currentTime => {
              console.log("Current time:", currentTime);
              return of(currentTime); // Перетворюємо число на Observable, яке видає це число
          })
        )
        .subscribe();

    // Підписуємось на оновлення поточної аудіозапису
    this.audioPlayerService.getCurrentAudioDataObservable().subscribe(data => {
        if (data && data.duration) {
            console.log("Тривалість пісні:", data.duration);
        } else {
            console.log("Тривалість пісні ще не встановлена");
        }
    });

    // Підписуємось на поточний статус відтворення
    this.audioPlayerService.getCurrentAudioPlayingStatusObserable().subscribe(status => {
        console.log("Current playing status:", status);
    });

    console.log(newTime);
}








  
  play() {
    console.log("playAudioPlayer");
    this.audioPlayingAction = "pause";
    this.audioPlayerService.next({
      id: this.id,
      audioPlayingAction: this.audioPlayingAction,
      audioControlAction: null,
    });
    // this.audioPlayerService.setAudioDataSubject({
    //   id: this.id,
    //   audioName: this.audioName,
    //   duration: this.duration
    // })
  }

  pause() {
    console.log("pauseAudioPlayer");
    this.audioPlayingAction = "play";
    this.audioPlayerService.next({
      id: this.id,
      audioPlayingAction: this.audioPlayingAction,
      audioControlAction: null,
    });
  }

  next() {
    console.log("nextAudioPlayer");
    this.audioPlayingAction = "pause";
    this.audioControlAction = "next";
    const id = this.id >= this.countMedias ? 1 : this.id + 1;
    this.audioPlayerService.next({
      id: id,
      audioPlayingAction: this.audioPlayingAction,
      audioControlAction: this.audioControlAction,
    });
    this.audioPlayerService.setChangeCurrentTime(0);
  }

  prev() {
    console.log("prevAudioPlayer");
    this.audioPlayingAction = "pause";
    this.audioControlAction = "prev";
    const id = this.id <= 1 ? this.countMedias : this.id - 1;
    this.audioPlayerService.next({
      id: id,
      audioPlayingAction: this.audioPlayingAction,
      audioControlAction: this.audioControlAction,
    });
    this.audioPlayerService.setChangeCurrentTime(0);
  }

  toggleList() {
    this.list = !this.list;
    this.onShowList.emit(this.list);
  }

  toggleRepeatMode() {
    this.repeat = !this.repeat;
    this.audioPlayerService.setRepeatMode(this.repeat);
  }

  toggleMixMode() {
    this.mix = !this.mix;
    this.audioPlayerService.setMixingMode(this.mix);
  }

  setMediaSessionMetaData() {
    if (this.isIOS) {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: this.audioName,
      });
    }
  }

  // setMediaSession() {
  //   if (this.isIOS) {
  //     navigator.mediaSession.setActionHandler(
  //       "play",
  //       async () => await this.play()
  //     );
  //     navigator.mediaSession.setActionHandler("pause", () => this.pause());
  //     navigator.mediaSession.setActionHandler("nexttrack", () => this.next());
  //     navigator.mediaSession.setActionHandler("previoustrack", () =>
  //       this.prev()
  //     );
  //     // navigator.mediaSession.setActionHandler('seekbackward', (details) => {console.log(details)});
  //     // navigator.mediaSession.setActionHandler('seekforward', (details) => {console.log(details)});
  //   }
  // }

  setMediaSession() {
    if (this.isIOS) {
      navigator.mediaSession.setActionHandler(
        "play",
        async () => await this.play()
      );
      navigator.mediaSession.setActionHandler("pause", () => this.pause());
      navigator.mediaSession.setActionHandler("nexttrack", () => this.next());
      navigator.mediaSession.setActionHandler("previoustrack", () =>
        this.prev()
      );
      navigator.mediaSession.setActionHandler("seekto", (event) => {
        if (event.fastSeek && "currentTime" in this.audioService.audio) {
          this.audioService.audio.currentTime = event.seekTime;
        } else {
          this.audioPlayerService.setChangeCurrentTime(event.seekTime);
        }
      });
    }
  }

  ngOnDestroy() {
    this.getCurrentAudioSubscription.unsubscribe();
    this.getCurrentAudioDataSubscription.unsubscribe();
    this.getCurrentTimeSubscription.unsubscribe();
  }
}
