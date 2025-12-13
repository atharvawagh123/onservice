import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { serialize } from "@/lib/serialize.js";

export async function POST(req) {
  try {
    const body = await req.json();
    const { email, password, first_name, last_name, username, age } = body;

    if (!email || !password || !username) {
      return Response.json(
        { error: "Required fields missing" },
        { status: 400 },
      );
    }

    const existingUser = await prisma.userapi_userprofile.findUnique({
      where: { email },
    });

    if (existingUser) {
      return Response.json({ error: "User already exists" }, { status: 409 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const subadmin = await prisma.userapi_userprofile.create({
      data: {
        email,
        password: hashedPassword,
        first_name,
        last_name,
        username,
        age: age ?? 18,
        is_active: true,
        is_staff: true,
        is_superuser: false,
        role: "SUBADMIN",
      },
    });

    return Response.json(
      {
        success: true,
        message: "Subadmin created successfully",
        subadmin: serialize(subadmin),
      },
      { status: 201 },
    );
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
