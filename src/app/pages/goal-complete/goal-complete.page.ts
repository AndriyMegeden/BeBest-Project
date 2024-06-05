import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Directory, Encoding, Filesystem } from "@capacitor/filesystem";
import { Share } from "@capacitor/share";
import { Goal } from "@interfaces/goal.interface";
import { OnShareEvent } from "@theme/components/goal-view-success/goal-view-success.component";
import { Screenshot } from "capacitor-screenshot";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
// import { FileOpener } from '@ionic-native/file-opener/ngx';
// import { FilesystemDirectory, Plugins } from '@capacitor/core';
// const { Filesystem } = Plugins;

@Component({
  selector: "app-goal-complete",
  templateUrl: "./goal-complete.page.html",
  styleUrls: ["./goal-complete.page.scss"],
})
export class GoalCompletePage implements OnInit {
  public isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
  private $state: Observable<object>;

  public goal: Goal;
  screenshot: any;
  album: any;

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    if (this.isIOS) {
      document.body.classList.add("safe--area");
    } else {
      document.body.classList.remove("safe--area");
    }
    this.$state = this.activatedRoute.paramMap.pipe(
      map(() => window.history.state)
    );
    this.$state.subscribe((res: any) => {
      if (res.goal) {
        this.goal = res.goal;
      }
    });
  }

  async shareScreenshot(event: OnShareEvent) {
    console.log(event);
    const ret = await Screenshot.take();
    const imageSource = `data:image/png;base64,${ret.base64}`;
    const fileName = `${this.goal.goalName}.png`.trim()
    await this.share(fileName, imageSource)
  }

  async share(fileName: string, base64Data: string) {
    return Filesystem.writeFile({
      path: fileName,
      data: base64Data,
      directory: Directory.Cache
    })
      .then(() => {
        return Filesystem.getUri({
          directory: Directory.Cache,
          path: fileName
        });
      })
      .then((uriResult) => {
        console.log(uriResult);
        
        return Share.share({
          // title: fileName,
          // text: fileName,
          url: uriResult.uri,
        });
      });
  }
}
