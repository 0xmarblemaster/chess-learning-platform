import { Client } from 'stytch';

// Only initialize Stytch server if environment variables are available
export const stytchServer = process.env.STYTCH_PROJECT_ID && process.env.STYTCH_SECRET
  ? new Client({
      project_id: process.env.STYTCH_PROJECT_ID,
      secret: process.env.STYTCH_SECRET,
    })
  : null;