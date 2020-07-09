import {ExcelComponent} from '@core/ExcelComponent';
import {createTable} from '@/components/table/table.template';
import {resizeHandler} from '@/components/table/table.resize';
import {isCell, matrix, nextSelector, shouldResize} from '@/components/table/table.functions';
import {TableSelection} from '@/components/table/TableSelection';
import {$} from '@core/dom';
import {setColState, setRowState, setDataState, setCurrentText} from '@/redux/rootReducer';

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
        return createTable(30, this.$getState());
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
        this.changeCellValue(value);
    }

    handleFormulaEnter() {
        this.selection.current.focus();
    }

    selectCell($cell) {
        this.selection.select($cell);
        this.$dispatch(setCurrentText(this.selection.current.text()));
    }

    async tableResize(e) {
        const {type, ...data} = await resizeHandler(this.$root, e);

        if (type === 'col') {
            this.$dispatch(setColState(data));
        } else {
            this.$dispatch(setRowState(data));
        }
    }

    changeCellValue(value) {
        this.$dispatch(setDataState({
            id: this.selection.current.id(),
            value
        }));
        this.$dispatch(setCurrentText(value));
    }

    onMousedown(e) {
        if (shouldResize(e)) {
            this.tableResize(e);
        } else if (isCell(e)) {
            const $target = $(e.target);

            if (e.shiftKey) {
                const cells = matrix(this.selection.current, $target)
                    .map(id => this.$root.find(`[data-id="${id}"]`));

                this.selection.selectGroup(cells);
            } else {
                this.selection.select($target);
            }

            this.$dispatch(setCurrentText(this.selection.current.text()));
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
        this.changeCellValue($(e.target).text());
    }
}