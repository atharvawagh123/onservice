import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { serialize } from '@/lib/serialize.js';

export async function PATCH(req, { params }) {
  try {
    const { id } = await params;

    const user = await prisma.userapi_userprofile.findUnique({
      where: { id: BigInt(id) },
    });

    const newstatus = !user.is_active;

    const updateuser = await prisma.userapi_userprofile.update({
      where: { id: BigInt(id) },
      data: {
        is_active: newstatus,
      },
    });

    if (!updateuser) {
      return NextResponse.json(
        {
          error: 'user is not available in data base',
          success: true,
        },
        {
          status: 400,
        }
      );
    }

    return NextResponse.json(
      {
        user: serialize(updateuser),
        message: 'user activity changed',
        id,
        success: true,
      },
      {
        status: 201,
      }
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      {
        error: 'error from frontend!!!!!',
      },
      {
        status: 400,
      }
    );
  }
}
