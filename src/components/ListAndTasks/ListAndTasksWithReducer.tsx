import React, { useReducer } from 'react';
import '../ListAndTasks/ListAndTasks.css';
import Task from '../Task/Task';
import { ListAndTaskType } from '../CreateToDoLists/CreateToDoLists';
import { addTaskAC, allTaskAC, changeIsDoneStatusAC, onlyActiveAC, onlyCompletedAC, removeTaskAC, takeNewTaskTitleAC } from '../../state/todolist-reducer';
import { todoListReducer } from '../../state/todolist-reducer';
export type TypeForButton="typeAll"|"typeActive"|"typeDone";
export function ListAndTasksWithReducer(props:ListAndTaskType) {
const[task, dispatchTask ]=useReducer(todoListReducer,{
  tasks:[] , 
  history:[], 
  buttonStatusState:"typeAll"
})
function removeTask(id:string,buttonStatus:TypeForButton){
  const action = removeTaskAC(id, buttonStatus)
  dispatchTask(action);
}
function completedTask(){
  const action = onlyCompletedAC("typeDone")
  dispatchTask(action)
} 
function activeTask(){
  const action = onlyActiveAC("typeActive");
  dispatchTask(action)
}
function allTask(){
 const action = allTaskAC("typeAll");
 dispatchTask(action)
}
function changeIsDoneStatus(idTask:string,buttonStatus:TypeForButton){
  const action = changeIsDoneStatusAC(idTask, buttonStatus);
  dispatchTask(action);
}
//ввод новой таски
function inputValue(newTitle:string,buttonStatus:TypeForButton){
  const action = addTaskAC(newTitle,buttonStatus);
  dispatchTask(action);
}
function takeNewTaskTitle(idTask:string, newTitle:string,buttonStatus:TypeForButton){
    const action = takeNewTaskTitleAC(idTask, newTitle,buttonStatus);
    dispatchTask(action)
}
function takeNewTitle(newTitle:string, todolistId:string){
    props.updateListTitle(todolistId, newTitle);
}
function onDeleteList(idList:string){
  props.deleteList(idList);
 }
  return (
    <div className="d-flex align-items-start">
     <Task 
    onDeleteList={onDeleteList}
     title={props.title}  
     id={props.id}
     tasks={task.tasks} 
     removeTask={removeTask} 
     completedTask={completedTask} 
     activeTask={activeTask}
     allTask={allTask}
     inputValue={inputValue}
     changeIsDoneStatus={changeIsDoneStatus}
     buttonStatus={task.buttonStatusState}
     takeNewTaskTitle={takeNewTaskTitle}
     takeNewTitle={takeNewTitle}
     ></Task>
    </div>
  );
}