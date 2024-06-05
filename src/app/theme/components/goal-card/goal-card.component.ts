import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ChooseCategoryEvent, Goal, GoalProgress, MainGoalProgress } from '@interfaces/goal.interface';
import { CommonService } from '@services/common.service';
import { categories } from '@static/custom.settings';

@Component({
  selector: 'app-goal-card',
  templateUrl: './goal-card.component.html',
  styleUrls: ['./goal-card.component.scss'],
})
export class GoalCardComponent implements OnInit {

  @Input() goal: Goal;
  @Input() goalProgress: MainGoalProgress;
  @Output() onGetToggle: EventEmitter<ChooseCategoryEvent> = new EventEmitter<ChooseCategoryEvent>()

  public progress: number;
  public categories: Array<string> = categories;
  public currentDate: Date;
  
  constructor(
    private router: Router,
    private commonService: CommonService
  ) { }

  ngOnInit() {
    this.progress = this.commonService.calculateGoalProgress(this.goal.goalProgress);
    this.currentDate = new Date(new Date().setUTCHours(0,0,0,0));
  }

  getToggle(event){
    this.onGetToggle.emit({
      id: this.goalProgress.goalId,
      value: event,
      color: this.goal.goalCategoryColor
    })
  }

  checkViability(){
    const goalDate = new Date(new Date(this.goalProgress.goalDate).setUTCHours(0,0,0,0));
    if(this.currentDate.getTime() < goalDate.getTime()){
      return true;
    }
    else{
      return false;
    }
  }

  navigate(){
    this.router.navigate(['goal-view'], { state: { goal: this.goal } });
  }

  navigateCalendar(){
    this.router.navigate(['calendar-progress'], { state: { goalId: this.goal.goalId } });
  }
  
}
