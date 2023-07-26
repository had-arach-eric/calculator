/*
Una operación de calculadora constará de un número, un operador y otro número. Por ejemplo, 3 + 5. Crea tres variables para cada una de las partes de una operación de calculadora. Crea una variable para el primer número, el operador y el segundo número. Usarás estas variables para actualizar tu pantalla más tarde.

Crea una nueva función operar que tome un operador y 2 números y luego llame a una de las funciones anteriores sobre los números.

Crea una calculadora HTML básica con botones para cada dígito, cada una de las funciones anteriores y una tecla "Equals".

Añade un botón "clear".

Debes redondear las respuestas con decimales largos para que no desborden la pantalla.

Pulsar = antes de introducir todos los números o un operador puede causar problemas.

Pulsar "clear" debería borrar cualquier dato existente... asegúrese de que el usuario realmente empieza de cero después de pulsar "clear".

Muestra un mensaje de error si el usuario intenta dividir por 0... ¡y no dejes que se bloquee la calculadora!

Mérito extra
Los usuarios pueden obtener números de coma flotante si hacen los cálculos necesarios para obtenerlos, pero todavía no pueden escribirlos. Añade un botón . y deja que los usuarios introduzcan decimales. Asegúrate de que no pueden escribir más de uno: 12.3.56.5. Es difícil hacer cuentas con estos números. (desactiva el botón de decimales si ya hay uno en la pantalla)
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
    lastKey = "number";
    console.log(num1);
  }
  else {
    num2 += e.target.textContent;
    lastKey = "number";
    console.log(num2);
  }
}

function handlePressOperator(e) {
  if (num1 === "") {
    return;
  }
  
  if (num2 === "") {
    editFirstNumber = false;
    operator = e.target.textContent;
    lastKey = "operator";
  }
  console.log(operator);
}

function handlePressEqual() {
  if (num1 === "" || num2 === "") {
    return;
  }

  num1 = operate(operator, num1, num2);
  console.log(num1);
  num2 = "";
  lastKey = "equal";
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



  


  
}



startCalculator();