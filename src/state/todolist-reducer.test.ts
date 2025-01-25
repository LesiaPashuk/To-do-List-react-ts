import { todoListReducer } from "./todolist-reducer";
import {v1} from 'uuid';
import { TaskType } from "../components/Task/Task";
import exp from "constants";
type removeTask={
    type:"remove-task", 
    id:string,
}
type addTask={
    newTitle:string,
    type:"add-task",
}
type changeIsDoneStatus={
    id:string,
    type:"change-is-done-status"
}
type onlyCompleted={
    type:"only-completed"
}
type onlyActive={
    type:"only-active"
}
type allTask={
    type:"all-tasks"
}
type takeNewTaskTitle={
    type:"take-new-task-title", 
    newTitle:string, 
    id:string,
}
export type ActionType=removeTask | addTask | changeIsDoneStatus | onlyCompleted | onlyActive | allTask | takeNewTaskTitle;

export const removeTaskAC=(id:string ):removeTask=>{
    return {type:"remove-task", id:id}
}
export const addTaskAC=( newTitle:string):addTask=>{
    return {type:"add-task", newTitle: newTitle}
}
export const changeIsDoneStatusAC=(id:string):changeIsDoneStatus=>{
    return {type:"change-is-done-status", id:id}
}
export const onlyCompletedAC=():onlyCompleted=>{
    return {type:"only-completed"}
}
export const onlyActiveAC=():onlyActive=>{
    return {type:"only-active"}
}
export const allTaskAC=():allTask=>{
    return{type:"all-tasks"}
}
export const takeNewTaskTitleAC=(id:string, newTitle:string):takeNewTaskTitle=>{
    return {type:"take-new-task-title", id:id, newTitle:newTitle}
}
test('correct todolist',()=>{
    let todolistId1=v1();
    let todolistId2=v1();
    const startState:Array<TaskType>=[
        {id: todolistId1, title:"whhat to learn", isDone:true},
        {id:todolistId2, title:"whhat", isDone:true},
    ]

    const endState= todoListReducer(startState,removeTaskAC(todolistId1))
    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolistId2)
})

test('add task',()=>{
    let todolistId1=v1();
    let todolistId2=v1();
    const startState:Array<TaskType>=[
        {id: todolistId1, title:"whhat to learn", isDone:true},
        {id:todolistId2, title:"whhat", isDone:true},
    ]

    const endState= todoListReducer(startState,addTaskAC("lalala"))
    expect(endState.length).toBe(3)
    expect(endState[0].title).toBe("lalala")
})
test('change done-status', ()=>{
    let todolistId1=v1();
    let todolistId2=v1();
    const startState:Array<TaskType>=[
        {id: todolistId1, title:"whhat to learn", isDone:true},
        {id:todolistId2, title:"whhat", isDone:true},
    ]

    const endState= todoListReducer(startState, changeIsDoneStatusAC(todolistId1))
    expect(endState.length).toBe(2)
    expect(endState[0].isDone).toBe(false)
})

test('only completed', ()=>{
    const startState:Array<TaskType>=[
        {id: v1(), title:"whhat to learn", isDone:false},
        {id:v1(), title:"whhat", isDone:true},
        {id: v1(), title:"whhat to learn 2", isDone:true},
        {id:v1(), title:"whhat 2", isDone:false},
    ]
    const endState=todoListReducer(startState, onlyCompletedAC())
    expect(endState.length).toBe(2)
    expect(endState[0].title).toBe("whhat")
    expect(endState[1].title).toBe("whhat to learn 2")
})
test('only active', ()=>{
    const startState:Array<TaskType>=[
        {id: v1(), title:"whhat to learn", isDone:false},
        {id:v1(), title:"whhat", isDone:true},
        {id: v1(), title:"whhat to learn 2", isDone:true},
        {id:v1(), title:"whhat 2", isDone:false},
    ]
    const endState=todoListReducer(startState, onlyActiveAC())
    expect(endState.length).toBe(2)
    expect(endState[0].title).toBe("whhat to learn")
    expect(endState[1].title).toBe("whhat 2")
})
test("all tasks", ()=>{
    const startState:Array<TaskType>=[
        {id: v1(), title:"whhat to learn", isDone:false},
        {id:v1(), title:"whhat", isDone:true},
        {id: v1(), title:"whhat to learn 2", isDone:true},
        {id:v1(), title:"whhat 2", isDone:false},
    ]
    const endState=todoListReducer(startState, allTaskAC())
    expect(endState.length).toBe(4)
    expect(endState[0].title).toBe("whhat to learn")
    expect(endState[3].title).toBe("whhat 2")
})
test('new task title', ()=>{
    let todolistId1=v1();
    let todolistId2=v1();
    const startState:Array<TaskType>=[
        {id: todolistId1, title:"whhat to learn", isDone:true},
        {id:todolistId2, title:"whhat", isDone:true},
    ]
    const endState=todoListReducer(startState,  takeNewTaskTitleAC(todolistId1, "hello"))
    expect(endState[0].title).toBe("hello")
})