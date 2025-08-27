document.addEventListener("DOMContentLoaded", () => {
    const todoInput = document.getElementById("todo-input")
    const addTaskButton = document.getElementById("add-task-btn")
    const todoList = document.getElementById("todo-list")

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    tasks.forEach((tasks) => renderTask(tasks));

    addTaskButton.addEventListener("click", () => {
        const taskText = todoInput.value.trim(); //on the input if the user put extra spaces in input the trim will remove it  

        if (taskText === "") return alert("Enter a task!"); // if the task is empty it will return the program and stop the execution of event listener

        const task = {
            "id": Date.now(),
            "text": taskText,
            "completed": false
        }

        tasks.push(task); // push the task object to tasks array every time i click on add task button it will create a new element inside an array [{},{}] like this

        renderTask(task);
        saveTask();
        todoInput.value = "" // clear the value of input to nill

    })

    function renderTask(task) {
        const li = document.createElement("li")
        li.setAttribute("date-id", task.id)
        li.innerHTML = `${task.text}
            <button class="delete-btn">
                Delete
            </button>`


        li.querySelector("button").addEventListener("click", (e) => {
            e.stopPropagation();
            tasks = tasks.filter(t => t.id !== task.id)
            li.remove();
            saveTask();
        })
        saveTask();
        todoList.appendChild(li)
    }

    function saveTask() {
        localStorage.setItem("tasks", JSON.stringify(tasks))
    }
})