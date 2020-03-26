import { CategoryButton } from '../CategoryButton/index.js';

export class CategoryItem extends HTMLLIElement {
  constructor(name, category) {
    super();
    
    this._name = name;
    this._category = category;
  }

  connectedCallback() {
    this.className = 'fm-category-item';

    const categoryButtonElement = new CategoryButton(this._name, this._category);
    this.appendChild(categoryButtonElement);
  }
}

customElements.define('fm-category-item', CategoryItem, { extends: 'li' });
