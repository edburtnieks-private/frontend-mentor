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

    if (!this.hasAttribute('filtered')) {
      this.setAttribute('filtered', '');
    }
    this.classList.add('hidden');

    this.jobFilterListElement = this.querySelector('.fm-filter-list');
    this.clearFiltersButtonElement = this.querySelector('.fm-clear-filters-button');

    this.addEventListener('filter-removed', () => this.removeFilter(event.detail));
    this.clearFiltersButtonElement.addEventListener('click', this.clearFilters);
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
    if (this._filters.has(filter)) {
      this.removeFilter(filter);
    } else {
      this.addFilter(filter);
    }
  }

  addFilter(filter) {
    if (this._filters.size === 0) {
      this.filtered = true;
    }

    this._filters.add(filter);
    const filterItemElement = new FilterItem(filter);
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
