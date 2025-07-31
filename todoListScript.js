let Tasks = [{
    title: "",
    date: "",
    isDone: false,
  }];
function getTasksFromStore() {
  let retrievedTasks = JSON.parse(localStorage.getItem("tasks"));
  Tasks = retrievedTasks ?? [];
}
getTasksFromStore();
function fillTasksOnThePage() {
  document.getElementById("tasks").innerHTML = "";
  let index = 0;
  for (task of Tasks) {
    let content = `<div class="task ${task.isDone ? "done" : ""}">
                <!-- INFO-TASK -->
                <div style="width: 70%">
                    <h2>${task.title}</h2>
                    <div>
                    <span>${task.date}</span>
                    </div>
                </div>
                <!-- INFO-TASK // -->

                <!-- TASK-ACTIONS -->
                <div
                    style="
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    width: 20%;
                    color: white;
                    "
                >
                    <button
                    class="circular"
                    style="background-color: #fa4a14; color: white"
                    >
                    <span onclick="deleteTask(${index})" class="material-symbols-outlined"> delete </span>
                    </button>
                    ${
                      task.isDone
                        ? `
                    <button
                    class="circular"
                    style="background-color:rgb(225, 50, 50); color: white"
                    >
                    <span onclick="toggleTaskCompletion(${index})" class="material-symbols-outlined"> close </span>
                    </button>
                    `
                        : `
                    <button
                    class="circular"
                    style="background-color: #32e141; color: white"
                    >
                    <span onclick="toggleTaskCompletion(${index})" class="material-symbols-outlined"> check </span>
                    </button>
                    `
                    }
                    
                    <button
                    class="circular"
                    style="background-color: #f9cd49; color: white"
                    >
                    <span onclick="editTask(${index})" class="material-symbols-outlined"> edit </span>
                    </button>
                </div>
                <!-- TASK-ACTIONS // -->
                </div>
            `;
    document.getElementById("tasks").innerHTML += content;
    index++;
  }
}
fillTasksOnThePage();
document.getElementById("add-btn").addEventListener("click", function () {
  let now = new Date();
  let date =
    now.getDate() + "/" + (now.getMonth() + 1) + "/" + now.getFullYear();
  let titleName = prompt("add new title : ");
  if (titleName) {
    let taskObj = {
      title: titleName,
      date: date,
      isDone: false,
    };
    Tasks.push(taskObj);
    storeTasks();
  }
  fillTasksOnThePage();
});

function deleteTask(index) {
  let task = Tasks[index];
  let isCondimed = confirm(`هل أنت متأكد من حذف : ${task.title}`);
  if (isCondimed) {
    Tasks.splice(index, 1);
    storeTasks();
    fillTasksOnThePage();
  }
}

function editTask(index) {
  let task = Tasks[index];
  let newTitle = prompt("أدخل اسم المهمة الجديد :", task.title);
  if (newTitle) {
    task.title = newTitle;
    storeTasks();
    fillTasksOnThePage();
  }
}

function toggleTaskCompletion(index) {
  Tasks[index].isDone = !Tasks[index].isDone;
  storeTasks();
  fillTasksOnThePage();
}

// ========Storage function============//

function storeTasks() {
  let stringTasks = JSON.stringify(Tasks);
  localStorage.setItem("tasks", stringTasks);
}
