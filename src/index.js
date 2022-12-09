// const { remove } = require('lodash');
import { changeStatus } from './changeState.js';

require('./style.css');

const inputText = document.getElementById('input');
const clearBtn = document.getElementById('clear');

// getting tasks from localStorage
const tasks = localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : [];
const listcontainer = document.getElementById('listcontainer');

// task class constructor
class Task {
  constructor(description, index) {
    this.description = description;
    this.completed = false;
    this.index = index;
  }
}

// -----------------------------function for taks addition------------------------------
const addTask = (description) => {
  // Task class object creation to access Task index, description and status
  const task = new Task(description, tasks.length + 1);
  const newTasks = [...tasks, task];
  localStorage.setItem('tasks', JSON.stringify(newTasks));
  document.location.reload();
};

// ---------------textBox enter func that add tasks on calling add functuion-------------
inputText.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    const description = inputText.value;
    addTask(description);
  }
});

// ---------------------function for removing the exact task--------------------
const removeTask = (index) => {
  let newTasks = tasks.filter((task) => task.index !== index);
  newTasks = newTasks.map((task, index) => {
    task.index = index + 1;
    return task;
  });
  localStorage.setItem('tasks', JSON.stringify(newTasks));
  document.location.reload();
};

// clearBtn function that remove all completed status
clearBtn.addEventListener('click', () => {
  let updatedTasks = tasks.filter((task) => task.completed !== true);
  updatedTasks = updatedTasks.map((task, index) => {
    task.index = index + 1;
    return task;
  });
  localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  document.location.reload();
});

// function for updating the edited tasks
const updateTask = (index, editedText) => {
  const newTasks = tasks.filter((item) => item.index !== index);

  const newTask = new Task(editedText.value, index);
  newTasks.splice(index - 1, 0, { ...newTask });

  localStorage.setItem('tasks', JSON.stringify(newTasks));
  document.location.reload();
};

// function that worked just on edition and call update function
const editTask = (index) => {
  const task = tasks[index - 1];
  const item = document.getElementById(index);
  item.innerHTML = '';
  const editedText = document.createElement('input');
  editedText.classList.add('editedText');
  editedText.value = task.description;
  editedText.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      updateTask(index, editedText);
    }
  });

  // deletedIcon related EventListener
  const deletedIcon = document.createElement('i');
  deletedIcon.classList.add('fas');
  deletedIcon.classList.add('fa-trash');
  deletedIcon.classList.add('deletedIcon');
  deletedIcon.addEventListener('click', () => {
    removeTask(index);
  });

  item.append(editedText, deletedIcon);
};

// building the staracture of our tasks
tasks.forEach((element) => {
  // if (element.index !== 0) {
  const li = document.createElement('li');
  li.setAttribute('id', element.index);
  li.classList.add('dynamicList');

  const check = document.createElement('input');
  check.setAttribute('type', 'checkbox');
  check.addEventListener('change', () => {
    changeStatus(element.index);
  });

  const todoText = document.createElement('label');
  todoText.innerHTML = element.description;
  if (element.completed) {
    todoText.style.textDecoration = 'line-through';
    todoText.style.color = '#999';
    check.checked = true;
  }

  const listItemIcon = document.createElement('i');
  listItemIcon.classList.add('listItemIcon');
  listItemIcon.classList.add('fas');
  listItemIcon.classList.add('fa-ellipsis-v');

  listItemIcon.addEventListener('click', () => {
    editTask(element.index);
  });

  li.append(check, todoText, listItemIcon);
  listcontainer.append(li);
});
