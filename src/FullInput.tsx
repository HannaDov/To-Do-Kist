import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {Button, TextField} from "@mui/material";

type FullInputPropsType = {
    callback: (title: string) => void

}
export const FullInput = (props: FullInputPropsType) => {
    const [newTaskTitle, setNewTaskTitle] = useState('')
    const [error, setError] = useState<boolean>(false)
    const addTaskHandler = () => {
        if (newTaskTitle.trim() !== "") {
            props.callback(newTaskTitle.trim())
            setNewTaskTitle('')
        } else {
            setError(true)
        }
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(false)
        if (e.key === "Enter") {
            addTaskHandler()
        }
    }
    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(event.currentTarget.value)
    }
    return (
        <div>

            <TextField value={newTaskTitle}
                       onKeyPress={onKeyPressHandler}
                       onChange={onChangeHandler} className={error ? 'error' : ''}
                       label={!error?"Enter your text":"Title is required"}
                       variant="standard"
                       size='small'
                       error={error}/>
            <Button variant="contained" onClick={addTaskHandler}
                    style={{maxWidth: '38px', maxHeight: '38px', minWidth: '38px', minHeight: '38px'}}>+</Button>
            {/*{error && <div className='error-message'>Title is required</div>}*/}

        </div>
    )
}

