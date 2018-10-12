'use strict';

let piece = null;
let start = null;

document.addEventListener('mousedown', event => {

    if (!event.target.classList.contains('logo')) {
        return;
    }

    start = {
        x: event.target.getBoundingClientRect().left,
        y: event.target.getBoundingClientRect().top
    };

    piece = event.target;
    piece.classList.add('moving');

});


document.addEventListener('mousemove', event => {
    if (!piece) {
        return;
    }

    event.preventDefault();

    piece.style.left = `${event.pageX - (piece.width / 2)}px`;
    piece.style.top = `${event.pageY - (piece.height / 2)}px`;

});

document.addEventListener('mouseup', event => {

    try {
        if (!piece) {
            return;
        }

        piece.classList.remove('moving');


        piece.style.visibility = 'hidden';

        const trash = document
            .elementFromPoint(event.clientX, event.clientY)
            .closest('#trash_bin');

        piece.style.visibility = 'visible';

        if (!trash) {
            piece.style.left = `${start.x}px`;
            piece.style.top = `${start.y}px`;
            return;
        }

        piece.style.display = 'none';

    } finally {
        piece = null;
        start = null;
    }

});
