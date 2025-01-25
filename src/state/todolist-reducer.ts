import { TaskType } from "../components/Task/Task"
import { ActionType } from "./todolist-reducer.test"
import {v1} from 'uuid';

export const todoListReducer=(state:Array<TaskType>, action:ActionType)=>{
    switch (action.type){
        case "remove-task":
            return state.filter(task=>task.id!=action.id)
        case "add-task":
             let newTask = {id:v1(), title:action.newTitle, isDone:false};
             return [newTask,...state]
             case "change-is-done-status":
                return state.map(ts => (ts.id === action.id ? { ...ts, isDone: !ts.isDone } : ts));
        case "only-completed":
            return state.filter(task=>task.isDone==true);
        case "only-active":
            return state.filter(task=>task.isDone==false);
        case "all-tasks":
            return state
        case "take-new-task-title":
            return state.map(task=>(task.id===action.id?{...task, title:action.newTitle}:task))
        default:
            throw new Error("fuck");
    }
}
