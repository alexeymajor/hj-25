'use strict';

const links = Array.from(document.getElementById('nav').getElementsByTagName('a'));
const view = document.getElementById('view');

links.forEach(link => {
    link.addEventListener('click', evt => {
        evt.preventDefault();
        view.src = link.href;
        links.forEach(link => link.classList.remove('gallery-current'));
        link.classList.add('gallery-current');
    });
});