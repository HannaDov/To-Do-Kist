import React, {useCallback} from 'react';
import './App.css';
import {TaskPropsType, Todolist} from "./Todolist";

import {FullInput} from "./FullInput";
import {ButtonAppBar} from './ButtonAppBar';

import {
    addTodolistAC,
    changeFilterAC,
    editTodolistAC,
    removeTodolistAC,

} from "./state/todolists-reducer";

import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./state/store";
import {Container, Grid, Paper} from "@material-ui/core";


export type FilterValueType = 'All' | 'Active' | 'Completed'
export type TodolistPropsType = {
    id: string
    title: string
    filter: FilterValueType
}
export type TaskObjectType = {
    [key: string]: Array<TaskPropsType>
}

function AppWithRedux() {
    console.log('app')
    const tasks = useSelector<AppRootState, TaskObjectType>(state => state.tasks)

    const dispatch = useDispatch()
    const todolists = useSelector<AppRootState, Array<TodolistPropsType>>(state => state.todolists)

    const changeFilter = useCallback((todolistId: string, value: FilterValueType) => {
        dispatch(changeFilterAC(todolistId, value))
    }, [dispatch])
    const addTodolist = useCallback((newTitle: string) => {
        const action = addTodolistAC(newTitle)
        dispatch(action)

    }, [dispatch])

    const removeTodolist = useCallback((todolistId: string) => {
        dispatch(removeTodolistAC(todolistId))

    }, [dispatch])

    const editTodolist = useCallback((todolistId: string, newTitle: string) => {
        dispatch(editTodolistAC(todolistId, newTitle))
    }, [dispatch])

    return (
        <div className="App">
            <ButtonAppBar/>
            <Container fixed>
                <Grid container style={{padding: '20px'}}>
                    <FullInput callback={addTodolist}/>
                </Grid>
                <Grid container spacing={3}>
                    {todolists.map(el => {

                        return <Grid item key={el.id}>
                            <Paper style={{padding: '10px'}} elevation={12}> <Todolist title={el.title}
                                                                                       changeFilter={changeFilter}
                                                                                       filter={el.filter}
                                                                                       tasks={tasks[el.id]}
                                                                                       id={el.id}
                                                                                       removeTodolist={removeTodolist}
                                                                                       editTodolist={editTodolist}

                            />
                            </Paper>

                        </Grid>

                    })}
                </Grid>
            </Container>


        </div>
    );
}

export default AppWithRedux;
