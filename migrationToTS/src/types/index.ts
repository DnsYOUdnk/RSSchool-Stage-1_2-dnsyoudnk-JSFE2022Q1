export interface IApiResponse {
    status: string;
    totalResults?: number;
    articles?: Article[];
    sources?: Source[];
}

export type Article = {
    author: string | null;
    content: string;
    description: string;
    publishedAt: string;
    source: Source;
    title: string;
    url: string;
    urlToImage: string;
};

export type Source = {
    id: string;
    name: string;
    description?: string;
    url?: string;
    category?: string;
    language?: string;
    country?: string;
};

export interface IDraw<T> {
    draw: (data: T[]) => void;
}

export interface IAppView {
    drawNews(data: IApiResponse): void;
    drawSources(data: IApiResponse): void;
}

export enum HTTPCodes {
    Unauthorized = 401,
    Not_Found = 404,
}

export type generalApiOptions = {
    apiKey?: string;
    sources?: string;
};

export type requestAPI = {
    endpoint: string;
    options?: generalApiOptions;
};

export type getContentFunction = (data: IApiResponse) => void;

export interface IApiController {
    getSources(callback: getContentFunction): void;
    getNews(e: PointerEvent, callback: getContentFunction): void;
}
