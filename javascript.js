// Created by AmirSenpai on GitHub
// Define the task limit and current task count
// const limit = 100;
// let currentAmount = 0;

// Load tasks from local storage when the page is loaded
document.addEventListener("DOMContentLoaded", function () {
  // Get saved tasks from local storage
  const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  // Add saved tasks to the DOM
  savedTasks.forEach((task) => {
    addTaskToDOM(task);
  });
});

// Function to add a task to the DOM
function addTaskToDOM(task) {
  const taskList = document.getElementById("task-list");

  // Create a new paragraph element for the task
  const taskItem = document.createElement("p");
  taskItem.className = "task-item";
  taskItem.id = "task-items";
  //create the delete button
  const deletebtn = document.createElement("button");
  // deletebtn.innerText = "delete";
  deletebtn.className = "fas fa-trash";
  // deletebtn.onclick = 'delete();';
  deletebtn.id = "delete-btn";
  // Create a checkbox input element
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.className = "checkbox";
  checkbox.checked = task.completed;
  // Add an event listener to the checkbox for task completion
  checkbox.addEventListener("change", function () {
    if (this.checked) {
      taskP.style.textDecoration = "line-through";
      // currentAmount--;
      saveTasksToLocalStorage();
    } else {
      taskP.style.textDecoration = "none";
      saveTasksToLocalStorage();
    }
  });
  deletebtn.addEventListener("click", function (){
    taskItem.remove();
    // currentAmount--;
    saveTasksToLocalStorage();
  });

  // Create a paragraph element for the task text
  const taskP = document.createElement("p");
  taskP.innerText = task.text;

  // Append the checkbox and task text to the task item and add it to the task list
  taskItem.appendChild(checkbox);
  taskItem.appendChild(deletebtn);
  taskItem.appendChild(taskP);
  taskList.appendChild(taskItem);

  // Increment the current task count
  // currentAmount++;
  // Save the tasks to local storage
  saveTasksToLocalStorage();
}
// Function to save tasks to local storage
function saveTasksToLocalStorage() {
  // Get all task items, map them to an array of task objects, and save to local storage
  const tasks = Array.from(document.querySelectorAll(".task-item")).map(
    (taskItem) => ({
      text: taskItem.querySelector("p").innerText,
      completed: taskItem.querySelector("input").checked,
    })
  );
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Function to add a new task
function buttontask() {
  // Get the input field for the task
  const inputField = document.getElementById("task-input");

  // Check if the input field is not empty
  if (inputField.value.trim() !== "") {
    // Check if the current amount of tasks is less than the limit
    addTaskToDOM({ text: inputField.value, completed: false });
    inputField.value = "";
    // if (currentAmount < limit) {
    //   // Add the input field value to the DOM as a new task
    //
    //   // Clear the input field after adding the task
    // } else {
    //   // Alert the user if the task limit is reached
    //   alert(
    //     "به حد نصاب تسک ها در روز رسیدی، چند تا کارهات رو تموم کن تا بتونی بازم اضافه کنی"
    //   );
    // }
  } else {
    // Alert the user if the input field is empty
    alert("لطفا یه چیزی بنویس بعد دکمه ثبتو بزن :)");
  }
}