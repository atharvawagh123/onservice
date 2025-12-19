import prisma from '@/lib/prisma';
import jwt from 'jsonwebtoken';

export async function PATCH(req, { params }) {
  try {
    const authHeader = req.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return new Response(
        JSON.stringify({ error: 'Authorization header missing' }),
        { status: 401 }
      );
    }

    const token = authHeader.split(' ')[1];
    let payload;
    try {
      payload = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      console.error('JWT verification failed:', err);
      return new Response(JSON.stringify({ error: 'Invalid token' }), {
        status: 401,
      });
    }

    // Fetch the authenticated user
    const authUser = await prisma.userapi_userprofile.findUnique({
      where: { id: BigInt(payload.userId) },
    });

    if (!authUser) {
      return new Response(JSON.stringify({ error: 'User not found' }), {
        status: 404,
      });
    }

    // Only staff or superuser can toggle verification
    if (!authUser.is_staff && !authUser.is_superuser) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 403,
      });
    }

    const { id } = params; // ID of the user to toggle verification

    const userToVerify = await prisma.userapi_userprofile.findUnique({
      where: { id: BigInt(id) },
    });

    if (!userToVerify) {
      return new Response(JSON.stringify({ error: 'User not found' }), {
        status: 404,
      });
    }

    // Toggle is_verified
    const updatedUser = await prisma.userapi_userprofile.update({
      where: { id: BigInt(id) },
      data: { is_verified: !userToVerify.is_verified },
    });

    return new Response(
      JSON.stringify({
        success: true,
        user: updatedUser,
        message: `User has been ${updatedUser.is_verified ? 'verified' : 'unverified'}`,
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
    });
  }
}
