import {TaskObjectType, TodolistPropsType} from "../App";
import {addTodolistAC, todolistsReducer} from "./todolists-reducer";
import {tasksReducer} from "./tasks-reducer";
test('ids should be equals', () => {
    const startTasksState: TaskObjectType = {}
    const startTodolistsState: Array<TodolistPropsType> = []

    const action = addTodolistAC('new todolist')

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistsState = todolistsReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState)
    const idFromTasks = keys[0]
    const idFromTodolists = endTodolistsState[0].id

    expect(idFromTasks).toBe(action.newId)
    expect(idFromTodolists).toBe(action.newId)
})