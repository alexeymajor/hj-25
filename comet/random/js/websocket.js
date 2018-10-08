'use strict';

const node = document.querySelectorAll('.websocket div');
const ws = new WebSocket('wss://neto-api.herokuapp.com/comet/websocket');

ws.addEventListener('message', e => {

    const result = node[e.data - 1];

    node.forEach(el => el.classList.remove('flip-it'));
    result.classList.add('flip-it');

});

window.addEventListener('beforeunload' , () => {
    ws.close();
});
