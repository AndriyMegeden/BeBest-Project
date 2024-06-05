/* eslint-disable @typescript-eslint/dot-notation */
import { NgModule } from '@angular/core';
import { MissingTranslationHandler, MissingTranslationHandlerParams, TranslateModule } from '@ngx-translate/core';

export class MissingTranslationHelper implements MissingTranslationHandler {
  handle(params: MissingTranslationHandlerParams) {
    if (params.interpolateParams) {
      // tslint:disable-next-line: no-string-literal
      return params.interpolateParams['default'] || params.key;
    }
    return params.key;
  }
}

@NgModule({
  imports: [
    TranslateModule.forChild({
      missingTranslationHandler: { provide: MissingTranslationHandler, useClass: MissingTranslationHelper }
    }),
  ],
  exports:[
    TranslateModule
  ]
})

export class NgxTranslateModule { }
