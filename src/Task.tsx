import React, {useCallback} from 'react';
import {EditTableSpan} from "./EditTableSpan";
import {Delete} from "@material-ui/icons";
import {TaskPropsType} from "./Todolist";
import {useDispatch} from "react-redux";
import {changeTaskStatusAC, editTaskAC, removeTaskAC} from "./state/tasks-reducer";
import {Checkbox, IconButton} from "@mui/material";


 type TaskType={
    task:TaskPropsType
    todolistId:string
}
export const Task=React.memo((props:TaskType)=>{
    const dispatch = useDispatch()
    const changeTaskStatusHandler = useCallback((todolistId: string, elId: string, checkedValue: boolean) => {
        dispatch(changeTaskStatusAC(props.todolistId, elId, checkedValue))
    },[dispatch,props.todolistId])
    const editTaskHandler = useCallback((elId: string, newTitle: string) => {
        dispatch(editTaskAC(props.todolistId, elId, newTitle))
    },[dispatch,props.todolistId])
    const removeTasksHandler = useCallback((todolistId: string, elId: string) => {
        dispatch(removeTaskAC(props.todolistId, elId))
    },[dispatch,props.todolistId])
    return (
        <li key={props.task.id} className={props.task.isDone ? 'is-done' : ''}>
            <Checkbox defaultChecked checked={props.task.isDone}
                      size='small'
                      onChange={(event) => changeTaskStatusHandler(props.todolistId, props.task.id, event.currentTarget.checked)}/>
            {/*<input type='checkbox' checked={el.isDone}

                                          onChange={(event) => changeTaskStatusHandler(props.id, el.id, event.currentTarget.checked)}/>*/}

            <EditTableSpan title={props.task.title}
                           callback={(newTitle) => editTaskHandler(props.task.id, newTitle)}/>
            {/* <button onClick={() => removeTasksHandler(props.id, el.id)}>✖</button>*/}
            <IconButton aria-label="delete">
                <Delete onClick={() => removeTasksHandler(props.todolistId, props.task.id)}/>
            </IconButton>
        </li>
    )
})

