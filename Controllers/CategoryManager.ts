import ICategory from "../Interfaces/Category.js";

class CategoryClass implements ICategory {
	id: number;
	title: string;
	static categories: CategoryClass[] = [];

	constructor(id: number, title: string) {
		this.id = id;
		this.title = title;
	}

	addCategory() {
		CategoryClass.categories.push(this);
		CategoryClass.updateLocalStorage();
		console.log(CategoryClass.categories);
	}

	static updateLocalStorage() {
		localStorage.setItem(
			"categoriesList",
			JSON.stringify(CategoryClass.categories)
		);
	}
}

export { CategoryClass };
