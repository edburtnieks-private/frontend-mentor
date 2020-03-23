import { filterItemTemplate } from './template.js';

export class FilterItem extends HTMLLIElement {
  constructor(name, filter) {
    super();
    this._name = name;
    this._filter = filter;

    this.removeFilter = this.removeFilter.bind(this);
  }

  connectedCallback() {
    this.appendChild(filterItemTemplate.content.cloneNode(true));

    this.filterContentElement = this.querySelector('.fm-filter-content');
    this.removeFilterButtonElement = this.querySelector('.fm-remove-filter-button');
    this.removeFilterIconElement = this.querySelector('.fm-remove-filter-icon');

    this.className = 'fm-filter-item';
    this.dataset.filter = this._filter;

    this.filterContentElement.textContent = this._filter;

    this.removeFilterButtonElement.value = this._filter;
    this.removeFilterButtonElement.addEventListener('click', this.removeFilter);

    this.removeFilterIconElement.src = './assets/images/icon-remove.svg';
  }

  disconnectedCallback() {
    this.removeFilterButtonElement.removeEventListener('click', this.removeFilter);
  }

  removeFilter(event) {
    this.dispatchEvent(
      new CustomEvent('filter-removed', {
        bubbles: true,
        detail: {
          key: this._name,
          value: event.currentTarget.value,
        },
      })
    );
  }
}

customElements.define('fm-filter-item', FilterItem, { extends: 'li' });
