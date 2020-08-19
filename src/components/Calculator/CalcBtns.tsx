import React from "react";
import "../../scss/CalcBtns.scss"
import {useDispatch} from "react-redux";
import {actions} from "../../store/reducers/calcReducer";

type PropsType = {
    expression:string
};

const CalcBtns: React.FC<PropsType> = (props) => {
    const dispatch = useDispatch()

    const addToExpression = (value:string) => {
        return () => {
            dispatch(actions.addToExpression(value))
        }
    }
    const addSqrt = () => {
        addToExpression("sqrt")()
        addToExpression("(")()
        addToExpression(")")()
    }
    const addDot = () => {
        addToExpression(".")()
    }

    const moveCursorLeft = () => {
        dispatch(actions.moveCursorLeft())
    }
    const moveCursorRight = () => {
        dispatch(actions.moveCursorRight())
    }

    const removeOneNmbr = () => {
        dispatch(actions.removeOneNumber())
    }
    const clearExpression = () => {
        dispatch(actions.clearExpression())
    }

    const solve = () => {
        dispatch(actions.solve())
    }

    return (
        <div className="CalcBtns d-flex flex-column mt-1">
            <div className="d-flex flex-row">
                <input
                    type="button"
                    value="⇐"
                    className="EnterNumberBtn"
                    onClick={moveCursorLeft}
                />
                <input
                    type="button"
                    value="⇒"
                    className="EnterNumberBtn ml-1"
                    onClick={moveCursorRight}
                />
                <input
                    type="button"
                    value="("
                    className="EnterNumberBtn ml-1"
                    onClick={addToExpression("(")}
                />
                <input
                    type="button"
                    value=")"
                    className="EnterNumberBtn ml-1"
                    onClick={addToExpression(")")}
                />
            </div>


            <div className="mt-1">
                <div>
                    <input
                        type="button"
                        value="C"
                        className="EnterNumberBtn"
                        onClick={clearExpression}
                    />
                    <input
                        type="button"
                        value="X"
                        className="EnterNumberBtn ml-1"
                        onClick={removeOneNmbr}
                    />
                    <input
                        type="button"
                        value="√"
                        className="EnterNumberBtn ml-1"
                        onClick={addSqrt}
                    />
                    <input
                        type="button"
                        value="/"
                        className="EnterNumberBtn ml-1"
                        onClick={addToExpression(" / ")}
                    />
                </div>
                <div className="mt-1">
                    <input
                        type="button"
                        value="1"
                        className="EnterNumberBtn"
                        onClick={addToExpression("1")}
                    />
                    <input
                        type="button"
                        value="2"
                        className="EnterNumberBtn ml-1"
                        onClick={addToExpression("2")}
                    />
                    <input
                        type="button"
                        value="3"
                        className="EnterNumberBtn ml-1"
                        onClick={addToExpression("3")}
                    />
                    <input
                        type="button"
                        value="×"
                        className="EnterNumberBtn ml-1"
                        onClick={addToExpression(" * ")}
                    />
                </div>
                <div className="mt-1">
                    <input
                        type="button"
                        value="4"
                        className="EnterNumberBtn"
                        onClick={addToExpression("4")}
                    />
                    <input
                        type="button"
                        value="5"
                        className="EnterNumberBtn ml-1"
                        onClick={addToExpression("5")}
                    />
                    <input
                        type="button"
                        value="6"
                        className="EnterNumberBtn ml-1"
                        onClick={addToExpression("6")}
                    />
                    <input
                        type="button"
                        value="-"
                        className="EnterNumberBtn ml-1"
                        onClick={addToExpression(" - ")}
                    />
                </div>
                <div className="mt-1">
                    <input
                        type="button"
                        value="7"
                        className="EnterNumberBtn"
                        onClick={addToExpression("7")}
                    />
                    <input
                        type="button"
                        value="8"
                        className="EnterNumberBtn ml-1"
                        onClick={addToExpression("8")}
                    />
                    <input
                        type="button"
                        value="9"
                        className="EnterNumberBtn ml-1"
                        onClick={addToExpression("9")}
                    />
                    <input
                        type="button"
                        value="+"
                        className="EnterNumberBtn ml-1"
                        onClick={addToExpression(" + ")}
                    />
                </div>
                <div className="mt-1">
                    <input
                        type="button"
                        value="±"
                        className="EnterNumberBtn"
                        onClick={addToExpression("-")}
                    />
                    <input
                        type="button"
                        value="0"
                        className="EnterNumberBtn ml-1"
                        onClick={addToExpression("0")}
                    />
                    <input
                        type="button"
                        value="."
                        className="EnterNumberBtn ml-1"
                        onClick={addDot}
                    />
                    <input
                        type="button"
                        value="="
                        className="EnterNumberBtn ml-1"
                        onClick={solve  }
                    />
                </div>
            </div>
        </div>
    )
};

export default CalcBtns;