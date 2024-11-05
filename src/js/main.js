
const form = document.querySelector('#form');
const formInput = document.querySelector('#formInput');
const tasksList = document.querySelector('#tasksList');
const emptyList = document.querySelector('#emptyList');

let tasks = [];

if(localStorage.getItem('tasks')) {
    tasks = JSON.parse(localStorage.getItem('tasks'));
    tasks.forEach((task) => renderTask(task));
}


checkTaskList();

form.addEventListener('submit', assTask);
tasksList.addEventListener('click', deleteTask);
tasksList.addEventListener('click', doneTask);


function assTask (event) {
    event.preventDefault();

    const taskText = formInput.value;

    const newTask = {
        id: Date.now(),
        title: taskText,
        done: false
    };

    tasks.push(newTask);

    renderTask(newTask);

    formInput.value = "";
    formInput.focus();

    checkTaskList();

    saveToLocalStorage()
}

function deleteTask(event) {
    if(event.target.dataset.action !== 'delete') return;

    const parentNode = event.target.closest('.tasks-list-item')

    const id = Number(parentNode.id)

    const index = tasks.findIndex((task) => task.id === id)
    tasks.splice(index, 1)
    parentNode.remove()

    checkTaskList();

    saveToLocalStorage()
}

function doneTask(event) {
    if(event.target.dataset.action !== 'done') return;

    const parentNode = event.target.closest('.tasks-list-item');

    const id = Number(parentNode.id);

    const task = tasks.find((task) =>  task.id === id);
    task.done = !task.done

    const taskTitle = parentNode.querySelector('span');
    taskTitle.classList.toggle('task-title-done');

    saveToLocalStorage()
}


function checkTaskList () {
    if(tasks.length === 0) {
        const emptyListElement = `
            <li id="emptyList" class="empty-list">
                <img src="../src/assets/to-do-list.png" height="100" width="100"/>
            </li>`;
        tasksList.insertAdjacentHTML('afterbegin', emptyListElement)
    }

    if (tasks.length > 0) {
        const emptyListEl = document.querySelector('#emptyList');
        emptyListEl ? emptyListEl.remove() : null;
    }
}

function saveToLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks))
}

function renderTask(task) {
    const cssClass = task.done ? "task-title task-title-done" : "task-title";

    const taskHTML = ` 
                    <li id="${task.id}" class="tasks-list-item">
                        <span class="${cssClass}">${task.title}</span>
                        <div class="list-btn">
                            <button type="button" data-action="done" class="task-button">
                                <img src="../src/assets/Check.png"/>
                            </button>
                            <button type="button" data-action="delete" class="task-button">
                                <img src="../src/assets/TrashSimple.png"/>
                            </button>
                        </div>
                    </li>`;

    tasksList.insertAdjacentHTML('beforeend', taskHTML);

}