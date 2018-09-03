'use strict';

const music = [
    {title: 'LA Chill Tour', link: '../audioplayer/mp3/LA Chill Tour.mp3'},
    {title: 'This is it band', link: '../audioplayer/mp3/This is it band.mp3'},
    {title: 'LA Fusion Jam', link: '../audioplayer/mp3/LA Fusion Jam.mp3'}
];

class Player {

    constructor(player) {

        this.player = player;

        this.playing = false;

        this.title = Array.from(player.getElementsByClassName('title'));

        this.playstate = Array.from(player.getElementsByClassName('playstate'));

        this.currentIndex = 0;

        this.audio = player.querySelector('audio');

        Array.from(player.getElementsByClassName('back')).forEach(
            button => button.onclick = () => this.current--
        );

        Array.from(player.getElementsByClassName('next')).forEach(
            button => button.onclick = () => this.current++
        );

        Array.from(player.getElementsByClassName('stop')).forEach(
            button => button.onclick = () => this.stop()
        );

        this.playstate.forEach(
            button => button.onclick = () => {
                if (this.playing) {
                    this.pause();
                    return;
                }

                this.play();
            }
        );

        this.stop();
    }

    pause() {
        this.audio.pause();
        this.player.classList.remove('play');
        this.playing = false;
    }

    play() {
        this.audio.play();
        this.player.classList.add('play');
        this.playing = true;
    }

    stop() {
        this.pause();
        this.audio.currentTime = 0;
    }

    get current() {
        return this.currentIndex;
    }

    set current(index) {
        if (index < 0) {
            index = music.length - 1;
        }

        if (index > music.length - 1) {
            index = 0;
        }

        this.currentIndex = index;

        this.audio.src = music[this.current].link;

        this.title.forEach(title => title.setAttribute('title', music[this.current].title));

        if (this.playing) {
            this.stop();
            this.play();
        }

    }

}

const players = [];

for (const mp of document.getElementsByClassName('mediaplayer')) {
  players.push(new Player(mp));
}
