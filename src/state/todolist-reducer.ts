import { TaskType } from "../components/Task/Task"
//import { ActionType } from "./todolist-reducer.test"
import {v1} from 'uuid';
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
export type initialState = {
    tasks: Array<TaskType>, // Текущие задачи
    history: Array<TaskType> // История изменений
  };
export const todoListReducer=(state:initialState, action:ActionType):initialState => {
    switch (action.type){
        case "remove-task":
            const newArrTask=state.tasks.filter(task=>task.id!=action.id);
            return {
                ...state,
                tasks:newArrTask,
                history:newArrTask
            }
        case "add-task":
             let newTask = {id:v1(), title:action.newTitle, isDone:false};
             return {
                ...state,
             tasks: [newTask,...state.tasks],
             history: [...state.history, newTask]
            };
             case "change-is-done-status":
                
                return {
                    ...state,
                    tasks: state.tasks.map(ts => (ts.id === action.id ? { ...ts, isDone: !ts.isDone } : ts)),
             history: state.tasks.map(ts => (ts.id === action.id ? { ...ts, isDone: !ts.isDone } : ts)),
                }
        case "only-completed":
            
             return{...state, 
                tasks:state.history.filter(task=>task.isDone==true),
                history:state.history
            }
        case "only-active":
            return{...state, 
                tasks:state.history.filter(task=>task.isDone==false),
                history:state.history
            }
        case "all-tasks":
            return {
                ...state, 
                tasks:state.history, 
                history:state.history
            }
        case "take-new-task-title":
            return {
                ...state,
                tasks: state.tasks.map(task=>(task.id===action.id?{...task, title:action.newTitle}:task)),
                history: state.tasks.map(task=>(task.id===action.id?{...task, title:action.newTitle}:task)),
            }
        default:
            throw new Error("fuck");
    }
}
