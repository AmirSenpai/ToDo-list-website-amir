// //created by AmirSenpai on GitHub
// //tasks limits
// let limit = 7;
// //current tasks count
// let currentAmount = 0;
// //number of tasks done
// let count = 0;
// function buttontask() {
//     //set limits for how many tasks you can make, if current is smaller than limit, let user make tasks
//     if (currentAmount < limit) {
//         // Get the input field, task div, and task list
//         const inputField = document.getElementById("task-input");
//         const taskList = document.getElementById("task-list");
//         //making the counter ready
//         const counter = document.getElementById("count");
//         // Create a new list item element to hold the task
//         const taskItem = document.createElement("p");
//         taskItem.className = "task-item";
//         taskItem.id = "task-items";
//
//         // Create a checkbox element
//         const checkbox = document.createElement("input");
//         checkbox.type = "checkbox";
//         checkbox.className = "checkbox";
//         checkbox.addEventListener("change", function () {
//             if (this.checked) {
//                 taskP.style.textDecoration = "line-through";
//                 //if checkbox is checked , remove the task after certain time
//                 setTimeout(() => {
//                     taskItem.remove();
//                     //when a task is deleted add one to the counter
//                     count++;
//                     //convert counter number to string and replace the label's inner html with the counter text
//                     counter.innerHTML = count.toString();
//                     //when task is removed, minus the amount of tasks removed from the task count
//                     currentAmount--;
//                 }, 1500);
//             } else {
//                 taskP.style.textDecoration = "none";
//             }
//         });
//
//         // Create a new paragraph element to hold the task text
//         const taskP = document.createElement("p");
//         taskP.innerText = inputField.value;
//
//         // Append the checkbox and task paragraph to the task item
//         taskItem.appendChild(checkbox);
//         taskItem.appendChild(taskP);
//
//         // Append the task item to the task list
//         taskList.appendChild(taskItem);
//
//         // Clear the input field
//         inputField.value = "";
//         //after task is created, add 1 to the amount of tasks
//         currentAmount++;
//     }
//     else {
//         alert("you've reached your limits for tasks, remove some to be able to add more tasks.");
//     }
// }
//
// function darktheme(){
//     let bodybg = document.getElementById("body");
//     let taskborder = document.getElementById("task-items");
//     let counterborder = document.getElementById("taskcounters");
//     bodybg.style.background = "#151515";
//     bodybg.style.color = "white";
//     // taskborder.style.borderColor = "white";
//     counterborder.style.borderColor = "LightGreen";
// }
// Created by AmirSenpai on GitHub

// Tasks limit
const limit = 7;
// Current tasks count
let currentAmount = 0;
// Number of completed tasks
let count = 0;

// When the document is fully loaded, execute the function
document.addEventListener("DOMContentLoaded", () => {
    // Load tasks from local storage or initialize an empty array
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    // Iterate through the saved tasks and add them to the DOM
    savedTasks.forEach(task => {
        addTaskToDOM(task);
    });
    // Count the number of completed tasks
    count = savedTasks.filter(task => task.completed).length;
    // Update the task counter
    updateCounter();
});

// Function to update the task counter
function updateCounter() {
    const counter = document.getElementById("count");
    counter.innerHTML = count.toString();
}

// Function to add a task to the DOM
function addTaskToDOM(task) {
    const taskList = document.getElementById("task-list");

    // Create a new paragraph element for the task
    const taskItem = document.createElement("p");
    taskItem.className = "task-item";
    taskItem.id = "task-items";

    // Create a checkbox input element
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "checkbox";
    checkbox.checked = task.completed;
    // Add an event listener to the checkbox for task completion
    checkbox.addEventListener("change", function () {
        if (this.checked) {
            taskP.style.textDecoration = "line-through";
            // After a delay, remove the task from the DOM and update the counters
            setTimeout(() => {
                taskItem.remove();
                count++;
                updateCounter();
                currentAmount--;
                saveTasksToLocalStorage();
            }, 1500);
        } else {
            taskP.style.textDecoration = "none";
            count--;
            updateCounter();
            saveTasksToLocalStorage();
        }
    });

    // Create a paragraph element for the task text
    const taskP = document.createElement("p");
    taskP.innerText = task.text;

    // Append the checkbox and task text to the task item and add it to the task list
    taskItem.appendChild(checkbox);
    taskItem.appendChild(taskP);
    taskList.appendChild(taskItem);

    // Increment the current task count
    currentAmount++;
    // Save the tasks to local storage
    saveTasksToLocalStorage();
}

// Function to save tasks to local storage
function saveTasksToLocalStorage() {
    // Get all task items, map them to an array of task objects, and save to local storage
    const tasks = Array.from(document.querySelectorAll(".task-item")).map(taskItem => ({
        text: taskItem.querySelector("p").innerText,
        completed: taskItem.querySelector("input").checked
    }));
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Function to add a new task
function buttontask() {
    // Check if the current amount of tasks is less than the limit
    if (currentAmount < limit) {
        // Get the input field for the task and add it to the DOM
        const inputField = document.getElementById("task-input");
        addTaskToDOM({ text: inputField.value, completed: false });
        // Clear the input field after adding the task
        inputField.value = "";
    } else {
        // Alert the user if the task limit is reached
        alert("You've reached your limits for tasks. Remove some to be able to add more tasks.");
    }
}

// Function to switch to a dark theme
function darktheme() {
    // Get the body element
    let bodybg = document.getElementById("body");
    // Apply dark theme styles
    bodybg.style.background = "#151515";
    bodybg.style.color = "white";
}