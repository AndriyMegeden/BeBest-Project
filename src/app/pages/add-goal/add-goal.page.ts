import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorService } from '@core/auth-service/services/http-error.service';
import { ChooseCategoryEvent, CreateCategoryEvent, Goal, GoalAction, GoalMotivation } from '@interfaces/goal.interface';
import { GoalRestService } from '@services/goal.service';
import { ModalService } from '@services/modal.service';
import { ToastService } from '@services/toast.service';
import { chooseCategoryModal, goalMotivation } from '@static/custom.settings';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-add-goal',
  templateUrl: './add-goal.page.html',
  styleUrls: ['./add-goal.page.scss'],
})
export class AddGoalPage implements OnInit {
  
  private $state: Observable<object>
  public $selectedCategory: BehaviorSubject<CreateCategoryEvent> = new BehaviorSubject<CreateCategoryEvent>({
    categoryName: chooseCategoryModal[0].id,
    categoryColor: chooseCategoryModal[0].color
  });
  public $createdCategory: BehaviorSubject<CreateCategoryEvent> = new BehaviorSubject<CreateCategoryEvent>(null);
  public $selectedGoalMotivation: BehaviorSubject<string> = new BehaviorSubject<string>('active');
  public $selectedValue: Subject<GoalMotivation> = new Subject<GoalMotivation>();

  public goalMotivations: Array<GoalMotivation> = goalMotivation;
  public selectedCategory: ChooseCategoryEvent = {
    id: chooseCategoryModal[0].id,
    value: true,
    color:  chooseCategoryModal[0].color
  };
  public dataCreatedCategory: CreateCategoryEvent;
  public action: GoalAction;
  public goal: Goal;



  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private modalService: ModalService,
    private toastService: ToastService,
    private goalRestService: GoalRestService,
    private httpErrorService: HttpErrorService,
  ) { }

  ngOnInit() {
    this.$state = this.activatedRoute.paramMap
    .pipe(map(() => window.history.state));
    this.$state.subscribe((res: any) => {
      this.action = res.action;
      if(res.goal){
        this.goal = res.goal;
        if(this.action === 'edit'){
          this.$createdCategory.next({
            categoryColor: this.goal.goalCategoryColor,
            categoryName: this.goal.goalCategoryName
          })
        }
      }
    })
  }

  ionViewWillEnter(){
    this.$selectedValue.next('i_want');
  }
  

  getValue(event: string){
    this.$selectedGoalMotivation.next(event)
  }

  chooseCategoryModal(){
    this.modalService.openChooseCategoryModal(this.selectedCategory,(res: ChooseCategoryEvent) => {
      if(res.id === 'your'){
        this.addCategoryModal()
        this.selectedCategory = res;
        this.$selectedCategory.next({
          categoryName: res.id,
          categoryColor: res.color
        })
      }
      else{
        this.dataCreatedCategory = null;
        this.$createdCategory.next(null);
        this.selectedCategory = res;
        this.$selectedCategory.next({
          categoryName: res.id,
          categoryColor: res.color
        })
      }
    }, 
    (err) => {

    })
  }

  addCategoryModal(){
    this.modalService.openAddCategoryModal((res: CreateCategoryEvent) => {
      this.$createdCategory.next(res);
    }, 
    async (error) => {
      const statusCode = error.error.error.statusCode;
      await this.toastService.showErrorToast(await this.httpErrorService.getError(statusCode));
    })
  }

  getData(event: Goal){
    if(this.action === 'create'){
      this.goalRestService.createGoal(event, () => {
        this.toastService.showSuccessToast();
        this.router.navigateByUrl('/main');
      }, 
      async (error) => {
        const statusCode = error.error.error.statusCode;
        await this.toastService.showErrorToast(await this.httpErrorService.getError(statusCode));
      })
    }
    else if(this.action === 'edit'){
      this.goalRestService.editGoal(this.goal.goalId, event,(res) => {
        this.router.navigateByUrl('/main');
      }, 
      async (error) => {
        const statusCode = error.error.error.statusCode;
        await this.toastService.showErrorToast(await this.httpErrorService.getError(statusCode));
      })
      
    }
  }
}
