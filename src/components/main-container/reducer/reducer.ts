// import { ActionBtnReducer } from './model';
import { Action } from '../../../model';
import { TodoReducer } from './model';

import { CreatingListOfusers } from './events';

const initialState: TodoReducer = {
    todoList: [],
};

export default (
    state: TodoReducer = initialState,
    action: Action
): TodoReducer => {
    switch (action.type) {
        case CreatingListOfusers.USERS_LIST:
            return {
                ...state,
                todoList: [...state.todoList, action.payload],
            };
        default:
            return state;
    }
};
