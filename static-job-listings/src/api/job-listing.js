export const getJobListing = async () => {
  const response = await fetch('./job-listing.json');
  const jobListing = await response.json();
  return jobListing;
};
