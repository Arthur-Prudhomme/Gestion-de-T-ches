import { TaskClass } from "./Controllers/TaskManager.js";
function addTask(title, description, date, priority, category) {
    let lastId = 0;
    if (TaskClass.tasks != undefined && TaskClass.tasks.length != 0)
        lastId = TaskClass.tasks[TaskClass.tasks.length - 1].id;
    lastId += 1;
    let newTask = new TaskClass(lastId, title, description, date, priority, category);
    newTask.addTask();
}
var addTaskButton = document.querySelector("#addTaskButton");
addTaskButton.addEventListener("click", () => addTask("test", "testDesc", new Date(), "high"));
