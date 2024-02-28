import { TaskClass } from "./Controllers/TaskManager.js";
import { CategoryClass, Categories } from "./Controllers/CategoryManager.js";
import Task from "./Interfaces/Task.js";
import ICategory from "./Interfaces/Category.js";

function addTask(
	title: string,
	description: string,
	date: Date,
	priority: string,
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

var addTaskButton = document.querySelector("#addTaskButton");
addTaskButton.addEventListener("click", () =>
	addTask("test", "testDesc", new Date(), "high")
);
