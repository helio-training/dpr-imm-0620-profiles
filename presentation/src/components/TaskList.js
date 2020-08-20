import React, { useState } from 'react'
import { getLocalStorageValue } from '../config/local';

const TaskList = () => {
    const [tasks, setTasks] = useState([]);
    const [msg, setMsg] = useState('');
    const loadTasks = () => {
        const token = getLocalStorageValue('auth');
        if(token){
            fetch('http://localhost:5000/users/tasks', {
                headers: {
                    'auth': token
                }
            }).then(response => response.json())
              .then(data => setTasks(data))
              .then(() => setMsg(''))
              .catch(error => console.log(error))
        } else {
            setMsg('Need to be Logged In to Load Tasks');
            setTasks([]);
        }  
    }
    const displayTasks = tasks.map((task) => <li>{task.todo}</li>)
    return (
        <>
            <button onClick={loadTasks}>Load Tasks</button>
            <h3>
                {msg}
            </h3>
            <ul>
                {displayTasks}
            </ul>
        </>
    )
}

export default TaskList;