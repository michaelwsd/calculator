let n1 = '';
let n2 = '';
let operator = null;
let reset = false;
let full_clear = false;

const result = document.querySelector(".res");
const numbers_btn = document.querySelectorAll(".num-btn");
const clear_btn = document.querySelector("#clear");
const delete_btn = document.querySelector("#delete");
const operator_btn = document.querySelectorAll(".operator-btn");
const evaluate_btn = document.querySelector(".evaluate-btn");
const decimal_btn = document.querySelector(".decimal-btn");

// add numbers
numbers_btn.forEach((button) => {
    button.addEventListener("click", () => addNumber(button.textContent));
})

function addNumber(number) {
    if (full_clear) clear();
    if (reset) resetScreen();
    if (result.textContent == "0" && number != ".") result.textContent = number;
    else if (result.textContent == "0" && number == ".") result.textContent += number;
    else if (result.textContent != "0") result.textContent += number;
}

// clear screen
clear_btn.addEventListener("click", () => clear());

function clear() {
    result.textContent = "0";
    n1 = '';
    n2 = '';
    operator = null;
    full_clear = false;
}

// delete stuff
delete_btn.addEventListener("click", () => deleteButton());

function deleteButton() {
    if (result.textContent.length == 1) result.textContent = "0";
    else result.textContent = result.textContent.slice(0, -1);
}

// opeartor button 
operator_btn.forEach((button) => {
    button.addEventListener("click", () => addOperator(button.textContent));
})

function addOperator(op) {
    currNum = result.textContent;

    if (n1 == "" && operator == null) {
        n1 = result.textContent;
    } else if (operator != null) { // for cases like 4x4x4
        n1 = operate(n1, operator, currNum);
    }

    operator = op;
    result.textContent = op;
    full_clear = false;
    reset = true;
}

// evaluate
evaluate_btn.addEventListener("click", () => {
    n2 = result.textContent;
    res = roundResult(operate(n1, operator, n2));
    result.textContent = res;
    
    // allows further calculation
    n1 = res;
    operator = null;
    full_clear = true;
})

function roundResult(number) {
    return Math.round(number * 1000) / 1000
}

function resetScreen() {
    result.textContent = '0';
    reset = false;
}

function roundResult(number) {
    return Math.round(number * 1000) / 1000
}

const add = (a, b) => {
    return a + b;
}

const subtract = (a, b) => {
    return a - b;
}

const multiply = (a, b) => {
    return a * b;
}

const divide = (a, b) => {
    return a / b;
}

function operate(num1, operator, num2) {
    a = Number(num1);
    b = Number(num2);
    switch (operator) {
        case "+":
            return add(a, b);
        case "-":
            return subtract(a, b);
        case "x":
            return multiply(a, b);
        case "/":
            if (b === 0) return "NaN";
            else return divide(a, b);
        default: 
            return "NaN";
    }
}
