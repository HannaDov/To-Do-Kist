import {addTodolistAC, changeFilterAC, editTodolistAC, removeTodolistAC, todolistsReducer} from './todolists-reducer'
import {v1} from "uuid";
import {FilterValueType, TodolistPropsType} from "../App";

test.skip('correct todolist should be removed', () => {
    let todolistID1 = v1()
    let todolistID2 = v1()

    const startState:Array<TodolistPropsType> = [
        {id: todolistID1, title: 'What to learn', filter: 'All'},
        {id: todolistID2, title: 'What to buy', filter: 'All'},
    ]

    const endState = todolistsReducer(startState, removeTodolistAC(todolistID1))

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolistID2)
})

test.skip('correct todolist should be added', () => {
    let todolistID1 = v1()
    let todolistID2 = v1()

    const startState:Array<TodolistPropsType> = [
        {id: todolistID1, title: 'What to learn', filter: 'All'},
        {id: todolistID2, title: 'What to buy', filter: 'All'},
    ]

    let newTitle = "Why i do it"
    const endState = todolistsReducer(startState, addTodolistAC(newTitle ))

    expect(endState.length).toBe(3)
    expect(endState[0].title).toBe("Why i do it")
})
test.skip('correct todolist should be change it name', () => {
    let todolistID1 = v1()
    let todolistID2 = v1()

    const startState:Array<TodolistPropsType> = [
        {id: todolistID1, title: 'What to learn', filter: 'All'},
        {id: todolistID2, title: 'What to buy', filter: 'All'},
    ]

    let newTodolistTitle = "New Todolist"
    const endState = todolistsReducer(startState, editTodolistAC(todolistID2,newTodolistTitle))


    expect(endState[0].id).toBe(todolistID1)
    expect(endState[1].title).toBe(newTodolistTitle)
    expect(endState[0].title).toBe('What to learn')
})
test.skip('correct todolist should be change it filter', () => {
    let todolistID1 = v1()
    let todolistID2 = v1()

    const startState:Array<TodolistPropsType> = [
        {id: todolistID1, title: 'What to learn', filter: 'All'},
        {id: todolistID2, title: 'What to buy', filter: 'All'},
    ]

    let newTodolistFilter:FilterValueType = "Active"
    const endState = todolistsReducer(startState, changeFilterAC(todolistID1,newTodolistFilter))


    expect(endState[0].filter).toBe("Active")
    expect(endState[1].title).toBe('What to buy')
})