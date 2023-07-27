//-----DOM references-----
const displayUI = document.querySelector(".display");
const cleanerAllUI = document.querySelector(".cleaner-all");
const clearLastDigitUI = document.querySelector(".cleaner-last-digit");
const numbersUI = document.querySelectorAll(".number");
const operatorsUI = document.querySelectorAll(".operator");
const decimalUI = document.querySelector(".decimal");
const equalUI = document.querySelector(".equal");


//-----Global variables-----
let num1 = "";
let num2 = "";
let operator = "";
let decimalPressed = false;
let lastKey = ";"
let editFirstNumber = true;


//-----Functions-----
function roundToThreeDecimals(num) {
  return (Math.round(num * 1000)) / 1000;
}

function add(num1, num2) {
  return roundToThreeDecimals(num1 + num2);
}

function subtract(num1, num2) {
  return roundToThreeDecimals(num1 - num2);
}

function multiply(num1, num2) {
  return roundToThreeDecimals(num1 * num2);
}

function divide(num1, num2) {
  return roundToThreeDecimals(num1 / num2);
}

function operate(operator, num1, num2) {
  let result = 0;
  if (operator === "+") {
    result = (add(+num1, +num2)).toString();
  }
  else if (operator === "-") {
    result = (subtract(+num1, +num2)).toString();
  }
  else if (operator === "*") {
    result = (multiply(+num1, +num2)).toString();
  }
  else if (operator === "/") {
    result = (divide(+num1, +num2)).toString();
  }

  return result;
}

function displayNum(num) {
  if (num === "") {
    displayUI.textContent = "0";
  }
  else {
    displayUI.textContent = num;
  }
}

function handlePressNumber(e) {
  if (lastKey === "equal") {
    return;
  }

  if (editFirstNumber === true) {
    num1 += e.target.value;
    displayNum(num1);
  }
  else {
    num2 += e.target.value;
    displayNum(num2);
  }
  lastKey = "number";
}

function handlePressEqual() {
  if (operator === "" || lastKey !== "number") {
    return;
  }
  if (operator === "/" && num2 === "0") {
    return;
  }

  num1 = operate(operator, num1, num2);
  num2 = "";
  lastKey = "equal";
  decimalPressed = false;
  displayUI.textContent = num1;
}

function handlePressOperator(e) {
  if (num1 === "") {
    return;
  }
  
  if (num2 === "") {
    editFirstNumber = false;
  }
  else {
    handlePressEqual();
  }
  operator = e.target.value;
  lastKey = "operator";
  decimalPressed = false;
}

function handleClearAll() {
  num1 = "";
  num2 = "";
  operator = "";
  editFirstNumber = true;
  lastKey = "clear all";
  decimalPressed = false;
  displayUI.textContent = "0";
}

function handleClearLastDigit() {
  if (lastKey !== "number" && lastKey !== "decimal") {
    return;
  }

  if (editFirstNumber === true) {
    if (num1.length === 1) {
      num1 = "";
    }
    else {
      let aux = num1.split("");
      num1 = "";
      for (let i = 0; i < aux.length-1; i++) {
        num1 += aux[i];
      }
    }
    displayNum(num1);
  }
  else {
    if (num2.length === 1) {
      num2 = "";
    }
    else {
      let aux = num2.split("");
      num2 = "";
      for (let i = 0; i < aux.length-1; i++) {
        num2 += aux[i];
      }
    }
    displayNum(num2);
  }
}

function handlePressDecimal() {
  if (decimalPressed === true || lastKey !== "number") {
    return;
  }
  if (editFirstNumber === true) {
    num1 += ".";
    displayNum(num1);
  }
  else {
    num2 += ".";
    displayNum(num2);
  }
  decimalPressed = true;
  
}

function main() {
  displayUI.textContent = "0";

  for (let i = 0; i < numbersUI.length; i++) {
    numbersUI[i].addEventListener("click", handlePressNumber);
  }

  for (let i = 0; i < operatorsUI.length; i++) {
    operatorsUI[i].addEventListener("click", handlePressOperator);
  }

  equalUI.addEventListener("click", handlePressEqual);
  cleanerAllUI.addEventListener("click", handleClearAll);
  clearLastDigitUI.addEventListener("click", handleClearLastDigit);
  decimalUI.addEventListener("click", handlePressDecimal);

  // Keyboard events
  const keyClearAll = "Escape";
  const keyClearLast = "Backspace";
  const keyNumbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
  const keyOperators = ["+", "-", "*", "/"];
  const keyDecimal = ".";
  const keyEqual = "Enter";
  
  document.addEventListener("keydown", e => {
    e.target.value = e.key;
    if (e.key === "Escape") {
      handleClearAll();
    }
    else if (e.key === "Backspace") {
      handleClearLastDigit();
    }
    else if (keyNumbers.includes(e.key)) {
      handlePressNumber(e);
    } 
    else if (keyOperators.includes(e.key)) {
      handlePressOperator(e);
    }
    else if (e.key === ".") {
      handlePressDecimal();
    }
    else if (e.key === "Enter") {
      handlePressEqual();
    }  
  });
}



main();