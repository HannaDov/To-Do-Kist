import {TaskObjectType} from "../App";
import {v1} from "uuid";
import {addTodolistACType, removeTodolistACType} from "./todolists-reducer";
const initialState:TaskObjectType={}
export const tasksReducer=(state:TaskObjectType=initialState, action:tasksReducerType):TaskObjectType=>{
    switch (action.type){
        case "REMOVE-TASK":
            return {...state, [action.payload.todolistID]: state[action.payload.todolistID].filter(el => el.id !== action.payload.id)}
        case "ADD-TASK":{
            let newTask = {id: v1(), title: action.payload.newTitle, isDone: false}
            return {...state, [action.payload.todolistID]:[newTask, ...state[action.payload.todolistID]]}
        }
        case "CHANGE-TASK-STATUS":{
            return {...state,[action.payload.todolistId]:state[action.payload.todolistId].map(el=>el.id===action.payload.id?{...el, isDone:action.payload.newIsDone}:el) }
        }
        case "CHANGE-TASK-TITLE":{
            return {...state, [action.payload.todolistId]:state[action.payload.todolistId].map(el=>el.id===action.payload.id?{...el, title:action.payload.newTitle}:el)}
        }
        case "ADD-TODOLIST":{
            const stateCopy={...state}
            stateCopy[action.newId]=[]
            return stateCopy
        }
        case "REMOVE-TODOLIST":{
            const stateCopy={...state}
            delete stateCopy[action.payload.todolistID1]
            return stateCopy
        }
        default:
            return state
    }
}
export type tasksReducerType=removeTaskACType|addTaskACType|changeTaskStatusACType|editTaskACType|addTodolistACType|removeTodolistACType
export type removeTaskACType=ReturnType<typeof removeTaskAC>
export const removeTaskAC =(todolistID:string, id:string)=>{
    return {
        type:"REMOVE-TASK",
        payload:{todolistID,id}
    }as const

}
type addTaskACType=ReturnType<typeof addTaskAC>
export const addTaskAC=(todolistID:string, newTitle:string)=>{
    return {
        type:"ADD-TASK",
        payload:{todolistID, newTitle}

    }as const

}
type changeTaskStatusACType=ReturnType<typeof changeTaskStatusAC>
export const changeTaskStatusAC=(todolistId:string,id:string,newIsDone:boolean)=>{
    return {
        type:'CHANGE-TASK-STATUS',
        payload:{todolistId,id,newIsDone}
    }as const
}
type editTaskACType=ReturnType<typeof editTaskAC>
export const editTaskAC=(todolistId:string,id:string,newTitle:string)=>{
    return {
        type:"CHANGE-TASK-TITLE",
        payload:{todolistId,id,newTitle}
    }as const
}