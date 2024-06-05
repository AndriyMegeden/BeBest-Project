import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ChooseCategoryEvent, Colors } from '@interfaces/goal.interface';
import { categories } from '@static/custom.settings';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-goal-category',
  templateUrl: './goal-category.component.html',
  styleUrls: ['./goal-category.component.scss'],
})
export class GoalCategoryComponent implements OnInit {

  @Input() id: string;
  @Input() goalName: string;
  @Input() color: Colors;
  @Input() value: Observable<boolean>;
  @Input() mainPage: boolean = false;
  @Input() defaultEvent: boolean = false;
  @Input() defaultValue: boolean;

  @Output() onGetToggle: EventEmitter<ChooseCategoryEvent> = new EventEmitter<ChooseCategoryEvent>()

  public itemValue: boolean;
  public init: boolean = false;

  public categories: Array<string> = categories;

  constructor() { }

  ngOnInit() {
    if(!this.defaultEvent){
      if(this.value){
        this.value.subscribe(res => {
          this.init = false;
          this.itemValue = res;
        })
      }
    }
  }

  getToggle(event){
    if(!this.defaultEvent){
      this.onGetToggle.emit({
        id: this.id,
        value: true,
        color: this.color
      })
      if(this.itemValue){
        event.stopImmediatePropagation();
        event.preventDefault()
      }
    }
    else{
      this.defaultValue = event.detail.checked;
      this.onGetToggle.emit({
        id: this.id,
        value: event.detail.checked,
        color: this.color
      })
    }
  }

}
