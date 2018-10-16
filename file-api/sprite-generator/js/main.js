'use strict';

const prop = (data, name) => data.map(item => item[name]);
const summ = data => data.reduce((total, value) => total + value, 0);

class SpriteGenerator {
    constructor(container) {
        this.uploadButton = container.querySelector('.sprite-generator__upload');
        this.submitButton = container.querySelector('.sprite-generator__generate');
        this.imagesCountContainer = container.querySelector('.images__added-count-value');
        this.codeContainer = container.querySelector('.sprite-generator__code');
        this.imageElement = container.querySelector('.sprite-generator__result-image');

        this.images = [];
        this.imagesCount = 0;
        this.codeContainer.innerHTML = '';
        this.registerEvents();

        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
    }

    loadFiles(e) {

        Array.from(e.target.files).forEach(f => {
            const url = URL.createObjectURL(f);
            const img = new Image;

            img.src = url;
            this.images.push(img);
        });

        this.imagesCount = this.images.length;
        this.imagesCountContainer.innerHTML = this.imagesCount;
    };


    generate() {
        this.canvas.width = summ(prop(this.images, 'width'));
        this.canvas.height = Math.max(...prop(this.images, 'height'));

        let code =
            `.icon {
                display: inline-block;
                background-image: url(img/sprite.png);
            }`
        ;

        let imgX = 0;
        this.images.forEach(img => {

            this.ctx.drawImage(img, imgX, 0);

            code += `
                .icon_${parseInt(i) + 1} {
                    background-position: -${imgX}px 0;
                    width: ${img.width}px;
                    height: ${img.height}px;
                }`
            ;

            imgX += img.width;

        });

        this.imageElement.src = this.canvas.toDataURL();
        this.codeContainer.innerHTML = code;
    }
        
    registerEvents() {
        this.uploadButton.addEventListener('change', this.loadFiles.bind(this));
        this.submitButton.addEventListener('click', this.generate.bind(this));
    }
}

new SpriteGenerator(document.getElementById('generator'));
