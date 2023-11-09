const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const taskList = JSON.parse(localStorage.getItem("taskList")) || [];

function addTask() {
  const taskDescription = inputBox.value.trim();

  if (!taskDescription) {
    alert("You must write something!");
    return;
  }

  const task = {
    description: taskDescription,
    completed: false,
  };

  taskList.push(task);
  updateTaskList();
  inputBox.value = "";
}

function updateTaskList() {
  listContainer.innerHTML = "";
  taskList.forEach((task, index) => {
    const li = document.createElement("li");
    li.textContent = task.description;
    if (task.completed) {
      li.classList.add("checked");
    }

    const deleteButton = document.createElement("span");
    deleteButton.innerHTML = "\u00d7";
    deleteButton.addEventListener("click", () => deleteTask(index));

    li.appendChild(deleteButton);
    li.addEventListener("click", () => toggleCompleted(index));
    listContainer.appendChild(li);
  });

  saveData();
}

function toggleCompleted(index) {
  taskList[index].completed = !taskList[index].completed;
  updateTaskList();
}

function deleteTask(index) {
  taskList.splice(index, 1);
  updateTaskList();
}

function saveData() {
  localStorage.setItem("taskList", JSON.stringify(taskList));
}

updateTaskList();
