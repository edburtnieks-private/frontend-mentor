const jobListingItemTemplate = document.querySelector('#job-list-item');

export class JobListItem extends HTMLElement {
  constructor({ ...job }) {
    super();

    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(jobListingItemTemplate.content.cloneNode(true));

    this.job = job;
  }

  connectedCallback() {
    const wrapperElement = this.shadowRoot.querySelector('#wrapper');
    const headerElement = this.shadowRoot.querySelector('#header');
    const titleElement = this.shadowRoot.querySelector('#title');
    const companyElement = this.shadowRoot.querySelector('#company');
    const addedElement = this.shadowRoot.querySelector('#added');
    const typeElement = this.shadowRoot.querySelector('#type');
    const locationElement = this.shadowRoot.querySelector('#location');
    const categoriesElement = this.shadowRoot.querySelector('#categories');

    // Create logo element
    const logoElement = document.createElement('img');
    this.setAttribute(logoElement, 'src', this.job.companyLogo);
    this.setAttribute(logoElement, 'alt', this.job.company);
    wrapperElement.insertBefore(logoElement, wrapperElement.children[0]);

    // Create tag list element
    if (this.job.tags) {
      const tagListElement = document.createElement('ul');
      // Create tag item elements
      this.job.tags.forEach((tag) => {
        this.createElementWithContent('li', tag, tagListElement);
      });
      headerElement.appendChild(tagListElement);
    }

    // Create category list elements
    Object.entries(this.job.categories).forEach(([name, value]) => {
      if (Array.isArray(value)) {
        // For multiple values in same category create sub-category list elements
        const categoryListElement = document.createElement('ul');
        value.forEach((category) => {
          this.createElementWithContent('li', category, categoryListElement);
        });
        categoriesElement.appendChild(categoryListElement);
      } else {
        // For single category values create list item element
        this.createElementWithContent('li', value, categoriesElement);
      }
    });

    // Set text content

    this.setTextContent(titleElement, this.job.title);
    this.setTextContent(companyElement, this.job.company);
    this.setTextContent(addedElement, this.job.added);
    this.setTextContent(typeElement, this.job.type);
    this.setTextContent(locationElement, this.job.location);

    // Set attributes
    this.setAttribute(addedElement, 'datetime', this.job.added);
  }

  createElementWithContent(tag, content, elementToAppendTo) {
    const element = document.createElement(tag);
    element.textContent = content;
    elementToAppendTo.appendChild(element);
  }

  setTextContent(element, text) {
    element.textContent = text;
  }

  setAttribute(element, attribute, value) {
    element.setAttribute(attribute, value);
  }
}

window.customElements.define('job-list-item', JobListItem);
