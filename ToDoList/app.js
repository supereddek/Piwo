const $todoForm = document.querySelector('#js-todo-form'),
    $todoBody = document.querySelector('.js-todo-body'),
    $count = document.querySelector('.js-count'),
    $clear = document.querySelector('.js-clear')

//lista tasków
let todos = []

//event listener
window.addEventListener('load', handleWindowLoad)
$todoForm.addEventListener('submit', handleFormSubmit)
$todoBody.addEventListener('click', handleFormAction)


function handleWindowLoad() {
    //get local storage data
    const localStorageTodos = JSON.parse(localStorage.getItem('todos'))
    //if empty, make todos empty array
    todos = localStorageTodos || []
    //show empty state if it's empty
    if (todos.length === 0) {
        renderEmptyState()
    } else {
        renderToDoList()
        todos.map((todo) => {
            renderToDo(todo)
        })
    }

    //Show how many items are in the list
    updateListCount()
}

function renderEmptyState() {
    $todoBody.innerHTML = `<div class="empty">
      <img src="./empty.png" alt="empty state">
      <p class="title">It's lonely here...</p>
    </div>`;
  }

function renderToDoList() {
    $todoBody.innerHTML = '<ul class="todo__list js-todo-list"></ul>'
}

function renderToDo(todo) {
    let toDoList = `<li data-id="${todo.id}" data-status="${todo.status}">
        <label for="${todo.id}">
            <input type="checkbox" id="${todo.id}" value="${todo.id}"
            ${todo.status === 'completed' ? 'checked' : null} />
            <input type="text" value="${todo.task}" readonly/>
        </label>
        <div class="actions">
            <button class="js-edit">
                <i class="ri-edit-2-fill"></i>
            </button>
            <button class="js-delete">
                <i class="ri-delete-bin-line"></i>
            </button>
        </li>`

        $todoBody.querySelector('.js-todo-list').innerHTML += toDoList
}
  
function updateListCount() {
    $count.innerHTML = `${todos.length} items left`
}
  
function handleFormSubmit(e) {
    //prevent page from refreshing on submit
    e.preventDefault()
    const $input = this.querySelector('input'),
        todo = $input.value,
        myTodo = { id: Date.now(), task: todo, status: 'pending'}
    todos.push(myTodo)
    localStorage.setItem('todos', JSON.stringify(todos))
    $input.value = ''

    if (todos.length === 1) renderToDoList()

    renderToDo(myTodo)
    updateListCount()
}

function handleFormAction(e) {
    updateStatus(e)
}

function updateStatus(e) {
    //target checkbox element
    const $status = e.target.closest('input[type="checkbox"]')
    //chceck if element is checkbox
    if (!$status) return

    const $li = $status.closest('li')
    const id = $li.dataset.id
    const status = $status.checked ? 'completed' : 'pending'

    // update the status in the todos array
    const todoIndex = todos.findIndex(todo => todo.id === Number(id))
    todos[todoIndex].status = status

    // update the status in the local storage
    localStorage.setItem('todos', JSON.stringify(todos))

    // update the status in the DOM
    $li.dataset.status = status

    // update the count of items left
    updateListCount()
}
