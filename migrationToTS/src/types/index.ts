export interface INewsResponse {
    status: string,
    totalResults: number,
    articles: Article[]
}

type Article = {
    author: string | null,
    content: string,
    description: string,
    publishedAt: string,
    sources: {
        id: string,
        name: string
    },
    title: string,
    url: string,
    urlToImage: string
}

