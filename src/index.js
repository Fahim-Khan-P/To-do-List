// const { remove } = require('lodash');
require('./style.css');

const inputText = document.getElementById('input');
// const clearBtn = document.getElementById('clear');
const tasks = localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : [];
const listcontainer = document.getElementById('listcontainer');

class Task {
  constructor(description, index) {
    this.description = description;
    this.completed = false;
    this.index = index;
  }
}

const addTask = (description) => {
  const task = new Task(description, tasks.length + 1);
  const newTasks = [...tasks, task];
  localStorage.setItem('tasks', JSON.stringify(newTasks));
  document.location.reload();
};

inputText.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    const description = inputText.value;
    addTask(description);
    // alert('fdjlaskfl');
  }
});

const removeTask = (index) => {
  let newTasks = tasks.filter((task) => task.index !== index);
  newTasks = newTasks.map((task, index) => {
    task.index = index + 1;
    return task;
  });
  localStorage.setItem('tasks', JSON.stringify(newTasks));
  document.location.reload();
};

const updateTask = (index, editedText) => {
  const newTasks = tasks.filter((item) => item.index !== index);

  const newTask = new Task(editedText.value, index);
  newTasks.splice(index - 1, 0, { ...newTask });

  localStorage.setItem('tasks', JSON.stringify(newTasks));
  document.location.reload();
};

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
  const menuOk = document.createElement('i');
  menuOk.classList.add('fas');
  menuOk.classList.add('fa-trash');
  menuOk.classList.add('menuOk');
  menuOk.addEventListener('click', () => {
    removeTask(index);
  });

  item.append(editedText, menuOk);
};

tasks.forEach((element) => {
  // if (element.index !== 0) {
  const li = document.createElement('li');
  li.setAttribute('id', element.index);
  li.classList.add('dynamicList');

  const check = document.createElement('input');
  check.setAttribute('type', 'checkbox');

  const todoText = document.createElement('label');
  todoText.innerHTML = element.description;

  const listItemIcon = document.createElement('i');
  listItemIcon.classList.add('listItemIcon');
  listItemIcon.classList.add('fas');
  listItemIcon.classList.add('fa-ellipsis-v');

  listItemIcon.addEventListener('click', () => {
    editTask(element.index);
  });

  li.append(check, todoText, listItemIcon);
  listcontainer.append(li);
  //   }
  //   inputText.value = '';
  // });
});