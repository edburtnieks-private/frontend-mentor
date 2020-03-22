const jobListTemplate = document.createElement('template');

jobListTemplate.innerHTML = `
  <slot name="loading"></slot>
  <ul class="fm-job-list"></ul>
`;

export { jobListTemplate };
