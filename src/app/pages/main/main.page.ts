import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorService } from '@core/auth-service/services/http-error.service';
import { ServerResponseCategory } from '@interfaces/content.interface';
import { ChartGoalProgress, Goal, MainGoalProgress } from '@interfaces/goal.interface';
import { ContentCategory, ContentType } from '@interfaces/media.interface';
import { CommonService } from '@services/common.service';
import { ContentRestService } from '@services/content.service';
import { GlassfyService } from '@services/glassfy.service';
import { GoalRestService } from '@services/goal.service';
import { ModalService } from '@services/modal.service';
import { ToastService } from '@services/toast.service';
import { excludeСategories, weekDays } from '@static/custom.settings';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {

  public goalsLayoutConfig = {
    title: 'layouts.list_layout.goals',
    seeAllLink: '/goals-today',
  }

  public contentLayoutConfig = {
    title: 'layouts.list_layout.tips',
    seeAllLink: '/content-list',
  }

  public emptyScreenGoals = new BehaviorSubject<boolean>(false);
  public emptyScreenProgress = new BehaviorSubject<boolean>(false);
  public emptyScreenProgressNoGoals = new BehaviorSubject<boolean>(false);

  public mainGoalProgress: MainGoalProgress[] = [];
  public chartGoalProgress: ChartGoalProgress[] = [];

  public categories: ContentCategory[] = [];

  public date: Date;

  constructor(
    private router: Router,
    private commonService: CommonService,
    private goalRestService: GoalRestService,
    private modalService: ModalService,
    private httpErrorService: HttpErrorService,
    private contentService: ContentRestService,
    private toastService: ToastService,
    private glassfyService: GlassfyService
  ) { }

  async ionViewWillEnter(){
    this.getGoals();
    this.getCategories();
    this.clearGoals()
  }
 
  ngOnInit() {

  }

  getGoals() {
    this.emptyScreenProgress.next(false);
    this.goalRestService.getGoalsAll(
      (result: { status: boolean, data: Goal[] }) => {
        if(!result.data.length){
          this.emptyScreenGoals.next(true);
          this.chartGoalProgress = this.commonService.filterChartData(this.commonService.fillMissingDates(this.commonService.getChartGoalProgress(result.data)));
        }
        else{
          this.emptyScreenGoals.next(false);
          this.date = new Date();
          this.mainGoalProgress = this.commonService.getMainGoalProgress(this.date, result.data);
          this.chartGoalProgress = this.commonService.filterChartData(this.commonService.fillMissingDates(this.commonService.getChartGoalProgress(result.data)));
          const checkGoalForCurrentDate = this.commonService.checkGoalForCurrentDate(this.chartGoalProgress)
          if(checkGoalForCurrentDate){
            this.emptyScreenProgressNoGoals.next(false);
            if(!this.mainGoalProgress.length && result.data.length){
              this.emptyScreenProgress.next(true);
            }
            else if(this.mainGoalProgress.length && result.data.length) {
              this.emptyScreenProgress.next(false);
            }
          }
          else{
            this.emptyScreenProgressNoGoals.next(true);
          }
        }
        
      },
      async (error) => {
        const statusCode = error.error.error.statusCode;
        await this.toastService.showErrorToast(await this.httpErrorService.getError(statusCode));
      }
    );
  }
  
  getCategories() {
    this.contentService.getCategories(
      async (res: ServerResponseCategory[]) => {
        this.categories = res.map(item => ({
          categoryId: item.id,
          categoryImage: item.acf.categoryImage,
          categoryTitle: item.acf.categoryTitle,
          categorySubtitle: item.acf.categorySubtitle,
          contentType: item.acf.contentType[0] as ContentType,
          lock: this.glassfyService.getSubscriptionStatus().pro ? false : Boolean(item.acf.lock),
        }));
        this.categories = this.categories.filter(elem => !excludeСategories.includes(elem.categoryId));
      },
      async (error) => {
        const statusCode = error.error.error.statusCode;
        await this.toastService.showErrorToast(await this.httpErrorService.getError(statusCode));
      }
    );
  }

  navigate(category){
    if(category.lock){
      this.router.navigateByUrl('/settings-subscriptions');
    }
    else{
      this.router.navigate([`/${category.contentType}`], { state: { categoryId: category.categoryId } });
    }
  }

  async completedGoalModal(goal: MainGoalProgress){
    const currentDate = new Date(new Date().setUTCHours(0,0,0,0))
    const lastGoalDate = new Date(new Date(goal.goalLastDate).setUTCHours(0,0,0,0));
    if(currentDate.getTime() === lastGoalDate.getTime()){
      await this.modalService.openActionModal((res) => {
        this.completedGoal(goal)
      }, 
      (rej) => {
        this.getGoals();
      })
    }
    else{
      this.completedGoal(goal)
    }
  }

  completedGoal(goal: MainGoalProgress){
    this.goalRestService.updateGoalProgress(goal.goalId, goal.goalProgressId, true, goal.goalLastDate,(res) => {
      this.getGoals();
    },
    async (error) => {
      const statusCode = error.error.error.statusCode;
      await this.toastService.showErrorToast(await this.httpErrorService.getError(statusCode));
    })
  }


  clearGoals() {
    this.mainGoalProgress = [];
    this.chartGoalProgress = [];
    this.categories = [];
  }

}
