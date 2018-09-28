'use strict';

const content = document.querySelector('.content');

function show(data) {

    for (const key in data) {

        if (key === 'id') {
            getData('showTech', `https://neto-api.herokuapp.com/profile/${data[key]}/technologies`)
                .then(content.removeAttribute('style'));
            continue;
        }

        if (key === 'pic') {
            document.querySelector(`[data-${key}]`).src = data[key].replace(/:\d+?\//ig, '/');
            continue;
        }

        document.querySelector(`[data-${key}]`).textContent = data[key];
    }
}

function showTech(data) {
    const listTechnology = document.querySelector('[data-technologies]');
    for (const key in data) {
        const span = document.createElement('span');
        span.classList.add('devicons', `devicons-${data[key]}`);
        listTechnology.appendChild(span);
    }
}

function getData(callbackName, url) {
    return new Promise(() => {
        const script = document.createElement('script');
        script.src = `${url}?callback=${callbackName}`;
        document.body.appendChild(script);

    });
}

getData('show', 'https://neto-api.herokuapp.com/profile/me');
