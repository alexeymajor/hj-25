'use strict';

const counts = document.querySelector('.counter');
const errors = document.querySelector('.errors');

const ws = new WebSocket('wss://neto-api.herokuapp.com/counter');

ws.addEventListener('message', event => {
    const data = JSON.parse(event.data);
    counts.textContent = data.connections;
    errors.textContent = data.errors;
});

window.addEventListener('beforeunload', event => {
    ws.close(1000, 'closed')
});