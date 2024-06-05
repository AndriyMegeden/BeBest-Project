import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorService } from '@core/auth-service/services/http-error.service';
import { Goal, MainGoalProgress } from '@interfaces/goal.interface';
import { CommonService } from '@services/common.service';
import { GoalRestService } from '@services/goal.service';
import { ModalService } from '@services/modal.service';
import { ToastService } from '@services/toast.service';

@Component({
  selector: 'app-goals-today',
  templateUrl: './goals-today.page.html',
  styleUrls: ['./goals-today.page.scss'],
})
export class GoalsTodayPage implements OnInit {

  public mainGoalProgress: MainGoalProgress[] = [];
  public date: Date;

  constructor(
    private router: Router,
    private commonService: CommonService,
    private modalService: ModalService,
    private goalRestService: GoalRestService,
    private httpErrorService: HttpErrorService,
    private toastService: ToastService,
  ) { }

  ngOnInit() {}

  ionViewWillEnter(){
    this.getGoals()
  }

  getGoals() {
    this.goalRestService.getGoals(
      'active',
      (result: { status: boolean, data: Goal[] }) => {
        this.date = new Date();
        this.mainGoalProgress = this.commonService.getMainGoalProgress(this.date, result.data, false);
      },
      async (error) => {
        const statusCode = error.error.error.statusCode;
        await this.toastService.showErrorToast(await this.httpErrorService.getError(statusCode));
      }
    );
  }

  async completedGoalModal(event, goal: MainGoalProgress){
    const currentDate = new Date(new Date().setUTCHours(0,0,0,0))
    const lastGoalDate = new Date(new Date(goal.goalLastDate).setUTCHours(0,0,0,0));
    if(currentDate.getTime() === lastGoalDate.getTime()){
      await this.modalService.openActionModal((res) => {
        this.completedGoal(event,goal)
      }, 
      (rej) => {
        this.getGoals();
      })
    }
    else{
      this.completedGoal(event,goal)
    }
  }
  

  completedGoal(event, goal: MainGoalProgress){
    this.goalRestService.updateGoalProgress(goal.goalId, goal.goalProgressId, event.value, goal.goalLastDate, (res) => {
      this.getGoals()
    },
    async (error) => {
      const statusCode = error.error.error.statusCode;
      await this.toastService.showErrorToast(await this.httpErrorService.getError(statusCode));
    })
  }

  navigate(){
    this.router.navigate(['add-goal'], { state: { action: 'create' } });
  }

}
