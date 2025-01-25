import { userReducer } from "./user-reducer"; 
test('increament only age', ()=>{
    const startState={age: 18, childrenCount:0, name:"alesia"}
    const endState=userReducer(startState,{type:"bla1"})
    expect(endState.age).toBe(19);
    expect(endState.childrenCount).toBe(0)
    
});