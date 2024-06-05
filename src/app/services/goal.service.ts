import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { LocalStorageService } from "@core/auth-service/services/localstorage.service";
import { RestApiService } from "@core/auth-service/services/rest-api.service";
import { Goal, GoalStatuses } from "@interfaces/goal.interface";

@Injectable({
    providedIn: 'root'
})
  
export class GoalRestService extends RestApiService{

    constructor(
        http: HttpClient,
        localStorage: LocalStorageService,
    )
    {
        super(http, localStorage);
    }

    private createGoalRoute: string = '/goals/createGoal';
    private editGoalRoute: string = '/goals/editGoal';
    private getGoalByIdRoute: string = '/goals/getGoalById';
    private getGoalsRoute: string = '/goals/getGoals';
    private getGoalsAllRoute: string = '/goals/getGoalsAll';
    private updateGoalProgressRoute: string = '/goals/updateGoalProgress';
    private updateGoalStatusdRoute: string = '/goals/updateGoalStatus';
    private updateGoalCompletedRoute: string = '/goals/updateGoalCompleted';

    public createGoal(data: Goal, resFn, errFn): void {
        this.post<Goal>(true,this.createGoalRoute, {}, data, (res) => {
          resFn(res)
        }, errFn);
    }

    public editGoal(goalId: string, data: Goal, resFn, errFn): void {
      this.put<Goal>(true,this.editGoalRoute, goalId, {}, data, (res) => {
        resFn(res)
      }, errFn);
    }

    public getGoalById(goalId: string, resFn, errFn): void {
      this.get(true,`${this.getGoalByIdRoute}/${goalId}`, {}, (res) => {
        resFn(res)
      }, errFn);
  }

    public getGoals(goalStatus: GoalStatuses, resFn, errFn): void {
        this.get(true,`${this.getGoalsRoute}/${goalStatus}`, {}, (res) => {
          resFn(res)
        }, errFn);
    }

    public getGoalsAll(resFn, errFn): void {
      this.get(true,`${this.getGoalsAllRoute}`, {}, (res) => {
        resFn(res)
      }, errFn);
  }

    public updateGoalProgress(goalId: string, goalProgressId: string, completed: boolean, goalLastDate: Date, resFn, errFn): void {
        this.patch(true, `${this.updateGoalProgressRoute}/${goalId}/${goalProgressId}`, {}, {completed, goalLastDate}, (res) => {
          resFn(res)
        }, errFn);
    }

    public updateGoalStatus(goalId: string,  resFn, errFn): void {
      this.patch(true, `${this.updateGoalStatusdRoute}/${goalId}`, {}, {}, (res) => {
        resFn(res)
      }, errFn);
  }

    public updateGoalCompleted(goalId: string, resFn, errFn): void {
        this.patch(true, `${this.updateGoalCompletedRoute}/${goalId}`, {}, {}, (res) => {
          resFn(res)
        }, errFn);
    }


}