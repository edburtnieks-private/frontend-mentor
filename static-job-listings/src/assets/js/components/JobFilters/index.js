import { jobFiltersTemplate } from './template.js';
import { FilterItem } from '../FilterItem/index.js';

export class JobFilters extends HTMLElement {
  constructor() {
    super();
    this._filters = new Set();

    this.toggleFilter = this.toggleFilter.bind(this);
    this.addFilter = this.addFilter.bind(this);
    this.removeFilter = this.removeFilter.bind(this);
    this.clearFilters = this.clearFilters.bind(this);
  }

  connectedCallback() {
    this.appendChild(jobFiltersTemplate.content.cloneNode(true));

    this.jobFilterListElement = this.querySelector('.fm-filter-list');
    this.clearFiltersButtonElement = this.querySelector('.fm-clear-filters-button');

    this.addEventListener('filter-removed', () => this.removeFilter(event.detail.value));
    this.clearFiltersButtonElement.addEventListener('click', this.clearFilters);

    if (!this.hasAttribute('filtered')) {
      this.setAttribute('filtered', false);
    }

    this.classList.add('hidden');
  }

  disconnectedCallback() {
    this.removeEventListener('filter-removed', this.removeFilter);
    this.clearFiltersButtonElement.removeEventListener('click', this.clearFilters);
  }

  get filtered() {
    return this.hasAttribute('filtered');
  }

  set filtered(value) {
    const isFiltered = Boolean(value);

    if (isFiltered) {
      this.setAttribute('filtered', '');
    } else {
      this.removeAttribute('filtered');
    }
  }

  static get observedAttributes() {
    return ['filtered'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    const hasValue = newValue !== null;

    switch (name) {
      case 'filtered':
        if (hasValue) {
          this.className = '';
        } else {
          this.className = 'hidden';
        }
        break;
    }
  }

  toggleFilter(filter) {
    if (this._filters.has(filter.value)) {
      this.removeFilter(filter.value);
    } else {
      this.addFilter(filter);
    }
  }

  addFilter(filter) {
    if (this._filters.size === 0) {
      this.filtered = true;
    }

    this._filters.add(filter.value);
    const filterItemElement = new FilterItem(filter.key, filter.value);
    this.jobFilterListElement.appendChild(filterItemElement);
  }

  removeFilter(filter) {
    this._filters.delete(filter);
    const filterItemElement = this.jobFilterListElement.querySelector(`[data-filter=${filter}]`);
    this.jobFilterListElement.removeChild(filterItemElement);

    if (this._filters.size === 0) {
      this.filtered = false;
    }
  }

  clearFilters() {
    while (this.jobFilterListElement.firstChild) {
      this.jobFilterListElement.removeChild(this.jobFilterListElement.lastChild);
    }

    this._filters.clear();
    this.filtered = false;

    this.dispatchEvent(new CustomEvent('filters-cleared'));
  }
}

customElements.define('fm-job-filters', JobFilters);
