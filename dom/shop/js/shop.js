'use strict';

function init() {
    const addButtons = document.querySelectorAll('.add');

    let totalPrice = 0;
    let totalCount = 0;

    const totalPriceNode = document.querySelector('#cart-total-price');
    const totalCountNode = document.querySelector('#cart-count');



    for (const btn of addButtons) {
        btn.addEventListener('click', evt => {
            totalPrice += parseInt(evt.target.dataset.price);
            totalCount++;
            totalPriceNode.innerHTML = totalPrice;
            totalCountNode.innerHTML = totalCount;
        });
    }
}

document.addEventListener('DOMContentLoaded', init);