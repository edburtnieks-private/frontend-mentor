import { categoryButtonTemplate } from './template.js';

export class CategoryButton extends HTMLButtonElement {
  constructor(name, category) {
    super();
    this.name = name;
    this.category = category;
  }

  connectedCallback() {
    this.appendChild(categoryButtonTemplate.content.cloneNode(true));

    this.className = 'fm-category-button';
    this.value = this.category;

    this.addEventListener('click', (event) => {
      this.dispatchEvent(
        new CustomEvent('category-changed', {
          bubbles: true,
          detail: {
            key: this.name,
            value: event.currentTarget.value,
          },
        })
      );
    });

    const categoryContentElement = this.querySelector('.fm-category-content');
    categoryContentElement.textContent = this.category;
  }

  disconnectedCallback() {
    this.removeEventListener('click', () => {});
  }
}

customElements.define('fm-category-button', CategoryButton, { extends: 'button' });
