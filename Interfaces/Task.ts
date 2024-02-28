interface Task {
	id: number;
	title: string;
	description: string;
	date: Date;
	priority: "low" | "medium" | "high";
	category?: Category[];
}

export default Task;
import Category from "./Category";
