import {$} from '../dom';
import {ActiveRoute} from './ActiveRoute';
import {Loader} from '../../components/Loader';

export class Router {
    constructor(selector, routes = {}) {
        if (!selector) {
            throw new Error('Selector is not provided in router');
        }

        this.$placeholder = $(selector);
        this.routes = routes;
        this.page = null;
        this.loader = new Loader();

        this.changePageHandler = this.changePageHandler.bind(this);
        this.init();
    }

    init() {
        window.addEventListener('hashchange', this.changePageHandler);
        this.changePageHandler();
    }

    getPageFromPath(path) {
        let Page = null;
        const routesKeys = Object.keys(this.routes);

        if (path === '') {
            return this.routes[routesKeys[0]];
        }

        routesKeys.forEach(key => {
            const index = path.indexOf(key);

            if (index !== -1) {
                const keyPage = path.slice(index, key.length);
                Page = this.routes[keyPage];
            }
        });

        return Page;
    }

    async changePageHandler() {
        const path = ActiveRoute.path;
        const Page = this.getPageFromPath(path);

        if (Page) {
            this.$placeholder.clear().append(this.loader);

            if (this.page) {
                this.page.destroy();
            }

            this.page = new Page(ActiveRoute.param);

            const root = await this.page.getRoot();

            this.$placeholder.clear().append(root);
            this.page.afterRender();
        }
    }

    destroy() {
        window.removeEventListener('hashchange', this.changePageHandler);
    }
}