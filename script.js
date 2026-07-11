"use strict";

const billInput = document.getElementById("bill");
const tipSlider = document.getElementById("tip");
const tipDisplay = document.getElementById("tipDisplay");
const customTipInput = document.getElementById("customTip");
const peopleInput = document.getElementById("people");
const tipAmountDisplay = document.getElementById("tipAmount");
const totalBillDisplay = document.getElementById("totalBill");
const perPersonDisplay = document.getElementById("perPerson");
const resetBtn = document.getElementById("resetBtn");

let currentTipPercentage = 15;

const formatCurrency = (amount) => {
  if (!isFinite(amount) || isNaN(amount)) {
    return "0.00 Birr";
  }
  return amount.toFixed(2) + " Birr";
};

const calculateTip = () => {
  const billValue = parseFloat(billInput.value);
  const peopleValue = parseInt(peopleInput.value, 10);

  const customTipValue = parseFloat(customTipInput.value);
  let tipPercentage = currentTipPercentage;

  if (!isNaN(customTipValue) && customTipValue >= 0) {
    tipPercentage = customTipValue;
    tipSlider.value = Math.min(Math.max(customTipValue, 0), 30);
    tipDisplay.textContent = customTipValue + "%";
  } else {
    tipDisplay.textContent = currentTipPercentage + "%";
  }

  const isValidBill = !isNaN(billValue) && billValue >= 0;
  const isValidPeople = !isNaN(peopleValue) && peopleValue >= 1;

  if (!isValidBill || !isValidPeople) {
    tipAmountDisplay.textContent = "0.00 Birr";
    totalBillDisplay.textContent = "0.00 Birr";
    perPersonDisplay.textContent = "0.00 Birr";

    document.getElementById("restaurantShare").textContent = "0.00 Birr";
    document.getElementById("staffShare").textContent = "0.00 Birr";
    document.getElementById("totalShare").textContent = "0.00 Birr";
    return;
  }

  const tipAmount = (billValue * tipPercentage) / 100;
  const totalBill = billValue + tipAmount;
  const perPerson = totalBill / peopleValue;

  tipAmountDisplay.textContent = formatCurrency(tipAmount);
  totalBillDisplay.textContent = formatCurrency(totalBill);
  perPersonDisplay.textContent = formatCurrency(perPerson);

  const restaurantShare = billValue;
  const staffShare = tipAmount;
  const totalShare = totalBill;

  document.getElementById("restaurantShare").textContent =
    formatCurrency(restaurantShare);
  document.getElementById("staffShare").textContent =
    formatCurrency(staffShare);
  document.getElementById("totalShare").textContent =
    formatCurrency(totalShare);
};

const handleInputChange = () => {
  calculateTip();
};

const handleSliderChange = () => {
  const sliderValue = parseFloat(tipSlider.value);
  const customTipValue = parseFloat(customTipInput.value);

  if (isNaN(customTipValue) || customTipValue === 0) {
    currentTipPercentage = sliderValue;
    tipDisplay.textContent = sliderValue + "%";
    calculateTip();
  }
};

const resetAll = () => {
  billInput.value = "";
  tipSlider.value = 15;
  currentTipPercentage = 15;
  tipDisplay.textContent = "15%";
  customTipInput.value = "";
  peopleInput.value = 1;
  calculateTip();
  billInput.focus();
};

billInput.addEventListener("input", handleInputChange);

tipSlider.addEventListener("input", handleSliderChange);

customTipInput.addEventListener("input", () => {
  const customValue = parseFloat(customTipInput.value);
  if (!isNaN(customValue) && customValue >= 0) {
    tipDisplay.textContent = customValue + "%";
    calculateTip();
  } else if (customTipInput.value === "") {
    tipDisplay.textContent = currentTipPercentage + "%";
    tipSlider.value = currentTipPercentage;
    calculateTip();
  }
});

peopleInput.addEventListener("input", handleInputChange);

document.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    calculateTip();
  }
});

resetBtn.addEventListener("click", resetAll);

document.querySelectorAll(".tip-preset").forEach((button) => {
  button.addEventListener("click", (e) => {
    const tipValue = parseFloat(e.target.dataset.tip);

    tipSlider.value = Math.min(Math.max(tipValue, 0), 30);
    currentTipPercentage = tipValue;

    tipDisplay.textContent = tipValue + "%";

    customTipInput.value = "";

    calculateTip();

    document.querySelectorAll(".tip-preset").forEach((btn) => {
      btn.classList.remove("ring-2", "ring-indigo-500", "bg-indigo-200");
    });
    e.target.classList.add("ring-2", "ring-indigo-500", "bg-indigo-200");
  });
});

billInput.addEventListener("blur", () => {
  const value = parseFloat(billInput.value);
  if (!isNaN(value) && value < 0) {
    billInput.value = 0;
    calculateTip();
  }
});

peopleInput.addEventListener("blur", () => {
  const value = parseInt(peopleInput.value, 10);
  if (!isNaN(value) && value < 1) {
    peopleInput.value = 1;
    calculateTip();
  }
});

calculateTip();

console.log("✅ Tip Calculator (Birr) loaded successfully!");
