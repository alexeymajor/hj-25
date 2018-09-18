'use strict';

class Todo {
    constructor(container) {
        this.container = container;
        this.done = container.querySelector('.done');
        this.undone = container.querySelector('.undone');

        this.tasks = Array.from(container.getElementsByTagName('label'));

        this.tasks.forEach(task => {
            const checkbox = task.getElementsByTagName('input')[0];
            checkbox.addEventListener('change', e => this.onChange(e))
            this.onChange({target: checkbox})

        })

    }

    onChange(event) {
        if (event.target.checked) {
            this.done.appendChild(event.target.parentElement);
            return;
        }

        this.undone.appendChild(event.target.parentElement);
    }
}

Array.from(document.getElementsByClassName('todo-list')).forEach(
    container => new Todo(container)
);