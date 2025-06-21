let btn = document.querySelector("button");
let ip = document.querySelector("input");
let ul = document.querySelector("ul");
let dateSpan = document.querySelector(".date");
let taskCountSpan = document.querySelector(".task-count");

let savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];

function updateTaskCount() {
    const allTasks = document.querySelectorAll("ul li");
    let activeTasks = 0;
    allTasks.forEach(task => {
        const checkbox = task.querySelector("input[type='checkbox']");
        if (checkbox && !checkbox.checked) {
            activeTasks++;
        }
    });
    taskCountSpan.innerText = `Tasks: ${activeTasks}`;
}


function saveTasksToStorage() {
    localStorage.setItem("tasks", JSON.stringify(savedTasks));
}

function removeTaskFromStorage(taskText) {
    savedTasks = savedTasks.filter(task => task.text !== taskText);
    saveTasksToStorage();
}

function toggleStrike(checkbox, taskText) {
    checkbox.addEventListener("change", function () {
        const li = this.parentElement;
        if (this.checked) {
            li.classList.add("completed");
        } else {
            li.classList.remove("completed");
        }
        savedTasks.forEach(task => {
            if (task.text === taskText) {
                task.completed = this.checked;
            }
        });
        saveTasksToStorage();
        updateTaskCount();
    });
}

function deleteHandler(btn, taskText) {
    btn.addEventListener("click", function () {
        this.parentElement.remove();
        removeTaskFromStorage(taskText);
        updateTaskCount();
    });
}

function addTaskToDOM(taskText, isCompleted = false) {
    let item = document.createElement("li");

    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = isCompleted;
    toggleStrike(checkbox, taskText);

    if (isCompleted) item.classList.add("completed");

    let taskSpan = document.createElement("span");
    taskSpan.innerText = taskText;

    let delBtn = document.createElement("button");
    delBtn.classList.add("delete");
    delBtn.innerHTML = `<i class="fa-solid fa-trash"></i>`;
    deleteHandler(delBtn, taskText);

    item.appendChild(checkbox);
    item.appendChild(taskSpan);
    item.appendChild(delBtn);
    ul.appendChild(item);
}

const today = new Date();
dateSpan.innerText = today.toDateString();
updateTaskCount();

savedTasks.forEach(task => {
    addTaskToDOM(task.text, task.completed);
});
updateTaskCount();

function addTask() {
    let txt = ip.value.trim();
    if (txt === "") return;

    const taskObj = { text: txt, completed: false };
    savedTasks.push(taskObj);
    saveTasksToStorage();

    addTaskToDOM(txt, false);
    ip.value = "";
    updateTaskCount();
}

btn.addEventListener("click", addTask);

ip.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
        addTask();
    }
});

const quotes = [
    "You’re doing great, keep going!",
    "One task at a time, you've got this!",
    "Success starts with self-discipline.",
    "Progress, not perfection!",
    "Small steps every day lead to big results.",
    "Consistency is the key to success!",
    "Don't wish for it, work for it.",
    "Your future self will thank you.",
    "Stay focused and never give up!",
    "Believe in yourself and all that you are."
];

const msgDiv = document.querySelector(".para");
msgDiv.innerText = quotes[Math.floor(Math.random() * quotes.length)];

