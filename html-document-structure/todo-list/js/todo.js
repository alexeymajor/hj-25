'use strict';

class Todo {
    constructor(container) {
        this.container = container;
        this.done = container.querySelector('.done');
        this.undone = container.querySelector('.undone');

        this.tasks = Array.from(container.getElementsByTagName('label'));

        const onChange = (event) => {
            if (event.target.checked) {
                this.done.appendChild(event.target.parentElement);
                return;
            }

            this.undone.appendChild(event.target.parentElement);
        };

        this.tasks.forEach(task => {
            const checkbox = task.getElementsByTagName('input')[0];
            checkbox.addEventListener('change', onChange);
            onChange({target: checkbox})

        })

    }
}

Array.from(document.getElementsByClassName('todo-list')).forEach(
    container => new Todo(container)
);