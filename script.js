    document.addEventListener("DOMContentLoaded", function() {
    const userInput = document.getElementById("user-input");
    const keys = document.querySelector(".calc-keys");
    let currentInput = "0";
    let firstValue = null;
    let operator = null;
    let awaitingNextValue = false;

    keys.addEventListener("click", function(event) {
        const { target } = event;
        if (!target.matches("button")) return;
        const value = target.textContent;

        if (value === "AC") {
            clearAll();
        } else if (value === "DEL") {
            deleteLast();
        } else if (value === "%") {
            inputPercent();
        } else if (value === "=") {
            if (operator && firstValue !== null) calculate();
        } else if (["+","-","*","/"].includes(value)) {
            handleOperator(value);
        } else {
            inputDigit(value);
        }
        updateDisplay();
    });

    function clearAll() {
        currentInput = "0";
        firstValue = null;
        operator = null;
        awaitingNextValue = false;
    }

    function deleteLast() {
        currentInput = currentInput.length > 1 ? currentInput.slice(0, -1) : "0";
    }

    function inputPercent() {
        currentInput = String(parseFloat(currentInput) / 100);
    }

    function inputDigit(digit) {
        currentInput = awaitingNextValue ? digit : currentInput === "0" ? digit : currentInput + digit;
        awaitingNextValue = false;
    }

    function handleOperator(nextOperator) {
        if (firstValue === null) {
            firstValue = parseFloat(currentInput);
        } else if (operator && !awaitingNextValue) {
            firstValue = performCalculation(firstValue, parseFloat(currentInput), operator);
        }
        awaitingNextValue = true;
        operator = nextOperator;
        currentInput = `${firstValue} ${operator} `;
    }

    function performCalculation(first, second, operator) {
        switch (operator) {
            case "+": return first + second;
            case "-": return first - second;
            case "*": return first * second;
            case "/": return second !== 0 ? first / second : alert("Cannot divide by zero");
        }
    }

    function calculate() {
        const inputValue = parseFloat(currentInput.split(' ').pop());
        if (!isNaN(inputValue)) {
            currentInput = `${firstValue} ${operator} ${inputValue} = ${parseFloat(performCalculation(firstValue, inputValue, operator).toFixed(7))}`;
            firstValue = null;
            operator = null;
            awaitingNextValue = false;
        }
    }

    function updateDisplay() {
        userInput.textContent = currentInput;
    }
});
