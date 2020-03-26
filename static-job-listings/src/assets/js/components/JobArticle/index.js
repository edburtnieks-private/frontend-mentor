import { jobItemTemplate } from './template.js';
import { CategoryItem } from '../CategoryItem/index.js';
import { CategoryList } from '../CategoryList/index.js';
import { TagList } from '../TagList/index.js';

export class JobArticle extends HTMLElement {
  constructor({ ...props }) {
    super();

    this.props = props;
  }

  setProperty(element, property, value) {
    element[property] = value;
  }

  connectedCallback() {
    this.appendChild(jobItemTemplate.content.cloneNode(true));

    const contentElement = this.querySelector('.fm-content');
    const headerElement = this.querySelector('.fm-header');
    const logoElement = this.querySelector('.fm-logo');
    const companyElement = this.querySelector('.fm-company');
    const titleElement = this.querySelector('.fm-title');
    const addedElement = this.querySelector('.fm-added');
    const typeElement = this.querySelector('.fm-type');
    const locationElement = this.querySelector('.fm-location');

    // Create tag list
    if (this.props.tags && Array.isArray(this.props.tags)) {
      const tagListElement = new TagList(this.props.tags);
      headerElement.appendChild(tagListElement);

      if (this.props.tags.includes('Featured')) {
        this.classList.add('featured');
      }
    }

    // Create category list
    const categoryListElement = new CategoryList();
    contentElement.appendChild(categoryListElement);

    Object.entries(this.props.categories).forEach(([name, value]) => {
      // Create category items
      if (Array.isArray(value)) {
        value.forEach((subCategory) => {
          const categoryItemElement = new CategoryItem(name, subCategory);
          categoryListElement.appendChild(categoryItemElement);
        });
      } else {
        const categoryItemElement = new CategoryItem(name, value);
        categoryListElement.appendChild(categoryItemElement);
      }

      // Set data attributes
      this.dataset[name] = value;
    });

    // Set element properties
    this.setProperty(logoElement, 'src', this.props.companyLogo);
    this.setProperty(logoElement, 'alt', this.props.company);
    this.setProperty(companyElement, 'textContent', this.props.company);
    this.setProperty(titleElement, 'textContent', this.props.title);
    this.setProperty(
      addedElement,
      'textContent',
      dateFns.distanceInWordsStrict(new Date(), new Date(this.props.added), { addSuffix: true })
    );
    this.setProperty(typeElement, 'textContent', this.props.type);
    this.setProperty(locationElement, 'textContent', this.props.location);
  }
}

customElements.define('fm-job-article', JobArticle);
