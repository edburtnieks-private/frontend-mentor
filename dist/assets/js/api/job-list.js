export const getJobList = async () => {
  try {
    const response = await fetch('./data/job-list.json');
    const jobList = await response.json();
    return jobList;
  } catch (error) {
    throw new Error(error.message);
  }
};
