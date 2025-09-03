document.addEventListener("DOMContentLoaded", () => {
    const expenseForm = document.getElementById("expense-form")
    const expenseName = document.getElementById("expense-name")
    const expenseAmount = document.getElementById("expense-amount")
    const expenseList = document.getElementById("expense-list")
    const totalAmount = document.getElementById("total-amount")

    let expense = JSON.parse(localStorage.getItem("Expense")) || [];
    let totalExpense = calculateTotal();
    updateTotal();
    renderExpense();

    expenseForm.addEventListener("submit", (e) => {
        e.preventDefault();
        let name = expenseName.value.trim();
        let amount = parseFloat(expenseAmount.value.trim());
        if (name != "" && !isNaN(amount) && amount > 0.00) {
            let newExpense = {
                id: Date.now(),
                name, // this is a new method in which you can define the key value by writing the key only it automatically understand that that key and value both are going to be same
                amount
            }
            expense.push(newExpense);
            saveExpense();
            updateTotal()
            renderExpense()
            expenseAmount.value = ""
            expenseName.value = ""
        }
    })

    function renderExpense() {
        expenseList.innerHTML = ""
        expense.forEach((expenses, index) => {
            const li = document.createElement("li");
            li.classList.add("expense-item");
            li.innerHTML = `
                <span>${expenses.name} - $${expenses.amount}</span>
                <button data-id="${expenses.id}" class="delete-btn">Delete</button>
            `
            expenseList.appendChild(li)

            li.querySelector("button").addEventListener("click", (e) => {
                e.stopPropagation()
                expense = expense.filter(exp => exp.id !== expenses.id)
                li.remove()

                updateTotal()
                saveExpense()

            })
        })
    }
    function calculateTotal() {
        return expense.reduce((sum, expense) => (sum + expense.amount), 0)
    }
    function updateTotal() {
        totalExpense = calculateTotal()
        totalAmount.textContent = totalExpense.toFixed(2);
    }


    function saveExpense() {
        localStorage.setItem("Expense", JSON.stringify(expense));
    }
})


