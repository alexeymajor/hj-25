'use strict';


const pianos =[];

document.addEventListener( 'keydown', evt => {
    if (evt.key === 'Shift') {
        pianos.forEach(piano => piano.regime = 'lower');
        return;
    }
    if(evt.key === 'Alt') {
        pianos.forEach(piano => piano.regime = 'higher');
    }
} );

document.addEventListener( 'keyup', evt => {
    if (!(evt.key === 'Shift' || evt.key === 'Alt')) {
        return;
    }

    pianos.forEach(piano => piano.regime = 'middle');
} );

const notes = [
    'first.mp3',
    'second.mp3',
    'third.mp3',
    'fourth.mp3',
    'fifth.mp3',
];


class Piano {
    constructor(set) {

        this.set = set;
        this.regime = set.classList[1];

        let i = 0;

        Array.from(set.getElementsByTagName('li')).forEach(
          key => {
              const audio = key.querySelector('audio');
              const note = notes[i++];
              key.addEventListener( 'click', () => this.play(audio, note) );
          }
        );
    }

    play(audio, note) {
        audio.pause();
        audio.currentTime = 0;
        audio.src = `sounds/${this._regime}/${note}`;
        audio.play();
    }

    set regime(val) {
        this._regime = val;
        this.set.classList.remove('middle','lower','higher');
        this.set.classList.add(this._regime);
    }

    get regime() {
        return this._regime;
    }
}

Array.from(document.getElementsByClassName('set')).forEach(
    set => pianos.push(new Piano(set))
);
