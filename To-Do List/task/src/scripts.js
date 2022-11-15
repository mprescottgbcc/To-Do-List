let taskListElement;

let storeTasks = () => {
    let listItems = taskListElement.getElementsByTagName('li');
    let list = [];
    for (let item of listItems) {
        let span = item.getElementsByTagName('span')[0];
        let task = {
            text: span.textContent,
            completed: span.classList.contains('complete')
        };
        list.push(task);
    }
    localStorage.setItem("tasks", JSON.stringify(list));
};

let loadTasks = () => {
    let taskList = JSON.parse(localStorage.getItem("tasks")) || [];
    for (let task of taskList) {
        taskListElement.appendChild(createNewTask(task.text, task.completed));
    }
};

let createNewTask = (task, complete) => {
    let listItem = document.createElement('li');
    let checkBox = document.createElement('input');
    let span = document.createElement('span');
    let button = document.createElement('button');

    checkBox.type = 'checkbox';
    checkBox.checked = Boolean(complete);
    if (complete) {
        span.classList.add('complete');
    }
    checkBox.onclick = function () {
        this.parentNode.children[1].classList.toggle('complete');
        storeTasks();
    };
    listItem.appendChild(checkBox);

    span.classList.add('task');
    span.textContent = task;
    listItem.appendChild(span);

    button.classList.add('delete-btn');
    button.textContent = 'X';
    button.onclick = function () {
        this.parentNode.remove();
        storeTasks();
    };
    listItem.appendChild(button);

    return listItem;
};

window.onload = () => {
    let addTaskButton = document.getElementById('add-task-button');
    let taskInput = document.getElementById('input-task');
    taskListElement = document.getElementById('task-list');
    loadTasks();

    addTaskButton.onclick = () => {
        taskListElement.appendChild(createNewTask(taskInput.value, false));
        storeTasks();
        taskInput.value = '';
    };
};
