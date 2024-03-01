import { TaskClass } from "./Controllers/TaskManager.js";
import { CategoryClass } from "./Controllers/CategoryManager.js";
import Task from "./Interfaces/Task.js";
import ICategory from "./Interfaces/Category.js";

function addTask(
	title: string,
	description: string,
	date: Date,
	priority: "low" | "medium" | "high",
	category?: ICategory[]
) {
	let lastId = 0;
	if (TaskClass.tasks != undefined && TaskClass.tasks.length != 0)
		lastId = TaskClass.tasks[TaskClass.tasks.length - 1].id;

	lastId += 1;

	let newTask = new TaskClass(
		lastId,
		title,
		description,
		date,
		priority,
		category
	);

	newTask.addTask();
}

function addCategory(title: string) {
	let lastId = 0;
	if (
		CategoryClass.categories != undefined &&
		CategoryClass.categories.length != 0
	)
		lastId = CategoryClass.categories[CategoryClass.categories.length - 1].id;

	lastId += 1;

	let newCategory = new CategoryClass(lastId, title);

	newCategory.addCategory();
}

function editTask(
	id: number,
	title: string,
	description: string,
	date: Date,
	priority: "low" | "medium" | "high",
	category?: ICategory[]
) {
	TaskClass.editTask(id, title, description, date, priority, category);
}

//################# remove task #################
function removeTask(id: number) {
	TaskClass.removeTask(id);
	let task = document.getElementById(`task-n-${id}`);
	task.remove();
}
//###############################################

//################# add task #################
var addTaskForm = document.forms["addTaskForm"];
addTaskForm.addEventListener("submit", () => {
	addTask(
		addTaskForm.title.value,
		addTaskForm.description.value,
		addTaskForm.date.value,
		addTaskForm.priority.value,
		addTaskForm.category.value
	);
	addTaskForm.reset();
	addTasksDOM();
});
//############################################

//################# apply filter #################
var applyFilter = document.forms["filterForm"];
applyFilter.addEventListener("submit", () => {
	console.log("applyFilter");
	var taskList = JSON.parse(localStorage.getItem("taskList"));
	let filters = {};
	let filterPriority = applyFilter.priority.value;
	if (filterPriority != "all" && filterPriority.length != 0)
		Object.assign(filters, { priority: filterPriority });
	let filterDate = applyFilter.date.value;
	if (filterDate != null && filterDate.length != 0)
		Object.assign(filters, { date: filterDate });
	let filterCategory = applyFilter.category.value;
	if (filterCategory != null && filterCategory.length != 0)
		Object.assign(filters, { category: filterCategory });

	let filteredTaskList = taskList.filter(function (task) {
		for (var key in filters) {
			if (task[key] === undefined || task[key] != filters[key]) return false;
		}
		return true;
	});

	console.log(filteredTaskList);

	taskContainer.innerHTML = "";
	filteredTaskList.forEach((task) => {
		addTaskDOM(task);
	});
});
//################################################

//################# add category #################
var addCategoryForm = document.forms["addCategoryForm"];
addCategoryForm.addEventListener("submit", () => {
	addCategory(addCategoryForm.title.value);
	addCategoryForm.reset();
	addCategoryDOM();
});
//################################################

//################# add category DOM #################
function addCategoryDOM() {
	let taskCategory = document.querySelectorAll("#taskCategory");
	let categoryList = JSON.parse(localStorage.getItem("categoriesList"));
	if (categoryList) {
		CategoryClass.categories = categoryList;
		taskCategory.forEach((taskCategory) => {
			taskCategory.innerHTML = "";
			taskCategory.innerHTML += `
		<option ></option>
${categoryList.map(
	(category) => `<option value="${category.id}">${category.title}</option>`
)}
`;
		});
	}
}
addCategoryDOM();

//####################################################

//################# edit task #################
function editTaskForm(id: number) {
	let editTaskForm = document.forms["editTaskForm"];
	editTaskForm.addEventListener("submit", () => {
		editTask(
			id,
			editTaskForm.title.value,
			editTaskForm.description.value,
			editTaskForm.date.value,
			editTaskForm.priority.value,
			editTaskForm.category.value
		);
		addTasksDOM();
	});
}

function editMode(task: TaskClass) {
	let categoryList = JSON.parse(localStorage.getItem("categoriesList"));
	addTasksDOM();
	let taskDiv = document.getElementById(`task-n-${task.id}`);
	taskDiv.innerHTML = `
	<form name="editTaskForm" id="taskForm" onsubmit="return false">
	<input type="text" id="editTaskTitle" value="${task.title}" name="title"/>
	<input type="date" id="editTaskDate" value="${task.date}" name="date"/>
	<textarea type="text" id="editTaskDesc" name="description">${
		task.description
	}</textarea>

	<select id="editTaskPriority" name="priority">
	<option value="low" ${task.priority == "low" ? "selected" : ""}>Faible</option>
	<option value="medium" ${
		task.priority == "medium" ? "selected" : ""
	}>Moyenne</option>
	<option value="high" ${task.priority == "high" ? "selected" : ""}>Haute</option>
	</select>

	<select id="editRaskCategory" name="category">
	<option ></option>
	${categoryList.map(
		(category) =>
			`<option value="${category.id}" ${
				category.id == task.category ? "selected" : ""
			}>${category.title}</option>`
	)}
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
	if (taskList) {
		TaskClass.tasks = taskList;
		taskContainer.innerHTML = "";
		taskList.forEach((task) => {
			addTaskDOM(task);
		});
	}
}
addTasksDOM();

function addTaskDOM(task: TaskClass) {
	let categoryList = JSON.parse(localStorage.getItem("categoriesList"));
	let category = new CategoryClass(0, "");
	if (
		categoryList &&
		![undefined, null].includes(task.category) &&
		task.category.length != 0
	) {
		category = categoryList.find((category) => category.id == task.category);
	}

	const taskDiv: HTMLDivElement = document.createElement("div");
	taskDiv.classList.add("task", task.priority);
	taskDiv.setAttribute("id", `task-n-${task.id}`);
	taskDiv.innerHTML = `
	<h3>${task.title} <span>– Priorité : ${task.priority}</span></h3>
	<p>Date d'échéance: ${task.date}</p>
	<p>Catégories: ${category == undefined ? "" : category.title}</p>
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
