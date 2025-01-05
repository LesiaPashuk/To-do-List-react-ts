import { error } from "console"
import { ChangeEvent,KeyboardEvent, useState } from "react"
import { TypeForButton } from '../ListAndTasks/ListAndTasks'
export type TaskType={
    id:string,
    title: string,
    isDone: boolean
}
export type PropsType={
    title: string,
    tasks: Array<TaskType>,
    removeTask:Function
    completedTask:Function
    activeTask:Function
    allTask:Function
    inputValue:Function
    changeIsDoneStatus:(idTask:string, isDone:boolean)=>void
    buttonStatus:TypeForButton
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
    return(
    <div>
        <h2>{props.title}</h2>
        <input type="text" value={newInputValue} 
        onChange={takeNewTitleFuo}
        onKeyPress={takeNewTitleOnEnterFuo}
        className={error?"error":""} ></input>
        {error&&<div className="error-massage">заполнение обязательно</div>}
        <button onClick={addNewInputValueFuo}>save</button>
        <ul>
            {props.tasks.map((task:TaskType)=>{
                const onRemoveHandler=()=>{
                    props.removeTask(task.id)
                }
                const changeIsDoneStatus=(e: ChangeEvent<HTMLInputElement>  )=>{
                    props.changeIsDoneStatus(task.id, e.currentTarget.checked)
                    console.log("wait you dont love me like i love you"+ e.currentTarget.checked)
                }
                 return <li key={task.id}> 
                 <input type="checkbox" checked={task.isDone} onChange={changeIsDoneStatus}></input>
                 <span>{task.title}</span>
                 <button onClick={onRemoveHandler}>x</button>
            </li>}
            )}
        </ul>
        
        <button className={props.buttonStatus=="typeAll"?"currentButton":""} onClick={()=>props.allTask()}>All</button>
        <button className={props.buttonStatus=="typeActive"?"currentButton":""} onClick={()=>props.activeTask()}>Active</button>
        <button className={props.buttonStatus=="typeDone"?"currentButton":""} onClick={()=>props.completedTask()}>Completed</button>
    </div>)
}
export default Task;
