import {ExcelComponent} from '@core/ExcelComponent';
import {createTable} from '@/components/table/table.template';
import {resizeHandler} from '@/components/table/table.resize';
import {isCell, matrix, shouldResize} from '@/components/table/table.functions';
import {TableSelection} from '@/components/table/TableSelection';
import {$} from '@core/dom';

export class Table extends ExcelComponent {
    static className = 'excel__table';

    constructor($root) {
        super($root, {
            name: 'Table',
            listeners: ['mousedown']
        });
    }

    toHTML() {
        return createTable(30);
    }

    prepare() {
        this.selection = new TableSelection();
    }

    init() {
        super.init();
        const $cell = this.$root.find('[data-id="0:0"]');

        this.selection.select($cell);
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
        }
    }
}