// import { ActionBtnReducer } from './model';
import { Action } from '../../../model';
import { TodoReducer } from './model';

import { CreatingListOfusers } from './events';

const initialState: TodoReducer = {
    todoList: [
        {
            action: 'read',
            todo: 'Read new story',
        },
    ],
};

export default (
    state: TodoReducer = initialState,
    action: Action
): TodoReducer => {
    switch (action.type) {
        default:
            return state;
    }
};
