import Loader from './loader';

class AppLoader extends Loader {
    constructor() {
        super('https://nodenews.herokuapp.com/', {
            apiKey: '6943074f3b9a4cf1a50127f212238b1a',
        });
    }
}

export default AppLoader;
