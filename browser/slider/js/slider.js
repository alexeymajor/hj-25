'use strict';
const imgs = [
    'i/airmax-jump.png',
    'i/airmax-on-foot.png',
    'i/airmax-playground.png',
    'i/airmax-top-view.png',
    'i/airmax.png'
];
const img = document.getElementById('slider');

let curIndex = 0;

function getNextImg() {
    if (++curIndex >= imgs.length) {
        curIndex = 0;
    }

    return imgs[curIndex];
}

setInterval(() => {
    img.src = getNextImg()
}, 5000);

img.src = imgs[curIndex];
