import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    // For now, return a mock user for testing
    // In production, this would verify the Stytch session
    const mockUser = {
      id: 'mock-user-id',
      stytchUserId: 'mock-stytch-user-id',
      email: 'test@example.com',
      firstName: 'Тест',
      lastName: 'Пользователь',
      role: 'STUDENT',
      subscriptionStatus: 'FREE',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    return NextResponse.json(mockUser);
  } catch (error) {
    console.error('Auth me error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
