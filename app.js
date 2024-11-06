// Selects key DOM elements for task form, task list, and theme toggle button
const taskForm = document.getElementById('task-form')
const taskList = document.getElementById('task-list')
const themeToggleButton = document.getElementById("toggle-theme-btn");

loadTask();

/**
 * Event listener for form submission to add a new task.
 * Prevents default form submission, checks for input, and adds task to the list.
 */
taskForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const taskInput = document.getElementById('task-input');
  const task = taskInput.value;
  if(task) {
    taskList.append(createTaskElement(task));
    storeTaskInLocalStorage(task);
    taskInput.value = '';
  }
});

/**
 * Creates a new task list item element.
 * @param {string} task - The task description.
 * @returns {HTMLElement} li - The list item element containing the task text and control buttons.
 */
function createTaskElement(task) {
  const li = document.createElement('li');
  li.textContent = task;
  li.append(createButton('❌', 'delete-btn'), createButton('🖊️', 'edit-btn'));
  return li;
}

/**
 * Creates a button element for task controls.
 * @param {string} text - The button's text content.
 * @param {string} className - The CSS class for styling the button.
 * @returns {HTMLElement} btn - The button element with text and class.
 */
function createButton(text, className) {
  const btn = document.createElement('span');
  btn.textContent = text;
  btn.className = className;
  return btn;
}

/**
 * Handles task list actions: delete or edit based on button clicked.
 */
taskList.addEventListener("click", (event) => {
  if(event.target.classList.contains("delete-btn")){
    deleteTask(event.target.parentElement);
  } else if (event.target.classList.contains("edit-btn")){
    editTask(event.target.parentElement);
  }
});

/**
 * Deletes a task from the list after user confirmation.
 * @param {HTMLElement} taskItem - The task item to delete.
 */
function deleteTask(taskItem) {
  if(confirm("Are you sure?")) {
    taskItem.remove();
    updateLocalStorage();
  }
}

/**
 * Edits a task's text by prompting the user for a new description.
 * @param {HTMLElement} taskItem - The task item to edit.
 */
function editTask(taskItem) {
  const newTask = prompt("Edit task:", taskItem.firstChild.textContent);
  if(newTask !== null) {
    taskItem.firstChild.textContent = newTask;
    updateLocalStorage();
  }
}

/**
 * Stores a new task in localStorage.
 * @param {string} task - The task description to store.
 */
function storeTaskInLocalStorage(task) {
  const tasks = JSON.parse(localStorage.getItem('tasks') || "[]");
  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

/**
 * Loads tasks from localStorage and displays them in the task list.
 */
function loadTask() {
  const tasks = JSON.parse(localStorage.getItem('tasks') || "[]");
  tasks.forEach(task => {
    taskList.appendChild(createTaskElement(task));
  });
}

/**
 * Updates localStorage with the current list of tasks.
 */
function updateLocalStorage() {
  const tasks = Array.from(taskList.querySelectorAll("li")).map(
    (li) => li.firstChild.textContent
  );
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Theme toggle and persistence using localStorage
const currentTheme = localStorage.getItem('theme');

/**
 * Toggles theme between light and dark mode on button click, saving the preference to localStorage.
 */
themeToggleButton.addEventListener('click', () => {
  document.body.classList.toggle("dark-theme");
  const theme = document.body.classList.contains("dark-theme") ? "dark" : "light";
  localStorage.setItem("theme", theme);
});

// Applies saved theme on page load
if(currentTheme === 'dark') {
  document.body.classList.add('dark-theme');
}
