import {createStore} from '@core/createStore';
import rootReducer from '@/redux/rootReducer';
import {storage} from '@core/utils';
import {defaultStyles, defaultTitle} from '@/constants';

const initialState = {
    colState: {},
    rowState: {},
    dataState: {},
    stylesState: {},
    currentStyles: defaultStyles,
    currentText: '',
    tableTitle: defaultTitle
};

function normalizeState(state) {
    return {
        ...state,
        currentText: '',
        currentStyles: defaultStyles,
    };
}

const storageState = storage('excel-state');
const state = storageState ? normalizeState(storageState) : initialState;

export const store = createStore(rootReducer, state);