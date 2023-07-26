/*
Debes redondear las respuestas con decimales largos para que no desborden la pantalla.

Añade un botón . y deja que los usuarios introduzcan decimales. Asegúrate de que no pueden escribir más de uno: 12.3.56.5. Es difícil hacer cuentas con estos números. (desactiva el botón de decimales si ya hay uno en la pantalla)

Añade soporte para teclado. Podrías encontrarte con un problema en el que teclas como (/) podrían causarte algún problema. Lee la documentación MDN para event.preventDefault para ayudar a resolver este problema.
*/

//DOM references
const displayUI = document.querySelector(".display");
const cleanerAllUI = document.querySelector(".cleaner-all");
const clearLastDigitUI = document.querySelector(".cleaner-last-digit");
const numbersUI = document.querySelectorAll(".number");
const operatorsUI = document.querySelectorAll(".operator");
const decimalUI = document.querySelector(".decimal");
const equalUI = document.querySelector(".equal");

let num1 = "";
let num2 = "";
let operator = "";
let editFirstNumber = true;
let lastKey = ";"
let decimalPressed = false;




function add(num1, num2) {
  return num1 + num2;
}

function subtract(num1, num2) {
  return num1 - num2;
}

function multiply(num1, num2) {
  return num1 * num2;
}

function divide(num1, num2) {
  return num1 / num2;
}

function operate(operator, num1, num2) {
  let result = 0;
  if (operator === "+") {
    result = (add(+num1, +num2)).toString();
  }
  else if (operator === "-") {
    result = (subtract(+num1, +num2)).toString();
  }
  else if (operator === "x") {
    result = (multiply(+num1, +num2)).toString();
  }
  else if (operator === "/") {
    result = (divide(+num1, +num2)).toString();
  }

  return result;
}

function handlePressNumber(e) {
  if (lastKey === "equal") {
    return;
  }

  if (editFirstNumber === true) {
    num1 += e.target.textContent;
    console.log(num1);
  }
  else {
    num2 += e.target.textContent;
    console.log(num2);
  }
  lastKey = "number";
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
  operator = e.target.textContent;
  lastKey = "operator";
  decimalPressed = false;
  console.log(operator);
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
  console.log(num1);
}

function handleClearAll() {
  num1 = "";
  num2 = "";
  operator = "";
  editFirstNumber = true;
  lastKey = "clear all";
  decimalPressed = false;
}

function handleClearLastDigit() {
  if (lastKey !== "number" || lastKey !== "decimal") {
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
    console.log(num1);
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
    console.log(num2);  
  }
}

function handlePressDecimal() {
  if (decimalPressed === true || lastKey !== "number") {
    return;
  }
  if (editFirstNumber === true) {
    num1 += ".";
  }
  else {
    num2 += ".";
  }
  decimalPressed = true;
}






function startCalculator() {
  
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
  
}



startCalculator();