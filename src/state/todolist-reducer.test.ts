import { addTaskAC, allTaskAC, changeIsDoneStatusAC, onlyActiveAC, onlyCompletedAC, removeTaskAC, takeNewTaskTitleAC, todoListReducer } from "./todolist-reducer";
import {v1} from 'uuid';
import { TaskType } from "../components/Task/Task";

test('remove task',()=>{
    let todolistId1=v1();
    let todolistId2=v1();
    const startState={
        tasks:  [{id: todolistId1, title:"whhat to learn", isDone:true},
                {id:todolistId2, title:"whhat", isDone:true},],
        history:[{id: todolistId1, title:"whhat to learn", isDone:true},
                {id:todolistId2, title:"whhat", isDone:true},]
    }

    const endState= todoListReducer(startState,removeTaskAC(todolistId1))
    expect(endState.tasks.length).toBe(1)
    expect(endState.history.length).toBe(1)
    expect(endState.tasks[0].id).toBe(todolistId2)
 
})

test('add task',()=>{
    let todolistId1=v1();
    let todolistId2=v1();
    const startState={
        tasks: [{id: todolistId1, title:"whhat to learn", isDone:true},
        {id:todolistId2, title:"whhat", isDone:true},],
        history: [{id: todolistId1, title:"whhat to learn", isDone:true},
            {id:todolistId2, title:"whhat", isDone:true},]
    }

    const endState= todoListReducer(startState,addTaskAC("lalala"))
    expect(endState.tasks.length).toBe(3)
})
test('change done-status', ()=>{
    let todolistId1=v1();
    let todolistId2=v1();
    const startState={
        tasks: [{id: todolistId1, title:"whhat to learn", isDone:true},
        {id:todolistId2, title:"whhat", isDone:true},],
        history: [{id: todolistId1, title:"whhat to learn", isDone:true},
            {id:todolistId2, title:"whhat", isDone:true},]
    }

    const endState= todoListReducer(startState, changeIsDoneStatusAC(todolistId1))
    expect(endState.tasks.length).toBe(2)
    expect(endState.tasks[0].isDone).toBe(false)
})

test('only completed', ()=>{
    const startState={
        tasks: [{id: v1(), title:"whhat to learn", isDone:true},
        {id:v1(), title:"whhat", isDone:true},],
        history: [{id: v1(), title:"whhat to learn", isDone:true},
            {id:v1(), title:"whhat", isDone:true},]
    }
    const endState=todoListReducer(startState, onlyCompletedAC())
    expect(endState.tasks.length).toBe(2)
    expect(endState.history.length).toBe(2)
})
test('only active', ()=>{
    const startState={
        tasks: [{id: v1(), title:"whhat to learn", isDone:true},
        {id:v1(), title:"whhat", isDone:true},],
        history: [{id: v1(), title:"whhat to learn", isDone:true},
            {id:v1(), title:"whhat", isDone:false},]
    }
    const endState=todoListReducer(startState, onlyActiveAC())
    expect(endState.tasks.length).toBe(1)
    expect(endState.history.length).toBe(2)
})
test("all tasks", ()=>{
    const startState={
        tasks: [{id: v1(), title:"whhat to learn", isDone:true},],
        history: [{id: v1(), title:"whhat to learn", isDone:true},
            {id:v1(), title:"whhat", isDone:true},]
    }
    const endState=todoListReducer(startState, allTaskAC())
    expect(endState.tasks.length).toBe(2)
    expect(endState.history.length).toBe(2)
})
test('new task title', ()=>{
    let todolistId1=v1();
    let todolistId2=v1();
    const startState={
        tasks: [{id: todolistId1, title:"whhat to learn", isDone:true},
        {id:todolistId2, title:"whhat", isDone:true},],
        history: [{id: todolistId1, title:"whhat to learn", isDone:true},
            {id:todolistId2, title:"whhat", isDone:true},]
    }
    const endState=todoListReducer(startState,  takeNewTaskTitleAC(todolistId1, "hello"))
    expect(endState.tasks[0].title).toBe("hello")
})