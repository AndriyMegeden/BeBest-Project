import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { LocalStorageService } from "@core/auth-service/services/localstorage.service";
import { RestApiService } from "@core/auth-service/services/rest-api.service";
import { environment } from "@environments/environment";
import { Goal, GoalStatuses } from "@interfaces/goal.interface";

@Injectable({
    providedIn: 'root'
})
  
export class ContentRestService extends RestApiService{

    public remoteApi: string = environment.wordpressApi;

    constructor(
        http: HttpClient,
        localStorage: LocalStorageService,
    )
    {
        super(http, localStorage);
    }

    private getCategoriesRoute: string = '/categories';
    private getCategoryRoute: string = '/posts?categories';
    private getPostRoute: string = '/posts?include';

    public getCategories(resFn, errFn): void {
        this.get(false,`${this.getCategoriesRoute}`, {}, (res) => {
          resFn(res)
        }, errFn);
    }

    public getContentByCategoryId(id: number,resFn, errFn): void {
        this.get(false,`${this.getCategoryRoute}=${id}`, {}, (res) => {
          resFn(res)
        }, errFn);
    }

    public getContentByPostId(id: number,resFn, errFn): void {
        this.get(false,`${this.getPostRoute}=${id}`, {}, (res) => {
          resFn(res)
        }, errFn);
    }

}