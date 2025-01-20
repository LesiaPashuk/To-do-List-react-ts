import React, { useState } from 'react';
import './App.css';

import { v1 } from 'uuid';
import  { PropsType } from './components/Task/Task';
import { ListAndTasks } from './components/ListAndTasks/ListAndTasks';
import { title } from 'process';
import { TaskType } from './components/Task/Task';
export type ListAndTaskType={
    id:string,
    title:string,
    listAndTask:Array<TaskType>,
    updateListTitle:(newTitle:string, todolistId:string)=>void
  }
function App() {
  
  const[arrListAndTask, setArrListAndTask]=useState<Array<ListAndTaskType>>([])
  const addNewList=()=>{
    const answer1 = prompt('Введите название нового to-do-list')
    
    if(answer1){
      const newElem : ListAndTaskType  = {
      id:v1(), 
      title:answer1,
      listAndTask:[], 
      updateListTitle(newTitle:string, todolistId:string){}
      }
    setArrListAndTask([...arrListAndTask, newElem]);
      }
    }
  const deleteList=(id:string)=>{
    const filterArr= arrListAndTask.filter(list=>list.id!=id)
    setArrListAndTask(filterArr);
  }
  const updateListTitle = (id: string, newTitle: string) =>{
    const newListWithUpdateTitle=arrListAndTask.map((list)=>{
      if(list.id==id){
        return {...list, title:newTitle}
      }
      return list;
    })
    setArrListAndTask(newListWithUpdateTitle)
    
  }
  return (<div>
  <button type="button" onClick={addNewList}>+</button>
   {arrListAndTask.map((el)=>{
    return <div key={el.id}>
    <button onClick={()=>{deleteList(el.id)}}>x</button>
    <ListAndTasks
    id={el.id}
    title={el.title}
    listAndTask={el.listAndTask}
    updateListTitle={el.updateListTitle} 
    ></ListAndTasks>
    </div>
   })}
  </div>);
}

export default App;
