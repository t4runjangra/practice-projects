let display = document.getElementById("display");
let buttons = document.querySelectorAll("button");
let currentInput = "";

buttons.forEach(btn => {
  btn.addEventListener("click", () => {
    let value = btn.dataset.value;

    if (value === "clear") {
      currentInput = "";
      display.innerText = "0";
    } 
    else if (value === "delete") {
      currentInput = currentInput.slice(0, -1);
      display.innerText = currentInput || "0";
    } 
    else if (value === "=") {
      try {
        currentInput = eval(currentInput);
        display.innerText = currentInput;
      } catch {
        display.innerText = "Error";
      }
    } 
    else {
      currentInput += value;
      display.innerText = currentInput;
    }
  });
});
