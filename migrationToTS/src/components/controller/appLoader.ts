import { authorizationKey } from '../../resources/apiResources';
import Loader from './loader';

class AppLoader extends Loader {
    constructor() {
        super('https://nodenews.herokuapp.com/', {
            apiKey: authorizationKey,
        });
    }
}

export default AppLoader;
