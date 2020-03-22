import { JobArticle } from '../JobArticle/index.js';

export class JobItem extends HTMLLIElement {
  constructor(job, index) {
    super();
    this.job = job;
    this.index = index;
  }

  connectedCallback() {
    this.className = 'fm-job-item';
    this.style.cssText = `--fm-job-item-index: ${this.index}`;

    const jobItemArticle = new JobArticle(this.job);
    this.appendChild(jobItemArticle);
  }
}

customElements.define('fm-job-item', JobItem, { extends: 'li' });
