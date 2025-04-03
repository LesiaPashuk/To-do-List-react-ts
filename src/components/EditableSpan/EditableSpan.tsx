import React, { useCallback } from "react"

import { ChangeEvent,KeyboardEvent, useState } from "react"
type EditableSpanPropdType={
    title:string 
    onChange: (newValue:string)=>void
}

export const EditableSpan=React.memo(function EditableSpan(props:EditableSpanPropdType){

    let[editableState, setEditableState]=useState(false)
    const[newInputValue, setNewInputValue]=useState(props.title)
    const activeEditableSate=useCallback(()=>{setEditableState(!editableState)},[editableState])
    const takeNewTitleFuo=useCallback((e: ChangeEvent<HTMLInputElement>)=>{
        setNewInputValue(e.currentTarget.value)
        props.onChange(newInputValue)
    },[ props.onChange])
    return editableState
    ?<input className="form-control border-success"onBlur={activeEditableSate} value={newInputValue}  onChange={takeNewTitleFuo} autoFocus={true}></input>
    :<span  className="span"onDoubleClick={activeEditableSate}>{newInputValue}</span>
    
})