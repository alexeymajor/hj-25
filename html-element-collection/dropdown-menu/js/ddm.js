'use strict';


for (const element of document.getElementsByClassName('wrapper-dropdown')) {
   element.onclick = function () {
       this.classList.toggle('active');
   }
}
