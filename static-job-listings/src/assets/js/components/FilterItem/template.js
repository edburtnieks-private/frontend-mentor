const filterItemTemplate = document.createElement('template');

filterItemTemplate.innerHTML = `
  <div class="fm-filter-content">
    <slot></slot>
  </div>

  <button class="fm-remove-filter-button">
    <img alt="" class="fm-remove-filter-icon" />
  </button>
`;

export { filterItemTemplate };
