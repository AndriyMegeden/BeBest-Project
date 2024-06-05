import { Injectable } from "@angular/core";
import { BuilderHtml, BuilderHtmlBlockType, BuilderHtmlContentType, BuilderHtmlListType, BuilderHtmlListTypeArray, BuilderHtmlStringType } from "./info-builder.interface";

@Injectable({
    providedIn: 'root'
})

export class Builder{

    constructor(){}

    buildHtml(schemas: BuilderHtml[]){
        let html: string = '';
        schemas.forEach(tag => {
            html += this.buildHtmlTagType(tag);
        })

        return html;
    }

    private buildHtmlTagType(tag: BuilderHtml){
        let type = tag.htmlTag.type;
        let htmlTag: BuilderHtmlStringType | BuilderHtmlBlockType | BuilderHtmlContentType | BuilderHtmlListType = tag.htmlTag.htmlType;
        let htmlValue: string | BuilderHtmlListTypeArray[]= tag.htmlTag.value;
        let cssClass: string = tag.htmlTag.cssClass && tag.htmlTag.cssClass !== '' ? `class="${tag.htmlTag.cssClass}"` : '';
        switch (type) {
            case 'string':
                return this.buildHtmlStringType(htmlTag, htmlValue, cssClass)
            case 'block':
                return this.buildHtmlBlockType(htmlTag, htmlValue, cssClass)
            case 'content':
                return this.buildHtmlContentType(htmlTag, htmlValue, cssClass)
            case 'list':
                return this.buildHtmlListType(htmlTag, htmlValue, cssClass)
        }
    }

    private buildHtmlStringType(htmlTag, value, cssClass){
        let html: string = '';
        html += `<${htmlTag} ${cssClass}> ${value} </${htmlTag}>`;
        return html;
    }

    private buildHtmlBlockType(htmlTag, value, cssClass){
        let html: string = '';
        html += `<${htmlTag} ${cssClass}> ${value} </${htmlTag}>`;
        return html;
    }

    private buildHtmlContentType(htmlTag, value, cssClass){
        let html: string = '';
        let tagValue: string = value && value !== '' ? `src="${value}"` : '';
        html += `<${htmlTag} ${cssClass} ${tagValue}>  </${htmlTag}>`;
        return html;
    }

    private buildHtmlListType(htmlTag, value, cssClass){
        let html: string = '';
        let htmlSub: string = '';
        
        value.forEach(tag => {
            htmlSub += `<li> ${tag.value} </li>`;
        })

        html += `<${htmlTag} ${cssClass}> ${htmlSub} </${htmlTag}>`;
        return html;
    }

    private buildHtmlSubTag(tag: BuilderHtml){

    }
}