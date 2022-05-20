import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppStore } from '../../model/store.model';
import { DeleteOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import { Checkbox } from 'antd';

function DisplayTable() {
    const todoList = useSelector((event: AppStore) => event.todo.todoList);
    const [todos, setTodos] = useState<Array<string>>([]);
    const [selectedTodo, setSelectedTodo] = useState(false);
    useEffect(() => {
        setTodos(todoList);
    }, []);

    const dispatch = useDispatch();

    function onChange(e: any) {
        console.log(`checked = ${e.target.checked}`);
        setSelectedTodo(true);
    }
    console.log('todo', todoList);

    const deleteItem = (i: number) => {
        //console.log(todos, 'i', typeof i);

        console.log('before splice', todos);

        let arr = [...todos];
        arr.splice(i, 1);

        console.log('after splice', arr);

        setTodos(arr);
    };

    return (
        <div>
            {todos.map((e, i) => {
                console.log(i);

                return (
                    <table>
                        <tbody>
                            <tr>
                                <td>
                                    <Checkbox onChange={(e) => onChange(e)} />
                                </td>
                                <td>{i + 1}.</td>
                                <td
                                    className={`${selectedTodo}?'strike-through':''`}
                                >
                                    {e}
                                </td>
                                <td>
                                    <DeleteOutlined
                                        onClick={(e) => deleteItem(i)}
                                    />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                );
            })}
        </div>
    );
}

export default DisplayTable;
