const SET_RESIZED_COLUMN = 'SET_RESIZED_COLUMN';
const SET_RESIZED_ROWS = 'SET_RESIZED_ROWS';
const SET_DATA_STATE = 'SET_DATA_STATE';
const SET_CURRENT_TEXT = 'SET_CURRENT_TEXT';
const SET_STYLE = 'SET_STYLE';
const SET_CURRENT_STYLES = 'SET_CURRENT_STYLES';
const SET_TABLE_TITLE = 'SET_TABLE_TITLE';
const UPDATE_DATE = 'UPDATE_DATE';

const rootReducer = (state, action) => {
    switch (action.type) {
        case SET_CURRENT_TEXT:
        case SET_TABLE_TITLE:
            return {
                ...state,
                ...action.payload
            };
        case SET_RESIZED_COLUMN:
            return changeState(state, 'colState', action);
        case SET_RESIZED_ROWS:
            return changeState(state, 'rowState', action);
        case SET_DATA_STATE:
            return changeState(state, 'dataState', action);
        case SET_CURRENT_STYLES:
            return {
                ...state,
                currentStyles: {...state.currentStyles, ...action.payload}
            };
        case SET_STYLE: {
            const value = {};

            action.payload.ids.forEach(id => value[id] = {...state.stylesState[id], ...action.payload.value});

            return {
                ...state,
                stylesState: {...state.stylesState, ...value}
            };
        }
        case UPDATE_DATE:
            return {
                ...state,
                openedDate: new Date().toJSON()
            };
        default:
            return state;
    }
};

function changeState(state, field, action) {
    return {
        ...state,
        [field]: {...state[field], [action.payload.id]: action.payload.value}
    };
}

export const setColState = (colData) => ({type: SET_RESIZED_COLUMN, payload: colData});
export const setRowState = (rowData) => ({type: SET_RESIZED_ROWS, payload: rowData});
export const setDataState = (dataText) => ({type: SET_DATA_STATE, payload: dataText});
export const setCurrentText = (currentText) => ({type: SET_CURRENT_TEXT, payload: {currentText}});
export const setCurrentStyles = (currentStyles) => ({type: SET_CURRENT_STYLES, payload: currentStyles});
export const setStyle = (dataStyle) => ({type: SET_STYLE, payload: dataStyle});
export const setTableTitle = (tableTitle) => ({type: SET_TABLE_TITLE, payload: {tableTitle}});
export const updateDate = () => ({type: UPDATE_DATE});

export default rootReducer;