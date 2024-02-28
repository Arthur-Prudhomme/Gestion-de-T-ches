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
        TaskClass.updateLocalStorage();
        console.log(TaskClass.tasks);
    }
    static removeTask(id) {
        let taskIndex = TaskClass.tasks.findIndex((task) => task.id == id);
        TaskClass.tasks.splice(taskIndex, 1);
        TaskClass.updateLocalStorage();
        console.log(TaskClass.tasks);
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
        TaskClass.updateLocalStorage();
        console.log(TaskClass.tasks);
    }
    static updateLocalStorage() {
        localStorage.setItem("taskList", JSON.stringify(TaskClass.tasks));
    }
}
TaskClass.tasks = [];
export { TaskClass };
