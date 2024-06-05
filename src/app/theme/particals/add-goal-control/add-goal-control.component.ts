import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@core/auth-service/services/auth.service';

@Component({
  selector: 'app-add-goal-control',
  templateUrl: './add-goal-control.component.html',
  styleUrls: ['./add-goal-control.component.scss'],
})
export class AddGoalControlComponent implements OnInit {

  public firstName: string;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.authService.getAuthUser().subscribe((user) => {
      if(user){
        this.firstName = user.firstName;
      }
    })
  }

  navigate(){
    this.router.navigate(['add-goal'], { state: { action: 'create' } });
  }

}
