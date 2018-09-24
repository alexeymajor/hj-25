'use strict';

const CART_URL = 'https://neto-api.herokuapp.com/cart';

const colorSwatch = document.querySelector('#colorSwatch');
const sizeSwatch = document.querySelector('#sizeSwatch');
const quickCart = document.querySelector('#quick-cart');
const addToCard = document.querySelector('#AddToCart');
const addToCartForm = document.querySelector('#AddToCartForm');

fetch(CART_URL + '/colors', {
    method: 'GET'
}).then(res=>{
    if (200 <= res.status && res.status < 300) {
        return res.json();
    }
    throw new Error(res.statusText);
}).then(json => {
    json.forEach(item => {

        const available = item.isAvailable ? 'available' : 'soldout';
        const disabled = item.isAvailable ? '' : 'disabled';
        const checked = localStorage.color === item.type ? 'checked' : '';

        colorSwatch.innerHTML +=
            `
				<div data-value="${item.type}" class="swatch-element color ${item.type} ${available}">
					<div class="tooltip">${item.title}</div>
					<input quickbeam="color" id="swatch-1-${item.type}" type="radio" name="color" value="${item.type}" ${disabled} ${checked}>
					<label for="swatch-1-${item.type}" style="border-color: red;">
						<span style="background-color: ${item.code};"></span>
						<img class="crossed-out" src="https://neto-api.herokuapp.com/hj/3.3/cart/soldout.png?10994296540668815886">
					</label>
				</div>`
    })
});

fetch(CART_URL + '/sizes', {
    method: 'GET'
}).then(res=>{
    if (200 <= res.status && res.status < 300) {
        return res.json();
    }
    throw new Error(res.statusText);
}).then(json => {
    json.forEach(item => {

        const available = item.isAvailable ? 'available' : 'soldout';
        const disabled = item.isAvailable ? '' : 'disabled';
        const checked = localStorage.size === item.type ? 'checked' : '';

        sizeSwatch.innerHTML += `
				<div data-value="${item.type}" class="swatch-element plain ${item.type} ${available}">
					<input id="swatch-0-${item.type}" type="radio" name="size" value="${item.type}" ${disabled} ${checked}>
					<label for="swatch-0-${item.type}">
						${item.title}
						<img class="crossed-out" src="https://neto-api.herokuapp.com/hj/3.3/cart/soldout.png?10994296540668815886">
					</label>
				</div>`
    })
});

fetch(CART_URL, {
    method: 'GET'
}).then(res=>{
    if (200 <= res.status && res.status < 300) {
        return res.json();
    }
    throw new Error(res.statusText);
}).then(json => {
    updateBasket(json);
});



colorSwatch.addEventListener('change', evt => {
    if(evt.target.name === 'color') {
        localStorage.color = evt.target.value;
    }
});

sizeSwatch.addEventListener('change', evt => {
    if(evt.target.name === 'size') {
        localStorage.size = evt.target.value;
    }
});

function updateBasket(items) {
    let priceSum = 0;
    quickCart.innerHTML = '';
    items.forEach(item => {
        quickCart.innerHTML += `
			<div class="quick-cart-product quick-cart-product-static" id="quick-cart-product-${item.id}" style="opacity: 1;">
				<div class="quick-cart-product-wrap">
					<img src="${item.pic}" title="${item.title}">
					<span class="s1" style="background-color: #000; opacity: .5">$${item.price}</span>
					<span class="s2"></span>
				</div>
				<span class="count hide fadeUp" id="quick-cart-product-count-${item.id}">${item.quantity}</span>
				<span class="quick-cart-product-remove remove" data-id="${item.id}"></span>
			</div>`;
        priceSum = item.price * item.quantity;
    });

    quickCart.innerHTML += `
		<a id="quick-cart-pay" quickbeam="cart-pay" class="cart-ico open">
			<span>
				<strong class="quick-cart-text">Оформить заказ<br></strong>
				<span id="quick-cart-price">${priceSum}</span>
			</span>
		</a>`

    const quickCartPay = document.querySelector('#quick-cart-pay');
    items.length === 0 ? quickCartPay.classList.remove('open') : quickCartPay.classList.add('open');

    const remove = quickCart.querySelector('.remove');
    remove.addEventListener('click', evt => removeItem(evt));
}


addToCard.addEventListener('click', evt => {
    evt.preventDefault();
    const postBody = new FormData(addToCartForm);
    postBody.append('productId', addToCartForm.dataset.productId);
    fetch(CART_URL, {
       method: 'POST',
       body: postBody
    }).then(res => {
        if (200 <= res.status && res.status < 300) {
            return res.json();
        }
       throw new Error(res.statusText);
    }).then(json => {
        updateBasket(json);
    })
});

function removeItem(evt) {
    evt.preventDefault();
    const postBody = new FormData();
    postBody.append('productId', addToCartForm.dataset.productId);
    fetch(CART_URL + '/remove', {
        method: 'POST',
        body: postBody
    }).then(res => {
        if (200 <= res.status && res.status < 300) {
            return res.json();
        }
        throw new Error(res.statusText);
    }).then(json => {
        updateBasket(json);
    })
}