import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { WizardEvent, WizardType } from '@interfaces/custom.interface';
import { wizardSteps } from '@static/custom.settings';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss'],
})
export class StepperComponent  implements OnInit {

  @Input() page: Observable<WizardEvent>
  @Input() valid: Observable<boolean>
  @Output() private onChangeStep: EventEmitter<WizardEvent> = new EventEmitter<WizardEvent>()

  public steps: Array<WizardType> = wizardSteps;
  public currentStep: WizardType;
  public stepIndex: number = 0;
  public disabled: boolean;

  constructor() {}

  ngOnInit() {
    this.page.subscribe(res => {
      this.stepIndex = res.index;
      this.currentStep = res.type;
    })

    this.valid.subscribe(res => {
      this.disabled = res;
    })
  }

  nextStep(){
    this.stepIndex = this.stepIndex + 1;
    this.currentStep = wizardSteps[this.stepIndex];
    this.onChangeStep.emit({type: this.currentStep, index: this.stepIndex});
  }

  previousStep() {
    if (this.stepIndex > 0) {
      this.stepIndex = this.stepIndex - 1;
      this.currentStep = wizardSteps[this.stepIndex];
      this.onChangeStep.emit({ type: this.currentStep, index: this.stepIndex });
    } 
  }

}
