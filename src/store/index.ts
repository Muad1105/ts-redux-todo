import { createStore, applyMiddleware, Store } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../root-reducer';

export const store: Store = createStore(rootReducer, applyMiddleware(thunk));