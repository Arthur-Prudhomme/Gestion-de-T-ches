import { TaskClass } from "./Controllers/TaskManager.js";
function addTask(title, description, date, priority, category) {
    let lastId = 0;
    if (TaskClass.tasks != undefined && TaskClass.tasks.length != 0)
        lastId = TaskClass.tasks[TaskClass.tasks.length - 1].id;
    lastId += 1;
    let newTask = new TaskClass(lastId, title, description, date, priority, category);
    newTask.addTask();
}
function editTask(id, title, description, date, priority, category) {
    TaskClass.editTask(id, title, description, date, priority, category);
}
var addTaskButton = document.querySelector("#addTaskButton");
addTaskButton.addEventListener("click", () => addTask("test", "testDesc", new Date(), "high"));
var editTaskButton = document.querySelector("#editTaskButton");
editTaskButton.addEventListener("click", () => editTask(3, "testEdit", "testDescEdit", new Date(), "high"));
