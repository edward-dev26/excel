import {ExcelComponent} from '@core/ExcelComponent';
import {$} from '@core/dom';
import {setTableTitle} from '@/redux/rootReducer';
import {debounce, storageName} from '@core/utils';
import {ActiveRoute} from '@core/router /ActiveRoute';

export class Header extends ExcelComponent {
    static className = 'excel__header';

    constructor($root, options) {
        super($root, {
            name: 'Header',
            listeners: ['input', 'click'],
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
                <div class="button" data-button="delete">
                    <i data-button="delete" class="material-icons">delete</i>
                </div>
                <div class="button" data-button="exit">
                    <i data-button="exit" class="material-icons">exit_to_app</i>
                </div>
            </div>
        `;
    }

    onInput(e) {
        this.$dispatch(setTableTitle($(e.target).text()));
    }

    onClick(e) {
        const type = $(e.target).data.button;

        if (type === 'delete') {
            const isConfirmed = confirm('Are you sure you want to delete table?');

            if (isConfirmed) {
                localStorage.removeItem(storageName(ActiveRoute.param));
                ActiveRoute.push('');
            }
        } else if (type === 'exit') {
            ActiveRoute.push('');
        }
    }
}