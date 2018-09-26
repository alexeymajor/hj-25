'use strict';

class Chat {
    constructor (chat) {
        this.chat = chat;
        this.input = chat.querySelector('.message-input');
        this.submit = chat.querySelector('.message-submit');
        this.submit.disabled = true;

        chat.querySelector('.messages-templates').querySelectorAll('.message').forEach( template => {
            if (template.classList.contains('loading')) {
                this.loadingTemplate = template;
                return;
            }

            if (template.classList.contains('message-status')) {
                this.statusTemplate = template;
                return;
            }

            if (template.classList.contains('message-personal')) {
                this.personalTemplate = template;
                return;
            }

            this.messageTemplate = template;
        });

        this.messageBox = chat.querySelector('.message-box');

        this.content = chat.querySelector('.messages-content');

        this.status = chat.querySelector('.chat-status');
        this.status.textContent = this.status.dataset.ofline;

        this.ws = new WebSocket('wss://neto-api.herokuapp.com/chat');

        this.ws.addEventListener('open', evt => {
            this.userOnline();
        });

        this.ws.addEventListener('close', evt => {
            this.userOffline();
        });

        this.ws.addEventListener('message', evt => {

            if (evt.data === '...') {
                this.showLoading();
                return;
            }

            this.appendMessage(evt.data);
        });

        this.submit.addEventListener('click', evt => {
            evt.preventDefault();
            this.ws.send(this.input.value);

            this.appendPersonalMessage(this.input.value);

            this.input.value = '';

        });

    }

    showLoading() {
        if (this.loadingNode) {
            return;
        }

        console.log('loading');
        this.loadingNode = this.loadingTemplate.cloneNode(true);
        this.content.appendChild(this.loadingNode);
    }

    hideLoading() {
        if (!this.loadingNode) {
            return;
        }
        console.log('hideLoading');
        this.content.removeChild(this.loadingNode);
        this.loadingNode = null;
    }

    userOffline() {
        console.log('userOffline');
        this.submit.disabled = true;
        this.status.textContent = this.status.dataset.offline;
        this._appendMessage(this.statusTemplate.cloneNode(true), 'Пользователь не в сети');
    }

    userOnline() {
        console.log('userOnline');
        this.status.textContent = this.status.dataset.online;
        this.submit.disabled = false;
        this._appendMessage(this.statusTemplate.cloneNode(true), 'Пользователь появился в сети');
    }

    appendPersonalMessage(text) {
        console.log(`>>> ${text}`);
        this._appendMessage(this.personalTemplate.cloneNode(true), text);
    }

    _appendMessage(node, text) {
        const timestamp = node.querySelector('.timestamp');
        if (timestamp) {
            const d = new Date();
            timestamp.textContent = `${d.getHours()}:${d.getMinutes()}`;
        }

        node.querySelector('.message-text').textContent = text;
        this.content.appendChild(node);
    }

    appendMessage(text) {
        this.hideLoading();
        console.log(`<<< ${text}`);

        this._appendMessage(this.messageTemplate.cloneNode(true), text);
    }

}


const chat = new Chat(document.querySelector('.chat'));


