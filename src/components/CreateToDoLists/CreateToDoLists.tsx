import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import { v1 } from 'uuid';
//import { ListAndTasks } from '../ListAndTasks/ListAndTasks';
import { ListAndTasksWithReducer } from '../ListAndTasks/ListAndTasksWithReducer';
import { PropsType } from '../Task/Task';
import { title } from 'process';
import { TaskType } from '../Task/Task';
export type ListAndTaskType={
    id:string,
    title:string,
    listAndTask:Array<TaskType>,
    updateListTitle:(newTitle:string, todolistId:string)=>void
    deleteList:(idList:string)=>void
  }
function CreateToDoLists() {
  
  const[arrListAndTask, setArrListAndTask]=useState<Array<ListAndTaskType>>([])
  const addNewList=()=>{
    const answer1 = prompt('Введите название нового to-do-list')
    
    if(answer1){
      const newElem : ListAndTaskType  = {
      id:v1(), 
      title:answer1,
      listAndTask:[], 
      updateListTitle, // Передаем реальную функцию
      deleteList: deleteList
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
  return (<div className="d-flex align-items-start">
  <button type="button" className="btn btn-dark" onClick={addNewList}>+</button>
   {arrListAndTask.map((el)=>{
    return <div key={el.id}>
    <ListAndTasksWithReducer
    id={el.id}
    title={el.title}
    listAndTask={el.listAndTask}
    updateListTitle={updateListTitle} 
    deleteList={deleteList}
    ></ListAndTasksWithReducer>
    </div>
   })}
  </div>);
}

export default CreateToDoLists;
