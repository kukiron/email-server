import serverless from 'serverless-http';

import app from '../server';

// serverless function for netlify CD
export const handler = serverless(app);
