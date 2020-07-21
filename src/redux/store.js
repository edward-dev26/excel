import {storage} from '@core/utils';
import {defaultStyles, defaultTitle} from '@/constants';

const initialState = {
    colState: {},
    rowState: {},
    dataState: {},
    stylesState: {},
    currentStyles: defaultStyles,
    currentText: '',
    tableTitle: defaultTitle,
    openedDate: new Date().toJSON()
};

function normalizeState(state) {
    return {
        ...state,
        currentText: '',
        currentStyles: defaultStyles,
    };
}

export function getState(excelKey) {
    const storageState = storage(excelKey);

    return storageState ? normalizeState(storageState) : {...initialState};
}