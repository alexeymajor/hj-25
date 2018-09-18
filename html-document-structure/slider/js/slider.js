'use strict';

class Slider {
    constructor(container) {
        this.container = container;
        this.nav = this.container.querySelector('.slider-nav');
        this.slides = this.container.querySelector('.slides');
        this.buttons = Array.from(this.nav.getElementsByTagName('a'));

        this.buttons.forEach(
            a => {
                if (a.dataset.action === 'next') {
                    this.next = a;
                    this.next.addEventListener('click', evt => this.moveSlide(evt))
                }
                if (a.dataset.action === 'prev') {
                    this.prev = a;
                    this.prev.addEventListener('click', evt => this.moveSlide(evt))
                }
                if (a.dataset.action === 'first') {
                    this.first = a;
                    this.first.addEventListener('click', evt => this.moveSlide(evt))
                }
                if (a.dataset.action === 'last') {
                    this.last = a;
                    this.last.addEventListener('click', evt => this.moveSlide(evt))
                }
            }
        );

        this.moveSlide({target: this.first})
    }

    moveSlide(event) {

        if (event.target.classList.contains('disabled')) {
            return;
        }

        const action = event.target.dataset.action;

        const currentSlide = this.slides.querySelector('.slide-current');

        let activatedSlide = currentSlide;

        if (action === 'next') {
            activatedSlide = currentSlide.nextElementSibling;
        }

        if (action === 'prev') {
            activatedSlide = currentSlide.previousElementSibling;
        }

        if (action === 'first') {
            activatedSlide = this.slides.firstElementChild;
        }

        if (action === 'last') {
            activatedSlide = this.slides.lastElementChild;
        }

        if (currentSlide) {
            currentSlide.classList.remove('slide-current');
        }
        activatedSlide.classList.add('slide-current');

        if (!activatedSlide.nextElementSibling) {
            this.next.classList.add('disabled');
            this.last.classList.add('disabled');
        } else {
            this.next.classList.remove('disabled');
            this.last.classList.remove('disabled');
        }

        if (!activatedSlide.previousElementSibling) {
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