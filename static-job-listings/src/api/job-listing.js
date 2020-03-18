export const getJobListing = async () => {
  try {
    const response = await fetch('./data/job-listing.json');
    const jobListing = await response.json();
    return jobListing;
  } catch (error) {
    throw new Error(error.message);
  }
};
