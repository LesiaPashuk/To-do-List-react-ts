import { PriorityType, Task, TaskType } from "../components/Task/Task"
import { TypeForButton } from "../components/Task/Task";
import {v1} from 'uuid';
import { link } from "fs";
import { Moment } from "moment";

type removeTask={
    type:"remove-task", 
    idTask:string,
    idList:string,
    buttonStatus:TypeForButton,
    
}
type addTask={
    priority:PriorityType, 
    data:Moment|null,
    idList:string,
    newTitle:string,
    type:"add-task",
    buttonStatus:TypeForButton
}
type changeIsDoneStatus={
    idTask:string,
    idList:string,
    type:"change-is-done-status"
    buttonStatus:TypeForButton
}
type onlyCompleted={
    idList:string,
    type:"only-completed",
}
type onlyActive={
    idList:string,
    type:"only-active",
}
type allTask={
    idList:string,
    type:"all-tasks",
}
type takeNewTaskTitle={
    type:"take-new-task-title", 
    newTitle:string, 
    idTask:string,
    idList:string,
    buttonStatus:TypeForButton, 
}

type addNewList={
    newListTitle:string,
    type:"add-new-list", 
}
type removeList={
    type:"remove-list", 
    idList:string, 
   
}
type takeNewTitle={
    type:"take-new-title", 
    idList:string,
    newTitle:string,
}

type changeButtonCelenderActiveStatus={
    type:"change-button-celender-active-status",
    buttonCelenderActiveStatus:boolean,
    idList:string,
}
export type ActionType=removeTask | addTask | changeIsDoneStatus | onlyCompleted | onlyActive | allTask | takeNewTaskTitle | addNewList | removeList|takeNewTitle| changeButtonCelenderActiveStatus;

export const removeTaskAC=(idList: string, idTask:string, buttonStatus: TypeForButton):removeTask=>{
    return {type:"remove-task", idList:idList,idTask:idTask, buttonStatus: buttonStatus}
}
export const addTaskAC=( newTitle:string,buttonStatus:TypeForButton,idList: string,data:Moment|null,priority:PriorityType):addTask=>{
    return {type:"add-task", newTitle: newTitle, buttonStatus:buttonStatus,idList:idList, data:data,priority:priority}
}
export const changeIsDoneStatusAC=(idList: string, idTask:string,buttonStatus:TypeForButton):changeIsDoneStatus=>{
    return {type:"change-is-done-status", idList:idList,idTask:idTask, buttonStatus:buttonStatus}
}
export const onlyCompletedAC=(idList: string):onlyCompleted=>{
    return {type:"only-completed",idList:idList}
}
export const onlyActiveAC=(idList: string):onlyActive=>{
    return {type:"only-active",idList:idList}
}
export const allTaskAC=(idList: string):allTask=>{
    return{type:"all-tasks",  idList:idList}
}
export const takeNewTaskTitleAC=(idList: string, idTask:string, newTitle:string,buttonStatus:TypeForButton):takeNewTaskTitle=>{
    return {type:"take-new-task-title",idList:idList,idTask:idTask, newTitle:newTitle, buttonStatus:buttonStatus}
}
export const takeNewTitleAC=(idList: string, newTitle:string):takeNewTitle=>{
    return {type:"take-new-title", idList:idList, newTitle:newTitle}
}
export const AddNewListAC=( newListTitle:string):addNewList=>{
    return {type:"add-new-list", newListTitle:newListTitle}
}
export const RemoveListAC=(idList:string):removeList=>{
    return {type:"remove-list", idList:idList}
}
export const changeButtonCelenderActiveStatusAC=(buttonCelenderActiveStatus:boolean, idList:string):changeButtonCelenderActiveStatus=>{
    return {type:"change-button-celender-active-status",buttonCelenderActiveStatus:buttonCelenderActiveStatus, idList:idList }
}

export type arrType={
    listTitle:string,
    idList:string, 
    tasks: Array<TaskType>, 
    history: Array<TaskType>,
    buttonStatusState:TypeForButton,
    buttonCelenderActiveStatus:boolean,
}
export type initialState2= { 
    arrayToDoList: Array<arrType>,
};
const initialState2:initialState2={
    arrayToDoList:[],
   
}
export const reducerForAllToDoList=(state:initialState2=initialState2, action:ActionType):initialState2 => {
    switch (action.type){
        case "remove-task":
             return {
                arrayToDoList:state.arrayToDoList.map(list=>
                    list.idList===action.idList?
                    {...list,
                        buttonStatusState:action.buttonStatus,
                        tasks:list.tasks.filter(task=>task.id!==action.idTask),
                        history:list.history.filter(task=>task.id!==action.idTask)
                    }:list)

            };
        case "add-task":
            let statusForTask=action.buttonStatus==="typeDone"?true:false;
                let newTask = {id:v1(), title:action.newTitle, isDone:statusForTask, data:action.data, priority:action.priority};
                return {
                ...state,
                arrayToDoList:state.arrayToDoList.map(list=>
                    list.idList===action.idList?
                    {   ...list, 
                        buttonStatusState:action.buttonStatus,
                        tasks: [newTask,...list.tasks],
                        history:[newTask, ...list.history]
                    }:list)
                
            };
        case "change-is-done-status":

                let filterTaskStatus: boolean | undefined;
                if(action.buttonStatus==="typeDone")
                    filterTaskStatus=true;
                else if(action.buttonStatus==="typeActive")
                    filterTaskStatus=false;
                else
                    filterTaskStatus=undefined;
    
                return {

                arrayToDoList:state.arrayToDoList.map(list=>
                    list.idList===action.idList?
                    {
                        ...list, 
                        buttonStatusState: list.buttonStatusState,
                        tasks: filterTaskStatus===true||filterTaskStatus===false?
                        (list.tasks.map(ts => (ts.id === action.idTask ? { ...ts, isDone: !ts.isDone } : ts))).filter(task=>task.isDone==filterTaskStatus):
                        (list.tasks.map(ts => (ts.id === action.idTask ? { ...ts, isDone: !ts.isDone } : ts))),
                        history: list.history.map(ts => (ts.id === action.idTask ? { ...ts, isDone: !ts.isDone } : ts)),
                    }:list )
                
                };
        case "only-completed":
             return {
                arrayToDoList:state.arrayToDoList.map(list=>
                    list.idList===action.idList?
                    {...list,
                        buttonStatusState: "typeDone",
                        tasks:list.history.filter(task=>task.isDone==true),
                        history:list.history
                    }:list )
               
            };
        case "only-active":
            return{ arrayToDoList:state.arrayToDoList.map(list=>
                list.idList===action.idList?
                {...list,
                    buttonStatusState:"typeActive",
                    tasks:list.history.filter(task=>task.isDone!==true),
                    history:list.history
                }:list )
           
            };
        case "all-tasks":
        return{ arrayToDoList:state.arrayToDoList.map(list=>
            list.idList===action.idList?
            {...list,
                buttonStatusState:"typeAll",
                tasks:list.history,
                history:list.history
            }:list )

        };
        case "take-new-task-title":
            return {
                arrayToDoList:state.arrayToDoList.map(list=>
                    list.idList===action.idList?
                    {
                        ...list,
                        tasks: list.tasks.map(task=>(task.id===action.idTask?{...task, title:action.newTitle}:task)),
                        history: list.tasks.map(task=>(task.id===action.idTask?{...task, title:action.newTitle}:task)),
                    }:list)

            };
        case "take-new-title":
            return{
                arrayToDoList:state.arrayToDoList.map(list=>
                    list.idList===action.idList?
                    {...list, 
                        listTitle:action.newTitle
                    }:list
                )

            };
        case "add-new-list":
            return{
                arrayToDoList:[{listTitle:action.newListTitle, idList:v1(), tasks:[], history:[], buttonStatusState:"typeAll", buttonCelenderActiveStatus:false}, ...state.arrayToDoList]
            
            };
        case "remove-list":
            return{
                arrayToDoList:state.arrayToDoList.filter(list=>list.idList!==action.idList)
            
            };
        case "change-button-celender-active-status":
            return {
                arrayToDoList:state.arrayToDoList.map(list=>
                    list.idList===action.idList?{
                        ...list, 
                        buttonCelenderActiveStatus: (!action.buttonCelenderActiveStatus)
                    
                }:list)
            }
            default:
            return state;
    }
}
