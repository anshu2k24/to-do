const add_btn = document.getElementById("add_btn");
const new_task = document.getElementById("new_task");
const ls = document.getElementsByClassName("content_list")[0];

// JSON.stringify([1,2,3,5,78,8]);
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

let edit_index = null;

const update_tasks = () => {
  ls.innerHTML = "";
  tasks.forEach((t, index) => {
    let li = document.createElement("li");

    //deleting task
    let del = document.createElement("button");
    del.innerText = "delete";
    del.style.margin = "5px";
    del.addEventListener("click", () => {
      tasks.splice(index, 1);
      localStorage.setItem("tasks", JSON.stringify(tasks));
      update_tasks();
    });

    //editing task
    let edit = document.createElement("button");
    edit.innerText = "edit";
    edit.style.margin = "5px";
    edit.addEventListener("click", () => {
      new_task.value = tasks[index];
      edit_index = index;
      add_btn.innerText = "update";
    });
    
    let span_text = document.createElement("span");
    span_text.innerText = t;

    li.appendChild(span_text);
    li.appendChild(edit);
    li.appendChild(del);

    ls.appendChild(li);
});
};
update_tasks();

//to add a task
add_btn.addEventListener("click", () => {
    let new_task_text = new_task.value.trim();
  if (new_task_text) {
    if (edit_index !== undefined && edit_index !== null) {
      tasks[edit_index] = new_task_text;
      edit_index = null;
      add_btn.innerText = "add";
    } else {
      tasks.push(new_task_text);
    }
    localStorage.setItem("tasks", JSON.stringify(tasks));
    new_task.value = "";
    update_tasks();
  }
});

//clear all tasks
const clear_all_btn = document.getElementById("clear_all_btn");
clear_all_btn.addEventListener("click", () => {
  localStorage.removeItem("tasks");
  update_tasks();
});
