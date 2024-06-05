import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-modal-action',
  templateUrl: './modal-action.component.html',
  styleUrls: ['./modal-action.component.scss'],
})
export class ModalActionComponent  implements OnInit {

  @Output() public resolveEvent: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() public rejectEvent = new EventEmitter();

  constructor() { }

  ngOnInit() {}

  resolve(){
    this.resolveEvent.emit(true);
  }

  dismiss(){
    this.rejectEvent.emit(false);
  }

}
