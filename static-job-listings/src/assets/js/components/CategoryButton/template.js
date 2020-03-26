const categoryButtonTemplate = document.createElement('template');

categoryButtonTemplate.innerHTML = `
  <span class="fm-category-content">
    <slot>CATEGORY</slot>
  </span>
`;

export { categoryButtonTemplate };
