'use strict';

function show(data) {
    for (const key in data) {
         if (['wallpaper','pic'].includes(key)) {
             document.querySelector(`[data-${key}]`).src = data[key].replace(/:\d+?\//ig, '/');
         } else {
            document.querySelector(`[data-${key}]`).textContent = data[key];
         }
    }
}

const script = document.createElement('script');

script.src = `https://neto-api.herokuapp.com/twitter/jsonp?callback=show`;

document.body.appendChild(script);
