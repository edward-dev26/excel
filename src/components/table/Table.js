import {ExcelComponent} from '@core/ExcelComponent';
import {createTable} from '@/components/table/table.template';
import {resizeHandler} from '@/components/table/table.resize';
import {isCell, matrix, nextSelector, shouldResize} from '@/components/table/table.functions';
import {TableSelection} from '@/components/table/TableSelection';
import {$} from '@core/dom';

export class Table extends ExcelComponent {
    static className = 'excel__table';

    constructor($root, options) {
        super($root, {
            name: 'Table',
            listeners: ['mousedown', 'keydown', 'input'],
            ...options
        });

        this.handleFormulaEnter = this.handleFormulaEnter.bind(this);
        this.handleFormulaInput = this.handleFormulaInput.bind(this);
    }

    toHTML() {
        return createTable(30);
    }

    prepare() {
        this.selection = new TableSelection();
    }

    init() {
        super.init();
        this.selectCell(this.$root.find('[data-id="0:0"]'));
        this.$on('formula:input', this.handleFormulaInput);
        this.$on('formula:enter', this.handleFormulaEnter);
    }

    handleFormulaInput(value) {
        this.selection.current.text(value);
    }

    handleFormulaEnter() {
        this.selection.current.focus();
    }

    selectCell($cell) {
        this.selection.select($cell);
        this.$emit('table:select', this.selection.current.text());
    }

    onMousedown(e) {
        if (shouldResize(e)) {
            resizeHandler(this.$root, e);
        } else if (isCell(e)) {
            const $target = $(e.target);

            if (e.shiftKey) {
                const cells = matrix(this.selection.current, $target)
                    .map(id => this.$root.find(`[data-id="${id}"]`));

                this.selection.selectGroup(cells);
            } else {
                this.selection.select($target);
            }

            this.$emit('table:select', this.selection.current.text());
        }
    }

    onKeydown(e) {
        const keys = ['Enter', 'Tab', 'ArrowLeft', 'ArrowRight', 'ArrowDown', 'ArrowUp'];

        if (keys.includes(e.key) && !e.shiftKey) {
            e.preventDefault();

            const currentId = this.selection.current.id(true);
            const $next = this.$root.find(nextSelector(e.key, currentId));
            this.selectCell($next);
        }
    }

    onInput(e) {
        this.$emit('table:input', $(e.target).text());
    }
}