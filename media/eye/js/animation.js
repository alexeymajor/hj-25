'use strict';

const pupil = document.querySelector('.big-book__pupil');

document.addEventListener('mousemove', e => {

    const x = Math.max(-30, Math.min(45 * (
        (e.clientX - pupil.getBoundingClientRect().left - 15) / (document.documentElement.clientWidth - pupil.getBoundingClientRect().left)), 30));

    const y = Math.max(-30, Math.min(45 * (
        (e.clientY - pupil.getBoundingClientRect().top - 15) / (document.documentElement.clientHeight - pupil.getBoundingClientRect().top)), 30));

    const scale = Math.max(Math.max(Math.abs(x) / 10, Math.abs(y) / 10), 1);

    pupil.style.setProperty('--pupil-x', `${x}px`);
    pupil.style.setProperty('--pupil-y', `${y}px`);
    pupil.style.setProperty('--pupil-size', scale);
});
