const SET_RESIZED_COLUMN = 'SET_RESIZED_COLUMN';
const SET_RESIZED_ROWS = 'SET_RESIZED_ROWS';
const SET_DATA_STATE = 'SET_DATA_STATE';
const SET_CURRENT_TEXT = 'SET_CURRENT_TEXT';

const rootReducer = (state, action) => {
    switch (action.type) {
        case SET_CURRENT_TEXT:
            return {
                ...state,
                ...action.payload
            };
        case SET_RESIZED_COLUMN:
            return {
                ...state,
                colState: {...state.colState, [action.payload.id]: action.payload.value}
            };
        case SET_RESIZED_ROWS:
            return {
                ...state,
                rowState: {...state.rowState, [action.payload.id]: action.payload.value}
            };
        case SET_DATA_STATE:
            return {
                ...state,
                dataState: {...state.dataState, [action.payload.id]: action.payload.value}
            };
        default:
            return state;
    }
};

export const setColState = (colData) => ({type: SET_RESIZED_COLUMN, payload: colData});
export const setRowState = (rowData) => ({type: SET_RESIZED_ROWS, payload: rowData});
export const setDataState = (dataText) => ({type: SET_DATA_STATE, payload: dataText});
export const setCurrentText = (currentText) => ({type: SET_CURRENT_TEXT, payload: {currentText}});

export default rootReducer;