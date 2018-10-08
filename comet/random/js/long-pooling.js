'use strict';
const xhrLongPooling = new XMLHttpRequest();
const longPooling = document.querySelectorAll('.long-pooling div');

get();

function get () {
    xhrLongPooling.open('GET', 'https://neto-api.herokuapp.com/comet/long-pooling');

    xhrLongPooling.addEventListener('load', () => {

        const result = longPooling[xhrLongPooling.responseText - 1];

        if(result){
            longPooling.forEach(el => el.classList.remove('flip-it'));
            result.classList.add('flip-it');
            get();
        }

    });

    xhrLongPooling.send();
}