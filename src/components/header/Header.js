import {ExcelComponent} from '@core/ExcelComponent';
import {$} from '@core/dom';
import {setTableTitle} from '@/redux/rootReducer';
import {debounce} from '@core/utils';

export class Header extends ExcelComponent {
    static className = 'excel__header';

    constructor($root, options) {
        super($root, {
            name: 'Header',
            listeners: ['input'],
            subscribe: ['tableTitle'],
            ...options
        });
    }

    prepare() {
        this.onInput = debounce(this.onInput, 300);
    }

    toHTML() {
        return `
            <input id="title_input" type="text" class="input" value="${this.$getState('tableTitle')}">
            <div>
                <div class="button">
                    <i class="material-icons">delete</i>
                </div>
                <div class="button">
                    <i class="material-icons">exit_to_app</i>
                </div>
            </div>
        `;
    }

    onInput(e) {
        this.$dispatch(setTableTitle($(e.target).text()));
    }
}