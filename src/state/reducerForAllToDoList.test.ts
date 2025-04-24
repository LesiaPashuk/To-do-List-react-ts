import { AddNewListAC, addTaskAC, allTaskAC, changeIsDoneStatusAC, initialState2, onlyActiveAC, onlyCompletedAC, RemoveListAC, removeTaskAC, takeNewTaskTitleAC, reducerForAllToDoList , takeNewTitleAC} from './reducerForAllToDoList';
import {v1} from 'uuid';
import { TaskType } from "../components/Task/Task";
import { TypeForButton } from '../components/Task/Task';
import moment, { Moment } from 'moment';

test('remove-task',()=>{
    const st: TypeForButton = "typeAll"; 
    let taskId1=v1();
    let taskId2=v1();
    
    let taskId3=v1();
    let taskId4=v1();
    
    let idList1=v1();
    let idList2=v1();
    const specificDate: Moment = moment('2023-12-31');
    const time=null;

    const startState:initialState2={
        addListButtonStatus:false,
        arrayToDoList:[
            {
        tasks:  [{id: taskId1, title:"whhat to learn", isDone:true,date:specificDate,priority:"hightPriority", time},
                {id:taskId2, title:"whhat", isDone:true,date:specificDate,priority:"hightPriority", time},],
        history:[{id: taskId1, title:"whhat to learn", isDone:true,date:specificDate,priority:"hightPriority", time},
                {id:taskId2, title:"whhat", isDone:true,date:specificDate,priority:"hightPriority", time},],
        buttonStatusState:st,
        listTitle:"1",
        idList:idList1, 
        inputFormActiveStatus:false,
    }, 
    {
        tasks:  [{id: taskId3, title:"whhat to learn", isDone:true, date:specificDate,priority:"hightPriority", time},
                {id:taskId4, title:"whhat", isDone:true,date:specificDate,priority:"hightPriority", time},],
        history:[{id: taskId3, title:"whhat to learn", isDone:true,date:specificDate,priority:"hightPriority", time},
                {id:taskId4, title:"whhat", isDone:true,date:specificDate,priority:"hightPriority", time},],
        buttonStatusState:st,
        listTitle:"2",
        idList:idList2, 
        inputFormActiveStatus:false,
    }]}

    const endState= reducerForAllToDoList(startState,removeTaskAC(idList2,taskId3,st))
    expect(endState.arrayToDoList.length).toBe(2)
    expect(endState.arrayToDoList[0].tasks.length).toBe(2)
    expect(endState.arrayToDoList[1].tasks.length).toBe(1)
    expect(endState.arrayToDoList[1].tasks[0].id).toBe(taskId4)
 
})
test('add-task',()=>{
    const st: TypeForButton = "typeAll"; 
    let taskId1=v1();
    let taskId2=v1();
    
    let taskId3=v1();
    let taskId4=v1();
    
    let idList1=v1();
    let idList2=v1();

    const specificDate: Moment = moment('2023-12-31');
    const time=null;

    const startState:initialState2={
        addListButtonStatus:false,
        arrayToDoList:[
            {
        tasks:  [{id: taskId1, title:"whhat to learn", isDone:true,date:specificDate,priority:"hightPriority", time},
                {id:taskId2, title:"whhat", isDone:true,date:specificDate,priority:"hightPriority", time},],
        history:[{id: taskId1, title:"whhat to learn", isDone:true,date:specificDate,priority:"hightPriority", time},
                {id:taskId2, title:"whhat", isDone:true,date:specificDate,priority:"hightPriority", time},],
        buttonStatusState:st,
        listTitle:"1",
        idList:idList1, 
        inputFormActiveStatus:false,
    }, 
    {
        tasks:  [{id: taskId3, title:"whhat to learn", isDone:true,date:specificDate,priority:"hightPriority", time},
                {id:taskId4, title:"whhat", isDone:true,date:specificDate,priority:"hightPriority", time},],
        history:[{id: taskId3, title:"whhat to learn", isDone:true,date:specificDate,priority:"hightPriority", time},
                {id:taskId4, title:"whhat", isDone:true,date:specificDate,priority:"hightPriority", time},],
        buttonStatusState:st,
        listTitle:"2",
        idList:idList2, 
        inputFormActiveStatus:false,
    }]}
    const endState= reducerForAllToDoList(startState,addTaskAC("lol", st, idList1,specificDate,"hightPriority", time))
    expect(endState.arrayToDoList.length).toBe(2)
    expect(endState.arrayToDoList[0].tasks.length).toBe(3)
    expect(endState.arrayToDoList[0].history.length).toBe(3)
    expect(endState.arrayToDoList[1].tasks.length).toBe(2)
    expect(endState.arrayToDoList[0].tasks[0].title).toBe("lol")
})

test("change-is-done-status", ()=>{
    const st: TypeForButton = "typeAll"; 
    let taskId1=v1();
    let taskId2=v1();
    
    let taskId3=v1();
    let taskId4=v1();
    
    let idList1=v1();
    let idList2=v1();

    const specificDate: Moment = moment('2023-12-31');
    const time=null;

    const startState:initialState2={
        addListButtonStatus:false,
        arrayToDoList:[
            {
        tasks:  [{id: taskId1, title:"whhat to learn", isDone:true,date:specificDate,priority:"hightPriority", time},
                {id:taskId2, title:"whhat", isDone:true,date:specificDate,priority:"hightPriority", time},],
        history:[{id: taskId1, title:"whhat to learn", isDone:true,date:specificDate,priority:"hightPriority", time},
                {id:taskId2, title:"whhat", isDone:true,date:specificDate,priority:"hightPriority", time},],
        buttonStatusState:st,
        listTitle:"1",
        idList:idList1, 
        inputFormActiveStatus:false,
    }, 
    {
        tasks:  [{id: taskId3, title:"whhat to learn", isDone:true,date:specificDate,priority:"hightPriority", time},
                {id:taskId4, title:"whhat", isDone:true,date:specificDate,priority:"hightPriority", time},],
        history:[{id: taskId3, title:"whhat to learn", isDone:true,date:specificDate,priority:"hightPriority", time},
                {id:taskId4, title:"whhat", isDone:true,date:specificDate,priority:"hightPriority", time},],
        buttonStatusState:st,
        listTitle:"2",
        idList:idList2, 
        inputFormActiveStatus:false,
    }]}
    const endState= reducerForAllToDoList(startState, changeIsDoneStatusAC(idList2,taskId3, st))
    expect(endState.arrayToDoList[1].tasks[0].isDone).toBe(false)
    expect(endState.arrayToDoList[1].history[0].isDone).toBe(false) 
    expect(endState.arrayToDoList[0].tasks[0].isDone).toBe(true)
    expect(endState.arrayToDoList[0].tasks[1].isDone).toBe(true)
})


test("only-completed", ()=>{
    const st: TypeForButton = "typeAll"; 
    let taskId1=v1();
    let taskId2=v1();
    
    let taskId3=v1();
    let taskId4=v1();
    
    let idList1=v1();
    let idList2=v1();

    const specificDate: Moment = moment('2023-12-31');
    const time=null;

    const startState:initialState2={
        addListButtonStatus:false,
        arrayToDoList:[
            {
        tasks:  [{id: taskId1, title:"whhat to learn", isDone:false,date:specificDate,priority:"hightPriority", time},
                {id:taskId2, title:"whhat", isDone:true,date:specificDate,priority:"hightPriority", time},],
        history:[{id: taskId1, title:"whhat to learn", isDone:false,date:specificDate,priority:"hightPriority", time},
                {id:taskId2, title:"whhat", isDone:true,date:specificDate,priority:"hightPriority", time},],
        buttonStatusState:st,
        listTitle:"1",
        idList:idList1, 
        inputFormActiveStatus:false,
    }, 
    {
        tasks:  [{id: taskId3, title:"whhat to learn", isDone:true,date:specificDate,priority:"hightPriority", time},
                {id:taskId4, title:"whhat", isDone:true,date:specificDate,priority:"hightPriority", time},],
        history:[{id: taskId3, title:"whhat to learn", isDone:true,date:specificDate,priority:"hightPriority", time},
                {id:taskId4, title:"whhat", isDone:true,date:specificDate,priority:"hightPriority", time},],
        buttonStatusState:st,
        listTitle:"2",
        idList:idList2, 
        inputFormActiveStatus:false,
    }]}
    const endState= reducerForAllToDoList(startState, onlyCompletedAC(idList1))
    expect(endState.arrayToDoList[0].tasks.length).toBe(1)
    expect(endState.arrayToDoList[0].history.length).toBe(2) 
    expect(endState.arrayToDoList[0].tasks[0].id).toBe(taskId2)
    expect(endState.arrayToDoList[0].buttonStatusState).toBe("typeDone")
})

test("only-active", ()=>{
    const st: TypeForButton = "typeAll"; 
    let taskId1=v1();
    let taskId2=v1();
    
    let taskId3=v1();
    let taskId4=v1();
    
    let idList1=v1();
    let idList2=v1();

    const specificDate: Moment = moment('2023-12-31');
    const time=null;

    const startState:initialState2={
        addListButtonStatus:false,
        arrayToDoList:[
            {
        tasks:  [{id: taskId1, title:"whhat to learn", isDone:false,date:specificDate,priority:"hightPriority", time},
                {id:taskId2, title:"whhat", isDone:true,date:specificDate,priority:"hightPriority", time},],
        history:[{id: taskId1, title:"whhat to learn", isDone:false,date:specificDate,priority:"hightPriority", time},
                {id:taskId2, title:"whhat", isDone:true,date:specificDate,priority:"hightPriority", time},],
        buttonStatusState:st,
        listTitle:"1",
        idList:idList1, 
        inputFormActiveStatus:false,
    }, 
    {
        tasks:  [{id: taskId3, title:"whhat to learn", isDone:true,date:specificDate,priority:"hightPriority", time},
                {id:taskId4, title:"whhat", isDone:true,date:specificDate,priority:"hightPriority", time},],
        history:[{id: taskId3, title:"whhat to learn", isDone:true,date:specificDate,priority:"hightPriority", time},
                {id:taskId4, title:"whhat", isDone:true,date:specificDate,priority:"hightPriority", time},],
        buttonStatusState:st,
        listTitle:"2",
        idList:idList2,
        inputFormActiveStatus:false, 
    }]}
    const endState= reducerForAllToDoList(startState, onlyActiveAC(idList2))
    expect(endState.arrayToDoList[1].tasks.length).toBe(0)
    expect(endState.arrayToDoList[1].history.length).toBe(2) 
    expect(endState.arrayToDoList[0].tasks.length).toBe(2)
    expect(endState.arrayToDoList[1].buttonStatusState).toBe("typeActive")
})

test("all-tasks", ()=>{
    const st: TypeForButton = "typeDone"; 
    let taskId1=v1();
    let taskId2=v1();
    
    let taskId3=v1();
    let taskId4=v1();
    
    let idList1=v1();
    let idList2=v1();

    const specificDate: Moment = moment('2023-12-31');
    const time=null;

    const startState:initialState2={
        addListButtonStatus:false,
        arrayToDoList:[
            {
        tasks:  [{id:taskId2, title:"whhat", isDone:true,date:specificDate,priority:"hightPriority", time},],
        history:[{id: taskId1, title:"whhat to learn", isDone:false,date:specificDate,priority:"hightPriority", time},
                {id:taskId2, title:"whhat", isDone:true,date:specificDate,priority:"hightPriority", time},],
        buttonStatusState:st,
        listTitle:"1",
        idList:idList1, 
        inputFormActiveStatus:false,
    }, 
    {
        tasks:  [],
        history:[{id: taskId3, title:"whhat to learn", isDone:true,date:specificDate,priority:"hightPriority", time},
                {id:taskId4, title:"whhat", isDone:true,date:specificDate,priority:"hightPriority", time},],
        buttonStatusState:st,
        listTitle:"2",
        idList:idList2,
        inputFormActiveStatus:false, 
    }]}
    const endState1= reducerForAllToDoList(startState, allTaskAC(idList1))
    const endState2= reducerForAllToDoList(startState, allTaskAC(idList2))
    expect(endState1.arrayToDoList[0].tasks.length).toBe(2)
    expect(endState1.arrayToDoList[0].history.length).toBe(2) 
    expect(endState1.arrayToDoList[0].buttonStatusState).toBe("typeAll")
    expect(endState2.arrayToDoList[1].tasks.length).toBe(2)
    expect(endState2.arrayToDoList[1].history.length).toBe(2) 
    expect(endState2.arrayToDoList[1].buttonStatusState).toBe("typeAll")
})

test('take-new-task-title',()=>{
    const st: TypeForButton = "typeAll"; 
    let taskId1=v1();
    let taskId2=v1();
    
    let taskId3=v1();
    let taskId4=v1();
    
    let idList1=v1();
    let idList2=v1();

    const specificDate: Moment = moment('2023-12-31');
    const time=null;

    const startState:initialState2={
        addListButtonStatus:false,
        arrayToDoList:[
            {
        tasks:  [{id: taskId1, title:"whhat to learn", isDone:true,date:specificDate,priority:"hightPriority", time},
                {id:taskId2, title:"whhat", isDone:true,date:specificDate,priority:"hightPriority", time},],
        history:[{id: taskId1, title:"whhat to learn", isDone:true,date:specificDate,priority:"hightPriority", time},
                {id:taskId2, title:"whhat", isDone:true,date:specificDate,priority:"hightPriority", time},],
        buttonStatusState:st,
        listTitle:"1",
        idList:idList1, 
        inputFormActiveStatus:false,
    }, 
    {
        tasks:  [{id: taskId3, title:"whhat to learn", isDone:true,date:specificDate,priority:"hightPriority", time},
                {id:taskId4, title:"whhat", isDone:true,date:specificDate,priority:"hightPriority", time},],
        history:[{id: taskId3, title:"whhat to learn", isDone:true,date:specificDate,priority:"hightPriority", time},
                {id:taskId4, title:"whhat", isDone:true,date:specificDate,priority:"hightPriority", time},],
        buttonStatusState:st,
        listTitle:"2",
        idList:idList2, 
        inputFormActiveStatus:false,
    }]}
    const endState= reducerForAllToDoList(startState,takeNewTaskTitleAC(idList1,taskId1,"lol", st))
    expect(endState.arrayToDoList[0].tasks[0].title).toBe("lol")
    expect(endState.arrayToDoList[0].history[0].title).toBe("lol")
})
test('add-new-list',()=>{
    const st: TypeForButton = "typeAll"; 
    let taskId1=v1();
    let taskId2=v1();
    
    let taskId3=v1();
    let taskId4=v1();
    
    let idList1=v1();
    let idList2=v1();

    const specificDate: Moment = moment('2023-12-31');
    const time=null;

    const startState:initialState2={
        addListButtonStatus:false,
        arrayToDoList:[
            {
        tasks:  [{id: taskId1, title:"whhat to learn", isDone:true,date:specificDate,priority:"hightPriority", time},
                {id:taskId2, title:"whhat", isDone:true,date:specificDate,priority:"hightPriority", time},],
        history:[{id: taskId1, title:"whhat to learn", isDone:true,date:specificDate,priority:"hightPriority", time},
                {id:taskId2, title:"whhat", isDone:true,date:specificDate,priority:"hightPriority", time},],
        buttonStatusState:st,
        listTitle:"1",
        idList:idList1,
        inputFormActiveStatus:false, 
    }, 
    {
        tasks:  [{id: taskId3, title:"whhat to learn", isDone:true,date:specificDate,priority:"hightPriority", time},
                {id:taskId4, title:"whhat", isDone:true,date:specificDate,priority:"hightPriority", time},],
        history:[{id: taskId3, title:"whhat to learn", isDone:true,date:specificDate,priority:"hightPriority", time},
                {id:taskId4, title:"whhat", isDone:true,date:specificDate,priority:"hightPriority", time},],
        buttonStatusState:st,
        listTitle:"2",
        idList:idList2, 
        inputFormActiveStatus:false,
    }]}
    const endState= reducerForAllToDoList(startState,AddNewListAC( "list3"))
    expect(endState.arrayToDoList.length).toBe(3)
    expect(endState.arrayToDoList[0].listTitle).toBe("list3")
    expect(endState.arrayToDoList[0].tasks.length).toBe(0)
    expect(endState.arrayToDoList[1].idList).toBe(idList1)
})

test('add-new-list',()=>{
    const st: TypeForButton = "typeAll"; 
    let taskId1=v1();
    let taskId2=v1();
    
    let taskId3=v1();
    let taskId4=v1();
    
    let idList1=v1();
    let idList2=v1();

    const specificDate: Moment = moment('2023-12-31');
    const time=null;

    const startState:initialState2={
        addListButtonStatus:false,
        arrayToDoList:[
            {
        tasks:  [{id: taskId1, title:"whhat to learn", isDone:true,date:specificDate,priority:"hightPriority", time},
                {id:taskId2, title:"whhat", isDone:true,date:specificDate,priority:"hightPriority", time},],
        history:[{id: taskId1, title:"whhat to learn", isDone:true,date:specificDate,priority:"hightPriority", time},
                {id:taskId2, title:"whhat", isDone:true,date:specificDate,priority:"hightPriority", time},],
        buttonStatusState:st,
        listTitle:"1",
        idList:idList1,
        inputFormActiveStatus:false, 
    }, 
    {
        tasks:  [{id: taskId3, title:"whhat to learn", isDone:true,date:specificDate,priority:"hightPriority", time},
                {id:taskId4, title:"whhat", isDone:true,date:specificDate,priority:"hightPriority", time},],
        history:[{id: taskId3, title:"whhat to learn", isDone:true,date:specificDate,priority:"hightPriority", time},
                {id:taskId4, title:"whhat", isDone:true,date:specificDate,priority:"hightPriority", time},],
        buttonStatusState:st,
        listTitle:"2",
        idList:idList2,
        inputFormActiveStatus:false, 
    }]}
    const endState= reducerForAllToDoList(startState,RemoveListAC(idList1))
    expect(endState.arrayToDoList.length).toBe(1)
    expect(endState.arrayToDoList[0].listTitle).toBe("2")
    expect(endState.arrayToDoList[0].tasks.length).toBe(2)
    expect(endState.arrayToDoList[0].idList).toBe(idList2)
})

test('take-new-title',()=>{
    const st: TypeForButton = "typeAll"; 
    let taskId1=v1();
    let taskId2=v1();
    
    let taskId3=v1();
    let taskId4=v1();
    
    let idList1=v1();
    let idList2=v1();

    const specificDate: Moment = moment('2023-12-31');
    const time=null;

    const startState:initialState2={
        addListButtonStatus:false,
        arrayToDoList:[
            {
        tasks:  [{id: taskId1, title:"whhat to learn", isDone:true,date:specificDate,priority:"hightPriority", time},
                {id:taskId2, title:"whhat", isDone:true,date:specificDate,priority:"hightPriority", time},],
        history:[{id: taskId1, title:"whhat to learn", isDone:true,date:specificDate,priority:"hightPriority", time},
                {id:taskId2, title:"whhat", isDone:true,date:specificDate,priority:"hightPriority", time},],
        buttonStatusState:st,
        listTitle:"1",
        idList:idList1, 
        inputFormActiveStatus:false,
    }, 
    {
        tasks:  [{id: taskId3, title:"whhat to learn", isDone:true,date:specificDate,priority:"hightPriority", time},
                {id:taskId4, title:"whhat", isDone:true,date:specificDate,priority:"hightPriority", time},],
        history:[{id: taskId3, title:"whhat to learn", isDone:true,date:specificDate,priority:"hightPriority", time},
                {id:taskId4, title:"whhat", isDone:true,date:specificDate,priority:"hightPriority", time},],
        buttonStatusState:st,
        listTitle:"2",
        idList:idList2, 
        inputFormActiveStatus:false,
    }]}
    const endState= reducerForAllToDoList(startState,takeNewTitleAC(idList1,"lol"))
    expect(endState.arrayToDoList[0].listTitle).toBe("lol")
    expect(endState.arrayToDoList[1].listTitle).toBe("2")
})