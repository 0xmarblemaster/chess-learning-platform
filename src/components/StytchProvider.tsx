'use client';

import { useEffect, useState } from 'react';
import { StytchProvider } from '@stytch/nextjs';
import { StytchUIClient } from '@stytch/vanilla-js';
import { AuthProvider } from '@/contexts/AuthContext';

interface StytchProviderWrapperProps {
  children: React.ReactNode;
}

export function StytchProviderWrapper({ children }: StytchProviderWrapperProps) {
  const [stytchClient, setStytchClient] = useState<StytchUIClient | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Only run on client side
    setIsClient(true);
    
    // Check if Stytch token is available
    const stytchToken = process.env.NEXT_PUBLIC_STYTCH_PUBLIC_TOKEN;
    
    if (!stytchToken) {
      console.error('NEXT_PUBLIC_STYTCH_PUBLIC_TOKEN is not configured');
      setStytchClient(null);
      return;
    }
    
    // Create the Stytch client only on client side
    try {
      const client = new StytchUIClient(stytchToken);
      setStytchClient(client);
    } catch (error) {
      console.error('Failed to create Stytch client:', error);
      setStytchClient(null);
    }
  }, []);

  // Show loading state until client is ready
  if (!isClient) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading Stytch...</p>
        </div>
      </div>
    );
  }

  // Show error if Stytch is not configured
  if (!stytchClient) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6">
          <div className="text-red-500 text-4xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Configuration Error</h2>
          <p className="text-gray-600 mb-6">
            Stytch authentication is not properly configured. Please check your environment variables.
          </p>
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-left">
            <p className="text-sm text-yellow-800">
              <strong>Missing:</strong> NEXT_PUBLIC_STYTCH_PUBLIC_TOKEN
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <StytchProvider stytch={stytchClient}>
      <AuthProvider>
        {children}
      </AuthProvider>
    </StytchProvider>
  );
}