import { NextRequest, NextResponse } from 'next/server';
import { stytchServer } from '@/lib/stytch-server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    // Check if Stytch server is configured
    if (!stytchServer) {
      return NextResponse.json({ error: 'Stytch not configured' }, { status: 503 });
    }

    // Get session token from cookies
    const sessionToken = request.cookies.get('stytch_session')?.value;
    
    if (!sessionToken) {
      return NextResponse.json({ error: 'No session found' }, { status: 401 });
    }

    // Verify session with Stytch
    const session = await stytchServer.sessions.authenticate({
      session_token: sessionToken,
    });

    if (!session || !session.user) {
      return NextResponse.json({ error: 'Invalid session' }, { status: 401 });
    }

    // Get user from our database
    const user = await prisma.user.findUnique({
      where: {
        stytchUserId: session.user.user_id,
      },
    });

    if (!user) {
      // Return Stytch user data if not in our database yet
      return NextResponse.json({
        id: session.user.user_id,
        stytchUserId: session.user.user_id,
        email: session.user.emails[0]?.email || '',
        firstName: session.user.name?.first_name,
        lastName: session.user.name?.last_name,
        role: 'STUDENT',
        subscriptionStatus: 'FREE',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
    }

    // Update last login
    await prisma.user.update({
      where: { id: user.id },
      data: { lastLogin: new Date() },
    });

    return NextResponse.json(user);
  } catch (error) {
    console.error('Auth me error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
