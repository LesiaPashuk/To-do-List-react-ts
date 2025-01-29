import { TaskType } from "../components/Task/Task"
import { TypeForButton } from "../components/ListAndTasks/ListAndTasksWithReducer";
//import { ActionType } from "./todolist-reducer.test"
import {v1} from 'uuid';
type removeTask={
    type:"remove-task", 
    id:string,
    buttonStatus:TypeForButton
}
type addTask={
    newTitle:string,
    type:"add-task",
    buttonStatus:TypeForButton
}
type changeIsDoneStatus={
    id:string,
    type:"change-is-done-status"
    buttonStatus:TypeForButton
}
type onlyCompleted={
    type:"only-completed",
    buttonStatus:TypeForButton
}
type onlyActive={
    type:"only-active",
    buttonStatus:TypeForButton
}
type allTask={
    type:"all-tasks",
    buttonStatus:TypeForButton
}
type takeNewTaskTitle={
    type:"take-new-task-title", 
    newTitle:string, 
    id:string,
    buttonStatus:TypeForButton, 
}
export type ActionType=removeTask | addTask | changeIsDoneStatus | onlyCompleted | onlyActive | allTask | takeNewTaskTitle;

export const removeTaskAC=(id: string, buttonStatus: TypeForButton):removeTask=>{
    return {type:"remove-task", id:id, buttonStatus: buttonStatus}
}
export const addTaskAC=( newTitle:string,buttonStatus:TypeForButton):addTask=>{
    return {type:"add-task", newTitle: newTitle, buttonStatus:buttonStatus}
}
export const changeIsDoneStatusAC=(id:string,buttonStatus:TypeForButton):changeIsDoneStatus=>{
    return {type:"change-is-done-status", id:id, buttonStatus:buttonStatus}
}
export const onlyCompletedAC=(buttonStatus:TypeForButton):onlyCompleted=>{
    return {type:"only-completed", buttonStatus:buttonStatus}
}
export const onlyActiveAC=(buttonStatus:TypeForButton):onlyActive=>{
    return {type:"only-active", buttonStatus:buttonStatus}
}
export const allTaskAC=(buttonStatus:TypeForButton):allTask=>{
    return{type:"all-tasks", buttonStatus:buttonStatus}
}
export const takeNewTaskTitleAC=(id:string, newTitle:string,buttonStatus:TypeForButton):takeNewTaskTitle=>{
    return {type:"take-new-task-title", id:id, newTitle:newTitle, buttonStatus:buttonStatus}
}
export type initialState = {
    tasks: Array<TaskType>, // Текущие задачи
    history: Array<TaskType>, // История изменений
    buttonStatusState:TypeForButton
  };
export const todoListReducer=(state:initialState, action:ActionType):initialState => {
    switch (action.type){
        case "remove-task":
            const newArrTask=state.tasks.filter(task=>task.id!=action.id);
            return {
                ...state,
                buttonStatusState:state.buttonStatusState,
                tasks:newArrTask,
                history:newArrTask
            }
        case "add-task":
             let newTask = {id:v1(), title:action.newTitle, isDone:false};
             return {
                ...state,
                buttonStatusState: state.buttonStatusState,
             tasks: [newTask,...state.tasks],
             history: [ newTask,...state.history]
            };
             case "change-is-done-status":
                
                return {
                    ...state,
                    buttonStatusState: state.buttonStatusState,
                    tasks: state.tasks.map(ts => (ts.id === action.id ? { ...ts, isDone: !ts.isDone } : ts)),
             history: state.tasks.map(ts => (ts.id === action.id ? { ...ts, isDone: !ts.isDone } : ts)),
                }
        case "only-completed":
            
             return{...state, 
                buttonStatusState: "typeDone",
                tasks:state.history.filter(task=>task.isDone==true),
                history:state.history
            }
        case "only-active":
            return{...state, 
                buttonStatusState:"typeActive",
                tasks:state.history.filter(task=>task.isDone==false),
                history:state.history
            }
        case "all-tasks":
            return {
                ...state, 
                buttonStatusState: "typeAll",
                tasks:state.history, 
                history:state.history
            }
        case "take-new-task-title":
            return {
                ...state,
                buttonStatusState:state.buttonStatusState,
                tasks: state.tasks.map(task=>(task.id===action.id?{...task, title:action.newTitle}:task)),
                history: state.tasks.map(task=>(task.id===action.id?{...task, title:action.newTitle}:task)),
            }
        default:
            throw new Error("fuck");
    }
}
