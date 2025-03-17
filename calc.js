const screen = document.querySelector(".screen");
let buffer = "0";
let runningTotal = 0;
let previousOperator;

function buttonClick(value) {
  if (isNaN(parseInt(value))) handleSymbol(value);
  else handleNumber(value);
  rerender();
}

function handleNumber(number) {
  if (buffer === "0") buffer = number;
  else buffer += number;
}

function handleMath(value) {
  if (buffer === "0") return;

  const intBuffer = parseInt(buffer);
  if (runningTotal === 0) runningTotal = intBuffer;
  else runningTotal = flushOperation(intBuffer);

  previousOperator = value; // store operator
  buffer = "0"; // set buffer to 0 between operations
}

function flushOperation(intBuffer) {
  if (previousOperator === "÷") runningTotal /= intBuffer;
  else if (previousOperator === "×") runningTotal *= intBuffer;
  else if (previousOperator === "+") runningTotal += intBuffer;
  else if (previousOperator === "-") runningTotal -= intBuffer;
}

function handleSymbol(symbol) {
  switch (symbol) {
    case "C":
      buffer = "0";
      break;
    case "←":
      buffer = buffer.substring(0, buffer.length - 1);
      break;
    case "÷":
      handleMath(symbol);
      break;
    case "×":
      handleMath(symbol);
      break;
    case "-":
      handleMath(symbol);
      break;
    case "+":
      handleMath(symbol);
      break;
    case "=":
      if (previousOperator === null) return;
      flushOperation(parseInt(buffer));
      previousOperator = null;
      buffer = runningTotal.toString();
      runningTotal = 0;
      break;

    default:
      break;
  }
}

function rerender() {
  screen.innerText = buffer;
}

function init() {
  document
    .querySelector(".calculator-buttons")
    .addEventListener("click", (event) => {
      buttonClick(event.target.innerText);
    });
}

init();
