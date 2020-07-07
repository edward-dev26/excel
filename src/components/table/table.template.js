const CODES = {
    A: 65,
    Z: 90
};

function toCell(col) {
    return `<div class="cell" data-col="${col}" data-type="resizable" contenteditable></div>`;
}

function toColumn(col) {
    return `<div class="column" data-type="resizable" data-col="${col}">
                ${col}
                <div class="col-resize" data-resize="col"></div>
            </div>
    `;
}

function createRow(content, index) {
    const resize = index ? `<div class="row-resize" data-resize="row"></div>` : '';

    return `
        <div class="row" data-type="resizable">
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

function getTemplateWithChar(count, create) {
    return new Array(count)
        .fill('')
        .map(toChar)
        .map(create)
        .join('');
}

export function createTable(rowsCount = 15) {
    const colsCount = CODES.Z - CODES.A + 1;
    const rows = [];
    const cols = getTemplateWithChar(colsCount, toColumn);
    const cells = getTemplateWithChar(colsCount, toCell);

    rows.push(createRow(cols));

    for (let i = 0; i < rowsCount; i++) {
        rows.push(createRow(cells, i + 1));
    }

    return rows.join('');
}