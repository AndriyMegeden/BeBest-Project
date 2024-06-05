import { BehaviorSubject } from "rxjs";

export type MediaAction = 'play' | 'pause';
export type ControlAction = 'next' | 'prev';
export type ContentType = 'article' | 'audio' | 'video';


export interface ContentCategory{
    categoryId: number;
    categoryImage: string;
    categoryTitle: string;
    categorySubtitle: string;
    contentType: ContentType;
    lock: boolean;
}

export interface ContentMedia{
    contentName: string;
    media: string;
}

export interface ContentArticle{
    title: string;
    description: string;
    articleImage: string;
    lock?: boolean;
    createdAt: string;
}

export interface ContentFullScreen{
    id: number;
    index: number;
    medias: ContentMedia[];
    currentTime: number;
}
