'use strict';

class Slider {
    constructor(container) {
        this.container = container;
        this.slides = this.container.querySelector('.slides');
        this.nav = this.container.querySelector('.slider-nav');

        this.moveSlide = (event) => {
            if (event.target.classList.contains('disabled')) {
                return;
            }

            const action = event.target.dataset.action;

            const currentSlide = this.slides.querySelector('.slide-current');

            let activatedSlide = currentSlide;

            switch (action) {
                case 'next':
                    activatedSlide = currentSlide.nextElementSibling;
                    break;
                case 'prev':
                    activatedSlide = currentSlide.previousElementSibling;
                    break;
                case 'first':
                    activatedSlide = this.slides.firstElementChild;
                    break;
                case 'last':
                    activatedSlide = this.slides.lastElementChild;
                    break;
            }

            if (currentSlide) {
                currentSlide.classList.remove('slide-current');
            }
            activatedSlide.classList.add('slide-current');

            this.update(activatedSlide);
        };

        this.nav.addEventListener('click', this.moveSlide);

        Array.from(this.nav.getElementsByTagName('a')).forEach(
             a => {
                 if (a.dataset.action === 'next') {
                     this.next = a;
                 }
                 if (a.dataset.action === 'prev') {
                     this.prev = a;
                 }
                 if (a.dataset.action === 'first') {
                     this.first = a;
                 }
                 if (a.dataset.action === 'last') {
                     this.last = a;
                 }
             }
        );

        this.moveSlide({target: this.first});
    }

    update(currentSlide) {
        if (!currentSlide.nextElementSibling) {
            this.next.classList.add('disabled');
            this.last.classList.add('disabled');
        } else {
            this.next.classList.remove('disabled');
            this.last.classList.remove('disabled');
        }

        if (!currentSlide.previousElementSibling) {
            this.prev.classList.add('disabled');
            this.first.classList.add('disabled');
        } else {
            this.prev.classList.remove('disabled');
            this.first.classList.remove('disabled');
        }
    }
}

Array.from(document.getElementsByClassName('slider')).forEach(
    s => new Slider(s)
);