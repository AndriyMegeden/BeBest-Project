import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Colors, CreateCategoryEvent } from '@interfaces/goal.interface';
import { colors } from '@static/custom.settings';

@Component({
  selector: 'app-modal-add-category',
  templateUrl: './modal-add-category.component.html',
  styleUrls: ['./modal-add-category.component.scss'],
})
export class ModalAddCategoryComponent implements OnInit {

  @Output() public resolveEvent: EventEmitter<CreateCategoryEvent> = new EventEmitter<CreateCategoryEvent>();
  @Output() public rejectEvent = new EventEmitter();

  public colors: Array<Colors> = colors;

  public form: FormGroup;


  constructor() { }

  ngOnInit() {
    this.form = new FormGroup({
      categoryName: new FormControl('', [Validators.required, Validators.minLength(3)]),
      categoryColor: new FormControl('', [Validators.required]),
    })
  }
  
  setValue(value: string){
    this.form.get('categoryColor').setValue(value)
  }

  dismiss(){
    this.rejectEvent.emit()
  }

  getData(){
    this.resolveEvent.emit(this.form.value)
  }

}
