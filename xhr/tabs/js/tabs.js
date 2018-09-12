document.addEventListener('DOMContentLoaded', init);

let preloader;
let content;
let tabs;

function init() {
  preloader = document.querySelector('#preloader');
  content = document.querySelector('#content');
  tabs = Array.from(document.getElementsByTagName('a'));
  tabs.forEach(
      tab => {
          tab.addEventListener('click', evt => {
              evt.preventDefault();
              showTab(tab);
          });
          if (tab.classList.contains('active')) {
              showTab(tab);
          }
      }
  )
}

function showTab(tab) {
    tabs.forEach(tab => tab.classList.remove('active'));
    preloader.classList.remove('hidden');
    const xhr = new XMLHttpRequest();
    xhr.open('GET', tab.href);
    xhr.addEventListener('load', evt => {
        if (xhr.status === 200) {
            content.innerHTML = xhr.responseText;
            tab.classList.add('active');
        }
    });
    xhr.addEventListener('loadend', evt => {
        preloader.classList.add('hidden');
    });
    xhr.send();

}