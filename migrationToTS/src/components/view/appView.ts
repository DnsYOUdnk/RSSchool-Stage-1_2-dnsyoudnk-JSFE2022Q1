import { IAppView, IApiResponse, IDraw, Article, Source } from '../../types';
import Sources from './sources/sources';
import News from './news/news';

export class AppView implements IAppView {
    news: IDraw<Article>;
    sources: IDraw<Source>;

    constructor() {
        this.news = new News();
        this.sources = new Sources();
    }

    drawNews(data: IApiResponse): void {
        const values = data?.articles ? data?.articles : [];
        this.news.draw(values);
    }

    drawSources(data: IApiResponse): void {
        const values = data?.sources ? data?.sources : [];
        this.sources.draw(values);
    }
}

export default AppView;
