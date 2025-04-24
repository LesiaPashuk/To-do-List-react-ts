import '../Task/styleTask.css';
import { ChangeEvent,KeyboardEvent, useCallback, useState } from "react"
import { EditableSpan } from "../EditableSpan/EditableSpan"
import React from 'react';
import { InputForm } from '../InputForm/InputForm';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import dayjs from 'dayjs';
import { Moment } from 'moment';
import moment from 'moment';
import 'moment/locale/ru'; 
export type TaskType={
    id:string,
    title: string,
    isDone: boolean
    date: Moment|null, 
    time:Moment|null,
    priority: PriorityType,
}
export type InputFormType={
    idList:string,
    title: string,
    tasks: Array<TaskType>,
    buttonStatus:TypeForButton,
    InputFormActiveStatus:boolean,
    addTask:( newTitle:string,buttonStatus:TypeForButton,idList: string,data:Moment|null,priority:PriorityType, time:Moment|null)=>void
    takeNewTitle:(idList: string, newTitle:string)=>void,
    fuoInputFormActiveStatusInPriorityForm:(buttonCelenderActiveStatus:boolean, idList:string)=>void
}
export type PropsType={
    idList:string,
    title: string,
    tasks: Array<TaskType>,
    buttonStatus:TypeForButton,
    removeTask:(idList: string, idTask:string, buttonStatus: TypeForButton)=>void
    addTask:( newTitle:string,buttonStatus:TypeForButton,idList: string,data:Moment|null,priority:PriorityType, time:Moment|null)=>void
    changeIsDoneStatus:(idList: string, idTask:string,buttonStatus:TypeForButton)=>void
    completedTask:(idList: string)=>void
    activeTask:(idList: string)=>void
    allTask:(idList: string)=>void
    takeNewTaskTitle:(idList: string, idTask:string, newTitle:string,buttonStatus:TypeForButton)=>void 
    removeList:(idList:string)=>void
    takeNewTitle:(idList: string, newTitle:string)=>void
}
export type TypeForButton="typeAll"|"typeActive"|"typeDone";
export type PriorityType="hightPriority"|"middlePriority"|"lowPriority"|null;

export const Task=React.memo(function Task(props: PropsType){
    const[newInputValue, setNewInputValue]=useState("")
    const[error, setError]=useState(false)
    const [selectedDate, setSelectedDate] = useState<Moment | null>(null);
    const [time, setTime]=useState<Moment|null>(null);
  const [valueForm, setValueForm] = useState<PriorityType>("hightPriority");

    const addNewInputValueFuo=()=>{
        if(newInputValue.trim()!=""){
           
      props.addTask(newInputValue, props.buttonStatus, props.idList, selectedDate, valueForm,time );
            setNewInputValue("")
        }
        else{setError(true)}
        
        
    }
    const takeNewTitleFuo=useCallback((e: ChangeEvent<HTMLInputElement>)=>{
        setNewInputValue(e.currentTarget.value)
        setError(false)
    },[])
    const takeNewTitleOnEnterFuo=useCallback((e: KeyboardEvent<HTMLInputElement>)=>{
        if(e.key === "Enter"){
        addNewInputValueFuo();
    }
    },[])
   const onTakeNewTitleFuo=(newValue:string)=>{
        props.takeNewTitle(props.idList,newValue);
        
   }
   const removeList =useCallback(() => {
    props.removeList(props.idList);
    },[props.removeList, props.idList]);

    const onRemoveHandler= useCallback(
        (taskId: string) =>()=>{
        props.removeTask(props.idList,taskId, props.buttonStatus)
    }, [props.removeTask, props.idList, props.buttonStatus])
    
    const changeIsDoneStatus= useCallback((taskId:string)=>(e: ChangeEvent<HTMLInputElement> )=>{
        props.changeIsDoneStatus(props.idList, taskId, props.buttonStatus)
      
    },[props.changeIsDoneStatus, props.idList, props.buttonStatus])

    const onTakeNewTaskTitleFuo= useCallback((taskId:string)=>
        (newValue:string)=>{
        props.takeNewTaskTitle(props.idList,taskId, newValue, props.buttonStatus)
    },[props.takeNewTaskTitle, props.idList, props.buttonStatus])

    const onAllTask =useCallback(() => props.allTask(props.idList),[props.allTask, props.idList]);
    const onActiveTask=useCallback(()=>props.activeTask(props.idList),[props.activeTask, props.idList]);
    const onCompletedTask=useCallback(()=>props.completedTask(props.idList), [props.completedTask, props.idList]);
    
    const handleKeyDown =useCallback( (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
          addNewInputValueFuo(); 
        }
      },[addNewInputValueFuo])
    const dateConvert=useCallback((data:Moment|null)=>{
        moment.locale('ru');
        return data?.format('DD MMMM YYYY')
    },[])
    const timeConvert=useCallback((time:Moment|null)=>{
        return time?.format('HH:MM')
    },[])
    return(
    <div>
        
        <div className="divH2">
            <h2 >
                <EditableSpan title={props.title} onChange={onTakeNewTitleFuo}></EditableSpan>
            </h2>
           
            <div className="closeList">
            <button className="btn-close " aria-label="Close" onClick={removeList}></button>
            </div>
            </div>
      
       
        <ul className="list-group">
            {props.tasks.map((task:TaskType)=>{
                
                 return <li className="list-item"key={task.id}>
                 <div>
                 <h4>
                    <EditableSpan title={task.title} onChange={ onTakeNewTaskTitleFuo(task.id)}></EditableSpan><br />
                    </h4>
                    {task.date?<p className='dateText'>{dateConvert(task.date)}</p>:<></>}
                    {task.time?<p className='timetext'>{timeConvert(task.time)}</p>:<></>}
                   
                  </div>
                 <div className="box">
                 <div className="item">
                    <div className={`checkbox-rect-${task.priority}`}>
                        <input type="checkbox"  id={`checkbox-rect-${task.id}`}  name={`check-${task.id}`} checked={task.isDone} onChange={changeIsDoneStatus(task.id)}/>
                        <label htmlFor={`checkbox-rect-${task.id}`}></label>
                        
                        </div>
                    
                </div> 
                </div> 
               
                 <button className="btn-close" aria-label="Close"onClick={onRemoveHandler(task.id)}> </button>
                
            </li>}
            )}
        </ul>
        
        <div className="btn-group" role="group" aria-label="Basic example"> 
        <button className={props.buttonStatus=="typeAll"?"btn btn-primary":"btn btn-outline-primary"} onClick={onAllTask}>All</button>
        <button className={props.buttonStatus=="typeActive"?"btn btn-primary":"btn btn-outline-primary"} onClick={onActiveTask}>Active</button>
        <button className={props.buttonStatus=="typeDone"?"btn btn-primary":"btn btn-outline-primary"} onClick={onCompletedTask}>Completed</button>
        </div>
       
    </div>)
})