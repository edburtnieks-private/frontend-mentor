import { jobListTemplate } from './template.js';

export class JobList extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.appendChild(jobListTemplate.content.cloneNode(true));
  }

  set jobList(items) {
    this.render(items);
  }

  setProperty(element, property, value) {
    element[property] = value;
  }

  createTagListItem(tag) {
    const tagListItemElement = document.createElement('li');
    tagListItemElement.className = 'fm-tag';

    const tagContentElement = document.createElement('span');
    tagContentElement.className = 'fm-tag-content';
    this.setProperty(tagContentElement, 'textContent', tag);
    tagListItemElement.appendChild(tagContentElement);

    switch (tag) {
      case 'New!':
        tagListItemElement.classList.add('new');
        break;
      case 'Featured':
        tagListItemElement.classList.add('featured');
        break;
    }

    return tagListItemElement;
  }

  createTagList() {
    const tagListElement = document.createElement('ul');
    tagListElement.className = 'fm-tags';
    return tagListElement;
  }

  createCategoryButton(category) {
    const categoryButtonElement = document.createElement('button');
    categoryButtonElement.className = 'fm-category-button';

    const categoryContent = document.createElement('span');
    categoryContent.className = 'fm-category-content';
    this.setProperty(categoryContent, 'textContent', category);
    categoryButtonElement.appendChild(categoryContent);

    return categoryButtonElement;
  }

  createCategoryListItem(category) {
    const categoryListItemElement = document.createElement('li');
    categoryListItemElement.className = 'fm-category';
    const categoryButtonElement = this.createCategoryButton(category);
    categoryListItemElement.appendChild(categoryButtonElement);
    return categoryListItemElement;
  }

  createCategoryList(categories) {
    const categoryListElement = document.createElement('ul');
    categoryListElement.className = 'fm-category';
    categories.forEach((category) => {
      const categoryListItemElement = this.createCategoryListItem(category);
      categoryListElement.appendChild(categoryListItemElement);
    });
    return categoryListElement;
  }

  render(items) {
    items.forEach((item) => {
      const jobListItemElement = document.createElement('job-list-item');
      this.querySelector('#fm-job-list').appendChild(jobListItemElement);

      const headerElement = jobListItemElement.querySelector('#fm-header');
      const logoElement = jobListItemElement.querySelector('#fm-logo');
      const companyElement = jobListItemElement.querySelector('#fm-company');
      const titleElement = jobListItemElement.querySelector('#fm-title');
      const addedElement = jobListItemElement.querySelector('#fm-added');
      const typeElement = jobListItemElement.querySelector('#fm-type');
      const locationElement = jobListItemElement.querySelector('#fm-location');
      const categoriesElement = jobListItemElement.querySelector('#fm-categories');

      // Create tag list
      if (item.tags && Array.isArray(item.tags)) {
        const tagListElement = this.createTagList();
        item.tags.forEach((tag) => {
          const tagListItemElement = this.createTagListItem(tag);
          tagListElement.appendChild(tagListItemElement);

          switch (tag) {
            case 'Featured':
              jobListItemElement.classList.add('featured');
              break;
          }
        });
        headerElement.appendChild(tagListElement);
      }

      // Create category list
      Object.entries(item.categories).forEach(([name, value]) => {
        if (Array.isArray(value)) {
          // For multiple values in same category create sub-category lists
          const categoryListElement = this.createCategoryList(value);
          categoriesElement.appendChild(categoryListElement);
        } else {
          // For single category values create list item
          const categoryListItemElement = this.createCategoryListItem(value);
          categoriesElement.appendChild(categoryListItemElement);
        }
      });

      // Set properties
      this.setProperty(logoElement, 'src', item.companyLogo);
      this.setProperty(logoElement, 'alt', item.company);
      this.setProperty(companyElement, 'textContent', item.company);
      this.setProperty(titleElement, 'textContent', item.title);
      this.setProperty(addedElement, 'textContent', item.added);
      this.setProperty(typeElement, 'textContent', item.type);
      this.setProperty(locationElement, 'textContent', item.location);
    });
  }
}

customElements.define('job-list', JobList);
