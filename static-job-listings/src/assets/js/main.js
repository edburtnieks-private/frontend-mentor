import { getJobListing } from '../../api/job-listing.js';
import { JobListItem } from './job-list-item.js';

(async () => {
  const jobListingElement = document.querySelector('#job-listing');

  try {
    const jobListing = await getJobListing();
    jobListing.forEach(({ ...jobAttributes }) => {
      jobListingElement.appendChild(new JobListItem({ ...jobAttributes }));
    });
  } catch (error) {
    console.error(error);
  }
})();
