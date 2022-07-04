export interface INewsResponse {
    status: string;
    totalResults: number;
    articles: Article[];
}

export type Article = {
    author: string | null;
    content: string;
    description: string;
    publishedAt: string;
    source: ISource;
    title: string;
    url: string;
    urlToImage: string;
}

export interface ISource {
    id: string;
    name: string;
    description?: string;
    url?: string;
    category?: string;
    language?: string;
    country?: string;
}

export interface IDraw<T> {
    draw: (data: T[]) => void;
} 

