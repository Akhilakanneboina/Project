document.addEventListener('DOMContentLoaded', () => {
    const addTaskBtn = document.getElementById('add-task-btn');
    const modal = document.getElementById('modal');
    const closeModal = document.getElementById('close-modal');
    const taskForm = document.getElementById('task-form');
    const taskList = document.getElementById('task-list');
    const filterBtns = document.querySelectorAll('.filter-btn');

    let tasks = [];

    function renderTasks(filter = 'all') {
        taskList.innerHTML = '';
        const filteredTasks = tasks.filter(task => filter === 'all' || task.status === filter);
        filteredTasks.forEach((task, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${task.title}</td>
                <td>${task.dueDate}</td>
                <td>${task.status}</td>
                <td>
                    <button onclick="editTask(${index})">Edit</button>
                    <button onclick="deleteTask(${index})">Delete</button>
                </td>
            `;
            taskList.appendChild(row);
        });
    }

    window.editTask = function(index) {
        const task = tasks[index];
        document.getElementById('title').value = task.title;
        document.getElementById('due-date').value = task.dueDate;
        document.getElementById('status').value = task.status;
        tasks.splice(index, 1);
        renderTasks();
        modal.style.display = 'block';
    };

    window.deleteTask = function(index) {
        tasks.splice(index, 1);
        renderTasks();
    };

    taskForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const title = document.getElementById('title').value;
        const dueDate = document.getElementById('due-date').value;
        const status = document.getElementById('status').value;

        if (title && dueDate) {
            tasks.push({ title, dueDate, status });
            renderTasks();
            modal.style.display = 'none';
            taskForm.reset();
        }
    });

    addTaskBtn.addEventListener('click', () => {
        modal.style.display = 'block';
    });

    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const status = btn.getAttribute('data-status');
            renderTasks(status);
        });
    });
    
    window.sortTable = function() {
        tasks.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
        renderTasks();
    };
});
