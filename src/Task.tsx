import React, {ChangeEvent, memo, useCallback} from 'react';
import {Checkbox, IconButton} from "@material-ui/core";
import {EditTableSpan} from "./EditTableSpan";
import {Delete} from "@mui/icons-material";
import {TaskPropsType} from "./Todolist";
import {changeTaskStatusAC, editTaskAC, removeTaskAC} from "./state/tasks-reducer";
import {useDispatch} from "react-redux";


export type TaskType = {
    task: TaskPropsType
    todolistId:string
}
export const Task =memo( ({  task,todolistId
    }:TaskType) => {
    console.log('task is render')
    const dispatch = useDispatch()
let {id,isDone,title}=task
    const editTaskHandler = useCallback((newTitle:string) => {
        dispatch(editTaskAC(todolistId, id, newTitle))
    },[dispatch])
    const removeTasksHandler = useCallback(() => {
        dispatch(removeTaskAC(todolistId,id))
    },[dispatch])
    const changeTaskStatusHandler = useCallback((event:ChangeEvent<HTMLInputElement>) => {
        let newIsDone=event.currentTarget.checked
        dispatch(changeTaskStatusAC(id,todolistId,newIsDone))
    },[dispatch])
    return (
        <li className={isDone ? 'is-done' : ''}>
            <Checkbox defaultChecked checked={isDone}
                      size='small'
                      onChange={changeTaskStatusHandler}/>

            <EditTableSpan title={title}
                           callback={editTaskHandler}/>

            <IconButton aria-label="delete">
                <Delete onClick={removeTasksHandler}/>
            </IconButton>
        </li>
    )
})






