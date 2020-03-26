const tagItemTemplate = document.createElement('template');

tagItemTemplate.innerHTML = `
  <span class="fm-tag-content">
    <slot></slot>
  </span>
`;

export { tagItemTemplate };
