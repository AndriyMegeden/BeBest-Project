import { Injectable } from '@angular/core';
import { Orientation } from '@interfaces/custom.interface';
import { fromEvent, Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ScreenOrientationService {
  constructor() {}

  getScreenOrientation(): Observable<Orientation> {
    return fromEvent(window, 'resize').pipe(
      startWith(null), // Добавляем начальное значение
      map(() => {
        if (window.innerHeight > window.innerWidth) {
          return 'vertical';
        } else {
          return 'horizontal';
        }
      })
    );
  }
}