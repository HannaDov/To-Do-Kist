import {v1} from "uuid";
import {TaskObjectType} from "../App";
import {
    addTaskAC,
    changeTaskStatusAC,
    editTaskAC,
    removeTaskAC,
    tasksReducer
} from "./tasks-reducer";
import {addTodolistAC, removeTodolistAC} from "./todolists-reducer";

test.skip('correct task should be removed', () => {


    const startState: TaskObjectType = {
        "todolistID1": [
            {id: '1', title: 'HTML&CSS', isDone: true},
            {id: '2', title: 'JS', isDone: true},
            {id: '3', title: 'ReactJS', isDone: false},

        ],
        "todolistID2": [
            {id: '1', title: 'Rest API', isDone: true},
            {id: '2', title: 'GraphQL', isDone: false},
        ]
    }
    const id = '2'
    const endState = tasksReducer(startState, removeTaskAC("todolistID1", id))

    expect(endState["todolistID1"].length).toBe(2)
    expect(endState["todolistID1"][1].title).toBe('ReactJS')

})
test.skip('correct task should be added', () => {


    const startState: TaskObjectType = {
        "todolistID1": [
            {id: '1', title: 'HTML&CSS', isDone: true},
            {id: '2', title: 'JS', isDone: true},
            {id: '3', title: 'ReactJS', isDone: false},

        ],
        "todolistID2": [
            {id: '1', title: 'Rest API', isDone: true},
            {id: '2', title: 'GraphQL', isDone: false},
        ]
    }
    const newTitle='It-incubator'
    const endState = tasksReducer(startState, addTaskAC("todolistID2", newTitle))

    expect(endState["todolistID2"].length).toBe(3)
    expect(endState["todolistID2"][1].title).toBe('Rest API')
    expect(endState["todolistID2"][0].title).toBe('It-incubator')


})
test.skip('correct filter task should be changed', () => {


    const startState: TaskObjectType = {
        "todolistID1": [
            {id: '1', title: 'HTML&CSS', isDone: true},
            {id: '2', title: 'JS', isDone: true},
            {id: '3', title: 'ReactJS', isDone: false},

        ],
        "todolistID2": [
            {id: '1', title: 'Rest API', isDone: true},
            {id: '2', title: 'GraphQL', isDone: false},
        ]
    }
    const newIsDone=true
    const id='2'
    const endState = tasksReducer(startState, changeTaskStatusAC("todolistID2",id, newIsDone))


    expect(endState["todolistID2"][0].title).toBe('Rest API')
    expect(endState["todolistID2"][1].isDone).toBe(true)


})
test.skip('correct title task should be changed', () => {


    const startState: TaskObjectType = {
        "todolistID1": [
            {id: '1', title: 'HTML&CSS', isDone: true},
            {id: '2', title: 'JS', isDone: true},
            {id: '3', title: 'ReactJS', isDone: false},

        ],
        "todolistID2": [
            {id: '1', title: 'Rest API', isDone: true},
            {id: '2', title: 'GraphQL', isDone: false},
        ]
    }
    const newTitle="it-incubator"
    const id='1'
    const endState = tasksReducer(startState, editTaskAC("todolistID1",id, newTitle))


    expect(endState["todolistID2"][0].title).toBe('Rest API')
    expect(endState["todolistID1"][0].title).toBe("it-incubator")


})
test.skip(' new task should be added with newTodolist', ()=>{

    const startState: TaskObjectType = {
        "todolistID1": [
            {id: '1', title: 'HTML&CSS', isDone: true},
            {id: '2', title: 'JS', isDone: true},
            {id: '3', title: 'ReactJS', isDone: false},

        ],
        "todolistID2": [
            {id: '1', title: 'Rest API', isDone: true},
            {id: '2', title: 'GraphQL', isDone: false},
        ]
    }

    const newTitle="New Todolist"
    const endState = tasksReducer(startState, addTodolistAC(newTitle))
    const keys=Object.keys(endState)
    const newKey=keys.find(el=>el!='todolistID1'&& el!= 'todolistID2')
    if (!newKey){
        throw Error ('new key should be added')
    }

    expect(keys.length).toBe(3)
    expect(endState[newKey]).toStrictEqual([])

})

test('property with todolistId should be deleted', () => {
    const startState: TaskObjectType = {
        'todolistId1': [
            {id: '1', title: 'CSS', isDone: false},
            {id: '2', title: 'JS', isDone: true},
            {id: '3', title: 'React', isDone: false}
        ],
        'todolistId2': [
            {id: '1', title: 'bread', isDone: false},
            {id: '2', title: 'milk', isDone: true},
            {id: '3', title: 'tea', isDone: false}
        ]
    }

    const action = removeTodolistAC('todolistId2')

    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState)

    expect(keys.length).toBe(1)
    expect(endState['todolistId2']).not.toBeDefined()
})