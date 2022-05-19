import { FunctionComponent } from 'react';
import DisplayTable from '../components/main-container/DisplayTable';
import InputTable from '../components/main-container/InputTable';

import {
    BrowserRouter,
    Link,
    Routes,
    Route,
    HashRouter,
} from 'react-router-dom';

import { Locations } from '../constants/locations';

interface TodoList {}

export const Router: FunctionComponent<TodoList> = () => {
    return (
        <HashRouter>
            <Link to={Locations.USER_LIST}>Users List</Link>
            <Link to={Locations.USER_INPUT}>Input Name</Link>
            <Routes>
                <Route path={Locations.USER_LIST} element={<DisplayTable />} />
                <Route path={Locations.USER_INPUT} element={<InputTable />} />
            </Routes>
        </HashRouter>
    );
};
