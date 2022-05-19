import * as ReactDOM from 'react-dom';
import { Router } from './router';
import './index.scss';
import { store } from './store';
import { Provider } from 'react-redux';

ReactDOM.render(
    <Provider store={store}>
        <Router />
    </Provider>,
    document.getElementById('root')
);