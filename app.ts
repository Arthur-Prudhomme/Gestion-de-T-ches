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

var addTaskButton = document.querySelector("#addTaskButton");
var form = document.forms["addTaskForm"];
form.addEventListener("submit", () => {
	addTask(
		form.title.value,
		form.description.value,
		form.date.value,
		form.priority.value
	);
});

var editTaskButton = document.querySelector("#editTaskButton");
editTaskButton.addEventListener("click", () =>
	editTask(3, "testEdit", "testDescEdit", new Date(), "high")
);
