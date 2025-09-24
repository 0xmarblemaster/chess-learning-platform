'use client';

import { StytchLogin } from '@stytch/nextjs';
import { Products } from '@stytch/vanilla-js';

const REDIRECT_URL = 'http://localhost:3000/auth/callback';

export const StytchLoginForm = () => {
  const styles = {
    container: {
      width: "100%",
      maxWidth: "100%",
      margin: "0 auto",
    },
    buttons: {
      primary: {
        backgroundColor: "#1976d2",
        borderColor: "#1976d2",
        borderRadius: "12px",
        padding: "clamp(12px, 2vw, 16px) clamp(24px, 4vw, 32px)",
        fontSize: "clamp(14px, 2vw, 18px)",
        fontWeight: "600",
        minHeight: "clamp(44px, 6vw, 56px)",
      },
      secondary: {
        backgroundColor: "transparent",
        borderColor: "#1976d2",
        color: "#1976d2",
        borderRadius: "12px",
        padding: "12px 24px",
        fontSize: "16px",
        fontWeight: "600",
      },
    },
    input: {
      borderRadius: "12px",
      padding: "clamp(12px, 2vw, 16px) clamp(16px, 3vw, 20px)",
      fontSize: "clamp(14px, 2vw, 18px)",
      border: "1px solid #e0e0e0",
      minHeight: "clamp(44px, 6vw, 56px)",
    },
    label: {
      fontSize: "14px",
      fontWeight: "600",
      color: "#374151",
      marginBottom: "8px",
    },
    headerText: {
      fontSize: "clamp(20px, 4vw, 28px)",
      fontWeight: "700",
      color: "#111827",
      textAlign: "center" as const,
      marginBottom: "8px",
    },
    subheaderText: {
      fontSize: "clamp(14px, 2.5vw, 18px)",
      color: "#6b7280",
      textAlign: "center" as const,
      marginBottom: "32px",
    },
  };

  const config = {
    products: [Products.emailMagicLinks],
    emailMagicLinksOptions: {
      loginRedirectURL: REDIRECT_URL,
      loginExpirationMinutes: 7, // Reduced to 7 minutes (default for test projects)
      signupRedirectURL: REDIRECT_URL,
      signupExpirationMinutes: 7, // Reduced to 7 minutes (default for test projects)
    },
  };

  return (
    <div className="w-full">
      <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-6 lg:p-8">
        <StytchLogin config={config} styles={styles} />
      </div>

      <div className="text-center mt-6 sm:mt-8">
        <p className="text-xs sm:text-sm lg:text-base text-gray-500">
          Продолжая, вы соглашаетесь с нашими{' '}
          <a href="/terms" className="text-blue-600 hover:text-blue-700 transition-colors">
            условиями
          </a>{' '}
          и{' '}
          <a href="/privacy" className="text-blue-600 hover:text-blue-700 transition-colors">
            политикой конфиденциальности
          </a>
        </p>
      </div>
    </div>
  );
};