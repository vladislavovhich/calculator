import {CombineActions} from "../store"
import calc from "../../js/calculator"

const initState = {
    expression: [] as string[],
    cursorPosition: 0
}

type InitStateType = typeof initState
export type ActionsTypes = ReturnType<CombineActions<typeof actions>>

const calcReducer = (state: InitStateType = initState, action: ActionsTypes): InitStateType => {
    switch (action.type) {
        case "calc/ADD_TO_EXPRESSION": {
            return {
                ...state,
                expression: [
                    ...state.expression.slice(0, state.cursorPosition),
                    action.value,
                    ...state.expression.slice(state.cursorPosition, state.expression.length)
                ],
                cursorPosition: state.cursorPosition + 1
            }
        }
        case "calc/REMOVE_ONE_NUMBER": {
            let cursorPosition = state.cursorPosition - 1

            if (state.cursorPosition - 1 <= 0) {
                cursorPosition = 1
            }

            return {
                ...state,
                expression: [
                    ...state.expression.slice(0, state.cursorPosition - 1),
                    ...state.expression.slice(state.cursorPosition, state.expression.length)
                ],
                cursorPosition: cursorPosition
            }
        }
        case "calc/MOVE_CURSOR_LEFT": {
            let cursorPosition = state.cursorPosition - 1

            if (state.cursorPosition - 1 <= 0) {
                cursorPosition = 1
            }

            return {
                ...state,
                cursorPosition: cursorPosition
            }
        }
        case "calc/MOVE_CURSOR_RIGHT": {
            let cursorPosition = state.cursorPosition + 1

            if (state.cursorPosition + 1 >= state.expression.length) {
                cursorPosition = state.expression.length
            }

            return {
                ...state,
                cursorPosition: cursorPosition
            }
        }
        case "calc/CLEAR_EXPRESSION": {
            return {
                ...state,
                expression: [],
                cursorPosition: 0
            }
        }
        case "calc/SOLVE": {
            if (calc.checkExpression(state.expression.join(""))) {
                let result = calc.calc(state.expression.join("")).toString().split("")

                return {
                    ...state,
                    expression: result,
                    cursorPosition: result.length
                }
            } else {
                alert("Ошибка вычисления! Проверьте выражение:" +
                    "\n1)Не должно быть идущим друг за другом операндов, например: 1 + + 1" +
                    "\n2)Не должно быть идущих друг за другом точек, например: 1...20"+
                    "\n3)Вероятно, где-то не хватает чисел, например: 1 + ")

                return {
                    ...state
                }
            }
        }
        default: {
            return state
        }
    }
};

export const actions = {
    addToExpression: (value: string) => ({
        type: "calc/ADD_TO_EXPRESSION",
        value: value
    } as const),
    removeOneNumber: () => ({
        type: "calc/REMOVE_ONE_NUMBER"
    } as const),
    moveCursorLeft: () => ({
        type: "calc/MOVE_CURSOR_LEFT"
    } as const),
    moveCursorRight: () => ({
        type: "calc/MOVE_CURSOR_RIGHT"
    } as const),
    clearExpression: () => ({
        type: "calc/CLEAR_EXPRESSION"
    } as const),
    solve: () => ({
        type: "calc/SOLVE"
    } as const)
}

export default calcReducer