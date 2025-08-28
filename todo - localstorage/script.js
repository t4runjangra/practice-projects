document.addEventListener("DOMContentLoaded", () => {
    const todoInput = document.getElementById("todo-input")
    const addTaskButton = document.getElementById("add-task-btn")
    const todoList = document.getElementById("todo-list")
    const darkModebtn = document.getElementById("dark-mode")
    const bodyElement = document.getElementById("body")
    const navbarContainer = document.getElementById("navbar")
    const githubLogo = document.getElementById("githubLogo")
    const todoContainer = document.querySelector(".container")
    const listItems = document.getElementsByClassName("listitems")
    const blackBackground = "#1a1a1a"
    let isLightMode = false;

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach((tasks) => renderTask(tasks));

    darkModebtn.addEventListener("click", () => {
        isLightMode = !isLightMode;

        if (isLightMode) {
            bodyElement.classList.add("light-mode");
            bodyElement.style.background = "#fff";
            navbarContainer.style.background = "#fff";
            navbarContainer.style.color = blackBackground;
            navbarContainer.style.boxShadow = "0 10px 10px #1a1a1a";
            todoContainer.style.boxShadow = "0 10px 30px #1a1a1a";
            todoContainer.style.color = blackBackground;
            todoContainer.style.background = "#fff";
            todoInput.style.background = "#1a1a1a3e";
            githubLogo.style.color = blackBackground;

            const listItems = document.getElementsByClassName("listitems");
            for (let i = 0; i < listItems.length; i++) {
                listItems[i].style.background = "#1a1a1a3e";
                listItems[i].style.color = blackBackground;
            }

            darkModebtn.textContent = "☀️";
        } else {
            bodyElement.classList.remove("light-mode");
            bodyElement.style.background = "#121212";
            navbarContainer.style.background = "#1e1e1e";
            navbarContainer.style.color = "#fff";
            navbarContainer.style.boxShadow = "none";
            todoContainer.style.boxShadow = "0 0 15px rgba(0, 0, 0, 0.6)";
            todoContainer.style.color = "#fff";
            todoContainer.style.background = "#1e1e1e";
            todoInput.style.background = "#2a2a2a";
            githubLogo.style.color = "#fff";

            const listItems = document.getElementsByClassName("listitems");
            for (let i = 0; i < listItems.length; i++) {
                listItems[i].style.background = "#2a2a2a";
                listItems[i].style.color = "#fff";
            }

            darkModebtn.textContent = "🌙";
        }
    });



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
        li.classList.add("listitems")
        li.setAttribute("date-id", task.id)
        if (isLightMode) {
            li.style.background = "#1a1a1a3e";
            li.style.color = blackBackground;
        } else {
            li.style.background = "#2a2a2a";
            li.style.color = "#fff";
        }
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