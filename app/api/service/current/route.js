import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import jwt from 'jsonwebtoken';

function convertBigInt(obj) {
  return JSON.parse(
    JSON.stringify(obj, (_, value) =>
      typeof value === 'bigint' ? value.toString() : value
    )
  );
}

export async function GET(req) {
  try {
    const authHeader = req.headers.get('authorization');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'authorization header missing' },
        { status: 401 }
      );
    }

    const token = authHeader.split(' ')[1];

    let payload;
    try {
      payload = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      console.error('JWT verification failed:', err);
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    if (!payload.userId || isNaN(payload.userId)) {
      return NextResponse.json(
        { error: 'Invalid userId in token' },
        { status: 400 }
      );
    }

    const userId = BigInt(payload.userId);

    const allservices = await prisma.service.findMany({
      where: { userId },
      orderBy: { createdat: 'desc' }, // ✅ match Prisma schema
    });

    const services = convertBigInt(allservices);

    return NextResponse.json({ data: services });
  } catch (err) {
    console.log('🔥 Server ERROR:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
