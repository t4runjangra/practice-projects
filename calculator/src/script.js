let display = document.getElementById("display");
let buttons = document.querySelectorAll("button");
let currentInput = "";

buttons.forEach(btn=>{
    btn.addEventListener("click",()=>{
        let value = btn.dataset.value
        if(value = "clear"){
            currentInput =""
            display.innerText = "0"
            console.log("hello");
            
        }
        else if (value = "delete") {
            display.innerText = currentInput.slice(0,-1)
        }
        else if (value = "+") {
            currentInput +=value
            display.innerHTML = currentInput
        }
    })
})