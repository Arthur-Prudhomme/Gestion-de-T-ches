class TaskClass {
    constructor(id, title, description, date, priority, category) {
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
    removeTask(id) {
        console.log("removeTask");
    }
    editTask(id, title, description, date, priority, category) {
        console.log("editTask");
    }
}
TaskClass.tasks = [];
export { TaskClass };
