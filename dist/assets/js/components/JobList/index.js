import { JobItem } from '../JobItem/index.js';

export class JobList extends HTMLUListElement {
  constructor() {
    super();

    this._filters = new Set();

    this.toggleFilter = this.toggleFilter.bind(this);
    this.addFilter = this.addFilter.bind(this);
    this.removeFilter = this.removeFilter.bind(this);
    this.clearFilters = this.clearFilters.bind(this);
  }

  connectedCallback() {
    this.className = 'fm-job-list';
    this.addEventListener('filter-toggle', this.toggleFilter);
  }

  disconnectedCallback() {
    this.removeEventListener('filter-toggle', this.toggleFilter);
  }

  set jobList(items) {
    if (items && items.length) {
      items.forEach((item, index) => {
        const jobItemElement = new JobItem(item, index + 1);
        this.appendChild(jobItemElement);
      });
    }
  }

  toggleFilter(event) {
    const filter = event.detail;

    if (this._filters.has(filter)) {
      this.removeFilter(filter);
    } else {
      this.addFilter(filter);
    }
  }

  addFilter(filter) {
    this._filters.add(filter);

    const filterValueArray = Object.values(this._filters);
    const jobArticleElements = this.querySelectorAll('fm-job-article');

    Array.from(jobArticleElements).forEach((jobArticleElement) => {
      const filterArray = Object.values(jobArticleElement.dataset);
      const filterValues = filterArray.map((value) => value.split(',')).flat();
      const filterCount = filterValues.filter((x) => this._filters && this._filters.has(x)).length;

      if (this._filters.size !== filterCount) {
        jobArticleElement.parentElement.classList.add('hidden');
        jobArticleElement.parentElement.style.display = 'none';
      }
    });
  }

  removeFilter(filter) {
    this._filters.delete(filter);

    const filterValueArray = Object.values(this._filters);
    const jobArticleElements = this.querySelectorAll('fm-job-article');

    Array.from(jobArticleElements).forEach((jobArticleElement) => {
      const filterArray = Object.values(jobArticleElement.dataset);
      const filterValues = filterArray.map((value) => value.split(',')).flat();
      const filterCount = filterValues.filter((x) => this._filters && this._filters.has(x)).length;

      if (this._filters.size === filterCount) {
        jobArticleElement.parentElement.classList.remove('hidden');
        jobArticleElement.parentElement.style.display = 'block';
      }
    });
  }

  clearFilters() {
    this._filters.clear();

    const jobArticleElements = this.querySelectorAll('fm-job-article');

    Array.from(jobArticleElements).forEach((jobArticleElement) => {
      jobArticleElement.parentElement.classList.remove('hidden');
      jobArticleElement.parentElement.style.display = 'block';
    });
  }
}

customElements.define('fm-job-list', JobList, { extends: 'ul' });
