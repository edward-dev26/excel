import {ExcelComponent} from '@core/ExcelComponent';
import {$} from '@core/dom';

export class Formula extends ExcelComponent {
    static className = 'excel__formula';

    constructor($root, options) {
        super($root, {
            name: 'Formula',
            listeners: ['input', 'keydown'],
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

        this.$on('table:select', this.setValue);
        this.$on('table:input', this.setValue);
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