import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import jwt from "jsonwebtoken";

function convertBigInt(obj) {
  return JSON.parse(
    JSON.stringify(obj, (_, value) =>
      typeof value === "bigint" ? value.toString() : value,
    ),
  );
}

export async function GET(req) {
  try {
    const authHeader = req.headers.get("authorization");
    const token =
      req.cookies.get("token")?.value ||
      (authHeader?.startsWith("Bearer ") ? authHeader.split(" ")[1] : null);

    if (!token) {
      return NextResponse.json(
        { error: "Unauthorized: Token missing" },
        { status: 401 },
      );
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return NextResponse.json({
        success: false,
        message: "Token not verified, please login!",
      });
    }

    const { searchParams } = new URL(req.url);
    const service_id = searchParams.get("service_id");

    if (!service_id) {
      return NextResponse.json(
        { error: "service_id is required" },
        { status: 400 },
      );
    }

    const enquiries = await prisma.enquiry.findMany({
      where: {
        service_id: BigInt(service_id),
      },
      orderBy: {
        created_at: "desc",
      },
    });

    return NextResponse.json({
      success: true,
      enquiries: convertBigInt(enquiries),
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
