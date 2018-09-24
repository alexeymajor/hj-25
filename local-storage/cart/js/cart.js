'use strict';

const CART_URL = 'https://neto-api.herokuapp.com/cart';

const colorSwatch = document.querySelector('#colorSwatch');
const sizeSwatch = document.querySelector('#sizeSwatch');
const quickCart = document.querySelector('#quick-cart');

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



colorSwatch.addEventListener('change', evt => {
    if(evt.target.name === 'color') {
        localStorage.color = evt.target.value;
    }
});

sizeSwatch.addEventListener('change', evt => {
    if(evt.target.name === 'size') {
        localStorage.size = evt.target.value;
    }
})