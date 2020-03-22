import { CategoryButton } from '../CategoryButton/index.js';

export class CategoryItem extends HTMLLIElement {
  constructor(name, category) {
    super();
    this.name = name;
    this.category = category;
  }

  connectedCallback() {
    this.className = 'fm-category-item';

    const categoryButtonElement = new CategoryButton(this.name, this.category);
    this.appendChild(categoryButtonElement);
  }
}

customElements.define('fm-category-item', CategoryItem, { extends: 'li' });
