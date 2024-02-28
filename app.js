import { TaskClass } from "./Controllers/TaskManager.js";
import { CategoryClass } from "./Controllers/CategoryManager.js";
function addTask(title, description, date, priority, category) {
    let lastId = 0;
    if (TaskClass.tasks != undefined && TaskClass.tasks.length != 0)
        lastId = TaskClass.tasks[TaskClass.tasks.length - 1].id;
    lastId += 1;
    let newTask = new TaskClass(lastId, title, description, date, priority, category);
    newTask.addTask();
}
function addCategory(title) {
    let lastId = 0;
    if (CategoryClass.categories != undefined &&
        CategoryClass.categories.length != 0)
        lastId = CategoryClass.categories[CategoryClass.categories.length - 1].id;
    lastId += 1;
    let newCategory = new CategoryClass(lastId, title);
    newCategory.addCategory();
}
function editTask(id, title, description, date, priority, category) {
    TaskClass.editTask(id, title, description, date, priority, category);
}
//################# remove task #################
function removeTask(id) {
    TaskClass.removeTask(id);
    let task = document.getElementById(`task-n-${id}`);
    task.remove();
}
//###############################################
//################# add task #################
var addTaskForm = document.forms["addTaskForm"];
addTaskForm.addEventListener("submit", () => {
    addTask(addTaskForm.title.value, addTaskForm.description.value, addTaskForm.date.value, addTaskForm.priority.value);
    addTaskForm.reset();
    addTasksDOM();
});
//############################################
//################# add category #################
var addCategoryForm = document.forms["addCategoryForm"];
addCategoryForm.addEventListener("submit", () => {
    addCategory(addCategoryForm.title.value);
    addCategoryForm.reset();
});
//############################################
let taskCategory = document.getElementById("taskCategory");
let categoryList = JSON.parse(localStorage.getItem("categoriesList"));
console.log(categoryList);
taskCategory.innerHTML += `
${categoryList.map((category) => `<option value="${category.id}">${category.title}</option>`)}
`;
//################# edit task #################
function editTaskForm(id) {
    let editTaskForm = document.forms["editTaskForm"];
    editTaskForm.addEventListener("submit", () => {
        editTask(id, editTaskForm.title.value, editTaskForm.description.value, editTaskForm.date.value, editTaskForm.priority.value);
        addTasksDOM();
    });
}
function editMode(task) {
    addTasksDOM();
    let taskDiv = document.getElementById(`task-n-${task.id}`);
    taskDiv.innerHTML = `
	<form name="editTaskForm" id="taskForm" onsubmit="return false">
	<input type="text" id="editTaskTitle" value="${task.title}" name="title"/>
	<input type="date" id="editTaskDate" value="${task.date}" name="date"/>
	<textarea type="text" id="editTaskDesc" name="description">${task.description}</textarea>

	<select id="editTaskPriority" name="priority">
	<option value="low" ${task.priority == "low" ? "selected" : ""}>Faible</option>
	<option value="medium" ${task.priority == "medium" ? "selected" : ""}>Moyenne</option>
	<option value="high" ${task.priority == "high" ? "selected" : ""}>Haute</option>
	</select>
	
	<button type="button" id="cancel-button">Annuler</button>
	<button class="edit-btn" id="apply-edit-button">Appliquer</button>
	</form>`;
    taskDiv
        .querySelector("#cancel-button")
        .addEventListener("click", () => addTasksDOM());
    taskDiv
        .querySelector("#apply-edit-button")
        .addEventListener("click", () => editTaskForm(task.id));
    console.log("editMode");
}
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
    taskDiv.setAttribute("id", `task-n-${task.id}`);
    taskDiv.innerHTML = `
	<h3>${task.title} <span>– Priorité : ${task.priority}</span></h3>
	<p>Date d'échéance: ${task.date}</p>
	<p>${task.description}</p>
	<button type="button" id="delete-button">Supprimer</button>
	<button class="edit-btn" id="edit-button">Modifier</button>`;
    taskDiv
        .querySelector("#delete-button")
        .addEventListener("click", () => removeTask(task.id));
    taskDiv
        .querySelector("#edit-button")
        .addEventListener("click", () => editMode(task));
    taskContainer.appendChild(taskDiv);
}
//###################################################
