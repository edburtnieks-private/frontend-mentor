import { getJobList } from './api/job-list.js';
import './components/JobFilters/index.js';
import './components/JobList/index.js';

const jobListElement = document.querySelector('#job-listing');
const jobFiltersElement = document.querySelector('#job-filters');

jobListElement.jobList = getJobList();

jobListElement.addEventListener('filter-toggle', (event) => {
  jobFiltersElement.toggleFilter(event.detail);
});

jobFiltersElement.addEventListener('filters-cleared', () => {
  jobListElement.clearFilters();
});

jobFiltersElement.addEventListener('filter-removed', (event) => {
  jobListElement.removeFilter(event.detail);
});
