const form = document.forms[0];
const taskInput = document.getElementById("task-input");

const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
console.log(tasks);

renderTasks();

form.onsubmit = function (event) {
  event.preventDefault();

  const newTask = {
    id: Date.now(),
    text: taskInput.value,
    done: false,
  };

  tasks.push(newTask);
  taskInput.value = "";

  localStorage.setItem("tasks", JSON.stringify(tasks));

  renderTasks();
};

function renderTasks() {
  const container = document.querySelector(".tasks-container");
  container.innerHTML = "";

  tasks.forEach((task, index) => {
    // {}
    const li = document.createElement("li");
    const span = document.createElement("span");

    span.textContent = task.text;
    li.append(span);

    if (task.done == true) {
      span.style.textDecoration = 'line-through';
    }

    const button = document.createElement("button");
    button.textContent = "✓";
    button.onclick = function () {
      if (tasks[index].done == true) {
        tasks[index].done = false;
      } else {
        tasks[index].done = true;
      }

      localStorage.setItem("tasks", JSON.stringify(tasks));
      renderTasks();

      console.log(tasks);
    };

    li.append(button);

    container.append(li);
  });
}
