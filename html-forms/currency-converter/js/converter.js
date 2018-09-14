'use strict';

const CONVERTER_URI = 'https://neto-api.herokuapp.com/currency';

document.addEventListener('DOMContentLoaded', init);

let from;
let to;
let source;
let result;

function convert() {
   result.value = Math.round(source.value * from.value / to.value * 100) / 100;
}

function init() {
    const xhr = new XMLHttpRequest();

    from = document.getElementById('from');
    to = document.getElementById('to');

    result = document.getElementById('result');

    source = document.getElementById('source');

    const loader = document.getElementById('loader');
    const content = document.getElementById('content');

    loader.classList.remove('hidden');
    content.classList.add('hidden');

    xhr.addEventListener('loadend', evt => {
        loader.classList.add('hidden');
        content.classList.remove('hidden');
    });

    xhr.open('GET', CONVERTER_URI);
    xhr.addEventListener('load', evt => {
        if (xhr.status === 200) {
            const curs = JSON.parse(xhr.responseText);
            curs.forEach(
                cur => {
                    const fromOpt = document.createElement('option');
                    fromOpt.value = cur.value;
                    fromOpt.innerHTML = cur.code;
                    from.appendChild(fromOpt);

                    const toOpt = document.createElement('option');
                    toOpt.value = cur.value;
                    toOpt.innerHTML = cur.code;
                    to.appendChild(toOpt);
                }
            );

            from.addEventListener('change', convert);
            to.addEventListener('change', convert);
            source.addEventListener('input', convert);

            convert();

        }
    });
    xhr.send();
}
