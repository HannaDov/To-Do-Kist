import {combineReducers,  legacy_createStore} from "redux";

import {todolistsReducer} from "./todolists-reducer";
import {tasksReducer} from "./tasks-reducer";


const rootReducers = combineReducers({
     todolists: todolistsReducer,
    tasks: tasksReducer
})
export type AppRootState = ReturnType<typeof rootReducers>
export const store = legacy_createStore(rootReducers)

// @ts-ignore
window.store = store

//30.24 урок от 27/09 глянуть код