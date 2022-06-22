class App {

  #todoList = [];

  constructor() {
    this._getLocalStorage();
    form.addEventListener('submit', this._newTodo.bind(this));
    list.addEventListener('click', this._parentElemenntEventHandler.bind(this));
  }

  _renderTodo(todo) {
    const list = document.querySelector('.todo-lists');
    const item = document.querySelector(`[data-key='${todo.id}']`);
    const counts = document.querySelector('.counts');

    localStorage.setItem('todoItemsRef', JSON.stringify(this.#todoList));

    if (todo.deleted) {
      item.remove();

      if (this.#todoList.length === 0) {
        list.innerHTML = '';
      }
      return;
    }

    const isChecked = todo.checked ? 'done' : '';

    li = document.createElement('li');

    li.setAttribute('class', `todo-item ${isChecked}`);

    li.setAttribute('data-key', todo.id);

    li.innerHTML = `
            <input id="${todo.id}" type="checkbox"/>
            <label for="${todo.id}" class="tick js-tick"></label>
            <span>${todo.inputText}</span>
            <button class="delete">
            </button>
              `;

    counts.innerHTML = `
              <p class="counts">${this.#todoList.length} items left</p>
              
              `;

    if (item) {
      list.replaceChild(li, item);
    } else {
      list.append(li);
    }
  }

  _addTodo(inputText) {
    const todo = {
      inputText,
      checked: false,
      id: Date.now(),
    };

    this.#todoList.push(todo);

    _renderTodo(todo);
    //   console.log(this.#todoList);
  }

  _deleteTodo(key) {
    const index = this.#todoList.findIndex(item => item.id === +key);

    const todo = {
      deleted: true,
      ...this.#todoList[index],
    };
    // remove the todo item from the array by filtering it out
    this.#todoList = this.#todoList.filter(item => item.id !== +key);
    _renderTodo(todo);
  }

  _toggle(key) {
    const index = this.#todoList.findIndex(list => list.id === +key);
    console.log(index);
    this.#todoList[index].checked = !this.#todoList[index].checked;
    _renderTodo(this.#todoList[index]);
  }

  _newTodo(e) {
    e.preventDefault();

    const formInput = document.querySelector('.form__input');
    console.log(formInput);

    formInputValue = formInput.value;

    if (formInputValue !== '') {
      _addTodo(formInputValue);
    }
    formInput.value = '';
    formInput.focus();
  }

  _parentElemenntEventHandler(e) {
    // to mark completed task
    if (e.target.classList.contains('tick')) {
      const itemKey = e.target.parentElement.dataset.key;
      _toggle(itemKey);
    }

    // Delete task
    if (e.target.classList.contains('delete')) {
      const itemKey = e.target.parentElement.dataset.key;

      _deleteTodo(itemKey);
    }
  }

  _getLocalStorage() {
    const ref = localStorage.getItem('todoItemsRef');
    console.log(ref);
    if (ref) {
      this.#todoList = JSON.parse(ref);
      this.#todoList.forEach(t => {
        _renderTodo(t);
      });
    }
  }
}

const app = new App();