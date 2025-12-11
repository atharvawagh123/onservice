import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

function toPlainObject(data) {
  return JSON.parse(
    JSON.stringify(data, (key, value) =>
      typeof value === "bigint" ? value.toString() : value,
    ),
  );
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);

    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const skip = (page - 1) * limit;

    let search = searchParams.get("search") || "";
    search = search.trim().toLowerCase();

    console.log("🔍 Search Query:", search);

    const where = search
      ? {
          OR: [
            { title: { contains: search, mode: "insensitive" } },
            { description: { contains: search, mode: "insensitive" } },
            {
              price: {
                equals: isNaN(Number(search)) ? undefined : Number(search),
              },
            },
          ],
        }
      : {};

    const total = await prisma.service.count({ where });

    const services = await prisma.service.findMany({
      skip,
      take: limit,
      where,
      orderBy: { createdat: "desc" },
    });

    return NextResponse.json(
      toPlainObject({
        data: services,
        pagination: {
          total,
          page,
          limit,
          totalPages: Math.ceil(total / limit),
        },
      }),
    );
  } catch (err) {
    console.log("❌ ERROR:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
