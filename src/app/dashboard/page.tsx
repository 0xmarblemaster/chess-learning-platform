'use client';

import { useRouter } from 'next/navigation';
import { StytchProviderWrapper } from '@/components/StytchProvider';
import { useAuth } from '@/contexts/AuthContext';
import { ClientOnly } from '@/components/ClientOnly';

function DashboardContent() {
  const router = useRouter();
  const { user, isLoading, isAuthenticated, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    router.push('/auth/login');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Загрузка...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    router.push('/auth/login');
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
          <div className="flex justify-between items-center py-4 sm:py-6">
            <div className="flex items-center">
              <span className="text-2xl sm:text-3xl lg:text-4xl">♔</span>
              <span className="ml-2 sm:ml-3 text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Шахматная Империя
              </span>
            </div>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-3 sm:px-4 lg:px-6 py-2 sm:py-3 rounded-lg hover:bg-red-600 transition-colors font-medium text-sm sm:text-base"
            >
              Выйти
            </button>
          </div>
        </div>
      </header>

      {/* Dashboard Content */}
      <main className="w-full px-4 sm:px-6 lg:px-12 xl:px-20 py-6 sm:py-8">
        {/* Welcome Section */}
        <div className="mb-8 sm:mb-12">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-2 sm:mb-4">
            Добро пожаловать, {user?.firstName || 'Игрок'}!
          </h1>
          <p className="text-base sm:text-lg lg:text-xl xl:text-2xl text-gray-600">
            Ваш шахматный путь начинается здесь
          </p>
        </div>

        {/* Desktop Layout: Side by Side */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 min-h-screen">
          {/* Left Column - User Info */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl p-8 sticky top-8 border-2 border-blue-200">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Информация об аккаунте</h2>
              <div className="space-y-6">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Email</p>
                  <p className="font-medium text-lg">{user?.email || 'user@example.com'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Роль</p>
                  <p className="font-medium text-lg">
                    {user?.role === 'STUDENT' ? 'Студент' : 
                     user?.role === 'ADMIN' ? 'Администратор' : 'Инструктор'}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Подписка</p>
                  <p className="font-medium text-lg">
                    {user?.subscriptionStatus === 'FREE' ? 'Бесплатная' :
                     user?.subscriptionStatus === 'PREMIUM' ? 'Премиум' : 'Пожизненная'}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Дата регистрации</p>
                  <p className="font-medium text-lg">
                    {user?.createdAt ? new Date(user.createdAt).toLocaleDateString('ru-RU', {
                      year: 'numeric',
                      month: '2-digit',
                      day: '2-digit'
                    }) : 'Неизвестно'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Quick Actions */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 border-2 border-green-200 p-4">
              <div className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-shadow">
                <div className="text-5xl mb-6">📚</div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">Курсы</h3>
                <p className="text-gray-600 mb-6 text-lg">Изучайте шахматы по структурированной программе</p>
                <button className="w-full bg-blue-600 text-white py-4 px-6 rounded-lg hover:bg-blue-700 transition-colors text-lg font-medium">
                  Начать обучение
                </button>
              </div>

              <div className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-shadow">
                <div className="text-5xl mb-6">🧩</div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">Головоломки</h3>
                <p className="text-gray-600 mb-6 text-lg">Решайте тактические задачи и улучшайте навыки</p>
                <button className="w-full bg-green-600 text-white py-4 px-6 rounded-lg hover:bg-green-700 transition-colors text-lg font-medium">
                  Решать головоломки
                </button>
              </div>

              <div className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-shadow lg:col-span-2">
                <div className="text-5xl mb-6">📊</div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">Прогресс</h3>
                <p className="text-gray-600 mb-6 text-lg">Отслеживайте свой прогресс в обучении</p>
                <button className="w-full bg-purple-600 text-white py-4 px-6 rounded-lg hover:bg-purple-700 transition-colors text-lg font-medium">
                  Посмотреть прогресс
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <StytchProviderWrapper>
      <ClientOnly fallback={
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Загрузка...</p>
          </div>
        </div>
      }>
        <DashboardContent />
      </ClientOnly>
    </StytchProviderWrapper>
  );
}
