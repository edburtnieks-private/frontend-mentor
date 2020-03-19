import { jobListItemTemplate } from './template.js';

export class JobListItem extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.appendChild(jobListItemTemplate.content.cloneNode(true));
  }
}

customElements.define('job-list-item', JobListItem);
