import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-bottom-menu',
  templateUrl: './bottom-menu.component.html',
  styleUrls: ['./bottom-menu.component.scss'],
})
export class BottomMenuComponent implements OnInit {

  public currentRoute: string;
  constructor(private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    // this.router.events
    // .pipe(filter(event => event instanceof NavigationEnd))
    // .subscribe(() => {
    //   this.currentRoute = this.activatedRoute.root.firstChild.snapshot.url.join('');
    //   console.log(this.currentRoute);
    // });
  }

 
}
