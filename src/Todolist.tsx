import {Button} from '@mui/material';
import React, { useCallback} from 'react';

import {Delete} from '@mui/icons-material'
import {IconButton} from '@mui/material'
import {FullInput} from "./FullInput";
import {EditTableSpan} from "./EditTableSpan";
import {useDispatch, useSelector} from "react-redux";

import {addTaskAC} from "./state/tasks-reducer";
import {FilterValueType} from "./AppWithRedux";
import {Task} from "./Task";
import {AppRootState} from "./state/store";




type TodolistPropsType = {
    /*tasks: TaskPropsType[]*/
    title: string
    changeFilter: (todolistId: string, value: FilterValueType) => void
    filter: FilterValueType
    id: string
    removeTodolist: (todolistId: string) => void
    editTodolist: (todolistId: string, newTitle: string) => void

}
export type TaskPropsType = {
    id: string
    title: string
    isDone: boolean
}
export const Todolist = React.memo(function (props: TodolistPropsType) {
    console.log('Todolist is called')
    const tasks = useSelector<AppRootState, Array<TaskPropsType>>(state => state.tasks[props.id])
    const dispatch = useDispatch()


    /*const [newTaskTitle, setNewTaskTitle] = useState('')
    const [error, setError] = useState<string | null>(null)*/
   /* const removeTasksHandler = useCallback((todolistId: string, elId: string) => {
        dispatch(removeTaskAC(props.id, elId))
    },[dispatch])*/
    /* const changeFilterHandler = useCallback((todolistId: string, value: FilterValueType) => {
         props.changeFilter(props.id, value)
     },[props.changeFilter,props.id])*/

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
 /*   const changeTaskStatusHandler = useCallback((todolistId: string, elId: string, checkedValue: boolean) => {
         dispatch(changeTaskStatusAC(props.id, elId, checkedValue))
     },[dispatch])*/
   const removeTodolistHandler = useCallback(() => {
        props.removeTodolist(props.id)
    },[props.removeTodolist,props.id])
    const addTaskHandler = useCallback((newTitle: string) => {
        dispatch(addTaskAC(props.id, newTitle))
    }, [dispatch,props.id])
    const editTodolistHandler = useCallback((newTitle: string) => {
        props.editTodolist(props.id, newTitle)
    }, [props.editTodolist, props.id])
   /* const editTaskHandler = useCallback((elId: string, newTitle: string) => {
        dispatch(editTaskAC(props.id, elId, newTitle))
    },[dispatch])*/
    let tasksForToDo = tasks

    if (props.filter === 'Completed') {
        tasksForToDo = tasks.filter(el =>el.isDone  === true)
    }
    if (props.filter === 'Active') {
        tasksForToDo = tasks.filter(el => el.isDone === false)
    }
    const onClickAllHandler = useCallback(() => {
        props.changeFilter(props.id, 'All')
    },[props.changeFilter,props.id])
    const onClickActiveHandler = useCallback(() => {
        props.changeFilter(props.id, 'Active')
    },[props.changeFilter,props.id])
    const onClickCompletedHandler = useCallback(() => {
        props.changeFilter(props.id, 'Completed')
    },[props.changeFilter,props.id])
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
                    {tasksForToDo.map(el => {

                        return (
                              /*<li key={el.id} className={el.isDone ? 'is-done' : ''}>
                                   <Checkbox defaultChecked checked={el.isDone}
                                             size='small'
                                             onChange={(event) => changeTaskStatusHandler(props.id, el.id, event.currentTarget.checked)}/>
                                   {/!*<input type='checkbox' checked={el.isDone}

                                          onChange={(event) => changeTaskStatusHandler(props.id, el.id, event.currentTarget.checked)}/>*!/}

                                   <EditTableSpan title={el.title}
                                                  callback={(newTitle) => editTaskHandler(el.id, newTitle)}/>
                                   {/!* <button onClick={() => removeTasksHandler(props.id, el.id)}>✖</button>*!/}
                                   <IconButton aria-label="delete">
                                       <Delete onClick={() => removeTasksHandler(props.id, el.id)}/>
                                   </IconButton>
                               </li>*/
                            <Task key={el.id}
                                  todolistId={props.id}
                                  task={el}/>

                        )
                    })}

                </ul>
                <div>
                    <Button variant={props.filter === "All" ? "outlined" : "contained"}
                            onClick={onClickAllHandler}
                            size={'small'} color={'inherit'}>All
                    </Button>
                    <Button variant={props.filter === "Active" ? "outlined" : "contained"}
                            onClick={onClickActiveHandler}
                        /* className={props.filter === "Active" ? "active-filter" : ''}*/ size={'small'}
                            color={'primary'}>Active
                    </Button>
                    <Button variant={props.filter === "Completed" ? "outlined" : "contained"}
                            onClick={onClickCompletedHandler}
                            color={'secondary'} size={'small'}>Completed
                    </Button>
                </div>
            </div>
        </div>

    )
});


