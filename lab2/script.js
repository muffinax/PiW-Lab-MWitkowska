"use strict"

const li=[]
let tmp = null;

const set_title = () => {
    const list_title = document.getElementById("title").value;

    if (list_title === "") {
        console.log("Pusta Lista");
        return
    }
}

const show_tasks = () => {
    const container = document.querySelector(".list-tasks form");
    container.innerHTML = "";

    li.forEach((taskText, index) => {
        const taskLine = document.createElement("div");
        taskLine.className = "list-task-line";

        const task_box = document.createElement("input");
        task_box.type = "checkbox";
        task_box.id = index;

        const task_title = document.createElement("label");
        task_title.htmlFor = index;
        task_title.innerText = taskText;
        task_title.className = "task-title";

        task_box.addEventListener("change", () => {
            if (task_box.checked) {
                task_title.className = "done-task-title";
            } else {
                task_title.className = "task-title";
            }
        });

        const deleteBtn = document.createElement("button");
        deleteBtn.innerText = "X";
        deleteBtn.className = "delete-task-btn";

        deleteBtn.onclick = () => delete_task(index);

        taskLine.appendChild(task_box);
        taskLine.appendChild(task_title);
        taskLine.appendChild(deleteBtn);

        container.appendChild(taskLine);

    });
}

const add_task = () => {
    const taskInput = document.getElementById("task");

    if (taskInput.value === ""){
        console.log("Puste Zadanie");
        return
    }
    li.push(taskInput.value);
    taskInput.value = "";

    show_tasks();
}

const delete_task = (index) => {
    tmp = li.splice(index, 1)[0];
    console.log("Usunięto Task");
    show_tasks();
}

const back = () => {
    if (tmp === null) {
        console.log("Nie ma nic zapisanego");
        return;
    }

    li.push(tmp);
    tmp = null;
    show_tasks();
}

