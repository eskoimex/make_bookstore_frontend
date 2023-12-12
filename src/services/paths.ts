
const WORKFLOW_URL = `https://frontassignment.hyperhire.in`;

const paths = {
  GET_BOOKS: (query:number|null  = 1) =>
    `${WORKFLOW_URL}?page=${query}`,
 
};

export default paths;
