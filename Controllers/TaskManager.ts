import Task from "../Interfaces/Task.js";
import ICategory from "../Interfaces/Category.js";

class TaskClass implements Task {
	id: number;
	title: string;
	description: string;
	date: Date;
	priority: "low" | "medium" | "high";
	category?: ICategory[];
	static tasks: TaskClass[] = [];

	constructor(
		id: number,
		title: string,
		description: string,
		date: Date,
		priority: "low" | "medium" | "high",
		category?: ICategory[]
	) {
		this.id = id;
		this.title = title;
		this.description = description;
		this.date = date;
		this.priority = priority;
		this.category = category;
	}

	addTask() {
		TaskClass.tasks.push(this);
		TaskClass.updateLocalStorage();
		console.log(TaskClass.tasks);
	}

	removeTask(id: number) {
		TaskClass.updateLocalStorage();
		console.log("removeTask");
	}

	static editTask(
		id: number,
		title: string,
		description: string,
		date: Date,
		priority: "low" | "medium" | "high",
		category?: ICategory[]
	) {
		let task = TaskClass.tasks.find((task) => task.id == id);
		if (task == undefined) return;
		task.title = title;
		task.description = description;
		task.date = date;
		task.priority = priority;
		task.category = category;

		TaskClass.updateLocalStorage();
		console.log(TaskClass.tasks);
	}

	static updateLocalStorage() {
		localStorage.setItem("taskList", JSON.stringify(TaskClass.tasks));
	}
}

export { TaskClass };
