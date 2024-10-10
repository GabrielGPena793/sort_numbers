const form = document.querySelector("form");
const numbersQuantity = document.querySelector("#numbers");
const from = document.querySelector("#from");
const until = document.querySelector("#until");
const notRepeatNumber = document.querySelector("#repeatNumber");

const formSection = document.querySelector("#right");
const resultSection = document.querySelector("#result");

const results = document.querySelector("#results");
const buttonSortAgain = document.querySelector("#sortAgain");

form.onsubmit = function (e) {
  e.preventDefault();

  if (from.value > until.value) {
    alert("O fim tem que ser maior que o início");
    return;
  }

  if (numbersQuantity.value <= 0) {
    alert("A quantidade de números não pode ser menor ou igual a 0");
    return;
  }

  try {
    const numbers = generateNumbers();
    result(numbers);

    console.log(numbers);
  } catch (error) {
    alert("Erro ao gerar números");
    console.log(error);
  }
};

buttonSortAgain.onclick = function () {
  results.innerHTML = "";
  formSection.classList.toggle("hidden");
  resultSection.classList.toggle("hidden");
};

function generateNumbers() {
  const numbers = [];
  console.log(notRepeatNumber.checked);

  for (let i = 0; i < numbersQuantity.value; i++) {
    let min = Math.ceil(from.value);
    let max = Math.floor(until.value);
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;

    if (notRepeatNumber.checked && numbers.includes(randomNumber)) {
      i--;
      continue;
    }

    numbers.push(randomNumber);
  }

  return numbers;
}

function result(numbers) {
  formSection.classList.toggle("hidden");
  resultSection.classList.toggle("hidden");

  for (let i = 0; i < numbers.length; i++) {
    const resultContainer = document.createElement("div");
    resultContainer.classList.add("result-container");

    const resultBg = document.createElement("div");
    resultBg.id = "bg-result";

    const resultNumber = document.createElement("span");
    resultNumber.textContent = numbers[i];

    resultContainer.appendChild(resultBg);
    resultContainer.appendChild(resultNumber);

    if (i === 0) {
      results.appendChild(resultContainer);
    } else {
      setTimeout(() => {
        results.appendChild(resultContainer);
      }, i * 3000);
    }
  }
}
