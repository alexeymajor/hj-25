const addClass = ( className, context ) => context.classList.add( className ),
  removeClass = ( className, context ) => context.classList.remove( className ),
  hasClass = ( className, context ) => context.classList.contains( className );


class iLayout {

  constructor(container) {

      this.container = container;
      this.positionsContainer = container.querySelector('.layout__positions');
      this.actionButton = container.querySelector('.layout__button');
      this.result = container.querySelector('.layout__result');
      this.result.value = '';

      this.leftContainer = document.querySelector('.layout__item_left');
      this.leftContainerBound = this.leftContainer.getBoundingClientRect();
      this.leftContainerWidth = this.leftContainerBound.width;
      this.leftContainerHeight = this.leftContainerBound.height;

      this.topContainer = document.querySelector('.layout__item_top');
      this.topContainerBound = this.topContainer.getBoundingClientRect();
      this.topContainerWidth = this.topContainerBound.width;
      this.topContainerHeight = this.topContainerBound.height;

      this.canvas = document.createElement('canvas');
      this.ctx = this.canvas.getContext('2d');

      this.canvas.width = this.leftContainerWidth + this.topContainerWidth;
      this.canvas.height = this.leftContainerHeight;

      this.registerEvents();
  }

    dragover(e) {

        e.preventDefault();

        if (!hasClass('layout__item', e.target)) {
            return;
        }

        addClass('layout__item_active', e.target);
    }

    dragleave(e) {

        e.preventDefault();

        if (!hasClass('layout__item', e.target)) {
            return;
        }

        removeClass('layout__item_active', e.target);
    }

    drop(e) {

        e.preventDefault();

        removeClass('layout__item_active', e.target);
        const file = e.dataTransfer.files[0];
        if (!file.type.startsWith('image/')) {
            alert('Файл не является изображением!');
            return;
        }

        const img = new Image;

        img.src = URL.createObjectURL(file);

        addClass('layout__image', img);
        e.target.appendChild(img);
    }

    generate() {

        const imgLeft = document.querySelector('.layout__item_left img');
        const imgTop = document.querySelector('.layout__item_top img');
        const imgBottom = document.querySelector('.layout__item_bottom img');

        this.ctx.drawImage(imgLeft, 0, 0);
        this.ctx.drawImage(imgTop, this.leftContainerWidth, 0);
        this.ctx.drawImage(imgBottom, this.leftContainerWidth, this.topContainerHeight);

        this.result.value = `<img src="${this.canvas.toDataURL()}" alt="">`;
    }

    registerEvents() {
        this.actionButton.addEventListener('click', this.generate.bind(this));

        this.positionsContainer.addEventListener('dragover', this.dragover.bind(this));

        this.positionsContainer.addEventListener('dragleave', this.dragleave.bind(this));

        this.positionsContainer.addEventListener('drop', this.drop.bind(this));
    }
}

new iLayout( document.getElementById( 'layout' ));
