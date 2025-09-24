import { StytchUIClient } from '@stytch/vanilla-js';

// Only create the client on the client side
let stytchClient: StytchUIClient | null = null;

export const getStytchClient = () => {
  if (typeof window === 'undefined') {
    return null; // Return null on server side
  }
  
  if (!stytchClient) {
    const stytchToken = process.env.NEXT_PUBLIC_STYTCH_PUBLIC_TOKEN;
    
    if (!stytchToken) {
      console.error('NEXT_PUBLIC_STYTCH_PUBLIC_TOKEN is not configured');
      return null;
    }
    
    try {
      stytchClient = new StytchUIClient(stytchToken);
    } catch (error) {
      console.error('Failed to create Stytch client:', error);
      return null;
    }
  }
  
  return stytchClient;
};