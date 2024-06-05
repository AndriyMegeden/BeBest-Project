import { Injectable } from "@angular/core";
import { ChartGoalProgress, Goal, GoalProgress, MainGoalProgress, WeekDays } from "@interfaces/goal.interface";
import { weekDays } from "@static/custom.settings";

@Injectable({
    providedIn: 'root'
})
  
export class CommonService {
    
    calculateGoalProgress(goalProgress: GoalProgress[]) {
        const completedTasks = goalProgress.filter(item => item.goalCompleted === true).length;
        const totalTasks = goalProgress.length;
        const progressPercentage = (completedTasks / totalTasks) * 100;
        return Math.round(progressPercentage);
    }

    getMainGoalProgress(date: Date, goals: Goal[], completedFilter = true): MainGoalProgress[] {
      const currentDate = new Date(date);
      currentDate.setUTCHours(0, 0, 0, 0)
      const mainGoalProgress = [];
      goals.forEach((goal) => {
          goal.goalProgress.forEach((progress) => {
            const progressDate = new Date(progress.goalDate);
            progressDate.setUTCHours(0, 0, 0, 0)
            if(completedFilter){
              if (progressDate.getTime() === currentDate.getTime() && !progress.goalCompleted) {
                const progressItem = {
                    ...progress,
                    goalId: goal.goalId,
                    goalCategoryName: goal.goalCategoryName,
                    goalCategoryColor: goal.goalCategoryColor,
                    goalName: goal.goalName,
                    goalLastDate: goal.goalLastDate
                };
                mainGoalProgress.push(progressItem);
              }
            }
            else{
              if (progressDate.getTime() === currentDate.getTime()) {
                const progressItem = {
                    ...progress,
                    goalId: goal.goalId,
                    goalCategoryName: goal.goalCategoryName,
                    goalCategoryColor: goal.goalCategoryColor,
                    goalName: goal.goalName,
                    goalLastDate: goal.goalLastDate
                };
                mainGoalProgress.push(progressItem);
              }
            }
          });
      });
  
      return mainGoalProgress;
    }

    getCalendarGoalProgress(date: Date, goals: Goal[]) {
      const currentDate = new Date(date);
      currentDate.setUTCHours(0, 0, 0, 0)
      const goalsArray = [];
      goals.forEach((goal) => {
          goal.goalProgress.forEach((progress) => {
              const progressDate = new Date(progress.goalDate);
              progressDate.setUTCHours(0, 0, 0, 0)
              if (progressDate.getTime() === currentDate.getTime()) {
                goalsArray.push(goal);
              }
          });
      });
  
      return goalsArray;
    }

    checkGoalTodayCompleted(date: Date, goals: Goal[]) {
      const currentDate = new Date(date);
      currentDate.setUTCHours(0, 0, 0, 0)
      let hasGoalsForDate = false; // Флаг, который указывает, есть ли хоть одна цель для данной даты
    
      for (const goal of goals) {
        let allGoalsCompleted = true;
    
        for (const progress of goal.goalProgress) {
          const progressDate = new Date(progress.goalDate);
          progressDate.setUTCHours(0, 0, 0, 0)
          if (
            progressDate.getTime() === date.getTime()
          ) {
            hasGoalsForDate = true;
            if (!progress.goalCompleted) {
              allGoalsCompleted = false;
              break;
            }
          }
        }
    
        if (hasGoalsForDate && allGoalsCompleted) {
          return true;
        }
      }
    
      return hasGoalsForDate ? false : null; // Если есть цели на день, но не все выполнены, возвращаем false; если нет целей на день, возвращаем null.
    }
    
    
    checkGoalCalendarCompleted(chartGoalProgress: ChartGoalProgress) {
      let hasGoalsForDate = chartGoalProgress.day.some(goal => !goal.goalCompleted);
      return !hasGoalsForDate ? true : null;
    }

    checkDayExist(dayToCheck: Date, chartGoalProgress: ChartGoalProgress[]): boolean {
      const checkDay = new Date(dayToCheck);
      checkDay.setUTCHours(0, 0, 0, 0);
      return chartGoalProgress.some((day) => {
          const goalDate = new Date(day.goalDate)
          goalDate.setUTCHours(0, 0, 0, 0);
          return (
            checkDay.getTime() === goalDate.getTime()
          );
      });
    }
    
    getDayByDate(dayToCheck: Date, chartGoalProgress: ChartGoalProgress[]): { goalDay: ChartGoalProgress | undefined, goalIndex: number | undefined } {
        let goalDay: ChartGoalProgress | undefined;
        let goalIndex: number | undefined;
        const checkDay = new Date(dayToCheck);
        checkDay.setUTCHours(0, 0, 0, 0);
        chartGoalProgress.some((day, index) => {
          const goalDate = new Date(day.goalDate)
          goalDate.setUTCHours(0, 0, 0, 0);
            if (
              checkDay.getTime() === goalDate.getTime()
            ) {
                goalDay = day;
                goalIndex = index;
                return true;
            }
            return false;
        });
    
        return { goalDay, goalIndex };
    }

    getChartGoalProgress(goals: Goal[]): ChartGoalProgress[] {
        const chartGoalProgress: ChartGoalProgress[] = [];
        const uniqueDates = new Map<Date, ChartGoalProgress>();
        let currentId = 1;
        goals.forEach((goal) => {
          if (goal.goalProgress && goal.goalProgress.length > 0) {
            goal.goalProgress.forEach((progressItem) => {
              const { goalDate, goalDay } = progressItem;
              
              let dateChartGoalProgress = uniqueDates.get(goalDate);
              if (!dateChartGoalProgress) {
                dateChartGoalProgress = {
                  id: currentId++,
                  day: [],
                  goalDay: goalDay,
                  goalDate: goalDate,
                  goalLastDate: goal.goalLastDate
                };
                uniqueDates.set(goalDate, dateChartGoalProgress);
              }
              progressItem.goalColor = goal.goalCategoryColor;
              dateChartGoalProgress.day.push(progressItem);
            });
          }
        });
        uniqueDates.forEach((chartGoalProgressItem) => {
          chartGoalProgress.push(chartGoalProgressItem);
        });

        chartGoalProgress.sort((a, b) => {
          const dateA = new Date(a.goalDate);
          const dateB = new Date(b.goalDate);
          return dateA.getTime() - dateB.getTime();
        });
        
        return chartGoalProgress;
    }

    getDatesFromChartGoalProgress(goalProgress: ChartGoalProgress[]){
      const dates = goalProgress.map(day => day.goalDate);
      const isoDates = dates.map(date => new Date(date).toISOString());
      return isoDates;
    }

    getMonthToString(monthNumber: number) {
      const months = [
        'other.months.january', 'other.months.february', 'other.months.march', 'other.months.april', 'other.months.may', 'other.months.june',
        'other.months.july', 'other.months.august', 'other.months.september', 'other.months.october', 'other.months.november', 'other.months.december'
      ];
      return months[monthNumber];
    }

    getMonthToStringAll() {
      const months = [
        'other.months.january', 'other.months.february', 'other.months.march', 'other.months.april', 'other.months.may', 'other.months.june',
        'other.months.july', 'other.months.august', 'other.months.september', 'other.months.october', 'other.months.november', 'other.months.december'
      ];
      return months
    }

    filterChartData(chartGoalProgress: ChartGoalProgress[]) {
      const currentDate = new Date();
      currentDate.setUTCHours(0, 0, 0, 0)
      const filteredData = chartGoalProgress.filter((goal) => {
        const goalDate = new Date(goal.goalDate); // Преобразование даты из элемента массива
        goalDate.setUTCHours(0, 0, 0, 0)
        const diffTime = goalDate.getTime() - currentDate.getTime(); // Разница во времени
        const diffDays = Math.ceil(diffTime / (1000 * 3600 * 24)); // Разница в днях
  
        // Показываем только элементы от -2 до +7 дней от текущей даты
        return diffDays >= -2 && diffDays <= 7;
      });
  
      return filteredData;
    }
  
    fillMissingDates(chartGoalProgress: ChartGoalProgress[]) {
      const currentDate = new Date();
      currentDate.setUTCHours(0, 0, 0, 0)
      const minDate = new Date(currentDate);
      minDate.setDate(currentDate.getDate() - 2);
      const maxDate = new Date(currentDate);
      maxDate.setDate(currentDate.getDate() + 7);
    
      const getDatesBetweenDates = (startDate, endDate) => {
        const datesArray = [];
        let currentDate = new Date(startDate);
    
        while (currentDate <= endDate) {
          datesArray.push(new Date(currentDate));
          currentDate.setDate(currentDate.getDate() + 1);
        }
    
        return datesArray;
      };
      
      let maxId = chartGoalProgress.length > 0 ? Math.max(...chartGoalProgress.map(item => item.id)) : 0;
      const allDatesBetween = getDatesBetweenDates(minDate, maxDate);
      const goalProgressArray: ChartGoalProgress[] = [];
      allDatesBetween.forEach((date) => {
        const existGoal = chartGoalProgress.filter((elem) => {
          const currentDate = new Date(date);
          currentDate.setUTCHours(0, 0, 0, 0);
          const goalDate = new Date(new Date(elem.goalDate).setDate(new Date(elem.goalDate).getDate()));
          goalDate.setUTCHours(0, 0, 0, 0);
          if(currentDate.getTime() === goalDate.getTime()){
            return elem;
          }
        });

        if (existGoal.length > 0) {
          const existingGoal = existGoal[0];
          existingGoal.goalDate = date;
          goalProgressArray.push(existingGoal);
        } else {
          maxId++;
          const currentDate = new Date(date);
          currentDate.setUTCHours(0, 0, 0, 0);
          goalProgressArray.push({
            id: maxId,
            day: [],
            goalDay: weekDays[(date.getDay())],
            goalDate: currentDate,
          });
        }
      })
     
      return goalProgressArray;
    }
    
    checkGoalForCurrentDate(chartGoalProgress: ChartGoalProgress[]) {
      const currentDate = new Date();
      currentDate.setUTCHours(0, 0, 0, 0)
      const currentDayItem = chartGoalProgress.find(item => {
        const itemDate = new Date(item.goalDate);
        itemDate.setUTCHours(0, 0, 0, 0);
        return (
          itemDate.getTime() === currentDate.getTime()
        );
      });
      return currentDayItem.day.length ? true : false;
    }
    
}