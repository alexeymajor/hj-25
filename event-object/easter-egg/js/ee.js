'use strict';

const nav = document.getElementsByTagName('nav')[0];

const secret = document.getElementsByClassName('secret')[0];

document.addEventListener('keydown', evt => {
    if (evt.key === 't' && evt.altKey && evt.ctrlKey) {
        nav.classList.toggle('visible');
    }
});

let code = '';
let SECRET = 'нетология';

document.addEventListener('keydown', evt => {
        if (!SECRET.startsWith((code + evt.key.toLowerCase()))) {
            code = '';
            return;
        }

        code += evt.key.toLowerCase();

        if (code !== SECRET) {
            return;
        }

        secret.classList.toggle('visible');
        code = '';
    }
);