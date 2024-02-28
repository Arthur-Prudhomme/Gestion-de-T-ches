import { TaskClass } from "./Controllers/TaskManager.js";
function addTask(title, description, date, priority, category) {
    let lastId = 0;
    if (TaskClass.tasks != undefined && TaskClass.tasks.length != 0)
        lastId = TaskClass.tasks[TaskClass.tasks.length - 1].id;
    lastId += 1;
    let newTask = new TaskClass(lastId, title, description, date, priority, category);
    newTask.addTask();
}
function editTask(id, title, description, date, priority, category) {
    TaskClass.editTask(id, title, description, date, priority, category);
}
//################# add task #################
var form = document.forms["addTaskForm"];
form.addEventListener("submit", () => {
    addTask(form.title.value, form.description.value, form.date.value, form.priority.value);
    form.reset();
    addTasksDOM();
});
//############################################
//################# edit task #################
var editTaskButton = document.querySelector("#editTaskButton");
editTaskButton.addEventListener("click", () => editTask(3, "testEdit", "testDescEdit", new Date(), "high"));
//#############################################
//################# add task in DOM #################
var taskContainer = document.querySelector("#tasks-container");
function addTasksDOM() {
    var taskList = JSON.parse(localStorage.getItem("taskList"));
    TaskClass.tasks = taskList;
    taskContainer.innerHTML = "";
    taskList.forEach((task) => {
        addTaskDOM(task);
    });
}
addTasksDOM();
function addTaskDOM(task) {
    const taskDiv = document.createElement("div");
    taskDiv.classList.add("task", task.priority);
    const taskTitle = document.createElement("h3");
    taskTitle.textContent = task.title;
    const span = document.createElement("span");
    if (task.priority == "high")
        span.textContent = "– Priorité Haute";
    if (task.priority == "medium")
        span.textContent = "– Priorité Moyenne";
    if (task.priority == "low")
        span.textContent = "– Priorité Faible";
    taskTitle.appendChild(span);
    const deadlineParagraph = document.createElement("p");
    deadlineParagraph.textContent = `Date d'échéance: ${task.date}`;
    const descriptionParagraph = document.createElement("p");
    descriptionParagraph.textContent = task.description;
    const deleteButton = document.createElement("button");
    deleteButton.setAttribute("type", "button");
    deleteButton.textContent = "Supprimer";
    const editButton = document.createElement("button");
    editButton.classList.add("edit-btn");
    editButton.textContent = "Modifier";
    taskDiv.appendChild(taskTitle);
    taskDiv.appendChild(deadlineParagraph);
    taskDiv.appendChild(descriptionParagraph);
    taskDiv.appendChild(deleteButton);
    taskDiv.appendChild(editButton);
    taskContainer.appendChild(taskDiv);
}
//###################################################
