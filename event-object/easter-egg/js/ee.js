'use strict';

const nav = document.getElementsByTagName('nav')[0];

const secret = document.getElementsByClassName('secret')[0];

document.addEventListener('keydown', evt => {
    if (evt.code === 'KeyT' && evt.altKey && evt.ctrlKey) {
        nav.classList.toggle('visible');
    }
});

let code = '';
const SECRET = 'KeyYKeyTKeyNKeyJKeyKKeyJKeyUKeyBKeyZ';

document.addEventListener('keydown', evt => {

        if (!SECRET.startsWith(code + evt.code)) {
            code = '';
            if (!SECRET.startsWith(code + evt.code)) {
                return;
            }
        }

        code += evt.code;

        if (code !== SECRET) {
            return;
        }

        secret.classList.toggle('visible');
        code = '';
    }
);