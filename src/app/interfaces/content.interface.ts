export type ContentType = 'article' | 'audio' | 'video';

export interface ServerResponseCategory {
    id: number;
    name: string;
    acf: {
      categoryTitle: string;
      categorySubtitle: string;
      categoryImage: string;
      contentType: ContentType[];
      lock: string[]; // Возможно, лучше использовать boolean[]
    };
    // Другие свойства
  }



export interface ServerResponseMedia {
  id: number;
  date: string;
  acf: {
    contentName: string;
    media: string;
  };
}

export interface ServerResponseArticle {
  id: number;
  date: string;
  acf: {
    title: string;
    description: string;
    articleImage: string;
    lock: boolean;
  };
}


