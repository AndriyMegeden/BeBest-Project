import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { GoalMotivation, GoalStatuses } from '@interfaces/goal.interface';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-list-switcher',
  templateUrl: './list-switcher.component.html',
  styleUrls: ['./list-switcher.component.scss'],
})
export class ListSwitcherComponent implements OnInit {

  @Input() public selectedValue: Observable<GoalStatuses | GoalMotivation>;
  @Input() public options: Array<GoalStatuses | GoalMotivation>;
  @Output() public onGetValue: EventEmitter<string> = new EventEmitter<string>()

  public activeOption: string;

  constructor() { }

  ngOnInit() {
    this.selectedValue.subscribe((res) => {
      this.activeOption = res;
    })
  }

  changeValue(option: string){
    this.activeOption = option;
    this.onGetValue.emit(option);
  }
 
}
