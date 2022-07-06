import AppLoader from './appLoader';
import { getContentFunction, IAppController } from '../../types/index';

class AppController extends AppLoader implements IAppController {
    getSources(callback: getContentFunction): void {
        super.getResp(
            {
                endpoint: 'sources',
            },
            callback
        );
    }

    getNews(e: MouseEvent, callback: getContentFunction) {
        let target = e.target as HTMLSpanElement;
        const newsContainer = e.currentTarget as HTMLDivElement;
        while (target !== newsContainer) {
            if (target.classList.contains('source__item')) {
                const sourceId = <string>target.getAttribute('data-source-id');
                if (newsContainer.getAttribute('data-source') !== sourceId) {
                    newsContainer.setAttribute('data-source', sourceId);
                    super.getResp(
                        {
                            endpoint: 'everything',
                            options: {
                                sources: sourceId,
                            },
                        },
                        callback
                    );
                }
                return;
            }
            target = target.parentNode as HTMLDivElement;
        }
    }
}

export default AppController;
