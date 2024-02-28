import ICategory from "../Interfaces/Category.js";

var Categories: CategoryClass[];

class CategoryClass implements ICategory {
	id: number;
	title: string;

	constructor(id: number, title: string) {
		this.id = id;
		this.title = title;
	}

	addCategory() {}
}

export { CategoryClass, Categories };
