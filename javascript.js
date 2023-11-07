//tasks limits
let limit = 7;
//current tasks count
let currentAmount = 0;
//number of tasks done
let count = 0;
function buttontask() {
    //set limits for how many tasks you can make, if current is smaller than limit, let user make tasks
    if (currentAmount < limit) {
        // Get the input field, task div, and task list
        const inputField = document.getElementById("task-input");
        const taskList = document.getElementById("task-list");
        //making the counter ready
        const counter = document.getElementById("count");
        // Create a new list item element to hold the task
        const taskItem = document.createElement("p");
        taskItem.className = "task-item";
        taskItem.id = "task-items";

        // Create a checkbox element
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.className = "checkbox";
        checkbox.addEventListener("change", function () {
            if (this.checked) {
                taskP.style.textDecoration = "line-through";
                //if checkbox is checked , remove the task after certain time
                setTimeout(() => {
                    taskItem.remove();
                    //when a task is deleted add one to the counter
                    count++;
                    //convert counter number to string and replace the label's inner html with the counter text
                    counter.innerHTML = count.toString();
                    //when task is removed, minus the amount of tasks removed from the task count
                    currentAmount--;
                }, 1500);
            } else {
                taskP.style.textDecoration = "none";
            }
        });

        // Create a new paragraph element to hold the task text
        const taskP = document.createElement("p");
        taskP.innerText = inputField.value;

        // Append the checkbox and task paragraph to the task item
        taskItem.appendChild(checkbox);
        taskItem.appendChild(taskP);

        // Append the task item to the task list
        taskList.appendChild(taskItem);

        // Clear the input field
        inputField.value = "";
        //after task is created, add 1 to the amount of tasks
        currentAmount++;
    }
    else {
        alert("you've reached your limits for tasks, remove some to be able to add more tasks.");
    }
}

function darktheme(){
    let bodybg = document.getElementById("body");
    let taskborder = document.getElementById("task-items");
    let counterborder = document.getElementById("taskcounters");
    bodybg.style.background = "#151515";
    bodybg.style.color = "white";
    // taskborder.style.borderColor = "white";
    counterborder.style.borderColor = "LightGreen";
}