import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ListLayoutConfig } from '@interfaces/custom.interface';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-list-layout',
  templateUrl: './list-layout.component.html',
  styleUrls: ['./list-layout.component.scss'],
})
export class ListLayoutComponent implements OnInit {

  @Input() config: ListLayoutConfig;
  @Input() emptyScreenGoals?: Observable<boolean>;
  @Input() emptyScreenProgress?: Observable<boolean>;
  @Input() emptyScreenProgressNoGoals?: Observable<boolean>;
  
  screenGoals: boolean;
  screenProgress: boolean;
  screenProgressNoGoals: boolean;
  
  constructor(
    private router: Router,
  ) { }

  ngOnInit() {
    if(this.emptyScreenGoals){
      this.emptyScreenGoals.subscribe(res => {
        this.screenGoals = res;
      })
    }
    if(this.emptyScreenProgress){
      this.emptyScreenProgress.subscribe(res => {
        this.screenProgress = res;
      })
    }
    if(this.emptyScreenProgressNoGoals){
      this.emptyScreenProgressNoGoals.subscribe(res => {
        this.screenProgressNoGoals = res;
      })
    }
  }

  navigate(){
    this.router.navigate(['add-goal'], { state: { action: 'create' } });
  }

}
