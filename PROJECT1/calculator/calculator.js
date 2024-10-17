// Troy Brunette
// SD230 - Web Programming - Project 1 - Calculator
// 10/15/2024


/**
 * Main function for the program
 */
function main() {
    let message =
        "Welcome to the calculator! \
        \nThe prompt will ask for numbers and then operators. \
        \nEnter '=' to calculate the results. ";
    alert(message);
    while (true) {
        startCalculator();
        let userResponse = prompt("any key to continue, 0 to quit");
        if (userResponse === "0") {
            break;
        }
    }
}

/**
 * Calculator function asks the user for numbers and operators
 * and calculates the result
 */
function startCalculator() {
     let expressionStack = [];
     let result = 0;
     let operator = null;
     let num = getNumber();
     expressionStack.push(num);

     while (true) {
         operator = getOperator();
         if (operator === "=") {
             break;
         }
         num = getNumber();
         expressionStack.push(operator);
         expressionStack.push(num);
     }

     result = parseInt(expressionStack[0]);
     for (let i = 1; i < expressionStack.length; i += 2) {
         operator = expressionStack[i];
         num = parseInt(expressionStack[i + 1]);
         if (operator === "+") {
             result += num;
         } else if (operator === "-") {
             result -= num;
         } else if (operator === "*") {
             result *= num;
         } else if (operator === "/") {
             result /= num;
         }
     }
     alert("Result: " + result);

}

/**
 * Get a valid number from the user
 * 
 * The function isNaN() is used to check if the input is a number.
 * Use recursion until a valid number is entered.
 * 
 * @returns {number} num
 */
function getNumber() {
    let num = prompt("Enter a number: ");
    if (isNaN(num) ) {
        alert("Invalid number");
        return getNumber();
    }
    return num;
}

/**
 * Get a valid operator from the user, +, -, *, /, or =
 * Use recursion until a valid operator is entered.
 * 
 * @return {string} operator
 */
function getOperator() {
    let operator = prompt("Enter an operator: ");
    if (operator !== "+" && operator !== "-" && operator !== "*" && operator !== "/" && operator !== "=") {
        alert("Invalid operator");
        return getOperator();
    }
    return operator;
}


// Call the main function to start the calculator program
main();