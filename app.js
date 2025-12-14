const Base_URL =
  "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

const downDrop = document.querySelectorAll(".dropdown select");
let btn = document.querySelector("button");

for (let select of downDrop) {
  for (currcode in countryList) {
    let newOption = document.createElement("option");
    newOption.value = currcode;
    newOption.innerText = currcode;

    if (select.name === "from" && currcode === "USD") {
      newOption.selected = "selected";
    } else if (select.name === "to" && currcode === "PKR") {
      newOption.selected = "selected";
    }

    select.appendChild(newOption);

    select.addEventListener("change", (e) => {
      UpdateFlag(e.target);
    });
  }
}

const UpdateFlag = (element) => {
  let currcode = element.value;
  let countryCode = countryList[currcode];
  let img = element.parentElement.querySelector("img");
  img.src = `https://flagsapi.com/${countryCode}/flat/64.png`;
};

let result = document.querySelector("#result");

let fromCurrency = document.getElementById("from-currency");
let toCurrency = document.getElementById("to-currency");

const getExchangeRate = async () => {
  {
    let amount = document.querySelector(".amount input");
    let validationMsg = document.getElementById("validation");

    let amtval = amount.value;
    if (amtval === "" || amtval === "0") {
      validationMsg.textContent = "Please enter a valid amount";
      setInterval(() => {
        validationMsg.textContent = "";
      }, 3000);
      return;
    }

    result.innerText = "Getting exchange rate...";

    const URL = `${Base_URL}/${fromCurrency.value.toLowerCase()}.json`;
    const response = await fetch(URL);
    let data = await response.json();

    let rate =
      data[fromCurrency.value.toLowerCase()][toCurrency.value.toLowerCase()];
    let finalrate = amtval * rate;

    setTimeout(() => {
      result.innerText = `${amtval} ${fromCurrency.value}  = ${finalrate.toFixed(2)} ${toCurrency.value}`;
    }, 500);
  }
};

let replaceBTN = document.getElementById("replacebtn");

replaceBTN.addEventListener("click", () => {
  let temp = fromCurrency.value;
  fromCurrency.value = toCurrency.value;
  toCurrency.value = temp;

  UpdateFlag(fromCurrency);
  UpdateFlag(toCurrency);
});

btn.addEventListener("click", (e) => {
  e.preventDefault();
  getExchangeRate();
});
