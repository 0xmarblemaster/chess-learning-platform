import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const { stytchUserId, email, firstName, lastName } = await request.json();

    if (!stytchUserId || !email) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { stytchUserId },
    });

    if (existingUser) {
      return NextResponse.json({ error: 'User already exists' }, { status: 409 });
    }

    // Create user in our database
    const user = await prisma.user.create({
      data: {
        stytchUserId,
        email,
        firstName,
        lastName,
        role: 'STUDENT',
        subscriptionStatus: 'FREE',
      },
    });

    // Log user activity
    await prisma.userActivity.create({
      data: {
        userId: user.id,
        activityType: 'registration',
        activityData: {
          email,
          firstName,
          lastName,
        },
      },
    });

    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
