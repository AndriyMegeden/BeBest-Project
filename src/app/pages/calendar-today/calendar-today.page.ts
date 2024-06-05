import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { HttpErrorService } from '@core/auth-service/services/http-error.service';
import { ChartGoalProgress, Goal, MainGoalProgress } from '@interfaces/goal.interface';
import { CommonService } from '@services/common.service';
import { GoalRestService } from '@services/goal.service';
import { ModalService } from '@services/modal.service';
import { ToastService } from '@services/toast.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-calendar-today',
  templateUrl: './calendar-today.page.html',
  styleUrls: ['./calendar-today.page.scss'],
})
export class CalendarTodayPage implements OnInit {
  
  public goals: Goal[] = [];
  public goalProgress: ChartGoalProgress[] = [];
  public $goalProgress: BehaviorSubject<ChartGoalProgress[] | null> = new BehaviorSubject<ChartGoalProgress[] | null>(null);
  
  public currentDayGoals:  Goal[] = [];
  public currentDayMainGoalProgress: MainGoalProgress[] = [];
  public date: Date;
  public selectedDate: Date;
  public dateIso: string;
  public month: string;
  public day: number;

  constructor(
    private commonService: CommonService,
    private goalRestService: GoalRestService,
    private modalService: ModalService,
    private httpErrorService: HttpErrorService,
    private toastService: ToastService,
  ){}

  ngOnInit() {}

  ionViewWillEnter(){
    this.date = new Date(new Date().setUTCHours(0,0,0,0));
    this.selectedDate = this.date;
    this.getCurrentDate(this.selectedDate);
    this.getGoals();
  }

  getCurrentDate(date: Date){
    this.month = this.commonService.getMonthToString(date.getMonth());
    this.day = date.getDate();
  }

  getCurrentDateMainGoalProgress(date: Date, goals: Goal[]){
    this.currentDayGoals = [];
    this.currentDayMainGoalProgress = [];
    this.currentDayGoals = this.commonService.getCalendarGoalProgress(date, goals);
    this.currentDayMainGoalProgress = this.commonService.getMainGoalProgress(date, goals, false);
  }

  getGoals(firstInit = true) {
    this.goalRestService.getGoalsAll(
      (result: { status: boolean, data: Goal[] }) => {
        this.goals = result.data;
        this.getCurrentDateMainGoalProgress(this.selectedDate, this.goals);
        this.goalProgress = this.commonService.getChartGoalProgress(this.goals);
        this.$goalProgress.next(firstInit ? null : this.goalProgress)
      },
      (error) => {}
    );
  }

  async completedGoalModal(event, goal: MainGoalProgress){
    const currentDate = new Date(new Date().setUTCHours(0,0,0,0))
    const lastGoalDate = new Date(new Date(goal.goalLastDate).setUTCHours(0,0,0,0));
    if(currentDate.getTime() === lastGoalDate.getTime()){
      await this.modalService.openActionModal((res) => {
        this.completedGoal(event, goal)
      }, 
      (rej) => {
        this.getGoals(false);
      })
    }
    else{
      this.completedGoal(event, goal)
    }
  }


  completedGoal(event, goal: MainGoalProgress){
    this.goalRestService.updateGoalProgress(goal.goalId, goal.goalProgressId, event.value, goal.goalLastDate,(res) => {
      this.getCurrentDate(this.selectedDate);
      this.getGoals(false)
    },
    async (error) => {
      const statusCode = error.error.error.statusCode;
      await this.toastService.showErrorToast(await this.httpErrorService.getError(statusCode));
    })
  }

  changeDate(event: Date){
    this.selectedDate = event;
    this.getCurrentDate(event);
    this.getCurrentDateMainGoalProgress(event, this.goals)
  }

}
