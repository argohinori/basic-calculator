const displayHistory = document.querySelector(".display-history");
const display = document.querySelector(".display-input");
const tempResult = document.querySelector(".display-temp");
const numbers = document.querySelectorAll(".btn-number");
const operations = document.querySelectorAll(".btn-operation");
const equal = document.querySelector(".btn-equal");
const clearAll = document.querySelector(".btn-clr-all");
const clearLast = document.querySelector(".btn-last-entity-clr");

let prevNum = "";
let mainNum = "";
let result = null;
let lastOperation = "";
let haveDot = false;

// Registry numbers when pressed
numbers.forEach((number) => {
  number.addEventListener("click", (e) => {
    if (e.target.innerText === "." && !haveDot) {
      console.log(e.target.innerText);
      haveDot = true;
    } else if (e.target.innerText === "." && haveDot) {
      return;
    } else if (e.target.innerText === "0" && !haveDot && !mainNum) {
      return;
      // } else if (tempResult.innerText == "") {
      //   clearFunc();
    }
    mainNum += e.target.innerText;
    display.innerText = mainNum;
  });
});

operations.forEach((operation) => {
  operation.addEventListener("click", (e) => {
    if (!mainNum) return;
    haveDot = false;
    const operationName = e.target.innerText;
    if (mainNum && prevNum && lastOperation) {
      mathOperation();
    } else {
      result = parseFloat(mainNum);
    }
    clearVar(operationName);
    lastOperation = operationName;
  });
});

const clearVar = (name = "") => {
  prevNum += `${mainNum} ${name} `;
  // prevNum += mainNum + " " + name + " ";
  displayHistory.innerText = prevNum;
  display.innerText = "";
  mainNum = "";
  tempResult.innerText = result;
};

const mathOperation = () => {
  if (lastOperation === "X") {
    result = parseFloat(result) * parseFloat(mainNum);
  } else if (lastOperation === "+") {
    result = parseFloat(result) + parseFloat(mainNum);
  } else if (lastOperation === "-") {
    result = parseFloat(result) - parseFloat(mainNum);
  } else if (lastOperation === "/") {
    result = parseFloat(result) / parseFloat(mainNum);
  } else if (lastOperation === "%") {
    result = parseFloat(result) % parseFloat(mainNum);
  }
};

equal.addEventListener("click", () => {
  if (!prevNum || !mainNum) return; //kondisi utk cegah penimpaan ketika klik "=" lebih dari 1
  mathOperation();
  clearVar();
  display.innerText = result;
  tempResult.innerText = "";
  haveDot = false;
  mainNum = result;
  prevNum = "";
});

clearAll.addEventListener("click", () => {
  prevNum = "";
  displayHistory.innerText = "";
  mainNum = "";
  display.innerText = "";
  result = "";
  tempResult.innerText = "";
  haveDot = false;
  lastOperation = "";
});

clearLast.addEventListener("click", () => {
  display.innerText = "";
  mainNum = "";
});

window.addEventListener("keydown", (e) => {
  // console.log(e.key);
  if (
    e.key === "0" ||
    e.key === "1" ||
    e.key === "2" ||
    e.key === "3" ||
    e.key === "4" ||
    e.key === "5" ||
    e.key === "6" ||
    e.key === "7" ||
    e.key === "8" ||
    e.key === "9"
  ) {
    clickButton(e.key);
  } else if (e.key === "+" || e.key === "-" || e.key === "/" || e.key === "%") {
    clickOperation(e.key);
  } else if (e.key === "*") {
    clickOperation("X");
  } else if (e.key === "Enter" || e.key === "=") {
    clickEqual();
  } else if (e.key === "Backspace") {
    clickClear();
  }
});

const clickButton = (key) => {
  numbers.forEach((number) => {
    if (number.innerText === key) {
      number.click();
    }
  });
};
const clickOperation = (key) => {
  operations.forEach((operation) => {
    if (operation.innerText === key) {
      operation.click();
    }
  });
};

const clickEqual = () => {
  equal.click();
};

const clickClear = () => {
  clearAll.click();
};
