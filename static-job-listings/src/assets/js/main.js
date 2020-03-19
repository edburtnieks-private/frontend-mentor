import { getJobList } from '../../api/job-list.js';
import './components/JobList/index.js';
import './components/JobListItem/index.js';

(async () => {
  const jobListElement = document.querySelector('#job-listing');

  try {
    const jobList = await getJobList();
    jobListElement.jobList = jobList;
  } catch (error) {
    console.error(error);
  }
})();
