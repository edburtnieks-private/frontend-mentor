import { jobListTemplate } from './template.js';
import { JobItem } from '../JobItem/index.js';

export class JobList extends HTMLElement {
  constructor() {
    super();

    this.categories = {};
  }

  connectedCallback() {
    this.appendChild(jobListTemplate.content.cloneNode(true));

    const jobItemAnimationDuration = parseInt(
      getComputedStyle(document.documentElement).getPropertyValue('--fm-job-item-animation-duration')
    );
    const jobItemAnimationDurationOffset = parseInt(
      getComputedStyle(document.documentElement).getPropertyValue('--fm-job-item-animation-duration-offset')
    );

    this.addEventListener('category-changed', (event) => {
      if (!this.categories[event.detail.key]) {
        this.categories[event.detail.key] = new Set();
      }

      if (this.categories[event.detail.key].has(event.detail.value)) {
        this.categories[event.detail.key].delete(event.detail.value);

        if (this.categories[event.detail.key].size === 0) {
          delete this.categories[event.detail.key];
        }
      } else {
        this.categories[event.detail.key].add(event.detail.value);
      }

      const jobArticleElements = this.querySelectorAll('fm-job-article');

      const categoryArray = Array.from(Object.keys(this.categories));

      Array.from(jobArticleElements).forEach((jobArticleElement) => {
        const categoryCount = Object.entries(jobArticleElement.dataset).filter(([key, value]) => {
          return this.categories[key] && this.categories[key].has(value);
        }).length;

        if (categoryArray.length !== categoryCount) {
          jobArticleElement.parentElement.classList.add('hidden');
          
          if (!isNaN(jobItemAnimationDuration) && !isNaN(jobItemAnimationDurationOffset)) {
            setTimeout(() => {
              jobArticleElement.parentElement.style.display = 'none';
            }, jobItemAnimationDuration + jobItemAnimationDurationOffset);
          } else {
            jobArticleElement.parentElement.style.display = 'none';
          }
        } else {
          jobArticleElement.parentElement.classList.remove('hidden');
          jobArticleElement.parentElement.style.display = 'block';
        }
      });
    });
  }

  disconnectedCallback() {
    this.removeEventListener('category-changed', () => {});
  }

  set jobList(items) {
    this.setJobList(items);
  }

  setJobList(items) {
    if (items && items.length) {
      this.removeChild(this.querySelector('[slot="loading"]'));

      items.forEach((item, index) => {
        const jobItemElement = new JobItem(item, index + 1);
        this.querySelector('.fm-job-list').appendChild(jobItemElement);
      });
    }
  }
}

customElements.define('fm-job-list', JobList);
