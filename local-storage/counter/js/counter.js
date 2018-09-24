'use strict';

const increment = document.getElementById('increment');
const decrement = document.getElementById('decrement');
const reset = document.getElementById('reset');
const counter = document.getElementById('counter');

showCounts();

increment.addEventListener('click', evt => {
    localStorage.counts = Number(localStorage.counts) + 1;
    showCounts();
});

decrement.addEventListener('click', evt => {
    localStorage.counts = Number(localStorage.counts) - 1;
    showCounts();
});

reset.addEventListener('click', evt => {
    localStorage.counts = 0;
    showCounts();
});

function showCounts() {
    counter.textContent = localStorage.counts;
    console.log(localStorage.counts);
}
