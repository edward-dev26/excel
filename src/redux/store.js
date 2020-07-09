import {createStore} from '@core/createStore';
import rootReducer from '@/redux/rootReducer';
import {storage} from '@core/utils';

const initialState = {
    colState: {},
    rowState: {},
    dataState: {},
    currentText: ''
};

export const store = createStore(rootReducer, storage('excel-state') || initialState);