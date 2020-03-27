import { getJobList } from './api/job-list.js';
import './components/JobFilters/index.js';
import './components/JobList/index.js';

(async () => {
  const jobListElement = document.querySelector('#job-listing');
  const jobFiltersElement = document.querySelector('#job-filters');

  try {
    const jobList = await getJobList();
    jobListElement.jobList = jobList;

    jobListElement.addEventListener('filter-toggle', (event) => {
      jobFiltersElement.toggleFilter(event.detail);
    });

    jobFiltersElement.addEventListener('filters-cleared', () => {
      jobListElement.clearFilters();
    });

    jobFiltersElement.addEventListener('filter-removed', (event) => {
      jobListElement.removeFilter(event.detail);
    });
  } catch (error) {
    console.error(error);
  }
})();
