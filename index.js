let tasks = [];
let currentTask = null;

document.getElementById('add-task-btn').addEventListener('click', function() {
    let name = document.getElementById('task-name').value;
    let desc = document.getElementById('task-desc').value;
    let priority = document.getElementById('task-priority').value;

    let task = {
        id: Date.now(),
        name: name,
        description: desc,
        priority: priority,
        completed: false
    };

    tasks.push(task);
    tasks.sort((a, b) => b.priority - a.priority);
    displayTasks();
});

function displayTasks(taskList = tasks) {
    let list = document.getElementById('task-list');
    list.innerHTML = '';

    for (let i = 0; i < taskList.length; i++) {
        let listItem = document.createElement('li');
        listItem.classList.add('list-group-item');
        listItem.classList.add('priority-' + taskList[i].priority);

        let taskInfo = document.createElement('div');
        taskInfo.innerHTML = `
            ${taskList[i].name} - ${taskList[i].description}
            <span class="badge badge-secondary">${taskList[i].priority}</span>
        `;
        listItem.appendChild(taskInfo);

        let actionButtons = document.createElement('div');
        actionButtons.classList.add('action-buttons');
        actionButtons.innerHTML = `
            <button id="done-${taskList[i].id}" class="btn btn-success"><i class="fas fa-check"></i></button>
            <button id="edit-${taskList[i].id}" class="btn btn-primary" data-toggle="modal" data-target="#editModal"><i class="fas fa-pencil-alt"></i></button>
            <button id="delete-${taskList[i].id}" class="btn btn-danger" disabled><i class="fas fa-times"></i></button>
        `;

        listItem.appendChild(actionButtons);

        list.appendChild(listItem);

        document.getElementById(`done-${taskList[i].id}`).addEventListener('click', function() {
            taskList[i].completed = true;
            document.getElementById(`delete-${taskList[i].id}`).disabled = false;
            listItem.classList.add('completed');
        });

        document.getElementById(`edit-${taskList[i].id}`).addEventListener('click', function() {
            currentTask = i;
            document.getElementById('edit-name').value = taskList[i].name;
            document.getElementById('edit-desc').value = taskList[i].description;
            document.getElementById('edit-priority').value = taskList[i].priority;
        });

        document.getElementById(`delete-${taskList[i].id}`).addEventListener('click', function() {
            if(taskList[i].completed) {
                tasks.splice(i, 1);
                displayTasks();
            }
        });
    }
}

document.getElementById('save-changes').addEventListener('click', function() {
    tasks[currentTask].name = document.getElementById('edit-name').value;
    tasks[currentTask].description = document.getElementById('edit-desc').value;
    tasks[currentTask].priority = document.getElementById('edit-priority').value;

    tasks.sort((a, b) => b.priority - a.priority);
    displayTasks();
    $('#editModal').modal('hide');
});

document.getElementById('search-title-btn').addEventListener('click', function() {
    let searchText = document.getElementById('search-input').value.toLowerCase();

    let filteredTasks = tasks.filter(task => task.name.toLowerCase().includes(searchText));

    if (filteredTasks.length == 0) {
        alert('Tarea no encontrada');
    } else {
        displayTasks(filteredTasks);
    }
});

document.getElementById('search-priority-btn').addEventListener('click', function() {
    let searchPriority = document.getElementById('search-input').value;

    let filteredTasks = tasks.filter(task => task.priority == searchPriority);

    if (filteredTasks.length == 0) {
        alert('Tarea no encontrada');
    } else {
        displayTasks(filteredTasks);
    }
});

document.getElementById('clear-search-btn').addEventListener('click', function() {
    displayTasks();
});
