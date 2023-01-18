import React, {useReducer} from 'react';
import './App.css';
import {TaskPropsType, Todolist} from "./Todolist";
import {v1} from "uuid";
import {FullInput} from "./FullInput";
import {ButtonAppBar} from './ButtonAppBar';
import {Container, Grid, Paper} from "@mui/material";
import {addTodolistAC, changeFilterAC, editTodolistAC, removeTodolistAC, todolistsReducer} from "./state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, editTaskAC, removeTaskAC, tasksReducer} from "./state/tasks-reducer";


export type FilterValueType = 'All' | 'Active' | 'Completed'
export type TodolistPropsType = {
    id: string
    title: string
    filter: FilterValueType
}
export type TaskObjectType = {
    [key: string]: Array<TaskPropsType>
}

function AppWithReducer() {

    let todolistID1 = v1()
    let todolistID2 = v1()

    let [todolists, dispatchToTodolistsReducer ] = useReducer(todolistsReducer,[
        {id: todolistID1, title: 'What to learn', filter: 'All'},
        {id: todolistID2, title: 'What to buy', filter: 'All'},
    ])

    let [tasks, dispatchToTasksReducer] = useReducer(tasksReducer,{
        [todolistID1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},

        ],
        [todolistID2]: [
            {id: v1(), title: 'Rest API', isDone: true},
            {id: v1(), title: 'GraphQL', isDone: false},
        ]
    })
    const removeTasks = (todolistId: string, taskId: string) => {
        dispatchToTasksReducer(removeTaskAC(todolistId,taskId))
    }

    const addTask = (todolistId: string, newTitle: string) => {
        dispatchToTasksReducer(addTaskAC(todolistId,newTitle))
    }
    const changeTaskStatus = (todolistId: string, taskId: string, isDone: boolean) => {
        dispatchToTasksReducer(changeTaskStatusAC(todolistId,taskId,isDone))
    }
    const editTask = (todolistId: string, taskId: string, newTitle: string) => {
        dispatchToTasksReducer(editTaskAC(todolistId,taskId,newTitle))
    }
    const addTodolist = (newTitle: string) => {
        dispatchToTodolistsReducer(addTodolistAC(newTitle))
      dispatchToTasksReducer(addTodolistAC(newTitle))
    }
    const changeFilter = (todolistId: string, value: FilterValueType) => {
        dispatchToTodolistsReducer(changeFilterAC(todolistId,value))
    }
    const removeTodolist = (todolistId: string) => {
        dispatchToTodolistsReducer(removeTodolistAC(todolistId))
        dispatchToTasksReducer(removeTodolistAC(todolistId))
    }

    const editTodolist = (todolistId: string, newTitle: string) => {
        dispatchToTodolistsReducer(editTodolistAC(todolistId,newTitle))
    }

    return (
        <div className="App">
            <ButtonAppBar/>
            <Container fixed>
                <Grid container style={{padding:'20px'}}>
                    <FullInput callback={addTodolist}/>
                </Grid>
                <Grid container spacing={3}>
                    {todolists.map(el => {
                        let tasksForTodolist = tasks[el.id]
                        if (el.filter === 'Completed') {
                            tasksForTodolist = tasks[el.id].filter(el => el.isDone == true)
                        }
                        if (el.filter === 'Active') {
                            tasksForTodolist = tasks[el.id].filter(el => el.isDone == false)
                        }
                        return <Grid item>
                            <Paper style={{padding:'10px'}} elevation={12}> <Todolist title={el.title}
                                              //tasks={tasksForTodolist}
                                              //removeTasks={removeTasks}
                                              changeFilter={changeFilter}
                                              //addTask={addTask}
                                              //changeTaskStatus={changeTaskStatus}
                                              filter={el.filter}
                                              key={el.id}
                                              id={el.id}
                                              removeTodolist={removeTodolist}
                                              editTodolist={editTodolist}
                                              //editTask={editTask}
                            />
                            </Paper>

                        </Grid>

                    })}
                </Grid>
            </Container>


        </div>
    );
}

export default AppWithReducer;
