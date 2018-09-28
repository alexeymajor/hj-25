'use strict';

const URL_FOOD = 'https://neto-api.herokuapp.com/food/42';


const ingredients = document.querySelector('[data-ingredients]');
const title = document.querySelector('[data-title]');
const pic = document.querySelector('[data-pic]');

function showInfo(data) {
    pic.setAttribute('style', `background-image: url('${data.pic.replace(/:\d+?\//ig, '/')}');`);
    title.textContent = data.title;
    ingredients.textContent = data.ingredients.join(', ');
}

const rating = document.querySelector('[data-rating]');
const star = document.querySelector('[data-star]');
const votes = document.querySelector('[data-votes]');

function showRating(data) {
    star.setAttribute('style', `width: ${(data.rating / 10) * 100}%;`);
    rating.textContent = data.rating.toFixed(2);
    votes.textContent = `(${data.votes} оценок)`;
}


const consumers = document.querySelector('[data-consumers]');
function showConsumers(data) {
    const total = document.createElement('span');
    total.textContent = `(+${data.total})`;

    data.consumers.forEach(consumer => {
        const img = document.createElement('img');
        img.src = consumer.pic.replace(/:\d+?\//ig, '/');
        img.title = consumer.name;
        consumers.appendChild(img);
    });

    consumers.appendChild(total);
}

function loadData(url, callback) {
    return new Promise(() => {
        const script = document.createElement('script');
        script.src = `${url}?callback=${callback}`;
        document.body.appendChild(script);
    });
}

loadData(URL_FOOD, 'showInfo');
loadData(`${URL_FOOD}/rating`, 'showRating');
loadData(`${URL_FOOD}/consumers`, 'showConsumers');