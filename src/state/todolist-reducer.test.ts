import { addTaskAC, allTaskAC, changeIsDoneStatusAC, onlyActiveAC, onlyCompletedAC, removeTaskAC, takeNewTaskTitleAC, todoListReducer } from "./todolist-reducer";
import {v1} from 'uuid';
import { TaskType } from "../components/Task/Task";
import { TypeForButton } from "../components/ListAndTasks/ListAndTasksWithReducer";
test('remove task',()=>{
    const st: TypeForButton = "typeAll"; 
    let todolistId1=v1();
    let todolistId2=v1();
    const startState={
        tasks:  [{id: todolistId1, title:"whhat to learn", isDone:true},
                {id:todolistId2, title:"whhat", isDone:true},],
        history:[{id: todolistId1, title:"whhat to learn", isDone:true},
                {id:todolistId2, title:"whhat", isDone:true},],
        buttonStatusState:st,
    }

    const endState= todoListReducer(startState,removeTaskAC(todolistId1, st))
    expect(endState.tasks.length).toBe(1)
    expect(endState.history.length).toBe(1)
    expect(endState.tasks[0].id).toBe(todolistId2)
 
})

test('add task',()=>{
    let todolistId1=v1();
    let todolistId2=v1();
    const st: TypeForButton = "typeAll"; 
    const startState={
        tasks: [{id: todolistId1, title:"whhat to learn", isDone:true},
        {id:todolistId2, title:"whhat", isDone:true},],
        history: [{id: todolistId1, title:"whhat to learn", isDone:true},
            {id:todolistId2, title:"whhat", isDone:true},],
            buttonStatusState:st,
    }

    const endState= todoListReducer(startState,addTaskAC("lalala", st))
    expect(endState.tasks.length).toBe(3)
})
test('change done-status', ()=>{
    const st: TypeForButton = "typeAll"; 
    let todolistId1=v1();
    let todolistId2=v1();
    const startState={
        tasks: [{id: todolistId1, title:"whhat to learn", isDone:true},
        {id:todolistId2, title:"whhat", isDone:true},],
        history: [{id: todolistId1, title:"whhat to learn", isDone:true},
            {id:todolistId2, title:"whhat", isDone:true},],
            buttonStatusState:st,
    }

    const endState= todoListReducer(startState, changeIsDoneStatusAC(todolistId1, st))
    expect(endState.tasks.length).toBe(2)
    expect(endState.tasks[0].isDone).toBe(false)
})

test('only completed', ()=>{
    const st: TypeForButton = "typeAll"; 
    const typeButoonTest="typeDone";
    const startState={
        tasks: [{id: v1(), title:"whhat to learn", isDone:true},
        {id:v1(), title:"whhat", isDone:true},],
        history: [{id: v1(), title:"whhat to learn", isDone:true},
            {id:v1(), title:"whhat", isDone:true},],
            buttonStatusState:st,
    }
    const endState=todoListReducer(startState, onlyCompletedAC(st))
    expect(endState.tasks.length).toBe(2)
    expect(endState.history.length).toBe(2)
})
test('only active', ()=>{
    const st: TypeForButton = "typeAll"; 
    const typeButoonTest="typeActive";
    const startState={
        tasks: [{id: v1(), title:"whhat to learn", isDone:true},
        {id:v1(), title:"whhat", isDone:true},],
        history: [{id: v1(), title:"whhat to learn", isDone:true},
            {id:v1(), title:"whhat", isDone:false},],
            buttonStatusState:st,
    }
    const endState=todoListReducer(startState, onlyActiveAC(typeButoonTest))
    expect(endState.tasks.length).toBe(1)
    expect(endState.history.length).toBe(2)
})
test("all tasks", ()=>{
    const st: TypeForButton = "typeAll"; 
    const typeButoonTest="typeAll";
    const startState={
        tasks: [{id: v1(), title:"whhat to learn", isDone:true},],
        history: [{id: v1(), title:"whhat to learn", isDone:true},
            {id:v1(), title:"whhat", isDone:true},],
            buttonStatusState:st,
    }
    const endState=todoListReducer(startState, allTaskAC(typeButoonTest))
    expect(endState.tasks.length).toBe(2)
    expect(endState.history.length).toBe(2)
})
test('new task title', ()=>{
    const st: TypeForButton = "typeAll"; 
    let todolistId1=v1();
    let todolistId2=v1();
    const startState={
        tasks: [{id: todolistId1, title:"whhat to learn", isDone:true},
        {id:todolistId2, title:"whhat", isDone:true},],
        history: [{id: todolistId1, title:"whhat to learn", isDone:true},
            {id:todolistId2, title:"whhat", isDone:true},],
            buttonStatusState:st,
    }
    const endState=todoListReducer(startState,  takeNewTaskTitleAC(todolistId1, "hello", st))
    expect(endState.tasks[0].title).toBe("hello")
})