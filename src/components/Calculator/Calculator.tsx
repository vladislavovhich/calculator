import React from "react";
import CalcBtns from "./CalcBtns";
import CalcInput from "./CalcInput";
import {useSelector} from "react-redux";
import {StateType} from "../../store/store";
import "../../scss/Calculator.scss"

type PropsType = {};

const Calculator: React.FC<PropsType> = (props) => {
    const expression = useSelector((state:StateType) => state.calcPage.expression)
    const cursorPosition = useSelector((state:StateType) => state.calcPage.cursorPosition)

    return (
        <div className="Calculator d-flex align-items-center flex-column">
            <CalcInput
                expression={expression.join("")}
                cursorPosition={expression.slice(0, cursorPosition).join("").length}
            />
            <CalcBtns
                expression={expression.join("")}
            />
        </div>
    )
};

export default Calculator;