'use strict';

for (const element of document.getElementsByClassName("drum-kit__drum")) {
    element.onclick = function () {
            this.querySelector('audio').play()
    }
}