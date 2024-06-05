import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class HttpErrorService {
  
  constructor(private translateService: TranslateService){}

  async getError(key: number){
    const translation = await this.translateService.get(`other.http_errors.${key}`).toPromise();
    return translation;
  }

}
