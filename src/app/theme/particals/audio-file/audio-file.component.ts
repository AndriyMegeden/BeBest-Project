import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { ControlAction, MediaAction } from "@interfaces/media.interface";
import { AudioPlayerService } from "@services/audio.player.service";
import { AudioService } from "@services/audio.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-audio-file",
  templateUrl: "./audio-file.component.html",
  styleUrls: ["./audio-file.component.scss"],
})
export class AudioFileComponent implements OnInit {
  @Input() countMedias: number;
  @Input() id: number;
  @Input() isFirst: boolean;
  @Input() contentName: string;
  @Input() media: string;

  public audioPlayingAction: MediaAction = "play";
  public formattedDuration: string;
  public audioControlAction: ControlAction;

  public repeatMode: boolean;
  public mixingMode: boolean;

  private getCurrentAudioSubscription: Subscription;
  private audioService: AudioService = new AudioService();
  private duration: number = 0;

  constructor(private audioPlayerService: AudioPlayerService) {}

  async ngOnInit() {
    await this.load();
    await this.initPlayer();
    this.initControls();
  }

  async load() {
    await this.audioService.loadAudio(
      this.media,
      this.contentName,
      this.audioPlayerService.getCurrentTime(),
      (currentTime) => {
        if (currentTime !== 0) {
          this.audioPlayerService.setCurrentTime(currentTime);
        }
      }
    );

    this.duration = this.audioService.duration;
    const durationMinutes = Math.floor(this.duration / 60);
    const durationSeconds = Math.floor(this.duration % 60);
    const formattedDuration = `${durationMinutes}:${durationSeconds}`;
    this.formattedDuration = formattedDuration;

    if (this.isFirst) {
      this.audioPlayerService.setPlayer({
        id: this.id,
        audioPlayingAction: this.audioPlayingAction,
        audioControlAction: null,
      });
      this.audioPlayerService.setAudioDataSubject({
        id: this.id,
        audioName: this.contentName,
        duration: this.duration,
      });
    }
  }

  initControls() {
    this.audioPlayerService.getRepeatModeObservable().subscribe((mode) => {
      this.repeatMode = mode;
    });

    this.audioPlayerService.getMixixngModeObservable().subscribe((mode) => {
      this.mixingMode = mode;
    });

    this.duration = this.audioService.duration;
    this.audioService.audio.addEventListener("ended", async () => {
      console.log("ended");
      if (this.repeatMode) {
        await this.play();
      } else {
        this.next(this.mixingMode);
      }
    });
  }

  async initPlayer() {
    this.getCurrentAudioSubscription = this.audioPlayerService
      .getCurrentAudioObservable()
      .subscribe(async (res) => {
        if (res) {
          if (res.id === this.id) {
            this.audioPlayerService
              .getChangeCurrentTimeObservable()
              .subscribe((currentTime) => {
                this.audioService.audio.currentTime = currentTime;
              });
            if (
              res.audioControlAction === "next" ||
              res.audioControlAction === "prev"
            ) {
              this.audioPlayingAction = "pause";
              this.audioPlayerService.setCurrentTime(0);
              await this.audioService.pauseAudio();
              this.audioService.playAudio();
              this.audioPlayerService.setAudioDataSubject({
                id: this.id,
                audioName: this.contentName,
                duration: this.duration,
              });
            }
            if (
              res.audioPlayingAction === "play" ||
              res.audioPlayingAction === "pause"
            ) {
              if (res.audioPlayingAction === "play") {
                this.audioPlayingAction = "play";
                this.audioService.pauseAudio();
              } else if (res.audioPlayingAction === "pause") {
                this.audioPlayingAction = "pause";
                await this.audioService.playAudio();
              }
            }
          } else {
            // Перевірка, чи аудіо відтворюється
            if (this.audioService.audio && !this.audioService.audio.paused) {
              // Зупинка аудіо, якщо воно не є поточним треком
              this.audioService.stopAudio();
            }
            this.audioPlayingAction = "play";
          }
        }
      });
  }

  async play() {
    console.log("playAudioFile");
    this.audioPlayerService.setChangeCurrentTime(0);
    this.audioPlayingAction = "pause";
    await this.audioService.playAudio();
    this.audioPlayerService.playAudioSubject({
      id: this.id,
      audioPlayingAction: this.audioPlayingAction,
      audioControlAction: null,
    });
    this.audioPlayerService.setAudioDataSubject({
      id: this.id,
      audioName: this.contentName,
      duration: this.duration,
    });
  }

  pause() {
    console.log("pauseAudioFile");
    // this.audioPlayerService.setChangeCurrentTime(0);
    this.audioPlayingAction = "play";
    this.audioPlayerService.pauseAudioSubject({
      id: this.id,
      audioPlayingAction: this.audioPlayingAction,
      audioControlAction: null,
    });
  }

  next(mix: boolean = false) {
    console.log("nextAudioFile");

    // Отримуємо поточний час відтворення
    const currentTime = this.audioService.audio.currentTime;
    // Перевіряємо, чи поточний час відтворення відстає від тривалості пісні не більше, ніж на 2 секунди,

    if (currentTime >= this.duration - 2) {
      this.audioPlayingAction = "pause";
      this.audioControlAction = "next";
      let nextId = this.id >= this.countMedias ? 1 : this.id + 1;
      if (!mix) {
        console.log("Track ended. next");
        nextId = this.id >= this.countMedias ? 1 : this.id + 1;
      } else {
        do {
          console.log("Mix. next");
          nextId = Math.floor(Math.random() * this.countMedias) + 1;
        } while (nextId === this.id);
      }

      this.audioPlayerService.setCurrentTime(0);
      this.audioPlayerService.setChangeCurrentTime(0);
      // this.audioService.audio.currentTime = 0;
      const nextTrackId = nextId === 1 ? 1 : nextId;
      this.audioPlayerService.next({
        id: nextTrackId,
        audioPlayingAction: this.audioPlayingAction,
        audioControlAction: this.audioControlAction,
      });
      this.audioPlayerService.setAudioDataSubject({
        id: this.id,
        audioName: this.contentName,
        duration: this.duration,
      });
    } else {
      console.log(
        "Поточний час відтворення відстає від тривалості пісні менше, ніж на 2 секунди, або тривалість пісні дорівнює 47 секундам. Функція next не буде викликана."
      );
    }
  }

  ngOnDestroy() {
    this.getCurrentAudioSubscription.unsubscribe();
    this.audioService.stopAudio();
    this.audioPlayerService.setCurrentTime(0);
    this.pause();
  }
}
