'use strict';

const itemsList = document.querySelector('.items-list');

itemsList.addEventListener('click', onAddToCart);

function onAddToCart(e) {
    if (!e.target.classList.contains('add-to-cart')) {
        return;
    }

    addToCart({
        title: e.target.dataset.title,
        price: e.target.dataset.price
    });
}