document.addEventListener('DOMContentLoaded', init);

function init() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://neto-api.herokuapp.com/book/');

    xhr.addEventListener('load', evt => {
       const books = JSON.parse(xhr.responseText);
       const content = document.getElementById('content');

       for (const book of books) {
           const bookTag = document.createElement('li');
           bookTag.dataset.title = book.title;
           bookTag.dataset.author = book.author.name;
           bookTag.dataset.info = book.info;
           bookTag.dataset.price = book.price;
           bookTag.innerHTML = `<img src="${book.cover.small}">`;

           content.appendChild(bookTag);
       }

    });

    xhr.send();
}