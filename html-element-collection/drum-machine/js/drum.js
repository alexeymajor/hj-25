'use strict';

for (const element of document.getElementsByClassName("drum-kit__drum")) {
    element.onclick = function () {
            const player = this.querySelector('audio');
            player.pause();
            player.currentTime = 0;
            player.play();
    }
}