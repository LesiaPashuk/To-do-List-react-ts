type StateType={
    age:number
    childrenCount:number
    name:string
}
type ActionType={
    type: string
    [key: string]:any
}


export const userReducer=(state:StateType, action:ActionType)=>{
    switch(action.type){
        case 'bla1':
            state.age=state.age+1;
            return state;
        case 'bla2':
            state.childrenCount=state.childrenCount+1;
            return state;
        default:
            throw new Error("fuck")
    }
}