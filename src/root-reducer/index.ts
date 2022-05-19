import { combineReducers, Reducer } from 'redux';
import ActionBtnReducer from '../plugins/action-button/redux/reducer';
import todoReducer from '../components/main-container/reducer/reducer';

const rootReducer: Reducer = combineReducers({
    actionBtn: ActionBtnReducer,
    todo: todoReducer,
    jhvjh,
});

export default rootReducer;
