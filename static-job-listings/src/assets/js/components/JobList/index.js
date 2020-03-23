import { jobListTemplate } from './template.js';
import { JobItem } from '../JobItem/index.js';

export class JobList extends HTMLElement {
  constructor() {
    super();
    this._filters = {};

    this.toggleFilter = this.toggleFilter.bind(this);
    this.addFilter = this.addFilter.bind(this);
    this.removeFilter = this.removeFilter.bind(this);
    this.clearFilters = this.clearFilters.bind(this);
  }

  connectedCallback() {
    this.appendChild(jobListTemplate.content.cloneNode(true));

    this.loadingElement = this.querySelector('[slot="loading"]');
    this.jobListElement = this.querySelector('.fm-job-list');

    this.jobItemAnimationDuration = parseInt(
      getComputedStyle(document.documentElement).getPropertyValue('--fm-job-item-animation-duration')
    );
    this.jobItemAnimationDurationOffset = parseInt(
      getComputedStyle(document.documentElement).getPropertyValue('--fm-job-item-animation-duration-offset')
    );

    this.addEventListener('filter-toggle', this.toggleFilter);
  }

  disconnectedCallback() {
    this.removeEventListener('filter-toggle', this.toggleFilter);
  }

  set jobList(items) {
    if (items && items.length) {
      this.removeChild(this.loadingElement);

      items.forEach((item, index) => {
        const jobItemElement = new JobItem(item, index + 1);
        this.jobListElement.appendChild(jobItemElement);
      });
    }
  }

  toggleFilter(event) {
    const filter = event.detail;

    if (!this._filters[filter.key]) {
      this._filters[filter.key] = new Set();
    }

    if (this._filters[filter.key].has(filter.value)) {
      this.removeFilter(filter);
    } else {
      this.addFilter(filter);
    }
  }

  addFilter(filter) {
    this._filters[filter.key].add(filter.value);

    const filterArray = Array.from(Object.keys(this._filters));

    this.jobArticleElements = this.jobListElement.querySelectorAll('fm-job-article');

    Array.from(this.jobArticleElements).forEach((jobArticleElement) => {
      const filterCount = Object.entries(jobArticleElement.dataset).filter(([key, value]) => {
        return this._filters[key] && this._filters[key].has(value);
      }).length;

      if (filterArray.length !== filterCount) {
        jobArticleElement.parentElement.classList.add('hidden');

        if (!isNaN(this.jobItemAnimationDuration) && !isNaN(this.jobItemAnimationDurationOffset)) {
          setTimeout(() => {
            jobArticleElement.parentElement.style.display = 'none';
          }, this.jobItemAnimationDuration + this.jobItemAnimationDurationOffset);
        } else {
          jobArticleElement.parentElement.style.display = 'none';
        }
      }
    });
  }

  removeFilter(filter) {
    this._filters[filter.key].delete(filter.value);

    if (this._filters[filter.key].size === 0) {
      delete this._filters[filter.key];
    }

    const filterArray = Array.from(Object.keys(this._filters));

    this.jobArticleElements = this.jobListElement.querySelectorAll('fm-job-article');

    Array.from(this.jobArticleElements).forEach((jobArticleElement) => {
      const filterCount = Object.entries(jobArticleElement.dataset).filter(([key, value]) => {
        return this._filters[key] && this._filters[key].has(value);
      }).length;

      if (filterArray.length === filterCount) {
        jobArticleElement.parentElement.classList.remove('hidden');
        jobArticleElement.parentElement.style.display = 'block';
      }
    });
  }

  clearFilters() {
    this._filters = {};

    this.jobArticleElements = this.jobListElement.querySelectorAll('fm-job-article');

    Array.from(this.jobArticleElements).forEach((jobArticleElement) => {
      jobArticleElement.parentElement.classList.remove('hidden');
      jobArticleElement.parentElement.style.display = 'block';
    });
  }
}

customElements.define('fm-job-list', JobList);
