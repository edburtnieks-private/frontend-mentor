import { TagItem } from '../TagItem/index.js';

export class TagList extends HTMLUListElement {
  constructor(tags) {
    super();
    this._tags = tags;
  }

  connectedCallback() {
    this.className = 'fm-tag-list';

    this._tags.forEach((tag) => {
      const tagElement = new TagItem(tag);
      this.appendChild(tagElement);
    });
  }
}

customElements.define('fm-tag-list', TagList, { extends: 'ul' });
