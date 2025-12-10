import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { serialize } from "@/lib/serialize.js";


export async function GET(req) {
  try {
    const url = new URL(req.url);
    const search = url.searchParams.get("search") || "";
    const limit = Number(url.searchParams.get("limit") || 50);
    // Fetch categories from DB
    const categories = await prisma.category.findMany({
      where: {
        name: {
          contains: search, 
          mode: "insensitive", 
        },
      },
      take: Number(limit),
      orderBy: { name: "asc" }, 
    });

    return NextResponse.json(serialize(categories), { status: 200 });
  } catch (error) {
    console.error("GET /categories error:", error);
    return NextResponse.json(
      { error: "Failed to fetch categories" },
      { status: 500 }
    );
  }
}
