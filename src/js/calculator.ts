type Operands = " + " | " - " | " / " | " * " | "^" | "sqrt" |""
type BinarryOp = {
    first:number
    second:number
}
type GetOperand = {
    position:number
    operand:string
    priority:number
}
type Pow = {
    number:number
    pow:number
}
type Sqrt = {
    number:number
}
type ParamsCalcType = BinarryOp & Pow & Sqrt
type GetBrackets = {
    start:number
    end:number
}

class Calculator {
    private static operands = {
        " + ": 1,
        " - ": 1,
        " / ": 2,
        " * ": 2,
        "^": 3,
        "sqrt": 4
    }
    private static operations = {
        " + ": ({first, second}: BinarryOp) => first + second,
        " - ": ({first, second}: BinarryOp) => first - second,
        " * ": ({first, second}: BinarryOp) => first * second,
        " / ": ({first, second}: BinarryOp) => first / second,
        "^": ({number, pow}:Pow) => number ** pow,
        "sqrt": ({number}:Sqrt) => +Math.sqrt(number).toFixed(2)
    }

    private static hasOperands(expression: string): boolean {
        for (let operand in this.operands) {
            if (expression.includes(operand)) {
                return expression.includes(operand)
            }
        }

        return false
    }
    private static getOperand(expression: string):GetOperand {
        let result: GetOperand = {
            position: 0,
            operand: "",
            priority: 0
        }

        let operands = this.operands
        type OperandType = keyof typeof operands

        for (let operand in this.operands) {
            if (expression.includes(operand)) {
                if (this.operands[operand as OperandType] > result.priority) {
                    result.position = expression.indexOf(operand)
                    result.operand = operand
                    result.priority = this.operands[operand as OperandType]
                } else if (this.operands[operand as OperandType] === result.priority) {
                    if (result.position > expression.indexOf(operand)) {
                        result.position = expression.indexOf(operand)
                        result.operand = operand
                    }
                }
            }
        }

        return result
    }

    private static hasBrackets(expression:string):boolean {
        return expression.includes("(") && expression.includes(")") && this.checkBrackets(expression)
    }
    private static checkBrackets(expression:string):boolean {
        let bracketsAmount = 0

        for (let i = 0; i < expression.length; i++) {
            switch (expression[i]) {
                case "(":
                    bracketsAmount++
                break
                case ")":
                    bracketsAmount--
                break
            }

            if (bracketsAmount < 0) {
                return false
            }
        }

        return bracketsAmount === 0
    }
    private static getBrackets(expression:string, offset:number = 0):GetBrackets {
        const result:GetBrackets = {
            start: 0,
            end: expression.length
        }

        for (let i = offset; i < expression.length; i++) {
            if (expression[i] === "(") {
                result.start = i
                break
            }
        }

        for (let i = result.start + 1; i < expression.length; i++) {
            if (expression[i] === ")") {
                if (this.checkBrackets(expression.slice(result.start, i + 1))) {
                    result.end = i + 1
                    break
                }
            }
        }

        return result
    }

    private static getFirstNumber(expression:string, position:number, offset:number = 0):number {
        let currentPos = position - offset
        let number = ""

        while (
            ((parseInt(expression[currentPos]) || parseInt(expression[currentPos]) === 0) ||
                expression[currentPos] === "." ||
                expression[currentPos] === "-") && currentPos !== -1
            ) {
            number += expression[currentPos]
            currentPos--
        }

        return +(number.split("").reverse().join(""))
    }
    private static getSecondNumber(expression:string, position:number, offset:number = 0):number {
        let currentPos = position + offset
        let number = ""

        while (
            ((parseInt(expression[currentPos]) || parseInt(expression[currentPos]) === 0) ||
                expression[currentPos] === "." ||
                expression[currentPos] === "-") && currentPos !== expression.length
            ) {
            number += expression[currentPos]
            currentPos++
        }

        return +number
    }

    private static calc(operand:Operands, params:ParamsCalcType):number {
        const operands = this.operands
        type OperandType = keyof typeof operands

        return this.operations[operand as OperandType](params)
    }

    static calculate(expression:string):number {
        while (this.hasOperands(expression) || this.hasBrackets(expression)) {
            const {operand, position} = this.getOperand(expression)

            let first:number = 0
            let second:number = 0

            let result:number = 0

            if (operand === "sqrt") {
                const {start, end} = this.getBrackets(expression, position + 3)
                const innerExpression = expression.slice(start + 1, end - 1)
                const resultInnerExpresion = this.calculate(innerExpression)
                const result = this.calc(operand as Operands, {
                    number:resultInnerExpresion
                } as ParamsCalcType)

                expression = expression.replace(`sqrt(${innerExpression})`, result.toString())

                continue
            }

            if (this.hasBrackets(expression)) {
                const {start, end} = this.getBrackets(expression)
                const innerExpression = expression.slice(start + 1, end - 1)
                const result = this.calculate(innerExpression)

                expression = expression.replace(`(${innerExpression})`, result.toString())

                continue
            }

            if (operand === "^") {
                first = this.getFirstNumber(expression, position, 1)
                second = this.getSecondNumber(expression, position, 1)

                result = this.calc(operand as Operands, {
                    number:first,
                    pow:second
                } as ParamsCalcType)

                expression = expression.replace(`${first}^${second}`, result.toString())
            } else {
                first = this.getFirstNumber(expression, position + 1, 2)
                second = this.getSecondNumber(expression, position + 1, 2)

                result = this.calc(operand as Operands, {
                    first:first,
                    second:second
                } as ParamsCalcType)

                expression = expression.replace(`${first}${operand}${second}`, result.toString())
            }
        }

        return +expression
    }
}

// @ts-ignore
window.calc = (expression:string) => Calculator.calculate(expression)

export default Calculator