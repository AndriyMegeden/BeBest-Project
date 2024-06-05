import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ChooseCategoryEvent, ChooseCategoryModal } from '@interfaces/goal.interface';
import { chooseCategoryModal } from '@static/custom.settings';

@Component({
  selector: 'app-modal-chose-category',
  templateUrl: './modal-chose-category.component.html',
  styleUrls: ['./modal-chose-category.component.scss'],
})
export class ModalChoseCategoryComponent implements OnInit {

  @Output() public resolveEvent: EventEmitter<ChooseCategoryEvent> = new EventEmitter<ChooseCategoryEvent>();
  @Output() public rejectEvent = new EventEmitter();
  
  public selectedOption: ChooseCategoryEvent = null;;
  public chooseCategoryModalOptions: ChooseCategoryModal[] = chooseCategoryModal;

  constructor() { }

  ngOnInit() {
    if(this.selectedOption !== null){
      this.chooseCategoryModalOptions.forEach(elem => {
        if (elem.id !== this.selectedOption.id) {
          elem.value.next(false);
        }
        else{
          elem.value.next(true)
        }
      });
    }
  }

  dismiss(){
    this.rejectEvent.emit()
  }

  getToggle(event: ChooseCategoryEvent) {
    this.selectedOption = event;
    this.chooseCategoryModalOptions.forEach(elem => {
      if (elem.id !== this.selectedOption.id) {
        elem.value.next(false);
      }
      else{
        elem.value.next(true)
      }
    });
  }

  getData(){
    console.log(this.selectedOption);
    
    this.resolveEvent.emit(this.selectedOption)
  }

}
