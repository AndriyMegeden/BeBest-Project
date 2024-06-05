import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ChartGoalProgress, WeekDays } from '@interfaces/goal.interface';
import { CommonService } from '@services/common.service';
import { colorMap } from '@static/custom.settings';
import { Chart } from 'chart.js';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent  implements OnInit {

  @Input() public calendarId: string;
  @Input() public goalProgress: ChartGoalProgress[];
  @Input() public $goalProgress: Observable<ChartGoalProgress[]>;

  @Output() public onChangeDate: EventEmitter<Date> = new EventEmitter<Date>();
  
  public currentDate: number;
  public currentMonth: number;
  public currentYear: number;
  public daysInMonth: number[];
  public months: string[];
  public colors: { [key: string]: string } = colorMap;

  public selectedDate: Date;

  private initializedCharts: { [day: number]: boolean } = {};

  constructor(private commonService: CommonService) {
    this.months = this.commonService.getMonthToStringAll();
  }

  ngOnInit(): void {
    const currentDate = new Date(new Date().setUTCHours(0,0,0,0));
    this.currentDate = currentDate.getDate();
    this.currentMonth = currentDate.getMonth();
    this.currentYear = currentDate.getFullYear();
    this.selectedDate = currentDate;
    this.renderCalendar(this.currentMonth, this.currentYear);
    this.$goalProgress.subscribe((res) => {
      if(res){
        this.clearCharts()
        this.goalProgress = res;
        this.renderCalendar(this.currentMonth, this.currentYear);
      }
    })
  }

  renderCalendar(month: number, year: number): void {
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    this.daysInMonth = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  }

  previousMonth(): void {
    this.currentMonth--;
    if (this.currentMonth < 0) {
      this.currentMonth = 11;
      this.currentYear--;
    }
    this.clearCharts();
    this.renderCalendar(this.currentMonth, this.currentYear);
    this.daysInMonth.forEach(day => {
      this.createChart(day)
    })
  }

  nextMonth(): void {
    this.currentMonth++;
    if (this.currentMonth > 11) {
      this.currentMonth = 0;
      this.currentYear++;
    }
    this.clearCharts();
    this.renderCalendar(this.currentMonth, this.currentYear);
    this.daysInMonth.forEach(day => {
      this.createChart(day)
    })
  }

  get currentMonthName(): string {
    return this.months[this.currentMonth];
  }

  checkGoalProgress(day: number): string {
    let month = this.currentMonth;
    let year = this.currentYear;
    const nextDate = new Date(new Date(year, month, day + 1).setUTCHours(0, 0, 0, 0));
    const dayExist = this.commonService.checkDayExist(nextDate, this.goalProgress);
    const currentDate = new Date();
    currentDate.setUTCHours(0, 0, 0, 0);
    currentDate.setDate(currentDate.getDate());
    if(this.goalProgress && this.goalProgress.length){
      if (dayExist) {
        const { goalDay, goalIndex } = this.commonService.getDayByDate(nextDate, this.goalProgress);
        const goalCompleted: boolean = this.commonService.checkGoalCalendarCompleted(goalDay);
        if(goalCompleted){
          return 'completed';
        }
        else{
          this.createChart(day);
          return 'chart';
        }
      } else if (
        nextDate.getTime() === currentDate.getTime()
      ) { // Сравниваем getTime(), чтобы учесть и время, и дату
          return 'today';
      } else {
          return 'default';
      }
    }
    else{
      if(nextDate.getTime() === currentDate.getTime()){
        return 'today';
      }
      else {
        return 'default';
      }
    }
  }

  createChart(day: number): void {
    if (this.initializedCharts[day]) {
      return; // Если график уже инициализирован, выходим из метода
    }

    const nextDate = new Date(this.currentYear, this.currentMonth, day + 1)
    const dayExist = this.commonService.checkDayExist(nextDate, this.goalProgress);
    
    if (dayExist) {
      const { goalDay } = this.commonService.getDayByDate(nextDate, this.goalProgress);
      const goalCompleted = this.commonService.checkGoalCalendarCompleted(goalDay);
      
      if (!goalCompleted) {
        const canvasId = `${this.calendarId}-calendar-chart-day-${day}`;
        const canvas = document.getElementById(canvasId) as HTMLCanvasElement;
        if (canvas) {
          const chartData = goalDay.day.map((elem) => elem.goalCompleted ? 1 : -1);
          const chartColors = goalDay.day.map((elem, index) =>
            elem.goalCompleted ? this.colors[elem.goalColor] : 'transparent'
          );
          const chartBorderColors = goalDay.day.map((elem, index) =>
            elem.goalCompleted ? 'transparent' : this.colors[elem.goalColor]
          );
          const chartBorderWidth = goalDay.day.map((elem) => elem.goalCompleted ? 0 : 1);
          const ctx = canvas.getContext('2d');
          if (ctx) {
            new Chart(ctx, {
              type: 'doughnut',
              data: {
                datasets: [{
                  data: chartData,
                  backgroundColor: chartColors,
                  borderColor: chartBorderColors,
                  borderWidth: chartBorderWidth,
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

          // После успешного создания графика установите флаг initializedCharts для данного дня
          this.initializedCharts[day] = true;
        }
      }
    }
  }

  clearCharts(): void {
    // Очистка всех предыдущих графиков
    Object.keys(this.initializedCharts).forEach(day => {
      const chartInstance = Chart.getChart(`${this.calendarId}-calendar-chart-day-${day}`);
      if (chartInstance) {
        chartInstance.destroy();
      }
    })
    this.initializedCharts = {};
    const elements = document.querySelectorAll('canvas'); // Получение всех элементов canvas
    elements.forEach((element: HTMLCanvasElement) => {
      const ctx = element.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, element.width, element.height); // Очистка контекста canvas
      }
    });
    
  }

  checkSelectedDay(day: number){
    if(day === this.selectedDate.getDate() && this.currentMonth === this.selectedDate.getMonth() && this.currentYear === this.selectedDate.getFullYear()){
      return true;
    }
  }

  setSelectedDay(day: number){
    const selectedDate = new Date(new Date(this.currentYear, this.currentMonth, day + 1).setUTCHours(0,0,0,0));
    this.selectedDate = selectedDate;
    this.onChangeDate.emit(this.selectedDate);
  }

}
