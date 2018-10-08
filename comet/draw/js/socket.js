'use strict';

const ws = new WebSocket('wss://neto-api.herokuapp.com/draw');

editor.addEventListener('update', () => {
    canvas.toBlob(img => ws.send(img));
});

window.addEventListener('beforeunload' , () => {
    ws.close();
})