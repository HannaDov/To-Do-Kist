import React, {ChangeEvent, useState} from 'react';

type EditTablePropsType = {
    title: string
    callback:(title:string)=>void
}
export const EditTableSpan =React.memo( (props: EditTablePropsType) => {
    console.log('editTableSpan is called')
    const [edit, setEdit] = useState(false)
    const [newTitle, setNewTitle]=useState(props.title)
    const OnDoubleClickHandler=()=>{
        setEdit(!edit)
        props.callback(newTitle)
    }
    const onChangeHandler=(e:ChangeEvent<HTMLInputElement>)=>{
        setNewTitle(e.currentTarget.value)
    }
    return (
        edit ?
            <input value={newTitle} onChange={onChangeHandler} onBlur={OnDoubleClickHandler} autoFocus/>
            :
            <span onDoubleClick={OnDoubleClickHandler}>{props.title}</span>

    );
});

