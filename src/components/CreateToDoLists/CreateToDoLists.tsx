import {
  AddNewListAC,
  addTaskAC,
  allTaskAC,

  changeInputFormActiveStatusAC,
  changeIsDoneStatusAC,
  initialState2,
  onlyActiveAC,
  onlyCompletedAC,
  RemoveListAC,
  removeTaskAC,
  takeNewTaskTitleAC,
  takeNewTitleAC,
  changeAddListButtonStatusAC,
} from "../../state/reducerForAllToDoList";
import "bootstrap/dist/css/bootstrap.min.css";
import { PriorityType, TypeForButton } from "../Task/Task";
import { Task, TaskType } from "../Task/Task";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import React, { ChangeEvent, useCallback, useState } from "react";
import "../CreateToDoLists/styleCreateToDoList.css";
import { createSelector } from "reselect";
import { InputForm } from "../InputForm/InputForm";
import { Moment } from "moment";
import { EditableSpan } from "../EditableSpan/EditableSpan";
import { Input } from "@mui/material";

export const CreateToDoLists = React.memo(function () {
  const dispatchTask = useDispatch();
  const selectToDoList = (state: RootState) => state.todoList.arrayToDoList;
  const selectAddListButton=(state:RootState)=>state.todoList.addListButtonStatus;
  const memorizedArrayToDoList = createSelector(
    [selectToDoList],
    (list) => list
  );
 
  const addListButtonStatus= useSelector(selectAddListButton)
 
  const arrayToDoList = useSelector(memorizedArrayToDoList);
  const [newListTitle,setNewListTitle]=useState("")
  const removeTask = useCallback(
    (idList: string, idTask: string, buttonStatus: TypeForButton) => {
      const action = removeTaskAC(idList, idTask, buttonStatus);
      dispatchTask(action);
    },
    [dispatchTask]
  );
  const addTask = useCallback(
    (
      newTitle: string,
      buttonStatus: TypeForButton,
      idList: string,
      data: Moment | null,
      priority: PriorityType,
      time: Moment | null
    ) => {
      const action = addTaskAC(
        newTitle,
        buttonStatus,
        idList,
        data,
        priority,
        time
      );
      dispatchTask(action);
    },
    [dispatchTask]
  );
  const changeIsDoneStatus = useCallback(
    (idList: string, idTask: string, buttonStatus: TypeForButton) => {
      const action = changeIsDoneStatusAC(idList, idTask, buttonStatus);
      dispatchTask(action);
    },
    [dispatchTask]
  );
  const completedTask = useCallback(
    (idList: string) => {
      const action = onlyCompletedAC(idList);
      dispatchTask(action);
    },
    [dispatchTask]
  );
  const activeTask = useCallback(
    (idList: string) => {
      const action = onlyActiveAC(idList);
      dispatchTask(action);
    },
    [dispatchTask]
  );
  const allTask = useCallback(
    (idList: string) => {
      const action = allTaskAC(idList);
      dispatchTask(action);
    },
    [dispatchTask]
  );
  const takeNewTaskTitle = useCallback(
    (
      idList: string,
      idTask: string,
      newTitle: string,
      buttonStatus: TypeForButton
    ) => {
      const action = takeNewTaskTitleAC(idList, idTask, newTitle, buttonStatus);
      dispatchTask(action);
    },
    [dispatchTask]
  );
  const addNewList = useCallback(() => {
    if (newListTitle!=="") {
      const action = AddNewListAC(newListTitle);
      dispatchTask(action);
    }
    setNewListTitle("")
  }, [dispatchTask, newListTitle]);
  const removeList = useCallback(
    (idList: string) => {
      const action = RemoveListAC(idList);
      dispatchTask(action);
    },
    [dispatchTask]
  );
  const takeNewTitle = useCallback(
    (idList: string, newTitle: string) => {
      const action = takeNewTitleAC(idList, newTitle);
      dispatchTask(action);
    },
    [dispatchTask]
  );
  const changeInputFormActiveStatus = useCallback(
    (InputFormActiveStatus: boolean, idList: string) => {
      const action = changeInputFormActiveStatusAC(
        InputFormActiveStatus,
        idList
      );
      dispatchTask(action);
    },
    [dispatchTask]
  );
  const changeAddListButtonStatus=useCallback(()=>{
   
    const action = changeAddListButtonStatusAC(addListButtonStatus);
    dispatchTask(action);
  },[dispatchTask, addListButtonStatus])

  const fuoNewListTitle=useCallback((e:ChangeEvent<HTMLInputElement>)=>{
    setNewListTitle(e.currentTarget.value)
    
  },[])
  const handleKeyPress=(e:React.KeyboardEvent<HTMLInputElement>)=>{
    if(e.key==='Enter'){
      addNewList();
    }
  }
  return (
    <>
      {addListButtonStatus?<div className="divForAddListInput">
        <input type="text" className="inputAddList" placeholder="Enter the name" value={newListTitle} onChange={fuoNewListTitle} onKeyDown={handleKeyPress}></input>
        <button type="button" onClick={addNewList}>+</button>
      </div>:  <button type="button" className="buttonAddList" onClick={changeAddListButtonStatus}>+ To-do list</button>}
      <div className="list">
        {arrayToDoList.map((el) => {
          return (
            <div className="d-flex align-items-start" key={el.idList}>
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
              {el.inputFormActiveStatus == false ? (
                <div className="divButtonStatus">
                  <button
                    className="buttonAddTask"
                    type="button"
                    onClick={() =>
                      changeInputFormActiveStatus(
                        el.inputFormActiveStatus,
                        el.idList
                      )
                    }
                  >
                    + Add task
                  </button>
                </div>
              ) : (
                <></>
              )}
              {el.inputFormActiveStatus ? (
                <InputForm
                  idList={el.idList}
                  title={el.listTitle}
                  tasks={el.tasks}
                  buttonStatus={el.buttonStatusState}
                  addTask={addTask}
                  takeNewTitle={takeNewTitle}
                  InputFormActiveStatus={el.inputFormActiveStatus}
                  fuoInputFormActiveStatusInPriorityForm={
                    changeInputFormActiveStatus
                  }
                ></InputForm>
              ) : (
                <></>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
});
