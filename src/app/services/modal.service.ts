import { EventEmitter, Injectable } from '@angular/core';
import { ChooseCategoryEvent } from '@interfaces/goal.interface';
import { ContentArticle, ContentFullScreen } from '@interfaces/media.interface';
import { ModalController } from '@ionic/angular';
import { ModalActionComponent } from '@theme/modals/modal-action/modal-action.component';
import { ModalAddCategoryComponent } from '@theme/modals/modal-add-category/modal-add-category.component';
import { ModalChoseCategoryComponent } from '@theme/modals/modal-chose-category/modal-chose-category.component';
import { ModalVideoViewComponent } from '@theme/modals/modal-video-view/modal-video-view.component';
import { ArticlePage } from '../pages/article/article.page';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  
  constructor(private modalController: ModalController){
    
  }

  public async openChooseCategoryModal(selectedOption: ChooseCategoryEvent, resolveFn, rejectEvent){
    const eventEmitterResolve = new EventEmitter();
    const eventEmitterReject = new EventEmitter();
    const modal = await this.modalController.create({
    component: ModalChoseCategoryComponent,
    cssClass: 'modal-choose-category',
    backdropDismiss: false,
    animated: true,
    componentProps: {
        selectedOption: selectedOption,
        rejectEvent: eventEmitterReject,
        resolveEvent: eventEmitterResolve
      }
    });

    eventEmitterResolve.subscribe(res=>{
        resolveFn(res);
        modal.dismiss();
    });

    eventEmitterReject.subscribe(res=>{
        rejectEvent();
        modal.dismiss();
    });

    modal.present();
  }

  public async openAddCategoryModal(resolveFn, rejectEvent){
    const eventEmitterResolve = new EventEmitter();
    const eventEmitterReject = new EventEmitter();
    const modal = await this.modalController.create({
    component: ModalAddCategoryComponent,
    cssClass: 'modal-add-category',
    backdropDismiss: false,
    animated: true,
    componentProps: {
        rejectEvent: eventEmitterReject,
        resolveEvent: eventEmitterResolve
      }
    });

    eventEmitterResolve.subscribe(res=>{
        resolveFn(res);
        modal.dismiss();
    });

    eventEmitterReject.subscribe(res=>{
        rejectEvent();
        modal.dismiss();
    });

    modal.present();
  }

  public async openActionModal(resolveFn, rejectEvent){
    const eventEmitterResolve = new EventEmitter();
    const eventEmitterReject = new EventEmitter();
    const modal = await this.modalController.create({
    component: ModalActionComponent,
    cssClass: 'modal-action',
    backdropDismiss: false,
    animated: true,
    componentProps: {
        rejectEvent: eventEmitterReject,
        resolveEvent: eventEmitterResolve
      }
    });

    eventEmitterResolve.subscribe(res=>{
        resolveFn(res);
        modal.dismiss();
    });

    eventEmitterReject.subscribe(res=>{
        rejectEvent();
        modal.dismiss();
    });

    modal.present();
  }


  public async openVideoViewModal(config: ContentFullScreen, resolveFn){
    const eventEmitterResolve = new EventEmitter();
    const modal = await this.modalController.create({
    component: ModalVideoViewComponent,
    cssClass: 'modal-video-view',
    backdropDismiss: false,
    animated: true,
    componentProps: {
      resolveEvent: eventEmitterResolve,
        ...config,
      }
    });

    eventEmitterResolve.subscribe(res=>{
        resolveFn(res);
        modal.dismiss();
    });

    modal.present();
  }

  public async openSystemArticleModal(categoryId: number){
    const modal = await this.modalController.create({
    component: ArticlePage,
    cssClass: 'modal-system-article',
    backdropDismiss: false,
    animated: true,
    componentProps: {
        categoryId: categoryId,
        modal: true,
      }
    });

    modal.present();
  }
}