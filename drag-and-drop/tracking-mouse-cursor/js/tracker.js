'use strict';

const leftEye = document.querySelector('.cat_position_for_left_eye');
const rightEye = document.querySelector('.cat_position_for_right_eye');

function moveEye(eye, pos) {

    const eyeBall = eye.querySelector('.cat_eye');
    const eyeBound = eye.getBoundingClientRect();

    if(pos.x < eyeBound.left) {
        eyeBall.style.left = `0%`;
    }

    if(eyeBound.right < pos.x) {
        eyeBall.style.left = `50%`;
    }

    if(
        eyeBound.left < pos.x &&
        eyeBound.right > pos.x) {

        eyeBall.style.left = `25%`;
    }

    if(pos.y < eyeBound.top) {
        eyeBall.style.top = `0%`;
    }

    if(pos.y > eyeBound.bottom) {
        eyeBall.style.top = `50%`;
    }

    if(
        eyeBound.top < pos.y &&
        eyeBound.bottom > pos.y) {

        eyeBall.style.top = `25%`;
    }

}


document.addEventListener('mousemove', event => {

    const position = {
        x: event.pageX,
        y: event.pageY
    };

    moveEye(leftEye, position);
    moveEye(rightEye, position);

});