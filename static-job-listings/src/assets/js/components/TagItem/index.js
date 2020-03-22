import { tagItemTemplate } from './template.js';

export class TagItem extends HTMLLIElement {
  constructor(tag) {
    super();
    this.tag = tag;
  }

  connectedCallback() {
    this.appendChild(tagItemTemplate.content.cloneNode(true));

    this.className = 'fm-tag-item';

    switch (this.tag) {
      case 'New!':
        this.classList.add('new');
        break;
      case 'Featured':
        this.classList.add('featured');
        break;
    }

    const tagContentElement = this.querySelector('.fm-tag-content');
    tagContentElement.textContent = this.tag;
  }
}

customElements.define('fm-tag-item', TagItem, { extends: 'li' });
