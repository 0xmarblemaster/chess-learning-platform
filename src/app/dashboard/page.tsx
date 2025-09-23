'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function DashboardPage() {
  const { user, isLoading, isAuthenticated, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/auth/login');
    }
  }, [isLoading, isAuthenticated, router]);

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
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Mobile Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <span className="text-2xl">♔</span>
              <span className="ml-2 text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Шахматная Империя
              </span>
            </div>
            <button
              onClick={logout}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
            >
              Выйти
            </button>
          </div>
        </div>
      </header>

      {/* Dashboard Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Добро пожаловать, {user?.firstName || 'Игрок'}!
          </h1>
          <p className="text-gray-600">
            Ваш шахматный путь начинается здесь
          </p>
        </div>

        {/* User Info Card */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Информация об аккаунте</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="font-medium">{user?.email}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Роль</p>
              <p className="font-medium">
                {user?.role === 'STUDENT' ? 'Студент' : 
                 user?.role === 'ADMIN' ? 'Администратор' : 'Инструктор'}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Подписка</p>
              <p className="font-medium">
                {user?.subscriptionStatus === 'FREE' ? 'Бесплатная' :
                 user?.subscriptionStatus === 'PREMIUM' ? 'Премиум' : 'Пожизненная'}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Дата регистрации</p>
              <p className="font-medium">
                {user?.createdAt ? new Date(user.createdAt).toLocaleDateString('ru-RU') : 'Неизвестно'}
              </p>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <div className="text-3xl mb-4">📚</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Курсы</h3>
            <p className="text-gray-600 mb-4">Изучайте шахматы по структурированной программе</p>
            <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
              Начать обучение
            </button>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-6">
            <div className="text-3xl mb-4">🧩</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Головоломки</h3>
            <p className="text-gray-600 mb-4">Решайте тактические задачи и улучшайте навыки</p>
            <button className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors">
              Решать головоломки
            </button>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-6">
            <div className="text-3xl mb-4">📊</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Прогресс</h3>
            <p className="text-gray-600 mb-4">Отслеживайте свой прогресс в обучении</p>
            <button className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors">
              Посмотреть прогресс
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
