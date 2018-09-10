'use strict';

function init() {
    const list = document.querySelector('.contacts-list');

    list.innerHTML = '';
    Array.from(JSON.parse(loadContacts())).forEach(contact =>
        list.innerHTML +=
            `<li data-email="${contact.email}" data-phone="${contact.phone}">\n` +
            `   <strong>${contact.name}</strong>\n` +
            `</li>`
    );
}

document.addEventListener('DOMContentLoaded', init);