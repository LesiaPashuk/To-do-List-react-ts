import '../Task/styleTask.css';
import { ChangeEvent,KeyboardEvent, useState } from "react"
import { TypeForButton } from "../ListAndTasks/ListAndTasksWithReducer";
import { EditableSpan } from "../EditableSpan/EditableSpan"
export type TaskType={
    id:string,
    title: string,
    isDone: boolean
}
export type PropsType={
    id:string,
    title: string,
    tasks: Array<TaskType>,
    removeTask:Function
    completedTask:Function
    activeTask:Function
    allTask:Function
    inputValue:Function
    changeIsDoneStatus:(idTask:string, buttonStatus:TypeForButton)=>void
    buttonStatus:TypeForButton //(idTask:string, newTitle:string,buttonStatus:TypeForButton)
    takeNewTaskTitle:(idTask:string, newTitle:string, buttonStatus:TypeForButton)=>void 
    takeNewTitle:(newTitle:string, todolistId:string)=>void
    onDeleteList:(idList:string)=>void
}
 
function Task(props: PropsType){
    const[newInputValue, setNewInputValue]=useState("")
    const[error, setError]=useState(false)
    const addNewInputValueFuo=()=>{
        if(newInputValue.trim()!=""){
            props.inputValue(newInputValue)
            setNewInputValue("")
        }
        else{setError(true)}
        
        
    }
    const takeNewTitleFuo=(e: ChangeEvent<HTMLInputElement>)=>{
        setNewInputValue(e.currentTarget.value)
        setError(false)
    }
    const takeNewTitleOnEnterFuo=(e: KeyboardEvent<HTMLInputElement>)=>{if(e.charCode===13){
        addNewInputValueFuo();
    }
    }
   const onTakeNewTitleFuo=(newValue:string)=>{
        props.takeNewTitle(newValue, props.id);
   }
   const onDeleteList = () => {
    props.onDeleteList(props.id);
};
    return(
    <div>
        <div className="d-flex align-items-start">
            <h2 >
                <EditableSpan title={props.title} onChange={onTakeNewTitleFuo}></EditableSpan>
            </h2>
            <div className="align-self-center">
            <button className="btn-close " aria-label="Close" onClick={onDeleteList}></button>
            </div>
        </div>
        <div className="d-flex justify-content-center">
        <input type="text" value={newInputValue} 
        onChange={takeNewTitleFuo}
        onKeyPress={takeNewTitleOnEnterFuo}
        className={error?"error":"form-control border-success"} ></input>
        {error&&<div className="error-massage">заполнение обязательно</div>}
        <button onClick={addNewInputValueFuo} className="btn btn-primary">save</button>
        </div>
        <ul className="list-group">
            {props.tasks.map((task:TaskType)=>{
                const onRemoveHandler=()=>{
                    props.removeTask(task.id)
                }
                const changeIsDoneStatus=(e: ChangeEvent<HTMLInputElement> )=>{
                    props.changeIsDoneStatus(task.id, props.buttonStatus)
                  
                }
                const onTakeNewTaskTitleFuo=(newValue:string)=>{
                    props.takeNewTaskTitle(task.id, newValue, props.buttonStatus)
                }
                 return <li className="list-group-item"key={task.id}> 
                <div className="align-self-center"> <EditableSpan title={task.title} onChange={ onTakeNewTaskTitleFuo}></EditableSpan></div>
                < div className="d-flex justify-content-start">
                 <input type="checkbox" checked={task.isDone} onChange={changeIsDoneStatus}></input>
                 </div>
                 
                 <div className="d-flex justify-content-end"><button className="btn-close" aria-label="Close"onClick={onRemoveHandler}></button></div>
                
            </li>}
            )}
        </ul>
        <div className="btn-group" role="group" aria-label="Basic example"> 
        <button className={props.buttonStatus=="typeAll"?"btn btn-primary":"btn btn-outline-primary"} onClick={()=>props.allTask()}>All</button>
        <button className={props.buttonStatus=="typeActive"?"btn btn-primary":"btn btn-outline-primary"} onClick={()=>props.activeTask()}>Active</button>
        <button className={props.buttonStatus=="typeDone"?"btn btn-primary":"btn btn-outline-primary"} onClick={()=>props.completedTask()}>Completed</button>
        </div>
       
    </div>)
}
export default Task;