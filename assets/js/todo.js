const emptyMsg = "Task cannot be empty";

let toDoList = [];

taskFormHtml();
const content = document.querySelector(".content");
const taskInfo = document.querySelector("#info-text");

const newTask = document.querySelector(".task-form");
newTask.addEventListener("submit", handleNewTask);


function handleNewTask(e) {
  e.preventDefault();
  const newTaskData = new FormData(newTask);
  const taskObj = Object.fromEntries(newTaskData);
  if (taskObj.task.trim() == "") {
    alert(emptyMsg);
    return;
  }

  if (toDoList.length === 0) {
    taskObj.id = 1;
  } else {
    taskObj.id = toDoList[0].id + 1
  }
  toDoList.unshift(taskObj);

  newTask.reset();
  render();

}

function deleteTask(taskId) {
  const taskIndex = toDoList.findIndex(t => t.id == taskId);
  toDoList.splice(taskIndex, 1);

  render();
}

function editTask(e) {

  e.preventDefault();

  const editTaskData = new FormData(e.target);
  const taskObj = Object.fromEntries(editTaskData);
  if (taskObj.task.trim() == "") {
    alert(emptyMsg);
    return;
  }

  const editTask = toDoList.find(t => t.id == taskObj.id);
  editTask.task = taskObj.task;

  taskFormHtml();
  
  render();
}

const handleDeleteTask = (e) => {
  e.preventDefault();
  deleteTask(e.currentTarget.dataset.id);
}

function handleEditTask(e) {
  e.preventDefault();

  const taskId = e.currentTarget.dataset.id;
  const task = toDoList.find(t => t.id == taskId);
  const editTaskForm = editTaskHtml(taskId, task.task);

  const input = document.querySelector(".input");
  input.innerHTML = editTaskForm;

  bindElements();
}

function bindElements() {

  const deleteTaskBtns = document.querySelectorAll("#content-item-delete");
  for (const deleteTaskBtn of deleteTaskBtns) {
    deleteTaskBtn.addEventListener("click", handleDeleteTask);
  }

  const editTasks = document.querySelectorAll(".task-text");
  for (const text of editTasks) {
    text.addEventListener("click", handleEditTask);
  }

  const editNewTask = document.querySelector(".edit-task-form");
  if (editNewTask) {
    editNewTask.addEventListener("submit", editTask);
  }

}

function render() {

  content.innerHTML = "";
  for (const toDo of toDoList) {
    const taskList = createTaskHtml(toDo.id, toDo.task);
    content.innerHTML += taskList;
  }

  numberOfTask();
  bindElements();
}

function numberOfTask() {
  const numberTask = toDoList.length;
  taskInfo.innerHTML = `${numberTask} items left`;
}

function taskFormHtml(){
  const input = document.querySelector(".input");
  input.innerHTML =
  `
    <form class="task-form">
      <button id="input-button" type="submit"></button>
      <input name="task" id="input-text" type="text" placeholder="Create a new todo…">
    </form>
  `;
}

// function taskHtml(){

//   const input = document.querySelector(".input");
//   input.innerHTML = taskHtml();
//   return `
//       <form class="task-form">
//         <button id="input-button" type="submit"></button>
//         <input name="task" id="input-text" type="text" placeholder="Create a new todo…">
//       </form>
//   `;
// }

function editTaskHtml(id, task) {
  return `
    <form class="edit-task-form">
      <input type="hidden" name="id" value="${id}">
      <button class="edit-input-button" type="submit"></button>
      <input name="task" class="edit-text" type="text" placeholder="Create a new todo…" value="${task}">
    </form>
  `;
}

function createTaskHtml(id, task) {
  return `
      <div class="content-items">
      
        <input type="hidden" name="id" value="${id}">
        <button data-id="${id}" id="content-item-todo"></button>
        <a data-id="${id}" class="task-text" href="#">${task}</a>
        <button data-id="${id}" id="content-item-delete" type="submit">
          <img src="/assets/img/delete.svg" alt="delete">
        </button>

      </div>
  `;
}



render();