class CategoryClass {
    constructor(id, title) {
        this.id = id;
        this.title = title;
    }
    addCategory() {
        CategoryClass.categories.push(this);
        CategoryClass.updateLocalStorage();
        console.log(CategoryClass.categories);
    }
    static updateLocalStorage() {
        localStorage.setItem("categoriesList", JSON.stringify(CategoryClass.categories));
    }
}
CategoryClass.categories = [];
export { CategoryClass };
