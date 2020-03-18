import { getJobListing } from '../../api/job-listing.js';
import { JobListItem } from './job-list-item.js';

const jobListingElement = document.querySelector('#job-listing');

getJobListing().then((jobListing) => {
  jobListing.forEach(({ ...jobAttributes }) => {
    jobListingElement.appendChild(new JobListItem({ ...jobAttributes }));
  });
});
