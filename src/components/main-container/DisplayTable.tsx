import React from 'react';
import { useSelector } from 'react-redux';
import { AppStore } from '../../model/store.model';

function DisplayTable() {
    const todoList = useSelector((event: AppStore) => event.todo.todoList);
    return (
        <div>
            {todoList.map((e, i) => {
                return (
                    <table>
                        <tbody>
                            <tr>
                                <td>{i + 1}</td>
                                <td>{e.action}</td>
                                <td>{e.todo}</td>
                            </tr>
                        </tbody>
                    </table>
                );
            })}
        </div>
    );
}

export default DisplayTable;
