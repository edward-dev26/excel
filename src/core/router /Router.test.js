import {Router} from './Router';
import {Page} from '../page/Page';

class DashboardPage extends Page {
    async getRoot() {
        return new Promise(resolve => {
            const root = document.createElement('div');
            root.innerHTML = 'dashboard';

            setTimeout(() => resolve(root), 500);
        });
    }
}

class ExcelPage extends Page {
}

describe('Router', () => {
    let router;
    let $root;

    beforeEach(() => {
        $root = document.createElement('div');
        router = new Router($root, {
            dashboard: DashboardPage,
            excel: ExcelPage
        });
    });

    test('Router should be defined', () => {
        expect(router).toBeDefined();
    });

    test('Should render Dashboard Page', () => {
        return new Promise(resolve => {
            router.changePageHandler();

            setTimeout(() => {
                expect($root.innerHTML).toBe(`<div>dashboard</div>`);
                resolve();
            }, 1000);
        });
    });
});