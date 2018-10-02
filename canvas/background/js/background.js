'use strict';

function getRandom(from, to) {
    return from + ((to - from) * Math.random());
}

const timeFunctions = [
    function (x, y, time) {
        return {
            x: x + Math.sin((50 + x + (time / 10)) / 100) * 3,
            y: y + Math.sin((45 + x + (time / 10)) / 100) * 4
        };
    },
    function (x, y, time) {
        return {
            x: x + Math.sin((x + (time / 10)) / 100) * 5,
            y: y + Math.sin((10 + x + (time / 10)) / 100) * 2
        }
    }
];

class Figure {
    constructor(x, y) {
        this.size = getRandom(0.1, 0.6);
        this.nextPoint = timeFunctions[Math.round(getRandom(0,1))];
        this.lineWidth = 5 * this.size;
        this.color = '#ffffff';
        this.x = x;
        this.y = y;
    }

    draw() {}

}

class FigureX extends Figure {

    constructor(x, y) {
        super(x, y);
        this.side = 20 * this.size;
        this.rotationSpeed = getRandom(-0.2, 0.2);
        this.angle = getRandom(0, 360);
    }

    draw() {
        ctx.strokeStyle = this.color;
        ctx.lineWidth = this.lineWidth;
        const {x, y} = this.nextPoint(this.x, this.y, Date.now());
        this.angle += this.rotationSpeed;


        ctx.beginPath();
        ctx.save();

        ctx.translate(x, y);
        ctx.rotate(this.angle * Math.PI / 180);

        ctx.moveTo(0, -this.side);
        ctx.lineTo(0, this.side);
        ctx.moveTo(-this.side, 0);
        ctx.lineTo(this.side, 0);

        ctx.restore();
        ctx.stroke();
        ctx.closePath();
    }

}

class FigureO extends Figure {
    constructor(x, y) {
        super(x, y);
        this.radius = 12 * this.size;
    }

    draw() {
        ctx.beginPath();
        ctx.strokeStyle = this.color;
        ctx.lineWidth = this.strokeWidth;
        const {x, y} = this.nextPoint(this.x, this.y, Date.now());
        ctx.arc(x, y, this.radius, 0, 2 * Math.PI);
        ctx.stroke();
    }

}

const figures = [];

const halfCount = Math.round(getRandom(50, 200) / 2);


function tick() {

    ctx.clearRect(0, 0, width, height);

    figures.forEach((figure) => {
        figure.draw();
    });

    window.requestAnimationFrame(tick);
}


const wall = document.getElementById('wall');
const ctx = wall.getContext('2d');
const width = window.innerWidth;
const height = window.innerHeight;

wall.setAttribute('width', width);
wall.setAttribute('height', height);

for (let i = 0; i < halfCount; i++) {
    let x = Math.floor(getRandom(0, width));
    let y = Math.floor(getRandom(0, height));
    figures.push(new FigureO(x, y));

    x = Math.floor(getRandom(0, width));
    y = Math.floor(getRandom(0, height));
    figures.push(new FigureX(x, y));
}

tick();