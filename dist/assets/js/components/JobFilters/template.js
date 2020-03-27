const jobFiltersTemplate = document.createElement('template');

jobFiltersTemplate.innerHTML = `
  <ul class="fm-filter-list"></ul>
  <button class="fm-clear-filters-button" aria-label="Clear filters">
    Clear
  </button>
`;

export { jobFiltersTemplate };
