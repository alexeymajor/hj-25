'use strict';

let tasks = [];
let block;
let counter;

document.addEventListener('DOMContentLoaded', init);

function init() {
    block = document.getElementsByClassName('list-block')[0];
    tasks = Array.from(block.getElementsByTagName('input'));
    tasks.forEach(task => {
       task.addEventListener('change', showCounts)
    });
    counter = block.getElementsByTagName('output')[0];
    showCounts();
}

function getCounts() {

    return tasks.reduce((count, task) => {
        if (task.checked) {
            count.complete++;
        }
        count.all++;

        return count;
    }, {all: 0, complete: 0})

}

function showCounts() {
    const counts = getCounts();
    if (counts.all === counts.complete) {
        block.classList.add('complete');
    } else {
        block.classList.remove('complete');
    }

    counter.innerHTML = `${counts.complete} из ${counts.all}`;

}