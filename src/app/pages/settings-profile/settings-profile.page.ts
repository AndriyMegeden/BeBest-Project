import { Component, OnInit } from '@angular/core';
import { HttpErrorService } from '@core/auth-service/services/http-error.service';
import { Goal } from '@interfaces/goal.interface';
import { GoalRestService } from '@services/goal.service';
import { ToastService } from '@services/toast.service';

@Component({
  selector: 'app-settings-profile',
  templateUrl: './settings-profile.page.html',
  styleUrls: ['./settings-profile.page.scss'],
})
export class SettingsProfilePage implements OnInit {

  public all: number = 0;
  public inProgress: number = 0;
  public completed: number = 0;

  constructor(
    private goalRestService: GoalRestService,
    private httpErrorService: HttpErrorService,
    private toastService: ToastService
  ) { }

  ngOnInit() {
    this.goalRestService.getGoalsAll(
      (result: { status: boolean, data: Goal[] }) => {
          console.log(result);
          if (result.status) {
            const goals = result.data;
            this.all = goals.length;
            this.inProgress = goals.filter(goal => goal.goalStatus === 'active' && !goal.completed).length;
            this.completed = goals.filter(goal => goal.completed === true || goal.goalStatus === 'archive').length;
          }
      },
      async (error) => {
        const statusCode = error.error.error.statusCode;
        await this.toastService.showErrorToast(await this.httpErrorService.getError(statusCode));
      }
    );
  }

}
