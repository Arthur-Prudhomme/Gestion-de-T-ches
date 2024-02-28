interface Task {
	title: string;
	description: string;
	date: Date;
	priority: string;
	category?: Category;
}

export default Task;
import Category from "./Category";
