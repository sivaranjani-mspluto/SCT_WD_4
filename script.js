document.addEventListener("DOMContentLoaded", loadTasks);

function addTask() {
    let taskText = document.getElementById("taskInput").value.trim();
    let taskDateTime = document.getElementById("taskDateTime").value;

    if (taskText === "" || taskDateTime === "") {
        alert("Please enter a task and set a date/time!");
        return;
    }

    let taskList = document.getElementById("taskList");
    let li = document.createElement("li");

    li.innerHTML = `
        <span class="task-text">${taskText}</span> 
        <span class="task-datetime">${new Date(taskDateTime).toLocaleString()}</span>
        <button class="edit-btn" onclick="editTask(this)">Edit</button>
        <button class="delete-btn" onclick="deleteTask(this)">Delete</button>
    `;

    taskList.appendChild(li);
    updateTaskCount();
    saveTasks();

    document.getElementById("taskInput").value = ""; 
    document.getElementById("taskDateTime").value = ""; 

}

function editTask(button) {
    let li = button.parentElement;
    let taskTextElement = li.querySelector(".task-text");
    let taskDateTimeElement = li.querySelector(".task-datetime");

    let newText = prompt("Edit your task:", taskTextElement.innerText);
    let newDateTime = prompt("Edit date & time (YYYY-MM-DD HH:MM):", taskDateTimeElement.innerText);

    if (newText !== null && newDateTime !== null) {
        taskTextElement.innerText = newText;
        taskDateTimeElement.innerText = new Date(newDateTime).toLocaleString();
        saveTasks();
    }
}

function deleteTask(button) {
    button.parentElement.remove();
    updateTaskCount();
    saveTasks();
}

function deleteAll() {
    document.getElementById("taskList").innerHTML = "";
    updateTaskCount();
    saveTasks();
}

function updateTaskCount() {
    let count = document.getElementById("taskList").children.length;
    document.getElementById("taskCount").innerText = `${count} items total`;
}

function saveTasks() {
    let tasks = [];
    document.querySelectorAll("#taskList li").forEach(li => {
        tasks.push({
            text: li.querySelector(".task-text").innerText,
            datetime: li.querySelector(".task-datetime").innerText
        });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    let taskList = document.getElementById("taskList");

    tasks.forEach(task => {
        let li = document.createElement("li");
        li.innerHTML = `
            <span class="task-text">${task.text}</span> 
            <span class="task-datetime">${task.datetime}</span>
            <button class="edit-btn" onclick="editTask(this)">Edit</button>
            <button class="delete-btn" onclick="deleteTask(this)">Delete</button>
        `;
        taskList.appendChild(li);
    });

    updateTaskCount();
}
