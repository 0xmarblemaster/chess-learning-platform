'use client';

import { useEffect, useState } from 'react';
import { StytchUIClient } from '@stytch/vanilla-js';

export default function TestStytchPage() {
  const [stytchStatus, setStytchStatus] = useState<string>('Loading...');
  const [publicToken, setPublicToken] = useState<string>('');
  const [stytchClientStatus, setStytchClientStatus] = useState<string>('Not tested');

  useEffect(() => {
    // Test if we can access the public token
    const token = process.env.NEXT_PUBLIC_STYTCH_PUBLIC_TOKEN;
    setPublicToken(token || 'Not found');
    
    if (token) {
      setStytchStatus('✅ Public token found');
      
      // Test creating Stytch client
      try {
        new StytchUIClient(token);
        setStytchClientStatus('✅ Stytch client created successfully');
      } catch (error) {
        setStytchClientStatus(`❌ Error creating client: ${error}`);
      }
    } else {
      setStytchStatus('❌ Public token not found');
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">
          Stytch Integration Test
        </h1>
        
        <div className="space-y-6">
          <div className="bg-gray-50 rounded-lg p-4">
            <h2 className="text-lg font-semibold mb-2">Environment Status</h2>
            <p className="text-sm text-gray-600 mb-2">
              <strong>Status:</strong> {stytchStatus}
            </p>
            <p className="text-sm text-gray-600">
              <strong>Public Token:</strong> {publicToken.substring(0, 20)}...
            </p>
          </div>

          <div className="bg-blue-50 rounded-lg p-4">
            <h2 className="text-lg font-semibold mb-2">Client Status</h2>
            <p className="text-sm text-gray-600">
              <strong>Stytch Client:</strong> {stytchClientStatus}
            </p>
          </div>

          <div className="bg-blue-50 rounded-lg p-4">
            <h2 className="text-lg font-semibold mb-2">Next Steps</h2>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>✅ Environment variables loaded</li>
              <li>⏳ Test StytchProvider initialization</li>
              <li>⏳ Test StytchLoginForm component</li>
              <li>⏳ Test magic link flow</li>
            </ul>
          </div>

          <div className="text-center">
            <a 
              href="/auth/login" 
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Go to Login Page
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}