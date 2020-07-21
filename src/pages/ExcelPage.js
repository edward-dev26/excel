import {Page} from '@core/Page';
import {debounce, storage, storageName} from '@core/utils';
import {Header} from '@/components/header/Header';
import {Excel} from '@/components/excel/Excel';
import {Toolbar} from '@/components/toolbar/Toolbar';
import {Formula} from '@/components/formula/Formula';
import {Table} from '@/components/table/Table';
import {getState} from '@/redux/store';
import {createStore} from '@core/store/createStore';
import rootReducer from '@/redux/rootReducer';

export class ExcelPage extends Page {
    getRoot() {
        const param = this.params || Date.now().toString();
        const excelKey = storageName(param);
        const state = getState(excelKey);
        const store = createStore(rootReducer, state);

        const stateListener = debounce(state => {
            storage(excelKey, state);
        }, 300);

        store.subscribe(stateListener);

        this.excel = new Excel({
            components: [Header, Toolbar, Formula, Table],
            store
        });

        return this.excel.getRoot();
    }

    afterRender() {
        this.excel.init();
    }

    destroy() {
        this.excel.destroy();
    }
}