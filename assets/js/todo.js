const emptyMsg = "Task cannot be empty";

let toDoList = [];


const content = document.querySelector(".content");
const taskInfo = document.querySelector("#info-text");


const newTask = document.querySelector(".task-form");
newTask.addEventListener("submit", handleNewTask);

function handleNewTask(e) {
  e.preventDefault();
  const newTaskData = new FormData(newTask);
  const taskObj = Object.fromEntries(newTaskData);
  if (taskObj.task=="") {
    alert(emptyMsg);
    return;
  }

  if (toDoList.length === 0) {
    taskObj.id = 1;
  } else {
    taskObj.id = toDoList[0].id +1
  }
  toDoList.unshift(taskObj);

  newTask.reset();
  render();

}

function deleteTask(taskId) {
  const taskIndex = toDoList.findIndex(t => t.id == taskId);
  toDoList.splice(taskIndex,1);

  render();
}

const handleDeleteTask = (e) => {
  e.preventDefault();  
  deleteTask(e.currentTarget.dataset.id);
}

function bindElements() {

  const deleteTaskBtns = document.querySelectorAll("#content-item-delete");

  for (const deleteTaskBtn of deleteTaskBtns) {
    deleteTaskBtn.addEventListener("click", handleDeleteTask);
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

function createTaskHtml(id, task) {
  return `
      <div class="content-items">
      
        <input type="hidden" name="id" value="${id}">
        <button data-id="${id}" id="content-item-todo"></button>
        <a href="#">${task}</a>
        <button data-id="${id}" id="content-item-delete" type="submit">
          <img src="/assets/img/delete.svg" alt="delete">
        </button>

      </div>
  `;
}

render();