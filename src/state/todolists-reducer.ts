// меня вызовут и дадут мне стейт (почти всегда объект)
// и инструкцию (action, тоже объект)
// согласно прописанному type в этом action (инструкции) я поменяю state
import {FilterValueType, TodolistPropsType} from "../App";
import {v1} from "uuid";

const initialState:Array<TodolistPropsType>=[]
export const todolistsReducer = (state: Array<TodolistPropsType>=initialState, action: todolistReducerType): Array<TodolistPropsType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(el => el.id !== action.payload.todolistID1)
        case 'ADD-TODOLIST':
            let newTodolist: TodolistPropsType = {id:action.newId, title:action.newTitle, filter: 'All'}
            return [newTodolist, ...state]
        case "EDIT-TODOLIST":
            return state.map(el => el.id ===action.payload.todolistID2 ? {...el, title:action.payload.newTodolistTitle} : el)
        case "CHANGE-FILTER":
            return state.map(el => el.id === action.payload.todolist ? {...el, filter: action.payload.newFilter} : el)
        default:
            return state
    }
}

type todolistReducerType = removeTodolistACType|addTodolistACType|editTodolistACType|changeFilterACType;
export type removeTodolistACType = ReturnType<typeof removeTodolistAC>
export const removeTodolistAC = (todolistID1: string) => {
    return {
        type: 'REMOVE-TODOLIST',
        payload: {todolistID1}
    } as const

}
export type addTodolistACType=ReturnType<typeof addTodolistAC>
export const addTodolistAC = ( newTitle:string) => {
    return {
        type: "ADD-TODOLIST",
       newTitle,newId:v1()

    } as const
}
export type editTodolistACType=ReturnType<typeof editTodolistAC>
export const editTodolistAC=(todolistID2:string,newTodolistTitle:string)=>{
    return {
        type:'EDIT-TODOLIST',
        payload:{
            todolistID2,
            newTodolistTitle
        }
    }as const
}
export type changeFilterACType=ReturnType<typeof changeFilterAC>
export const changeFilterAC=(todolist:string,newFilter:FilterValueType)=>{
    return {
        type:'CHANGE-FILTER',
        payload:{
            todolist,
            newFilter
        }
    }as const
}