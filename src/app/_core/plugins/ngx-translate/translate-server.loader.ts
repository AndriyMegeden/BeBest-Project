// shared/loaders/translate-server.loader.ts
import { join } from 'path';
import { from, merge, Observable } from 'rxjs';
import { TranslateLoader } from '@ngx-translate/core';
import {
  makeStateKey,
  StateKey,
  TransferState
} from '@angular/platform-browser';
import * as fs from 'fs';

export class TranslateServerLoader implements TranslateLoader {
  constructor(
    private transferState: TransferState,
    private prefix: string = 'i18n',
    private suffix: string = '.json'
  ) {}

  public getTranslation(lang: string): Observable<any> {
    return new Observable((observer) => {
      const assets_folder = join(
        process.cwd(),
        'dist',
        'app', // Your project name here
        'browser',
        'assets',
        this.prefix
      );

      const components = JSON.parse(fs.readFileSync(`${assets_folder}/components/${lang}${this.suffix}`, 'utf8'));
      const direction = JSON.parse(fs.readFileSync(`${assets_folder}/direction/${lang}${this.suffix}`, 'utf8'));
      const category = JSON.parse(fs.readFileSync(`${assets_folder}/category/${lang}${this.suffix}`, 'utf8'));
      const pages = JSON.parse(fs.readFileSync(`${assets_folder}/pages/${lang}${this.suffix}`, 'utf8'));
      const plugins = JSON.parse(fs.readFileSync(`${assets_folder}/plugins/${lang}${this.suffix}`, 'utf8'));

      const translate = Object.assign({}, components, direction,category, pages, plugins);

      const key: StateKey<number> = makeStateKey<number>(
        'transfer-translate-' + lang
      );
      this.transferState.set(key, translate);

      observer.next(translate);
      observer.complete();
    });
  }
}

export function translateServerLoaderFactory(transferState: TransferState) {
  return new TranslateServerLoader(transferState);
}