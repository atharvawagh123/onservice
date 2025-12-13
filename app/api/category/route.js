import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

// Helper to serialize BigInt to string
function toPlainObject(data) {
  return JSON.parse(
    JSON.stringify(data, (key, value) =>
      typeof value === "bigint" ? value.toString() : value,
    ),
  );
}

export async function GET(req) {
  try {
    const url = new URL(req.url);
    const page = parseInt(url.searchParams.get("page") || "1"); // default page 1
    const limit = parseInt(url.searchParams.get("limit") || "10"); // default 10 items per page

    // Calculate offset
    const skip = (page - 1) * limit;

    // Fetch paginated categories
    const categories = await prisma.category.findMany({
      skip,
      take: limit,
      orderBy: { id: "desc" },
    });

    // Total count
    const totalCategories = await prisma.category.count();

    // Ensure consistent response structure even if no categories
    return NextResponse.json(
      toPlainObject({
        success: true,
        page,
        limit,
        totalCategories,
        totalPages: Math.ceil(totalCategories / limit),
        categories: categories || [], // empty array if none
      }),
      { status: 200 },
    );
  } catch (error) {
    console.error("GET /categories error:", error);
    return NextResponse.json(
      { error: "Failed to fetch categories" },
      { status: 500 },
    );
  }
}

// CREATE new category
export async function POST(req) {
  try {
    const { name } = await req.json();

    // Validate input
    if (!name || typeof name !== "string" || name.trim() === "") {
      return NextResponse.json(
        { error: "Name is required and must be a non-empty string" },
        { status: 400 },
      );
    }

    const trimmedName = name.trim();

    // Check if category already exists
    const existingCategory = await prisma.category.findUnique({
      where: { name: trimmedName },
    });

    if (existingCategory) {
      return NextResponse.json(
        { error: "Category already exists" },
        { status: 409 }, // Conflict
      );
    }

    const category = await prisma.category.create({
      data: { name: trimmedName },
    });

    return NextResponse.json(
      {
        category: toPlainObject(category),
        success: true,
        message: "category created successfully !",
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("POST /categories error:", error);
    return NextResponse.json(
      { error: "Failed to create category" },
      { status: 500 },
    );
  }
}
