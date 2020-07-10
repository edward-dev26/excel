import {range} from '@core/utils';

export function shouldResize(e) {
    return e.target.dataset.resize;
}

export function isCell(e) {
    return e.target.dataset.type === 'cell';
}

export function matrix($current, $target) {
    const current = $current.id(true);
    const target = $target.id(true);
    const cols = range(current.col, target.col);
    const rows = range(current.row, target.row);

    return rows.reduce((acc, row) => {
        cols.forEach(col => acc.push(`${row}:${col}`));

        return acc;
    }, []);
}

export function nextSelector(key, currentId) {
    const MIN_VALUE = 0;

    let nextRow = currentId.row;
    let nextCol = currentId.col;

    switch (key) {
        case 'Enter':
        case 'ArrowDown':
            nextRow++;
            break;
        case 'Tab':
        case 'ArrowRight':
            nextCol++;
            break;
        case 'ArrowLeft':
            nextCol = nextCol === MIN_VALUE ? MIN_VALUE : --nextCol;
            break;
        case 'ArrowUp':
            nextRow = nextRow === MIN_VALUE ? MIN_VALUE : --nextRow;
            break;
    }

    return `[data-id="${nextRow}:${nextCol}"]`;
}