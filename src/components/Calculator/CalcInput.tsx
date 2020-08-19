import React, {useRef} from "react";
import "../../scss/CalcInput.scss"

type PropsType = {
    expression:string
    cursorPosition:number
}

const CalcInput:React.FC<PropsType> = (props) => {
    const inputRef = useRef<HTMLInputElement>(null)

    const onFocus = (e:React.FocusEvent<HTMLInputElement>) => {
        e.preventDefault()

        if (inputRef.current) {
            inputRef.current.setSelectionRange(props.cursorPosition, props.cursorPosition)
        }
    }
    const onMouseUp = (e:React.MouseEvent<HTMLInputElement>) => {
        e.preventDefault()

        if (inputRef.current) {
            inputRef.current.setSelectionRange(props.cursorPosition, props.cursorPosition)
        }
    }
    const onKeyDown = (e:React.KeyboardEvent<HTMLInputElement>) => {
        e.preventDefault()
    }
    const onChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
    }

    return (
        <input
            type="text"
            value={props.expression}
            ref={inputRef}
            onFocus={onFocus}
            onMouseUp={onMouseUp}
            onKeyDown={onKeyDown}
            onChange={onChange}
            className="CalcInput w-100"
            autoFocus={true}
        />
    )
}

export default CalcInput