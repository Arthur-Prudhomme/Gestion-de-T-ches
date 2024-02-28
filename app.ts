import { TaskClass } from "./Controllers/TaskManager.js";
import { CategoryClass, Categories } from "./Controllers/CategoryManager.js";
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
var form = document.forms["addTaskForm"];
form.addEventListener("submit", () => {
	addTask(
		form.title.value,
		form.description.value,
		form.date.value,
		form.priority.value
	);
	form.reset();
	addTasksDOM();
});
//############################################

//################# edit task #################
var editTaskButton = document.querySelector("#editTaskButton");
editTaskButton.addEventListener("click", () =>
	editTask(3, "testEdit", "testDescEdit", new Date(), "high")
);
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

function addTaskDOM(task: TaskClass) {
	const taskDiv: HTMLDivElement = document.createElement("div");
	taskDiv.classList.add("task", task.priority);
	taskDiv.setAttribute("id", `task-n-${task.id}`);
	taskDiv.innerHTML = `
	<h3>${task.title} <span>– Priorité : ${task.priority}</span></h3>
	<p>Date d'échéance: ${task.date}</p>
	<p>${task.description}</p>
	<button type="button" id="delete-button">Supprimer</button>
	<button class="edit-btn">Modifier</button>
	`;
	taskDiv
		.querySelector("#delete-button")
		.addEventListener("click", () => removeTask(task.id));

	taskContainer.appendChild(taskDiv);
}
//###################################################
