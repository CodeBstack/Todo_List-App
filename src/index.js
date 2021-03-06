// const { findIndex } = require("core-js/core/array");

const form = document.querySelector('.form');
const formInput = document.querySelector('.form__input');
const list = document.querySelector('.todo-lists');
// const navFooter = document.querySelector('.footer-nav');
// const active = document.querySelector('.active');
// const completed = document.querySelector('.completed');

const toggleThemeBtn1 = document.querySelector('.toggle-theme-1');
const toggleThemeBtn2 = document.querySelector('.toggle-theme-2');

toggleThemeBtn1.addEventListener('click', function () {
  document.querySelector('body').classList.add('dark');
  document.querySelector('.box').classList.add('dark-box');
  toggleThemeBtn1.style.display = 'none';
  toggleThemeBtn2.style.display = 'block';
});

toggleThemeBtn2.addEventListener('click', function () {
  document.querySelector('body').classList.remove('dark');
  document.querySelector('.box').classList.remove('dark-box');
  toggleThemeBtn1.style.display = 'block';
  toggleThemeBtn2.style.display = 'none';
});

let todoList = [];

const renderTodo = function (todo) {
  const list = document.querySelector('.todo-lists');
  const item = document.querySelector(`[data-key='${todo.id}']`);

  // To persist the data
  localStorage.setItem('todoItemsRef', JSON.stringify(todoList));

  // To remove deleted element from DOM
  if (todo.deleted) {
    item.remove();

    // To activate the empty state in the css
    if (todoList.length === 0) {
      list.innerHTML = '';
    }
    return;
  }

  const isChecked = todo.checked ? 'done' : '';

  li = document.createElement('li');

  li.setAttribute('class', `todo-item ${isChecked}`);

  li.setAttribute('data-key', todo.id);

  const markup = `
    <input id="${todo.id}" type="checkbox"/>
    <label for="${todo.id}" class="tick"></label>
    <span>${todo.inputText}</span>
    <button class="delete">
    </button>
      `;

  li.insertAdjacentHTML('afterbegin', markup);

  if (item) {
    list.replaceChild(li, item);
  } else {
    list.append(li);
  }
};
let complete = [];

const addTodo = function (inputText) {
  const todo = {
    inputText,
    checked: false,
    id: Date.now(),
  };

  const counts = document.querySelector('.counts');
  todoList.push(todo);
  counts.innerHTML = `
      <p class="counts">${todoList.length} items left</p>

      `;
  renderTodo(todo);
};

const deleteTodo = function (key) {
  const i = todoList.findIndex(item => item.id === +key);
  const todo = {
    deleted: true,
    ...todoList[i],
  };
  console.log(todo);

  // this will filter just the elements that are not deleted and leave it in the todolist array.
  todoList = todoList.filter(item => item.id !== +key);
  // console.log(todoList);
  const counts = document.querySelector('.counts');
  counts.innerHTML = `
      <p class="counts">${todoList.length} items left</p>
      `;
  renderTodo(todo);
};

const toggle = function (key) {
  const i = todoList.findIndex(list => list.id === +key);
  todoList[i].checked = !todoList[i].checked;
  // console.log(todoList[i]);
  renderTodo(todoList[i]);
};

form.addEventListener('submit', function (e) {
  e.preventDefault();

  formInputValue = formInput.value;

  if (formInputValue !== '') {
    addTodo(formInputValue);
  }
  formInput.value = '';
  formInput.focus();
});


list.addEventListener('click', function (e) {
  // to mark completed task
  if (e.target.classList.contains('tick')) {
    const listKey = e.target.parentElement.dataset.key;

    toggle(listKey);
  }

  // Delete task
  if (e.target.classList.contains('delete')) {
    const listKey = e.target.parentElement.dataset.key;

    deleteTodo(listKey);
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const ref = localStorage.getItem('todoItemsRef');
  // console.log(ref);
  if (ref) {
    todoList = JSON.parse(ref);

    todoList.forEach(t => {
      renderTodo(t);
    });
    const counts = document.querySelector('.counts');
    counts.innerHTML = `
    <p class="counts">${todoList.length} items left</p>
    `;
  }
});

// const completedTodo = function (key) {
//   //   const index = todoList.findIndex(item => item.id === +key);
//   todoList.forEach((i) => {
//     const todo = {
//       completed: [],
//       ...todoList[i],
//     };
//     console.log(todo);
//   });
// };

// navFooter.addEventListener('click', function (e) {
//   if (e.target.classList.contains('completed')) {
//     const listKey = e.target.parentElement.dataset.key;
//     // console.log(e.target);
//     // console.log(listKey);
//     // completedTodo(listKey);
//   }
// });

// const completedTodo = function (key) {
//   todoList = todoList.filter(todo => {
//     if (!todo.checked) return;
//     complete.push(todo);
//   });

//   console.log(complete);
//   // renderTodo(complete[0]
// };

// completed.addEventListener('click', function (e) {
//   const listKey = todoList.map(todo => todo.id);
//   completedTodo(listKey);
// });
