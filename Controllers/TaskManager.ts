import Task from "../Interfaces/Task.js";
import ICategory from "../Interfaces/Category.js";

class TaskClass implements Task {
	id: number;
	title: string;
	description: string;
	date: Date;
	priority: string;
	category?: ICategory[];
	static tasks: TaskClass[] = [];

	constructor(
		id: number,
		title: string,
		description: string,
		date: Date,
		priority: string,
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
		console.log(TaskClass.tasks);
	}

	removeTask(id: number) {
		console.log("removeTask");
	}

	editTask(
		id: number,
		title: string,
		description: string,
		date: Date,
		priority: string,
		category?: ICategory[]
	) {
		console.log("editTask");
	}
}

export { TaskClass };
