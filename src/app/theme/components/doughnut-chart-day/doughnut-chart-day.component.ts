import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { ChartGoalProgress, GoalProgress, WeekDays } from '@interfaces/goal.interface';
import { colorMap } from '@static/custom.settings';
import { Chart, registerables } from 'chart.js';

@Component({
  selector: 'app-doughnut-chart-day',
  templateUrl: './doughnut-chart-day.component.html',
  styleUrls: ['./doughnut-chart-day.component.scss'],
})
export class DoughnutChartDayComponent  implements OnInit, AfterViewInit{

  @Input() public goal: ChartGoalProgress;

  public isActive: boolean;
  public currentDate: number;
  public currentDay: WeekDays;
  public chartData: Array<number> = [];
  public chartColors: Array<string> = [];
  public chartBorderColors: Array<string> = [];
  public chartBorderWidth: Array<number> = [];
  public colors: { [key: string]: string } = colorMap;

  constructor() { }

  ngOnInit() {
    this.currentDate = new Date(this.goal.goalDate).getDate();
    this.currentDay = this.goal.goalDay;
    const todayDate = new Date().getDate();
    this.isActive = this.currentDate === todayDate;
    if(this.goal.day && this.goal.day.length){
      this.goal.day.forEach((elem, index) => {
        if(elem.goalCompleted){
          this.chartData.push(1);
          this.chartColors.push(this.colors[elem.goalColor]);
          this.chartBorderColors.push('transparent');
          this.chartBorderWidth.push(0);
        }
        else{
          this.chartData.push(-1);
          this.chartColors.push('transparent');
          this.chartBorderColors.push(this.colors[elem.goalColor]);
          this.chartBorderWidth.push(1);
        }
      })
    }
    else{
      this.chartData.push(1);
      this.chartColors.push('#8a8a8a50');
      this.chartBorderColors.push('transparent');
      this.chartBorderWidth.push(0);
    }
  }

  ngAfterViewInit(): void {
    if(this.goal.day && this.goal.day.length){
      Chart.register(...registerables)
      new Chart(`chart-day-${this.goal.id}`, {
        type: 'doughnut',
        data: {
          datasets: [{
            data: this.chartData,
            backgroundColor: this.chartColors, // Цвета для сегментов
            borderColor: this.chartBorderColors, // Цвет границ сегментов
            borderWidth: this.chartBorderWidth,
          }],
        },
        options: {
          cutout: '60%',
          plugins: {
            tooltip: {
              enabled: false
            }
          }
        },
      });
    }
    else{
      Chart.register(...registerables)
      new Chart(`chart-day-default-${this.goal.id}`, {
        type: 'doughnut',
        data: {
          datasets: [{
            data: this.chartData,
            backgroundColor: this.chartColors, // Цвета для сегментов
            borderColor: this.chartBorderColors, // Цвет границ сегментов
            borderWidth: this.chartBorderWidth,
          }],
        },
        options: {
          cutout: '60%',
          plugins: {
            tooltip: {
              enabled: false
            }
          }
        },
      });
    }
  }
}
