import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpErrorService } from '@core/auth-service/services/http-error.service';
import { ChartGoalProgress, Goal, MainGoalProgress } from '@interfaces/goal.interface';
import { CommonService } from '@services/common.service';
import { GoalRestService } from '@services/goal.service';
import { ModalService } from '@services/modal.service';
import { ToastService } from '@services/toast.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-calendar-progress',
  templateUrl: './calendar-progress.page.html',
  styleUrls: ['./calendar-progress.page.scss'],
})
export class CalendarProgressPage implements OnInit {

  private $state: Observable<object>;

  public goalId: string;
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
    private activatedRoute: ActivatedRoute,
    private commonService: CommonService,
    private modalService: ModalService,
    private goalRestService: GoalRestService,
    private httpErrorService: HttpErrorService,
    private toastService: ToastService,
  ){}

  ngOnInit() {
    this.$state = this.activatedRoute.paramMap
    .pipe(map(() => window.history.state));
    this.$state.subscribe((res: any) => {
      if(res.goalId){
        this.goalId = res.goalId;
      }
    })
  }

  ionViewWillEnter(){
    this.date = new Date(new Date().setUTCHours(0,0,0,0));
    this.selectedDate = this.date;
    this.getCurrentDate(this.selectedDate);
    this.getGoal(this.goalId)
  }

  getCurrentDate(date: Date){
    this.month = this.commonService.getMonthToString(date.getMonth());
    this.day = date.getDate();
  }

  getGoal(goalId: string, firstInit = true) {
    this.goalRestService.getGoalById(
      goalId,
      (result: { status: boolean, data: Goal[] }) => {
        this.goals = result.data;
        this.getCurrentDateMainGoalProgress(this.selectedDate, this.goals);
        this.goalProgress = this.commonService.getChartGoalProgress(result.data);
        this.$goalProgress.next(firstInit ? null : this.goalProgress)
      },
      (error) => {}
    )
  }

  getCurrentDateMainGoalProgress(date: Date, goals: Goal[]){
    this.currentDayGoals = [];
    this.currentDayMainGoalProgress = [];
    this.currentDayGoals = this.commonService.getCalendarGoalProgress(date, goals);
    this.currentDayMainGoalProgress = this.commonService.getMainGoalProgress(date, goals, false);
  }

  async completedGoalModal(event, goal: MainGoalProgress){
    const currentDate = new Date(new Date().setUTCHours(0,0,0,0))
    const lastGoalDate = new Date(new Date(goal.goalLastDate).setUTCHours(0,0,0,0));
    if(currentDate.getTime() === lastGoalDate.getTime()){
      await this.modalService.openActionModal((res) => {
        this.completedGoal(event, goal)
      }, 
      (rej) => {
        this.getGoal(this.goalId,false)
      })
    }
    else{
      this.completedGoal(event, goal)
    }
  }


  completedGoal(event, goal: MainGoalProgress){
    this.goalRestService.updateGoalProgress(goal.goalId, goal.goalProgressId, event.value, goal.goalLastDate,(res) => {
      this.getCurrentDate(this.selectedDate);
      this.getGoal(this.goalId,false)
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
