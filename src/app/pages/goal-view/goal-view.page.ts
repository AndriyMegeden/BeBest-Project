import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorService } from '@core/auth-service/services/http-error.service';
import { Goal, GoalViewAction } from '@interfaces/goal.interface';
import { GoalRestService } from '@services/goal.service';
import { ModalService } from '@services/modal.service';
import { ToastService } from '@services/toast.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-goal-view',
  templateUrl: './goal-view.page.html',
  styleUrls: ['./goal-view.page.scss'],
  
})
export class GoalViewPage implements OnInit {
  
  private $state: Observable<object>;
  public $goal: BehaviorSubject<Goal> = new BehaviorSubject<Goal>(null);
  
  public goal: Goal;
  public goalProgress: number;
  
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private goalRestService: GoalRestService,
    private httpErrorService: HttpErrorService,
    private modalService: ModalService,
    private toastService: ToastService
  ) { }

  ngOnInit() {
    this.$state = this.activatedRoute.paramMap
    .pipe(map(() => window.history.state));
    this.$state.subscribe((res: any) => {
      if(res.goal){
        this.goal = res.goal;
        this.$goal.next(this.goal);
      }
    })
  }

  edit(){
    this.router.navigate(['add-goal'], { state: { action: 'edit', goal: this.goal } });
  }

  async archive(){
    if(this.goal.goalStatus !== 'archive'){
      await this.modalService.openActionModal((res) => {
        this.goalRestService.updateGoalStatus(this.goal.goalId,(res) => {
          this.router.navigateByUrl('/goals-list')
        }, 
        async (error) => {
          const statusCode = error.error.error.statusCode;
          await this.toastService.showErrorToast(await this.httpErrorService.getError(statusCode));
        })
      }, (err) => {})
    }
  }

  async getAction(event: GoalViewAction){
    if(event === 'completed'){
      await this.modalService.openActionModal((res) => {
        this.goalRestService.updateGoalCompleted(this.goal.goalId, (res) => {
          this.goal.completed = true;
          this.$goal.next(this.goal);
          this.router.navigate(['goal-complete'], { state: { goal: this.goal } });
        }, 
        async (error) => {
          const statusCode = error.error.error.statusCode;
          await this.toastService.showErrorToast(await this.httpErrorService.getError(statusCode));
        })
      },
      (err) => {})
    }
    else{
      this.router.navigate(['goal-complete'], { state: { goal: this.goal } });
    }
  }

}
