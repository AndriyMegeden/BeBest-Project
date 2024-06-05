import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Goal, GoalViewAction } from '@interfaces/goal.interface';
import { CommonService } from '@services/common.service';
import { categories } from '@static/custom.settings';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-goal-view-progress',
  templateUrl: './goal-view-progress.component.html',
  styleUrls: ['./goal-view-progress.component.scss'],
})
export class GoalViewProgressComponent implements OnInit {

  @Input() $goal: Observable<Goal>;
  @Output() onGetAction: EventEmitter<GoalViewAction> = new EventEmitter<GoalViewAction>();
  
  public goal: Goal;
  public goalProgress: number;
  public goalAction: GoalViewAction;
  public categories: Array<string> = categories;
  
  constructor(
    private router: Router,
    private commonService: CommonService
  ){}

  ngOnInit() {
    this.$goal.subscribe((res) => {
      if(res){
        this.goal = res;
        this.goalProgress = this.commonService.calculateGoalProgress(this.goal.goalProgress);
        this.goalAction = this.goal.completed ? 'share' : 'completed';
      }
    })
  }

  getData(){
    this.onGetAction.emit(this.goalAction);
  }

  navigate(){
    this.router.navigate(['calendar-progress'], { state: { goalId: this.goal.goalId } });
  }
}
