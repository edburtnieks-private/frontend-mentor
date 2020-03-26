import { filterItemTemplate } from './template.js';

export class FilterItem extends HTMLLIElement {
  constructor(filter) {
    super();

    this._filter = filter;

    this.removeFilter = this.removeFilter.bind(this);
  }

  connectedCallback() {
    this.appendChild(filterItemTemplate.content.cloneNode(true));

    this.removeFilterButtonElement = this.querySelector('.fm-remove-filter-button');

    this.className = 'fm-filter-item';
    this.dataset.filter = this._filter;

    const filterContentElement = this.querySelector('.fm-filter-content');
    filterContentElement.textContent = this._filter;

    this.removeFilterButtonElement.value = this._filter;
    this.removeFilterButtonElement.addEventListener('click', this.removeFilter);

    const removeFilterIconElement = this.querySelector('.fm-remove-filter-icon');
    removeFilterIconElement.src = './assets/images/icon-remove.svg';
  }

  disconnectedCallback() {
    this.removeFilterButtonElement.removeEventListener('click', this.removeFilter);
  }

  removeFilter(event) {
    this.dispatchEvent(
      new CustomEvent('filter-removed', {
        bubbles: true,
        detail: event.currentTarget.value,
      })
    );
  }
}

customElements.define('fm-filter-item', FilterItem, { extends: 'li' });
