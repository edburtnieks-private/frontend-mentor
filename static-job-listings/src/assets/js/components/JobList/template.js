const jobListTemplate = document.createElement('template');

jobListTemplate.innerHTML = `
  <slot name="loading"></slot>

  <ul id="fm-job-list">
    <!-- Job list is created dynamically -->
  </ul>
`;

export { jobListTemplate };
