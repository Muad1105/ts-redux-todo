import { Action } from '../../../model';
import { CreatingListOfusers } from './events';

export const createUserList = (value: string): Action => ({
    type: CreatingListOfusers.USERS_LIST,
    payload: {},
});
