'use strict';

class Tabs {
    constructor(container) {
        this.container = container;

        this.content = container.querySelector('.tabs-content');
        this.nav = container.querySelector('.tabs-nav');

        const templateTab = this.nav.firstElementChild;

        let article = this.content.firstElementChild;

        while (article) {
            const tab = {article: article, tab: templateTab.cloneNode(true)};
            tab.tab.textContent = article.dataset.tabTitle;
            tab.tab.classList.add(article.dataset.tabIcon);

            tab.tab.addEventListener('click', evt => {
                this.activeTab = tab;
            });

            this.nav.appendChild(tab.tab);

            article.classList.add('hidden');

            article = article.nextElementSibling;

            if (!this._acticveTab) {
                this.activeTab = tab;
            }

        }

        this.nav.removeChild(templateTab);

    }

    set activeTab(tab) {

        if (this._acticveTab) {
            this._acticveTab.tab.classList.remove('ui-tabs-active');
            this._acticveTab.article.classList.add('hidden');
        }

        this._acticveTab = tab;
        this._acticveTab.tab.classList.add('ui-tabs-active');
        this._acticveTab.article.classList.remove('hidden');

    }
}

new Tabs(document.getElementById('tabs'));