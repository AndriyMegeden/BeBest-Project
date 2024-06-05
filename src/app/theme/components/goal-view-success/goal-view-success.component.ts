import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormArray, FormControl, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "@core/auth-service/services/auth.service";
import { Goal } from "@interfaces/goal.interface";
import { AuthInfo } from "@interfaces/user.interface";
import { NavController } from "@ionic/angular";
import { CommonService } from "@services/common.service";
import { Screenshot } from "capacitor-screenshot";
import { timer } from "rxjs";



export type shareSocials = "facebook" | "instagram" | "telegram";
export interface OnShareEvent {
  socials: shareSocials;
  showProgress: boolean;
}

@Component({
  selector: "app-goal-view-success",
  templateUrl: "./goal-view-success.component.html",
  styleUrls: ["./goal-view-success.component.scss"],
})
export class GoalViewSuccessComponent implements OnInit {
  imageSouce: any;

  @Input() goal: Goal;

  @Output() onShare: EventEmitter<OnShareEvent> =
    new EventEmitter<OnShareEvent>();

  public authInfo: AuthInfo;
  public goalProgress: number;
  public socials: Array<shareSocials> = ["facebook", "instagram", "telegram"];
  public form: FormGroup;
  public showDetails: boolean = true;
  public showProgress: boolean = true;

  constructor(
    private navCtrl: NavController,
    private authService: AuthService,
    private commonService: CommonService
  ) {}

  ngOnInit() {
    this.authService.getAuthUser().subscribe((user) => {
      if (user) {
        this.authInfo = user;
      }
    });
    this.goalProgress = this.commonService.calculateGoalProgress(
      this.goal.goalProgress
    );
    this.createForm();
  }

  createForm() {
    this.form = new FormGroup({
      showProgress: new FormControl(false),
      socials: new FormArray([], [Validators.required, Validators.max(1)]),
    });
  }

  changeSocial(value: shareSocials) {
    const socialsControl = this.form.get("socials") as FormArray;
    const currentSocials = socialsControl.value;
    socialsControl.clear(); // Очистить все выбранные элементы
    if (!currentSocials.includes(value)) {
      socialsControl.push(new FormControl(value)); // Добавить выбранный элемент
    }
  }

  getShare() {
    if (this.form.value.showProgress) {
      this.showDetails = false;
      timer(1000).subscribe(() => {
        this.onShare.emit(this.form.value);
        timer(1000).subscribe(() => {
          this.showDetails = true;
        });
      });
    } else {
      this.showDetails = false;
      this.showProgress = false;
      timer(1000).subscribe(() => {
        this.onShare.emit(this.form.value);
        timer(1000).subscribe(() => {
          this.showProgress = true;
          this.showDetails = true;
        });
      });
    }
  }

  backTo() {
    this.navCtrl.pop();
  }
}
