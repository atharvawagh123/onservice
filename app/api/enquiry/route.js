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

export async function POST(req) {
  try {
    const body = await req.json();
    const { service_id, phone, message } = body;

    const authHeader = req.headers.get('authorization');

    const token =
      req.cookies.get('token')?.value ||
      (authHeader?.startsWith('Bearer ') ? authHeader.split(' ')[1] : null);

    if (!token) {
      return NextResponse.json(
        { error: 'Unauthorized: Token missing' },
        { status: 401 }
      );
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const enquiry = await prisma.enquiry.create({
      data: {
        user_id: parseInt(decoded.userId, 10),
        service_id: Number(service_id),
        name: decoded.name,
        email: decoded.email,
        phone,
        message,
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Enquiry submitted successfully!',
      enquiry: convertBigInt(enquiry),
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function GET(req) {
  try {
    // Optional: Check auth token
    const authHeader = req.headers.get('authorization');
    const token =
      req.cookies.get('token')?.value ||
      (authHeader?.startsWith('Bearer ') ? authHeader.split(' ')[1] : null);

    if (!token) {
      return NextResponse.json(
        { error: 'Unauthorized: Token missing' },
        { status: 401 }
      );
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Fetch all enquiries with related user and service
    const enquiries = await prisma.enquiry.findMany({
      where: {
        user_id: parseInt(decoded.userId, 10),
      },
      orderBy: {
        created_at: 'desc',
      },
    });

    return NextResponse.json({
      success: true,
      data: convertBigInt(enquiries),
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    // 1️⃣ Get enquiry ID from query params
    const { searchParams } = new URL(req.url);
    const enquiryId = searchParams.get('id');

    if (!enquiryId) {
      return NextResponse.json(
        { error: 'Enquiry ID is required' },
        { status: 400 }
      );
    }

    // // 2️⃣ Check authorization (JWT)
    // const authHeader = req.headers.get("authorization");
    // const token =
    //   req.cookies.get("token")?.value ||
    //   (authHeader?.startsWith("Bearer ") ? authHeader.split(" ")[1] : null);

    // if (!token) {
    //   return NextResponse.json(
    //     { error: "Unauthorized: Token missing" },
    //     { status: 401 },
    //   );
    // }

    // const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 3️⃣ Delete enquiry only if it belongs to this user
    const deletedEnquiry = await prisma.enquiry.deleteMany({
      where: {
        id: Number(enquiryId),
        // user_id: parseInt(decoded.userId, 10),
      },
    });

    if (deletedEnquiry.count === 0) {
      return NextResponse.json(
        { error: 'Enquiry not found or you are not authorized' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Enquiry deleted successfully!',
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
