const main = document.querySelector("main");
const root = document.querySelector(":root");
const input = document.getElementById("input");
const resultInput = document.getElementById("result");
const allowedkeys = [
  "(",
  ")",
  "/",
  "*",
  "-",
  "+",
  "9",
  "8",
  "7",
  "6",
  "5",
  "4",
  "3",
  "2",
  "1",
  "0",
  ".",
  "%",
  " ",
];

const cleankey = ["c"];

document.querySelectorAll(".charKey").forEach(function (charKeyBtn) {
  charKeyBtn.addEventListener("click", function () {
    const value = charKeyBtn.dataset.value;
    input.value += value;
  });
});

document.getElementById("clear").addEventListener("click", function () {
  input.value = "";
  copyCleaner();
  resultInput.value = "";
  resultInput.classList.remove("error");
  input.focus();
});

input.addEventListener("keydown", function (ev) {
  ev.preventDefault();
  if (allowedkeys.includes(ev.key)) {
    input.value += ev.key;
    return;
  }

  if (ev.key === "Backspace") {
    input.value = input.value.slice(0, -1);
  }

  if (ev.key === "Enter") {
    calculate();
  }

  if (cleankey.includes(ev.key)) {
    input.value = "";
    input.focus();
    return;
  }
});

document.getElementById("equal").addEventListener("click", calculate);

function calculate() {
  if (main.dataset.theme === "dark") {
    resultInput.value = "Error";
    resultInput.classList.add("error");
    const resul = eval(input.value);
    resultInput.value = resul;
    resultInput.classList.remove("error");
  } else {
    resultInput.value = "Error";
    resultInput.classList.add("error");
    const resul = eval(input.value);
    resultInput.value = resul;
    resultInput.classList.remove("error");
    error.style.setProperty("--error-color", "#ec2a5e");
  }
}

document.getElementById("themeSwitcher").addEventListener("click", function () {
  if (main.dataset.theme === "dark") {
    root.style.setProperty("--bg-color", "#fffff");
    root.style.setProperty("--border-color", "#aaa");
    root.style.setProperty("--font-color", "#ffd35a");
    root.style.setProperty("--primary-color", "#04203d");
    main.dataset.theme = "ligth";
  } else {
    root.style.setProperty("--bg-color", "#04203d");
    root.style.setProperty("--border-color", "#666");
    root.style.setProperty("--font-color", "#ffd35a");
    root.style.setProperty("--primary-color", "#4dff91");
    main.dataset.theme = "dark";
  }
});

const copyButton = document.getElementById("copyToClipboard");

function copyCleaner() {
  if (copyButton.innerText === "Copied!") copyButton.innerText = "Copy";
  copyButton.classList.remove("success");
}
document
  .getElementById("copyToClipboard")
  .addEventListener("click", function (ev) {
    const button = ev.currentTarget;
    if (button.innerText === "Copy") {
      button.innerText = "Copied!";
      button.classList.add("success");
      navigator.clipboard.writeText(resultInput.value);
    } else {
      button.innerText = "Copy";
      button.classList.remove("success");
    }
  });
