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
    static editTask(id, title, description, date, priority, category) {
        let task = TaskClass.tasks.find((task) => task.id == id);
        if (task == undefined)
            return;
        task.title = title;
        task.description = description;
        task.date = date;
        task.priority = priority;
        task.category = category;
        console.log(TaskClass.tasks);
    }
}
TaskClass.tasks = [];
export { TaskClass };
