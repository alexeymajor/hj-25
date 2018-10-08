'use strict';

const xhrPooling = new XMLHttpRequest();
const pooling = document.querySelectorAll('.pooling div');

setInterval(get, 5000);

function get (){

    xhrPooling.open('GET', 'https://neto-api.herokuapp.com/comet/pooling', true);

    xhrPooling.addEventListener('load', () => {
        const getCurrent = pooling[xhrPooling.responseText - 1];
        pooling.forEach(el => el.classList.remove('flip-it'));
        getCurrent.classList.add('flip-it');
    });

    xhrPooling.send();
}