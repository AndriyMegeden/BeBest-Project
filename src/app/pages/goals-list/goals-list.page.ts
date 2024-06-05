import { Component, OnInit } from '@angular/core';
import { Goal, GoalStatuses } from '@interfaces/goal.interface';
import { GoalRestService } from '@services/goal.service';
import { goalStatuses } from '@static/custom.settings';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-goals-list',
  templateUrl: './goals-list.page.html',
  styleUrls: ['./goals-list.page.scss'],
})
export class GoalsListPage implements OnInit {

  public $selectedValue: Subject<GoalStatuses> = new Subject<GoalStatuses>();

  public goals: Goal[] = [];
  public goalStatuses: Array<GoalStatuses> = goalStatuses;

  constructor(
    private goalRestService: GoalRestService
  ) { }

  ngOnInit() {

  }

  ionViewWillEnter(){
    this.$selectedValue.next('active')
    this.getGoals('active');
  }

  getGoals(goalStatus: GoalStatuses) {
    this.goalRestService.getGoals(
      goalStatus,
      (result: { status: boolean, data: Goal[] }) => {
        this.goals = result.data;
      },
      (error) => {}
    );
  }

  async getGoalsByStatus(event: string){
    this.getGoals(event as GoalStatuses);
    
  }
  
}
