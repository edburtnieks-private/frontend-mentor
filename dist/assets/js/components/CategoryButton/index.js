import { categoryButtonTemplate } from './template.js';

export class CategoryButton extends HTMLButtonElement {
  constructor(name, category) {
    super();

    this._name = name;
    this._category = category;

    this.toggleFilter = this.toggleFilter.bind(this);
  }

  connectedCallback() {
    this.appendChild(categoryButtonTemplate.content.cloneNode(true));

    this.className = 'fm-category-button';
    this.value = this._category;
    this.setAttribute('aria-label', `Filter ${this._name}: ${this._category}`);
    this.addEventListener('click', this.toggleFilter);

    const categoryContentElement = this.querySelector('.fm-category-content');
    categoryContentElement.textContent = this._category;
  }

  disconnectedCallback() {
    this.removeEventListener('click', this.toggleFilter);
  }

  toggleFilter(event) {
    this.dispatchEvent(
      new CustomEvent('filter-toggle', {
        bubbles: true,
        detail: event.currentTarget.value,
      })
    );
  }
}

customElements.define('fm-category-button', CategoryButton, { extends: 'button' });
