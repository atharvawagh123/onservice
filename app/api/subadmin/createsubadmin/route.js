import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { serialize } from "@/lib/serialize";

export async function POST(req) {
  try {
    const body = await req.json();

    const { email, password, first_name, last_name, username, age } = body;

    // Validation
    if (!email || !password || !username) {
      return NextResponse.json(
        { error: "Required fields missing" },
        { status: 400 },
      );
    }

    // Check existing user
    const existingUser = await prisma.userapi_userprofile.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 409 },
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // ✅ FIX: convert age to number
    const parsedAge =
      age === "" || age === undefined || age === null ? 18 : Number(age);

    if (Number.isNaN(parsedAge)) {
      return NextResponse.json(
        { error: "Age must be a valid number" },
        { status: 400 },
      );
    }

    const subadmin = await prisma.userapi_userprofile.create({
      data: {
        email,
        password: hashedPassword,
        first_name,
        last_name,
        username,
        age: parsedAge, // ✅ INT
        is_active: true,
        is_staff: true,
        is_superuser: false,
        role: "SUBADMIN",
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Subadmin created successfully",
        subadmin: serialize(subadmin),
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("CREATE SUBADMIN ERROR:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);

    // pagination (optional)
    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 5;

    // search (optional)
    const search = searchParams.get("search") || "";

    const skip = (page - 1) * limit;

    // WHERE condition
    const where = {
      role: "SUBADMIN",
      ...(search && {
        OR: [
          // { email: { contains: search, mode: "insensitive" } },
          { username: { contains: search, mode: "insensitive" } },
        ],
      }),
    };

    // fetch data
    const [subadmins, total] = await Promise.all([
      prisma.userapi_userprofile.findMany({
        where,
        skip,
        take: limit,
        orderBy: { date_joined: "desc" },
        select: {
          id: true,
          email: true,
          username: true,
          first_name: true,
          last_name: true,
          is_active: true,
          date_joined: true,
          imageurl: true,
        },
      }),
      prisma.userapi_userprofile.count({ where }),
    ]);

    return NextResponse.json({
      success: true,
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      subadmins: serialize(subadmins),
    });
  } catch (error) {
    console.error("FETCH SUBADMINS ERROR:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch subadmins" },
      { status: 500 },
    );
  }
}
