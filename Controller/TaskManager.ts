import Task from "../Interfaces/Task";
import ICategory from "../Interfaces/Category";

var Tasks: TaskClass[];

class TaskClass implements Task {
	id: number;
	title: string;
	description: string;
	date: Date;
	priority: string;
	category?: ICategory[];

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

	addTask() {}

	removeTask() {}

	editTask() {}
}
