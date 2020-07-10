import {ExcelComponent} from '@core/ExcelComponent';
import {$} from '@core/dom';

export class Formula extends ExcelComponent {
    static className = 'excel__formula';

    constructor($root, options) {
        super($root, {
            name: 'Formula',
            listeners: ['input', 'keydown'],
            subscribe: ['currentText'],
            ...options
        });

        this.setValue = this.setValue.bind(this);
    }

    toHTML() {
        return `
            <div class="info">fx</div>
            <div id="formula" class="input" contenteditable spellcheck="false"></div>
        `;
    }

    init() {
        super.init();
        this.$formula = this.$root.find('#formula');
        this.setValue(this.$getState('currentText'));
    }

    storeChanged({currentText}) {
        this.setValue(currentText);
    }

    setValue(value) {
        this.$formula.text(value);
    }

    onInput(e) {
        this.$emit('formula:input', $(e.target).text());
    }

    onKeydown(e) {
        const keys = ['Enter', 'Tab'];

        if (keys.includes(e.key)) {
            e.preventDefault();
            this.$emit('formula:enter');
        }
    }
}