document.addEventListener("DOMContentLoaded", () => {
    const expenseForm = document.getElementById("expense-form")
    const expenseName = document.getElementById("expense-name")
    const expenseAmount = document.getElementById("expense-amount")
    const submitButton = document.querySelector("#submit")
    const expenseList = document.getElementById("expense-list")
    const total = document.getElementById("total")
    const totalAmount = document.getElementById("total-amount")
    
    let expense = JSON.parse(localStorage.getItem("Expense"))||[];

    expenseForm.addEventListener("submit", (e) => {
        e.preventDefault();
        let name = expenseName.value.trim();
        let amount = parseInt(expenseAmount.value.trim());
        if(name!= "" && !isNaN(amount) && amount>0){
            let newExpense = {
                id: Date.now(),
                name, // this is a new method in which you can define the key value by writing the key only it automatically understand that that key and value both are going to be same
                amount
            }
            expense.push(newExpense);
            saveExpense();
            renderExpense(name, amount)
            expenseAmount.value = ""
            expenseName.value = ""
        }
    })
    
    function renderExpense(name ,amount){
        const li = document.createElement("li");
        li.classList.add("expense-item");
        li.innerHTML = `
            <span>${name} - $${amount}</span>
            <button class="delete-btn">Delete</button>
        `
        
    }

    function saveExpense(){
        localStorage.setItem("Expense", JSON.stringify(expense));
    }
})


