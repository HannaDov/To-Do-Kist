import {Button, Checkbox, TextField} from '@mui/material';
import React, {useState, KeyboardEvent, ChangeEvent} from 'react';
import {FilterValueType} from "./App";
import {Delete} from '@mui/icons-material'
import {IconButton} from '@mui/material'
import {FullInput} from "./FullInput";
import {EditTableSpan} from "./EditTableSpan";


type TodolistPropsType = {
    title: string
    tasks: Array<TaskPropsType>
    removeTasks: (todolistId: string, taskId: string) => void
    changeFilter: (todolistId: string, value: FilterValueType) => void
    addTask: (todolistId: string, newTitle: string) => void
    changeTaskStatus: (todolistId: string, taskId: string, isDone: boolean) => void
    filter: FilterValueType
    id: string
    removeTodolist: (todolistId: string) => void
    editTodolist: (todolistId: string, newTitle: string) => void
    editTask: (todolistId: string, taskId: string, newTitle: string) => void
}
export type TaskPropsType = {
    id: string
    title: string
    isDone: boolean
}
export const Todolist: React.FC<TodolistPropsType> = (props) => {
    /* const [newTaskTitle, setNewTaskTitle] = useState('')
     const [error, setError] = useState<string | null>(null)*/
    const removeTasksHandler = (todolistId: string, elId: string) => {
        props.removeTasks(props.id, elId)
    }
    const changeFilterHandler = (todolistId: string, value: FilterValueType) => {
        props.changeFilter(todolistId, value)
    }

    /* const addTaskHandler = () => {
         if (newTaskTitle.trim() !== "") {
             props.addTask(props.id, newTaskTitle.trim())
             setNewTaskTitle('')
         } else {
             setError("Title is required")
         }
     }
     const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
         setError(null)
         if (e.key === "Enter") {
             addTaskHandler()
         }
     }
     const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
         setNewTaskTitle(event.currentTarget.value)
     }*/
    const changeTaskStatusHandler = (todolistId: string, elId: string, checkedValue: boolean) => {
        props.changeTaskStatus(props.id, elId, checkedValue)
    }
    const removeTodolistHandler = () => {
        props.removeTodolist(props.id)
    }
    const addTaskHandler = (newTitle: string) => {
        props.addTask(props.id, newTitle)
    }
    const editTodolistHandler = (newTitle: string) => {
        props.editTodolist(props.id, newTitle)
    }
    const editTaskHandler = (elId: string, newTitle: string) => {
        props.editTask(props.id, elId, newTitle)
    }
    return (
        <div>
            <div>
                <h3><EditTableSpan title={props.title} callback={editTodolistHandler}/><IconButton aria-label="delete"
                                                                                                   onClick={removeTodolistHandler}>
                    <Delete/>
                </IconButton></h3>

                <FullInput callback={addTaskHandler}/>

                {/*<button onClick={removeTodolistHandler}>x</button>*/}

                {/*<div>
                Ref заменяет : onChange, value. пишем в input  ref={myRef}, убираем  value, затем
                создаем myRef=useRef<HTMLInputElement>(null) console.log(myRef.current)
                 а затем переписываем const addTaskHandler = () => {
        if (myRef.current) {
            props.callback(myRef.current?.value)
            myRef.current?.value=''
        } else {
            setError("Title is required")
        }
    }
                    <TextField value={newTaskTitle} onKeyPress={onKeyPressHandler}
                               onChange={onChangeHandler} className={error ? 'error' : ''} variant="outlined" />
                    <input value={newTaskTitle} onKeyPress={onKeyPressHandler}
                           onChange={onChangeHandler} className={error ? 'error' : ''}/>
                   <button onClick={addTaskHandler}>+</button>
                    <Button variant="contained" onClick={addTaskHandler}
                            style={{maxWidth: '30px', maxHeight: '25px', minWidth: '30px', minHeight: '25px'}}>+</Button>
                    {error && <div className='error-message'>{error}</div>}
                </div>*/}
                <ul>
                    {props.tasks.map(el => {

                        return (
                            <li key={el.id} className={el.isDone ? 'is-done' : ''}>
                                <Checkbox  defaultChecked checked={el.isDone}
                                           size='small'
                                          onChange={(event) => changeTaskStatusHandler(props.id, el.id, event.currentTarget.checked)}/>
                                {/*<input type='checkbox' checked={el.isDone}

                                       onChange={(event) => changeTaskStatusHandler(props.id, el.id, event.currentTarget.checked)}/>*/}

                                <EditTableSpan title={el.title}
                                               callback={(newTitle) => editTaskHandler(el.id, newTitle)}/>
                                {/* <button onClick={() => removeTasksHandler(props.id, el.id)}>✖</button>*/}
                                <IconButton aria-label="delete">
                                    <Delete onClick={() => removeTasksHandler(props.id, el.id)}/>
                                </IconButton>
                            </li>
                        )
                    })}

                </ul>
                <div>
                    <Button variant={props.filter === "All" ? "outlined" : "contained"}
                            onClick={() => changeFilterHandler(props.id, 'All')}
                            size='small' color='inherit'>All
                    </Button>
                    <Button variant={props.filter === "Active" ? "outlined" : "contained"}
                            onClick={() => changeFilterHandler(props.id, 'Active')}
                        /* className={props.filter === "Active" ? "active-filter" : ''}*/ size='small' color='primary'>Active
                    </Button>
                    <Button variant={props.filter === "Completed" ? "outlined" : "contained"}
                            onClick={() => changeFilterHandler(props.id, 'Completed')}
                            color='secondary' size='small'>Completed
                    </Button>
                </div>
            </div>
        </div>

    )
};





