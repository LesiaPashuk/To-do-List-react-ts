import { ChangeEvent,KeyboardEvent, useState } from "react"
type EditableSpanPropdType={
    title:string 
    onChange: (newValue:string)=>void
}

export function EditableSpan(props:EditableSpanPropdType){
    let[editableState, setEditableState]=useState(false)
    const[newInputValue, setNewInputValue]=useState(props.title)
    const activeEditableSate=()=>{setEditableState(!editableState)}
    const takeNewTitleFuo=(e: ChangeEvent<HTMLInputElement>)=>{
            setNewInputValue(e.currentTarget.value)
          props.onChange(newInputValue)
        }
    return editableState
    ?<input onBlur={activeEditableSate} value={newInputValue}  onChange={takeNewTitleFuo} autoFocus={true}></input>
    :<span onDoubleClick={activeEditableSate}>{newInputValue}</span>
    
}