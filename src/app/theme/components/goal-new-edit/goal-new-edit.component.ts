import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ChooseCategoryEvent, CreateCategoryEvent, Goal, GoalAction, GoalTime, WeekDays } from '@interfaces/goal.interface';
import { categories, goalTime, weekDays } from '@static/custom.settings';
import { Observable } from 'rxjs';
import { ElementRef } from '@angular/core';
@Component({
  selector: 'app-goal-new-edit',
  templateUrl: './goal-new-edit.component.html',
  styleUrls: ['./goal-new-edit.component.scss'],
})
export class GoalNewEditComponent implements OnInit {
  @Input() action: GoalAction;
  @Input() goal: Goal;
  @Input() $goalMotivation: Observable<string>;
  @Input() $category: Observable<CreateCategoryEvent>;
  @Input() $createdCategory: Observable<CreateCategoryEvent>;
  @Output() onChooseCategory: EventEmitter<ChooseCategoryEvent> = new EventEmitter<ChooseCategoryEvent>();
  @Output() onGetData: EventEmitter<Goal> = new EventEmitter<Goal>();

  public dataCreatedCategory: CreateCategoryEvent = null;
  public weekDays: Array<WeekDays> = weekDays;
  public goalTime: Array<GoalTime> = goalTime;
  public form: FormGroup;
  public categories: Array<string> = categories;
 
  constructor() { }

  ngOnInit() {
    this.form = new FormGroup({
      goalStatus: new FormControl('active', [Validators.required]),
      goalMotivation: new FormControl('', [Validators.required]),
      goalCategoryColor: new FormControl(null),
      goalCategoryName: new FormControl('', [Validators.required]),
      goalName: new FormControl('', [Validators.required, Validators.minLength(3)]),
      goalTime: new FormControl('', [Validators.required]),
      goalWeekDays: new FormArray([], [Validators.required]),
      goalValue: new FormControl('', [Validators.required, Validators.minLength(3)]),
      goalCompleted: new FormControl('', [Validators.required, Validators.minLength(3)]),
      goalNotCompleted: new FormControl('', [Validators.required, Validators.minLength(3)])
    })

    if(this.action === 'edit'){
      this.form.patchValue(this.goal);
      const goalWeekDaysArray = this.form.get('goalWeekDays') as FormArray;
      this.goal.goalWeekDays.forEach(value => {
        goalWeekDaysArray.push(new FormControl(value))
      })
      this.form.get('goalTime').disable();
    }

    this.$goalMotivation.subscribe((res) => {
      this.form.get('goalMotivation').setValue(res);
    })

    this.$category.subscribe((res) => {
      console.log(res);
      
      this.form.get('goalCategoryName').setValue(res.categoryName);
      this.form.get('goalCategoryColor').setValue(res.categoryColor);
    })

    this.$createdCategory.subscribe((res: CreateCategoryEvent) => {
      this.dataCreatedCategory = res;
      if(this.dataCreatedCategory){
        this.form.get('goalCategoryName').setValue(res.categoryName);
        this.form.get('goalCategoryColor').setValue(res.categoryColor);
      }
    })
  }

  public chooseCategory(){
    this.onChooseCategory.emit()
  }

  public selectWeekDay(value: string) {
    const goalWeekDaysArray = this.form.get('goalWeekDays') as FormArray;
    if (!goalWeekDaysArray.value.includes(value)) {
      goalWeekDaysArray.push(new FormControl(value));
    } else {
      const index = goalWeekDaysArray.value.indexOf(value);
      if (index !== -1) {
        goalWeekDaysArray.removeAt(index);
      }
    }
  }

  formHeight = '800px';
  isFormHeightAdjusted = false;
  onInputFocus() {
    if (!this.isFormHeightAdjusted) {
      this.formHeight = '1120px';
      this.isFormHeightAdjusted = true;
    }
  }
  onInputBlur() {
    this.isFormHeightAdjusted = false;
    this.formHeight = '800px'; // Возвращаем форму к начальным размерам
  }


  getData(){
    this.onGetData.emit(this.form.value)
  }
}
