import React, {useState} from 'react';
import './App.css';
import {TaskPropsType, Todolist} from "./Todolist";
import {v1} from "uuid";
import {FullInput} from "./FullInput";
import {ButtonAppBar} from "./ButtonAppBar";
import {Container, Grid, Paper} from "@mui/material";


export type FilterValueType = 'All' | 'Active' | 'Completed'
export type TodolistPropsType = {
    id: string
    title: string
    filter: FilterValueType
}
export type TaskObjectType = {
    [key: string]: Array<TaskPropsType>
}

function App() {

    let todolistID1 = v1()
    let todolistID2 = v1()

    let [todolists, setTodolists] = useState<Array<TodolistPropsType>>([
        {id: todolistID1, title: 'What to learn', filter: 'All'},
        {id: todolistID2, title: 'What to buy', filter: 'All'},
    ])

    let [tasks, setTasks] = useState<TaskObjectType>({
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
        setTasks({...tasks, [todolistId]: tasks[todolistId].filter(el => el.id !== taskId)})
        //setTasks(tasks[todolistId].filter(el=>el.id!==taskId))
        //setTasks(tasks.filter(el => el.id !== taskId))
    }

    const changeFilter = (todolistId: string, value: FilterValueType) => {
        setTodolists(todolists.map(el => el.id === todolistId ? {...el, filter: value} : el))
    }
    const addTask = (todolistId: string, newTitle: string) => {
        let newTask = {id: v1(), title: newTitle, isDone: false}
        setTasks({...tasks, [todolistId]: [newTask, ...tasks[todolistId]]})
        //setTasks([newTask, ...tasks])
    }
    const changeTaskStatus = (todolistId: string, taskId: string, isDone: boolean) => {
        // setTasks(tasks.map(el => el.id === taskId ? {...el, isDone: isDone} : el))
        setTasks({
            ...tasks,
            [todolistId]: [...tasks[todolistId]].map(el => el.id === taskId ? {...el, isDone: isDone} : el)
        })
    }
    const removeTodolist = (todolistId: string) => {
        setTodolists(todolists.filter(el => el.id !== todolistId))
        delete tasks[todolistId]
    }
    const addTodolist = (newTitle: string) => {
        let newId = v1()
        let newTodolist: TodolistPropsType = {id: newId, title: newTitle, filter: 'All'}
        setTodolists([newTodolist, ...todolists])
        setTasks({...tasks, [newId]: []})
    }
    const editTodolist = (todolistId: string, newTitle: string) => {
        setTodolists(todolists.map(el => el.id === todolistId ? {...el, title: newTitle} : el))
    }
    const editTask = (todolistId: string, taskId: string, newTitle: string) => {
        setTasks({
            ...tasks,
            [todolistId]: tasks[todolistId].map(el => el.id === taskId ? {...el, title: newTitle} : el)
        })
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
                                              tasks={tasksForTodolist}
                                              removeTasks={removeTasks}
                                              changeFilter={changeFilter}
                                              addTask={addTask}
                                              changeTaskStatus={changeTaskStatus}
                                              filter={el.filter}
                                              key={el.id}
                                              id={el.id}
                                              removeTodolist={removeTodolist}
                                              editTodolist={editTodolist}
                                              editTask={editTask}
                            />
                            </Paper>

                        </Grid>

                    })}
                </Grid>
            </Container>


        </div>
    );
}

export default App;
