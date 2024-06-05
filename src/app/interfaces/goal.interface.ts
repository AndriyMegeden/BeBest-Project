import { BehaviorSubject } from "rxjs";

export type WeekDays = 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun';
export type Colors = 'purple' | 'blue' | 'orange' | 'yellow' | 'red' | 'primary' | 'ocean' | 'pink' | 'violet' | 'green';
export type GoalMotivation = 'i_want' | 'i_accept_austerity';
export type GoalStatuses = 'active' | 'archive';
export type GoalTime = 'week' | 'month';
export type GoalAction = 'create' | 'edit';
export type GoalViewAction = 'completed' | 'share';

export interface ChooseCategoryModal{
    id: string;
    value: BehaviorSubject<boolean>,
    color?: Colors;
}

export interface ChooseCategoryEvent{
    id: string;
    value: boolean;
    color?: Colors;
}

export interface CreateCategoryEvent{
    categoryName: string;
    categoryColor: Colors;
}

export interface GoalProgress {
    goalProgressId?: string;
    goalDay: WeekDays;
    goalDate: Date;
    goalCompleted: boolean;
    goalColor: Colors;
}

export interface MainGoalProgress extends GoalProgress{
    goalId?: string;
    goalCategoryColor?: Colors;
    goalCategoryName?: string;
    goalName?: string;
    goalLastDate?: Date;
}

export interface ChartGoalProgress{
    id: number;
    day: GoalProgress[];
    goalDay: WeekDays;
    goalDate: Date;
    goalLastDate?: Date;
    goalCategoryColor?: Colors;
}

export interface Goal{
    userId?: string;
    goalId?: string;
    goalStatus: GoalStatuses;
    goalCategoryColor: Colors;
    goalCategoryName: string;
    goalName: string;
    goalTime: GoalTime;
    goalWeekDays: Array<WeekDays>;
    goalValue: string;
    goalCompleted: string;
    goalNotCompleted: string;
    goalProgress?: GoalProgress[];
    goalLastDate?: Date;
    completed: boolean;
}

  
  