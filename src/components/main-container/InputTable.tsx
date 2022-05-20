import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createUserList } from './reducer/action';

function InputTable() {
    const [name, setName] = useState('');
    const dispatch = useDispatch();

    const updateUserList = () => {
        console.log(name);
        dispatch(createUserList(name));
    };

    return (
        <div className="input-table">
            <form>
                <label htmlFor="userName">
                    User Name
                    <input
                        type="text"
                        onChange={(e) => {
                            setName(e.target.value);
                        }}
                    />
                </label>

                <button onClick={updateUserList}>Add Todo</button>
            </form>
        </div>
    );
}

export default InputTable;
