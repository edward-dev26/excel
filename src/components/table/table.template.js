const CODES = {
    A: 65,
    Z: 90
};

const DEFAULT_WIDTH = 120;
const DEFAULT_HEIGHT = 24;

function getWidth(state = {}, col) {
    return (state[col] || DEFAULT_WIDTH) + 'px';
}

function getHeight(state = {}, row) {
    return (state[row] || DEFAULT_HEIGHT) + 'px';
}

function toCell(row, state) {
    return (_, col) => {
        const id = `${row}:${col}`;
        const value = state.dataState[id];

        return `
        <div 
            class="cell" 
            data-col="${col}" 
            data-type="cell"
            data-id="${id}" 
            contenteditable
            style="width: ${getWidth(state.colState, col)};"
        >${value || ''}</div>`;
    };
}

function toColumn(state) {
    return (col, index) => {
        return `<div 
                    class="column" 
                    data-type="resizable" 
                    data-col="${index}" 
                    style="width: ${getWidth(state, index)}"
                >
                ${col}
                <div class="col-resize" data-resize="col"></div>
            </div>
    `;
    };
}

function createRow(content, index, height) {
    const resize = index ? `<div class="row-resize" data-resize="row"></div>` : '';

    return `
        <div class="row" data-type="resizable" data-row="${index}" style="height: ${height}">
            <div class="row-info">
                ${index ? index : ''}
                ${resize}
            </div>
            <div class="row-data">${content}</div>
        </div>
    `;
}

function toChar(_, index) {
    return String.fromCharCode(CODES.A + index);
}

export function createTable(rowsCount = 15, state = {}) {
    const colsCount = CODES.Z - CODES.A + 1;
    const rows = [];

    const cols = new Array(colsCount)
        .fill('')
        .map(toChar)
        .map(toColumn(state.colState))
        .join('');

    rows.push(createRow(cols, 0, getHeight()));

    for (let row = 0; row < rowsCount; row++) {
        const cells = new Array(colsCount)
            .fill('')
            .map(toCell(row, state))
            .join('');

        const height = getHeight(state.rowState, row + 1);

        rows.push(createRow(cells, row + 1, height));
    }

    return rows.join('');
}