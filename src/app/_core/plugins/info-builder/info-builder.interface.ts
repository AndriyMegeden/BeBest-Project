
export type BuilderHtmlType = 'string' | 'block' | 'content' | 'list';
export type BuilderHtmlStringType = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p';
export type BuilderHtmlBlockType = 'div';
export type BuilderHtmlContentType = 'img' | 'video';
export type BuilderHtmlListType = 'ul' | 'ol';

export interface BuilderHtmlListTypeArray{
    value: string;
}

export interface BuildHtmlStringElement{
    type: BuilderHtmlType,
    htmlType: BuilderHtmlStringType | BuilderHtmlBlockType | BuilderHtmlContentType | BuilderHtmlListType,
    value?: string | BuilderHtmlListTypeArray[];
    cssClass?: string;
    subTag?: BuilderHtml;
}

export interface BuilderHtml {
    htmlTag: BuildHtmlStringElement;
}