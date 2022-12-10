let tasks = localStorage.getItem('tasks')
  ? JSON.parse(localStorage.getItem('tasks'))
  : [];
// arrow function for state
// eslint-disable-next-line import/prefer-default-export
export const changeStatus = (index) => {
  tasks = tasks.map((task) => {
    if (task.index === index) {
      const test = task.completed;
      if (test) {
        task.completed = false;
      } else {
        task.completed = true;
      }
    }
    return task;
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
  document.location.reload();
};
