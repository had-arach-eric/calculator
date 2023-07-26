/*
Debes redondear las respuestas con decimales largos para que no desborden la pantalla.

Añade un botón . y deja que los usuarios introduzcan decimales. Asegúrate de que no pueden escribir más de uno: 12.3.56.5. Es difícil hacer cuentas con estos números. (desactiva el botón de decimales si ya hay uno en la pantalla)

Añade soporte para teclado. Podrías encontrarte con un problema en el que teclas como (/) podrían causarte algún problema. Lee la documentación MDN para event.preventDefault para ayudar a resolver este problema.
*/

//DOM references
const nodes = {
  displayUI: document.querySelector(".display"),
  cleanerAllUI: document.querySelector(".cleaner-all"),
  clearLastDigitUI: document.querySelector(".cleaner-last-digit"),
  numbersUI: document.querySelectorAll(".number"),
  operatorsUI: document.querySelectorAll(".operator"),
  decimalUI: document.querySelector(".decimal"),
  equalUI: document.querySelector(".equal"),
}

const global = {
  num1: "",
  num2: "",
  operator: "",
  editFirstNumber: true,
  lastKey: ";",
  decimalPressed: false,
}

function add(num1, num2) {
  return roundToThreeDecimals(global.num1 + global.num2);
}

function subtract(num1, num2) {
  return roundToThreeDecimals(global.num1 - global.num2);
}

function multiply(num1, num2) {
  return roundToThreeDecimals(global.num1 * global.num2);
}

function divide(num1, num2) {
  return roundToThreeDecimals(global.num1 / global.num2);
}

function roundToThreeDecimals(num) {
  return (Math.round(num * 1000)) / 1000;
}

function operate(operator, num1, num2) {
  let result = 0;
  if (global.operator === "+") {
    result = (add(+global.num1, +global.num2)).toString();
  }
  else if (global.operator === "-") {
    result = (subtract(+global.num1, +global.num2)).toString();
  }
  else if (global.operator === "x") {
    result = (multiply(+global.num1, +global.num2)).toString();
  }
  else if (global.operator === "/") {
    result = (divide(+global.num1, +global.num2)).toString();
  }

  return result;
}

function handlePressNumber(e) {
  if (global.lastKey === "equal") {
    return;
  }

  if (global.editFirstNumber === true) {
    global.num1 += e.target.textContent;
    console.log(global.num1);
  }
  else {
    global.num2 += e.target.textContent;
    console.log(global.num2);
  }
  global.lastKey = "number";
}

function handlePressOperator(e) {
  if (global.num1 === "") {
    return;
  }
  
  if (global.num2 === "") {
    global.editFirstNumber = false;
  }
  else {
    handlePressEqual();
  }
  global.operator = e.target.textContent;
  global.lastKey = "operator";
  global.decimalPressed = false;
  console.log(global.operator);
}

function handlePressEqual() {
  if (global.operator === "" || global.lastKey !== "number") {
    return;
  }
  if (global.operator === "/" && global.num2 === "0") {
    return;
  }

  global.num1 = operate(global.operator, global.num1, global.num2);
  global.num2 = "";
  global.lastKey = "equal";
  global.decimalPressed = false;
  console.log(global.num1);
}

function handleClearAll() {
  global.num1 = "";
  global.num2 = "";
  global.operator = "";
  global.editFirstNumber = true;
  global.lastKey = "clear all";
  global.decimalPressed = false;
}

function handleClearLastDigit() {
  if (global.lastKey !== "number" || global.lastKey !== "decimal") {
    return;
  }

  if (global.editFirstNumber === true) {
    if (global.num1.length === 1) {
      global.num1 = "";
    }
    else {
      let aux = global.num1.split("");
      global.num1 = "";
      for (let i = 0; i < aux.length-1; i++) {
        global.num1 += aux[i];
      }
    }
    console.log(global.num1);
  }
  else {
    if (global.num2.length === 1) {
      global.num2 = "";
    }
    else {
      let aux = global.num2.split("");
      global.num2 = "";
      for (let i = 0; i < aux.length-1; i++) {
        global.num2 += aux[i];
      }
    }
    console.log(global.num2);  
  }
}

function handlePressDecimal() {
  if (global.decimalPressed === true || global.lastKey !== "number") {
    return;
  }
  if (global.editFirstNumber === true) {
    global.num1 += ".";
  }
  else {
    global.num2 += ".";
  }
  global.decimalPressed = true;
}






function startCalculator() {
  
  nodes.displayUI.textContent = "0";

  for (let i = 0; i < nodes.numbersUI.length; i++) {
    nodes.numbersUI[i].addEventListener("click", handlePressNumber);
  }

  for (let i = 0; i < nodes.operatorsUI.length; i++) {
    nodes.operatorsUI[i].addEventListener("click", handlePressOperator);
  }

  nodes.equalUI.addEventListener("click", handlePressEqual);

  nodes.cleanerAllUI.addEventListener("click", handleClearAll);

  nodes.clearLastDigitUI.addEventListener("click", handleClearLastDigit);

  nodes.decimalUI.addEventListener("click", handlePressDecimal);
  
}



startCalculator();