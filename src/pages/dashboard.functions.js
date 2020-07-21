import {storage} from '@core/utils';

export function toHtml(key) {
    const model = storage(key);
    const excelId = key.split(':')[1];
    const openedDate = new Date(model.openedDate);

    return `
         <li class="db__record">
             <a href="#excel/${excelId}">${model.tableTitle}</a>
             <strong>${openedDate.toLocaleDateString()} ${openedDate.toLocaleTimeString()}</strong>
         </li>
    `;
}

function getAllKeys() {
    const keys = [];

    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);

        if (!key.includes('excel')) continue;

        keys.push(key);
    }

    return keys;
}

export function createRecordsTable() {
    const keys = getAllKeys();

    if (!keys.length) {
        return `<p>You still don't create table</p>`;
    }

    return `
        <div class="db__list-header">
            <span>Name</span>
            <span>Date opened</span>
        </div>
        <ul class="db__list">
            ${keys.map(toHtml).join('')}
        </ul>
    `;
}