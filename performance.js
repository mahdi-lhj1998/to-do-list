const todoText = document.querySelector(".todo-text");
const todoDate = document.querySelector(".todo-date");
const add = document.querySelector(".add");
const Edit = document.querySelector(".edit");
const deletedAll = document.querySelector(".del");
let todo = JSON.parse(localStorage.getItem("todo-title")) || [];
const alertt = document.querySelector(".alert");
const tbody = document.querySelector("tbody");
const filterBt = document.querySelectorAll(".s");
console.log(todo.length);

// ------------- functions-------

const filterHandler = (event) => {
  let filterTodo = null;
  const dataSets = event.target.dataset.filter;
  console.log(dataSets);
  if (!todo.length) {
    showAlert("Todo list is empty", "warning");
  }
  if (dataSets === "pending") {
    filterTodo = todo.filter((item) => item.completed === false);
  } else if (dataSets === "completed") {
    filterTodo = todo.filter((item) => item.completed === true);
  } else if (dataSets === "all") {
    filterTodo = todo;
  }
  display(filterTodo);
};

const saveToLocal = () => {
  localStorage.setItem("todo-title", JSON.stringify(todo));
};
// ----------
const display = (data) => {
  const todoList = data ? data : todo;
  tbody.innerHTML = "";
  if (todoList.length === 0) {
    tbody.innerHTML = `<tr><td colspan='4' class='notask'>No Task</td></tr>`;
    return;
  }
  todoList.forEach((item) => {
    tbody.innerHTML += `
        <td>${item.task} </td>
        <td>${item.date || "No Date"} </td>
        <td>${item.completed ? " completed" : "pending ..."} </td>
        <td  class='task-bt-container' >
         <button onclick="OneDeleteHandler('${
           item.id
         }')" class='task-bt task-bt1' ><ion-icon name="trash-outline"></ion-icon></button>
          <button onclick="editHandler('${
            item.id
          }')" class='task-bt task-bt2' > <ion-icon name="create-outline"></ion-icon></button>
          <button onclick="TickHandler('${
            item.id
          }')"  class='task-bt task-bt3' >
            ${
              item.completed
                ? '<ion-icon name="close-outline"></ion-icon>'
                : '<ion-icon name="checkmark-outline"></ion-icon>'
            }    
           </button>
       </td>
      `;
  });
};

// --------------
const showAlert = (message, type) => {
  alertt.innerHTML = "";
  const alertP = document.createElement("p");
  alertP.innerText = message;
  alertP.classList.add("alert");
  alertP.classList.add(`alert-${type}`);
  alertt.appendChild(alertP);
  setTimeout(() => {
    alertP.style.display = "none";
  }, 2000);
};
// ------------------

const idGenrator = () => {
  return Math.round(
    Math.random() * Math.random() * Math.pow(13, 10)
  ).toString();
  console.log(id);
};

// -----------------

const TickHandler = (id) => {
  console.log(id);
  const findId = todo.find((item) => item.id === id);
  console.log(findId);
  findId.completed = !findId.completed;
  saveToLocal();
  display();
  showAlert("Todo status has been changed", "ok");
};

// -------------

const addhandler = (event) => {
  const todoText_value = todoText.value;
  const todoDate_value = todoDate.value;
  const todoInfo = {
    id: idGenrator(),
    task: todoText_value,
    date: todoDate_value,
    completed: false,
  };

  if (todoText_value) {
    todo.push(todoInfo);
    saveToLocal();
    display();
    todoText.value = "";
    todoDate.value = "";
    showAlert("todo added successfully", "ok");
  } else {
    showAlert("please enter todo", "warning");
  }
};

// -----------------

const deletedhandler = () => {
  if (todo.length ) {
    todo = [];
    saveToLocal();
    display();
    showAlert("All todo deleted", "ok");
  } else {
    showAlert("Not anything for delete ...", "warning");
  }
};

// -------------------

const OneDeleteHandler = (id) => {
  const newTodo = todo.filter((item) => item.id !== id);
  console.log(newTodo);
  todo = newTodo;
  saveToLocal();
  display();
  showAlert("Todo deleted successfully", "ok");
};

// ------------------

const editHandler = (id) => {
  const findTodo = todo.find((item) => item.id === id);
  console.log(findTodo);
  todoText.value = findTodo.task;
  todoDate.value = findTodo.date;
  add.style.display = "none";
  Edit.style.display = "flex";
  Edit.dataset.idd = id;
};
// --------------------------
const ApplyEditHandler = (event) => {
  const findId = event.target.dataset.idd;
  console.log(findId);
  const findTodo = todo.find((item) => item.id === findId);
  console.log(findTodo);
  console.log(todoText.value);
  console.log(findTodo.task);
  findTodo.task = `${todoText.value}`;
  findTodo.date = `${todoDate.value}`;
  todoDate.value = "";
  todoText.value = "";
  add.style.display = "flex";
  Edit.style.display = "none";
  saveToLocal();
  display();
  showAlert("Todo item has been changed", "ok");
};
// ------------------- eventlisteners ------------
window.addEventListener("load", display());
add.addEventListener("click", addhandler);
deletedAll.addEventListener("click", deletedhandler);
Edit.addEventListener("click", ApplyEditHandler);
filterBt.forEach((item) => item.addEventListener("click", filterHandler));
