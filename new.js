
const numberButtons = document.querySelectorAll("[data-number]");
const operationButton = document.querySelectorAll("[data-operation]");
const equalButton = document.querySelector("[data-equal]");
const clearButton = document.querySelector("[data-clear]");
const deleteButton = document.querySelector("[data-delete]");
const prevOpTextElement = document.querySelector("[data-prevOp]");
const currentOpTextElement = document.querySelector("[data-currentOp]");


class Calculator {
    constructor(prevOpTextElement, currentOpTextElement){
        this.prevOpTextElement = prevOpTextElement;
        this.currentOpTextElement = currentOpTextElement;
        this.clear();
    }

    clear(){
        this.currentOperand= "";
        this.prevOperand = "";
        this.operation = undefined;

    }

    delete(){
        this.currentOperand = this.currentOperand.toString().slice(0, -1);

    }

    appendNumber(number){
        if (number ==="," && this.currentOperand.includes(",")) return;
        this.currentOperand = this.currentOperand.toString() + number.toString() ;

    }

    chooseOperation(operation){
        if(this.currentOperand==="") return;
        if (this.prevOperand !== ""){
            this.compute();
        }
        this.operation = operation;
        this.prevOperand = this.currentOperand;
        this.currentOperand = "";

    }

    compute(){
        let computation;
        const prev = parseFloat(this.prevOperand);
        const current = parseFloat(this.currentOperand);
        if(isNaN(prev) || isNaN(current)) return;
        switch (this.operation){
            case "+": computation = prev+current;
                break;

            case "-": computation= prev - current;
                break;

            case "/": computation= prev / current;
                break;

            case "*": computation= prev * current;
                break;

            default: return;

        }

        this.currentOperand = computation;
        this.operation = undefined;
        this.prevOperand = "";

    }

    updateDisplay(){
        this.currentOpTextElement.innerText = this.currentOperand;
        if (this.operation != null){
        this.prevOpTextElement.innerText= `${this.prevOperand} ${this.operation}`
        }

    }
}





const calculator = new Calculator(prevOpTextElement, currentOpTextElement)

numberButtons.forEach(button => {
    button.addEventListener("click",() =>{
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    })
})


operationButton.forEach(button => {
    button.addEventListener("click",() =>{
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay;
    })
})

equalButton.addEventListener("click", button =>{
    calculator.compute();
    calculator.updateDisplay();
})

clearButton.addEventListener("click",button =>{
    calculator.clear();
    calculator.updateDisplay();
})

deleteButton.addEventListener("click", button =>{
    calculator.delete();
    calculator.updateDisplay();
})