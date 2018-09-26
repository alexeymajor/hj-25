'use strict';

const ws = new WebSocket('wss://neto-api.herokuapp.com/mouse');

ws.addEventListener('open', showBubbles(ws));

document.addEventListener('click', event => {
    ws.send(JSON.stringify({
        x: event.clientX,
        y: event.clientY
    }));
});
