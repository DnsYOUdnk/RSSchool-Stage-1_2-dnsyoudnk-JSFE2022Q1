import { IAppController, IAppView, IApp } from '../../types';
import AppController from '../controller/controller';
import { AppView } from '../view/appView';

class App implements IApp {
    controller: IAppController;
    view: IAppView;

    constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    start() {
        const sources = <HTMLDivElement>document.querySelector('.sources');
        sources.addEventListener('click', (e) => this.controller.getNews(e, (data) => this.view.drawNews(data)));
        this.controller.getSources((data) => this.view.drawSources(data));
    }
}

export default App;
