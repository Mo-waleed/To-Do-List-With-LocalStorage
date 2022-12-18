////////////////////////////////////////////
////////////////////////////////////////////
let input = document.querySelector(".input");
let submit = document.querySelector(".add");
let taskDiv = document.querySelector(".tasks");
const dragArea = document.querySelector(".delete")
//empty array to store the tasks
let arrayOfTasks = [];

//  check if theres tasks in localStorage.
if (localStorage.getItem("tasks")) {
  arrayOfTasks = JSON.parse(localStorage.getItem("tasks"));
}

// trigger get data from localStorage function
getDataFromLocalStorage();

// add tasks
submit.onclick = function () {
  if (input.value !== "") {
    addTaskToArray(input.value); // Add tasks to array of tasks
    input.value = ""; // empty input field
  }
};

// click on task element
taskDiv.addEventListener("click", (e) => {
  // delete button
  if (e.target.classList.contains("del")) {
    // remve task from localStorage
    deleteTaskWith(e.target.parentElement.getAttribute("data-id"));
    // remove element from page
    e.target.parentElement.remove();
  }
  // task element
  if (e.target.classList.contains("task")) {
    // toggle completed for the task
    toggleStatusTaskWith(e.target.getAttribute("data-id"));

    // toggle done class
    e.target.classList.toggle("done");
  }
});

function addTaskToArray(taskText) {
  // task Data
  let task = {
    id: Date.now(),
    title: taskText,
    completed: false,
  };
  //push tasks to array of tasks
  arrayOfTasks.push(task);
  // add tasks to page
  addElementsToPageFrom(arrayOfTasks);
  // add tasks to local storge
  addDataToLocalStorgeFrom(arrayOfTasks);
}

function addElementsToPageFrom(arrayOfTasks) {
  // empty the tasks div
  taskDiv.innerHTML = "";
  // looping on array of tasks .
  arrayOfTasks.forEach((task) => {
    // create main div
    let div = document.createElement("div");
    div.className = "task";
    // check if task is done
    if (task.completed === true) {
      div.className = "task done";
    }
    div.setAttribute("data-id", task.id);
    div.appendChild(document.createTextNode(task.title));
    // create delete button
    let span = document.createElement("span");
    span.className = "del";
    span.appendChild(document.createTextNode("Delete"));
    // append button
    div.appendChild(span);
    // add task div to tasks container
    taskDiv.appendChild(div);
  });
}

function addDataToLocalStorgeFrom(arrayOfTasks) {
  window.localStorage.setItem("tasks", JSON.stringify(arrayOfTasks));
}

function getDataFromLocalStorage() {
  let data = window.localStorage.getItem("tasks");
  if (data) {
    let tasks = JSON.parse(data);
    addElementsToPageFrom(tasks);
  }
}

function deleteTaskWith(taskId) {
  arrayOfTasks = arrayOfTasks.filter((task) => task.id != taskId);
  addDataToLocalStorgeFrom(arrayOfTasks);
}

function toggleStatusTaskWith(taskId) {
  for (var i = 0; i < arrayOfTasks.length; i++) {
    if (arrayOfTasks[i].id == taskId) {
      arrayOfTasks[i].completed == false
        ? (arrayOfTasks[i].completed = true)
        : (arrayOfTasks[i].completed = false);
    }
  }
  addDataToLocalStorgeFrom(arrayOfTasks);
}
new Sortable(dragArea, {
  animation:350
});
