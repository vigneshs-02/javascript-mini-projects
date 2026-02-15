document.addEventListener('DOMContentLoaded', () => {

    const taskInput = document.getElementById('task-input');
    const addTaskBtn = document.getElementById('add-task-bnt');
    const taskList = document.getElementById('task-list');
    const emptyImage = document.querySelector('.empty-image');
    const todosContainer = document.querySelector('.todos-cointainer');

    const toggleEmptyState = () => {
        const isEmpty = taskList.children.length === 0;
        emptyImage.style.display = isEmpty ? 'block' : 'none';
        todosContainer.style.width = isEmpty ? '60%' : '100%';
    };

    const addTask = (e, text = '', completed = false) => {
        if (e) e.preventDefault();

        const taskText = text || taskInput.value.trim();
        if (!taskText) return;

        const li = document.createElement('li');
        li.innerHTML = `
            <input type="checkbox" class="checkbox" ${completed ? 'checked' : ''}>
            <span>${taskText}</span>
            <div class="task-buttons">
                <button class="edit-bnt" type="button">
                    <span class="material-symbols-outlined">edit</span>
                </button>
                <button class="delete-bnt" type="button">
                    <span class="material-symbols-outlined">delete</span>
                </button>
            </div>
        `;

        const checkbox = li.querySelector('.checkbox');
        const editBtn = li.querySelector('.edit-bnt');
        const deleteBtn = li.querySelector('.delete-bnt');

        const updateCompletedState = (state) => {
            li.classList.toggle('completed', state);
            editBtn.disabled = state;
            editBtn.style.opacity = state ? '0.4' : '1';
            editBtn.style.pointerEvents = state ? 'none' : 'auto';
        };

        updateCompletedState(completed);

        checkbox.addEventListener('change', () => {
            updateCompletedState(checkbox.checked);
        });

        editBtn.addEventListener('click', () => {
            taskInput.value = li.querySelector('span').textContent;
            li.remove();
            toggleEmptyState();
        });

        deleteBtn.addEventListener('click', () => {
            li.remove();
            toggleEmptyState();
        });

        taskList.appendChild(li);
        taskInput.value = '';
        toggleEmptyState();
    };

    addTaskBtn.addEventListener('click', (e) => addTask(e));

    document.querySelector('.input-area').addEventListener('submit', (e) => {
        addTask(e);
    });

    toggleEmptyState();
});
