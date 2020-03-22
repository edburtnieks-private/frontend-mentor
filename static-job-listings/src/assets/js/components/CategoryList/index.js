export class CategoryList extends HTMLUListElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.className = 'fm-category-list';
  }
}

customElements.define('fm-category-list', CategoryList, { extends: 'ul' });
