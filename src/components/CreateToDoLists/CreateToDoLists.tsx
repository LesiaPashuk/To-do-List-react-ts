import { AddNewListAC, addTaskAC, allTaskAC, changeIsDoneStatusAC, initialState2, onlyActiveAC, onlyCompletedAC, RemoveListAC, removeTaskAC, takeNewTaskTitleAC, takeNewTitleAC}from '../../state/reducerForAllToDoList';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import { TypeForButton } from '../Task/Task';
import Task, { TaskType } from '../Task/Task';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';

export type ListAndTaskType={
    id:string,
    title:string,
    listAndTask:Array<TaskType>,
    updateListTitle:(newTitle:string, todolistId:string)=>void
    deleteList:(idList:string)=>void
  }
function CreateToDoLists() {

  const dispatchTask=useDispatch()
  const arrayToDoList = useSelector((state:RootState)=>state.todoList.arrayToDoList)
 
function removeTask(idList: string, idTask:string, buttonStatus: TypeForButton){
  const action = removeTaskAC(idList,idTask, buttonStatus)
  dispatchTask(action);
}
function addTask( newTitle:string,buttonStatus:TypeForButton,idList: string){
  const action = addTaskAC(newTitle,buttonStatus, idList);
  dispatchTask(action);
}
function changeIsDoneStatus(idList: string, idTask:string,buttonStatus:TypeForButton){
  const action = changeIsDoneStatusAC(idList, idTask, buttonStatus);
  dispatchTask(action);
}
function completedTask(idList: string){
  const action = onlyCompletedAC(idList)
  dispatchTask(action)
} 
function activeTask(idList: string){
  const action = onlyActiveAC(idList);
  dispatchTask(action)
}
function allTask(idList: string){
 const action = allTaskAC(idList);
 dispatchTask(action)
}
function takeNewTaskTitle(idList: string, idTask:string, newTitle:string,buttonStatus:TypeForButton){
    const action = takeNewTaskTitleAC(idList, idTask, newTitle,buttonStatus);
    dispatchTask(action)
}
const addNewList=( )=>{
  const newListTitle = prompt('Введите название нового to-do-list')
    if(newListTitle){
      const action = AddNewListAC(newListTitle)
      dispatchTask(action)
    }
  
}
function removeList(idList:string){
  const action = RemoveListAC(idList)
  dispatchTask(action)
}
function takeNewTitle(idList: string, newTitle:string){
  const action =takeNewTitleAC(idList, newTitle)
  dispatchTask(action)
}
  return (<div className="d-flex align-items-start" >
  <button type="button" className="btn btn-dark" onClick={addNewList}>+</button>
   {arrayToDoList.map((el)=>{
    return  <div className="d-flex align-items-start" key={el.idList}>
    <Task 
    idList={el.idList}
    title={el.listTitle} 
    tasks={el.tasks}
    buttonStatus={el.buttonStatusState}
    removeTask={removeTask} 
    addTask={addTask}
    changeIsDoneStatus={changeIsDoneStatus}
    completedTask={completedTask} 
    activeTask={activeTask}
    allTask={allTask}
    takeNewTaskTitle={takeNewTaskTitle}
    removeList={removeList}
    takeNewTitle={takeNewTitle}
    ></Task>
   </div>
   })}
  </div>);
}

export default CreateToDoLists;