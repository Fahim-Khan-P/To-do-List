require('./style.css');

const inputText = document.getElementById('input');

const listcontainer = document.getElementById('listcontainer');

const todoArray = [
  {
    text: 'first',
    index: 1,
    complete: false,
  },
  {
    text: 'second',
    index: 2,
    complete: false,
  },
  {
    text: 'Third',
    index: 3,
    complete: false,
  },
];

// inputText.addEventListener('keypress', (e) => {
//     if(inputText.value !== '' && e.key == 'Enter'){
//     todoArray.push({
//         text: inputText.value,
//         index: todoArray.length,
//         complete: false,
//     })
//     show();
// }
//   });

const show = () => {
  listcontainer.innerHTML = '';
  todoArray.forEach((element) => {
    if (element.index !== 0) {
      const li = document.createElement('li');
      li.setAttribute('id', 'dynamicList');

      const check = document.createElement('input');
      check.type = 'checkbox';
      check.name = element.index;

      const lbl = document.createElement('label');
      lbl.innerHTML = element.text;
      li.append(lbl, check);
      listcontainer.append(li);
    }
    inputText.value = '';
  });
};
show();
