'use client';

import { StytchProviderWrapper } from '@/components/StytchProvider';
import { StytchLoginForm } from '@/components/StytchLoginForm';

export default function LoginPage() {
  return (
    <StytchProviderWrapper>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="w-full max-w-sm sm:max-w-md lg:max-w-lg xl:max-w-xl">
          <div className="text-center mb-6 sm:mb-8 lg:mb-10">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-2 sm:mb-3">
              Шахматная Империя
            </h1>
            <p className="text-sm sm:text-base lg:text-lg text-gray-600">
              Войдите в свою учетную запись
            </p>
          </div>
          
          <StytchLoginForm />
          
          <div className="mt-6 sm:mt-8 lg:mt-10 text-center">
            <p className="text-xs sm:text-sm lg:text-base text-gray-600">
              Нет аккаунта?{' '}
              <a href="/auth/register" className="font-medium text-blue-600 hover:text-blue-500 transition-colors">
                Зарегистрироваться
              </a>
            </p>
          </div>
        </div>
      </div>
    </StytchProviderWrapper>
  );
}