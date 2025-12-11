import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { verifyuser } from "@/lib/auth.js";
// import jwt from "jsonwebtoken";

export async function GET() {
  try {
    // authno added
    // Optional: Check auth token

    const token1 = await verifyuser();
    if (token1) {
      return NextResponse.json({
        error: "token not coming for verify user function ",
      });
    }
    // const decoded = jwt.verify(token1, process.env.JWT_SECRET);

    // Fetch all enquiries with related user and service
    const enquiries = await prisma.enquiry.findMany({
      orderBy: {
        created_at: "desc",
      },
    });

    return NextResponse.json({
      message: "get all ",
      success: true,
      data: enquiries,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
