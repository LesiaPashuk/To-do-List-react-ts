import React, { useReducer } from 'react';
import '../ListAndTasks/ListAndTasks.css';
import Task from '../Task/Task';
import { TaskType, PropsType } from '../Task/Task';
import { useState } from 'react';
import { v1 } from 'uuid';
import { ListAndTaskType } from '../CreateToDoLists/CreateToDoLists';
import { addTaskAC, allTaskAC, changeIsDoneStatusAC, onlyActiveAC, onlyCompletedAC, removeTaskAC, takeNewTaskTitleAC } from '../../state/todolist-reducer';
import { todoListReducer } from '../../state/todolist-reducer';

export type TypeForButton="typeAll"|"typeActive"|"typeDone";
export function ListAndTasksWithReducer(props:ListAndTaskType) {
const[buttonStatus, setButtonStatus]=useState<TypeForButton>("typeAll")
const[task, dispatchTask ]=useReducer(todoListReducer,{
  tasks:[] , 
  history:[], 
})
const[isDone1, setIsDone1]=useState(false);
const[constTask, setConstTask]=useState(props.listAndTask )
function removeTask(id:string){
  const action = removeTaskAC(id)
  dispatchTask(action);
}
function completedTask(){
  const action = onlyCompletedAC()
  dispatchTask(action)
  
} 
function activeTask(){
  const action = onlyActiveAC();
  dispatchTask(action)
}
function allTask(){
 const action = allTaskAC();
 dispatchTask(action)
}
function changeIsDoneStatus(idTask:string){
  const action = changeIsDoneStatusAC(idTask);
  dispatchTask(action);
}
//мой ввод 
function inputValue(newTitle:string){
  const action = addTaskAC(newTitle);
  dispatchTask(action);
}
function takeNewTaskTitle(idTask:string, newTitle:string){
    const action = takeNewTaskTitleAC(idTask, newTitle);
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
     buttonStatus={buttonStatus}
     takeNewTaskTitle={takeNewTaskTitle}
     takeNewTitle={takeNewTitle}
     ></Task>
    </div>
  );
}