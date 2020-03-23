import { tagItemTemplate } from './template.js';

export class TagItem extends HTMLLIElement {
  constructor(tag) {
    super();
    this._tag = tag;
  }

  connectedCallback() {
    this.appendChild(tagItemTemplate.content.cloneNode(true));

    this.tagContentElement = this.querySelector('.fm-tag-content');
    
    this.className = 'fm-tag-item';

    switch (this._tag) {
      case 'New!':
        this.classList.add('new');
        break;
      case 'Featured':
        this.classList.add('featured');
        break;
    }

    this.tagContentElement.textContent = this._tag;
  }
}

customElements.define('fm-tag-item', TagItem, { extends: 'li' });
