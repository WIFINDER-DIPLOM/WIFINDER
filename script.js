import {
  findOperatorBySuffix,
  allOperator,
} from "./utils/scriptExportCVS.js";

// lable

const lableOperator = document.getElementById("h2-operator");
const lableOperatorId = document.getElementById("h3-operator");

// input
const inp = document.getElementById("inp-1");

// button
const btn1 = document.getElementById("btn-1");
const btn2 = document.querySelector("#btn-2");
const btn3 = document.querySelector(".btn-search");

// div
const divContainerOperator = document.querySelector(".container-operator");
const divHelp = document.querySelector(".container-info-how-search");
const divContainerOperatorH = document.querySelector(".container-operator-h");

const a1 = document.createElement("a");
a1.target = "_blank";

var countFailClick = 0;
var flag = true;

inp.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    inp["focus"] = false;
    event.preventDefault();
    btn1.click();
  }
});

btn1.addEventListener("click", () => {
  const fullOperatorId = inp.value;
  var operatorId = "";

  if (fullOperatorId.length >= 3) {
    operatorId = fullOperatorId.slice(1, 3).toLowerCase();
  } else {
    operatorId = fullOperatorId.toLowerCase();
  }
  const foundOperator = findOperatorBySuffix(operatorId);
  if (foundOperator) {
    inp.value = "";
    divContainerOperator.className = "container-operator-show";

    lableOperator.textContent = "Оператор: «" + foundOperator.name + "»";
    lableOperatorId.textContent =
      "Введеный идентификатор: «" + fullOperatorId + "»";

    if (foundOperator.website) {
      a1.className = "web-site-operator";
      a1.href = foundOperator.website;
      a1.textContent = "Ссылка на сайт оператора";
      divContainerOperatorH.appendChild(a1);
    }
  } else {
    inp.value = "";
    divContainerOperator.className = "container-operator-show";
    lableOperatorId.textContent = "";
    countFailClick += 1;
    lableOperator.textContent = "Введите корректный идентификатор!";

    if (countFailClick >= 3) {
      divHelp.className = "container-info-how-search-show";
      flag = false;
      countFailClick = 0;
    }
  }
});

btn2.addEventListener("click", () => {
  divContainerOperator.className = "container-operator";
});

const searchOperators = (operatorId, fullOperatorId) => {
  const key = operatorId.toLowerCase();
  const operator = dataOperators.get(key);

  if (operator) {
    inp.value = "";
    divContainerOperator.className = "container-operator-show";

    lableOperator.textContent = "Оператор: " + operator.name;
    lableOperatorId.textContent = "Введеный идентификатор: " + fullOperatorId;

    if (operator.website) {
      a1.className = "web-site-operator";
      a1.href = operator.website;
      a1.textContent = operator.website;
      divContainerOperatorH.appendChild(a1);
    }
  } else {
    inp.value = "";
    divContainerOperator.className = "container-operator-show";
    lableOperatorId.textContent = "";
    countFailClick += 1;
    lableOperator.textContent = "Введите корректный идентификатор!";

    if (countFailClick >= 3) {
      divHelp.className = "container-info-how-search-show";
      flag = false;
      countFailClick = 0;
    }
  }
};

btn3.addEventListener("click", () => {
  inp.blur();
  if (flag) {
    divHelp.className = "container-info-how-search-show";
    flag = false;
  } else if (!flag) {
    divHelp.className = "container-info-how-search";
    flag = true;
  }
});
