'use strict';

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const STAR_COLORS = ['#ffffff', '#ffe9c4', '#d4fbff'];

canvas.addEventListener('click', generateStarMap);

generateStarMap();

function generateStarMap() {
    ctx.beginPath();

    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    // ctx.fill();

    const starz = Math.round(getRandom(200, 400));


    for (let i = 1; i <= starz; i++) {
        ctx.beginPath();
        const x = Math.round(getRandom(0, canvas.width));
        const y = Math.round(getRandom(0, canvas.height));
        const r = getRandom(0, 1.1);

        ctx.fillStyle = STAR_COLORS[Math.round(getRandom(0, 2))];
        ctx.globalAlpha = getRandom(0.8, 1);
        ctx.arc(x, y, r, 0, 2 * Math.PI);
        ctx.fill();
    }

    ctx.closePath();
}

function getRandom(from, to) {
    return from + ((to - from) * Math.random());
}
