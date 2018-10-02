'use strict';

const canvas = document.getElementById('draw');

const ctx = draw.getContext('2d');
ctx.lineJoin = 'round';
ctx.lineCap = 'round';

let drawing = false;

resize();

window.addEventListener('resize', () => {
    resize();
});

canvas.addEventListener("mousedown", () => {
    drawing = true;
});

canvas.addEventListener("mouseup", () => {
    drawing = false;
});

canvas.addEventListener("mouseleave", () => {
    drawing = false;
});

canvas.addEventListener("mousemove", (e) => {
    if (!drawing) {
        return;
    }

    const point = [e.offsetX, e.offsetY];
    const color = getColor(e.shiftKey);
    drawPoint(point, lineWidth, color);

});

canvas.addEventListener('dblclick', () => {
    ctx.clearRect(0, 0, draw.width, draw.height);
});

function drawPoint(point, size, color) {
    ctx.beginPath();
    ctx.fillStyle = `hsl(${color}, 100%, 50%)`;
    ctx.arc(...point, size, 0, 2 * Math.PI);
    ctx.fill();
}

function resize() {
    const width = window.innerWidth;
    const height = window.innerHeight;

    canvas.setAttribute('width', width);
    canvas.setAttribute('height', height);

    ctx.clearRect(0, 0, width, height);
}

const MIN_COLOR = 0;
const MAX_COLOR = 359;
let curColor = 0;

function getColor(up) {
    up ? curColor++ : curColor--;

    if (curColor < MIN_COLOR) {
        curColor = MAX_COLOR;
        return curColor;
    }

    if (curColor > MAX_COLOR) {
        curColor = MIN_COLOR;
    }

    return curColor;
}


const MAX_LINE_WIDTH = 100;
const MIN_LINE_WIDTH = 5;
let lineWidth = MIN_LINE_WIDTH;

let lineUp = true;

function tick() {

    if (lineUp) {
        lineWidth++;
        lineUp = lineWidth < MAX_LINE_WIDTH;
    } else {
        lineWidth--;
        lineUp = !(lineWidth > MIN_LINE_WIDTH);
    }

    window.requestAnimationFrame(tick);
}

tick();