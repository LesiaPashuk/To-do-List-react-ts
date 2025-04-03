import {
  AddNewListAC,
  addTaskAC,
  allTaskAC,
  changeButtonCelenderActiveStatusAC,
  changeIsDoneStatusAC,
  initialState2,
  onlyActiveAC,
  onlyCompletedAC,
  RemoveListAC,
  removeTaskAC,
  takeNewTaskTitleAC,
  takeNewTitleAC,
} from "../../state/reducerForAllToDoList";
import "bootstrap/dist/css/bootstrap.min.css";
import { PriorityType, TypeForButton } from "../Task/Task";
import { Task, TaskType } from "../Task/Task";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import React, { useCallback, useState } from "react";
import "../CreateToDoLists/styleCreateToDoList.css";
import { createSelector } from "reselect";
import { ButtonCelender } from "../ButtonCelender/ButtonCelender";
import { Moment } from "moment";
/*
export type ListAndTaskType = {
  id: string;
  title: string;
  listAndTask: Array<TaskType>;
 // buttonCelenderStatusActive:boolean, 
  updateListTitle: (newTitle: string, todolistId: string) => void;
  deleteList: (idList: string) => void;
};*/
export const CreateToDoLists = React.memo(function () {
  const dispatchTask = useDispatch();
  const selectToDoList = (state: RootState) => state.todoList.arrayToDoList;
  const memorizedArrayToDoList = createSelector(
    [selectToDoList],
    (list) => list
  );
  const arrayToDoList = useSelector(memorizedArrayToDoList);
  const removeTask = useCallback(
    (idList: string, idTask: string, buttonStatus: TypeForButton) => {
      const action = removeTaskAC(idList, idTask, buttonStatus);
      dispatchTask(action);
    },
    [dispatchTask]
  );
  const addTask = useCallback(
    (newTitle: string, buttonStatus: TypeForButton, idList: string,data:string|undefined,priority:PriorityType) => {
      const action = addTaskAC(newTitle, buttonStatus, idList, data,priority );
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
    const newListTitle = prompt("Введите название нового to-do-list");
    if (newListTitle) {
      const action = AddNewListAC(newListTitle);
      dispatchTask(action);
    }
  }, [dispatchTask]);
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
  const changeButtonCelenderActiveStatus= useCallback(
    (buttonCelenderActiveStatus:boolean, idList:string)=>{
      const action= changeButtonCelenderActiveStatusAC(buttonCelenderActiveStatus, idList);
      dispatchTask(action)
    },
    [dispatchTask]
  )
//  const [buttonCelenderStatusActive, setButtonCelenderStatusActive]=useState<boolean>(false);
  return (
    <div className="list">
      <button type="button" className="btn-dark" onClick={addNewList}>
        Добавить новый лист
      </button>
      {arrayToDoList.map((el) => {
        return (
          <div className="d-flex align-items-start" key={el.idList}>
            {el.buttonCelenderActiveStatus? <ButtonCelender
              idList={el.idList}
              title={el.listTitle}
              tasks={el.tasks}
              buttonStatus={el.buttonStatusState}
              addTask={addTask}
              takeNewTitle={takeNewTitle}
              buttonCelenderActiveStatus={el.buttonCelenderActiveStatus}
              fuoButtonCelenderActiveStatusInForm={changeButtonCelenderActiveStatus}
            ></ButtonCelender>:<></>}
           
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
            {el.buttonCelenderActiveStatus==false? <button type="button" onClick={()=>changeButtonCelenderActiveStatus(el.buttonCelenderActiveStatus,el.idList)}>Добавить задачу</button>:<></>}
           
          </div>
        );
      })}
    </div>
  );
});
