import { NextResponse } from "next/server";
import  prisma from "@/lib/prisma";
import jwt from "jsonwebtoken";
import { verifyuser } from "@/lib/auth.js";
import cloudinary from "@/lib/cloudinary.js";

function toPlainObject(data) {
  return JSON.parse(
    JSON.stringify(data, (key, value) =>
      typeof value === "bigint" ? value.toString() : value
    )
  )
}
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const skip = (page - 1) * limit;

    const total = await prisma.service.count();

    const services = await prisma.service.findMany({
      skip,
      take: limit,
      orderBy: { createdat: "desc" }, // ✅ corrected field name
    });

    if (services.length === 0) {
      return NextResponse.json({ message: "No services found" });
    }

    return NextResponse.json(
      toPlainObject({
        data: services,
        pagination: {
          total,
          page,
          limit,
          totalPages: Math.ceil(total / limit),
        },
      })
    );
  } catch (err) {
    console.error("Fetch services error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    // ---------------------------
    // 1️⃣ Verify Authorization
    // ---------------------------
    const token = await verifyuser(req);
    if (!token) {
      return NextResponse.json(
        { error: "Token not available" },
        { status: 401 }
      );
    }

    let payload;
    try {
      payload = jwt.verify(token, process.env.JWT_SECRET);
    } catch {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    // ---------------------------
    // 2️⃣ Parse FormData
    // ---------------------------
    const form = await req.formData();
    const title = form.get("title");
    const description = form.get("description");
    const price = form.get("price");
    const file = form.get("file");

    if (!title || !description || !price) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    let imageurl = null;
    let imagepublicid = null;

    if (
      file &&
      typeof file !== "string" &&
      file.size &&
      file.type.startsWith("image/")
    ) {
      const arrayBuffer = await file.arrayBuffer();
      const base64 = Buffer.from(arrayBuffer).toString("base64");

      const uploadedImage = await cloudinary.uploader.upload(
        `data:${file.type};base64,${base64}`,
        { folder: "services" }
      );

      imageurl = uploadedImage.secure_url;
      imagepublicid = uploadedImage.public_id;
    }

    // ---------------------------
    // 3️⃣ Fetch user to check limit
    // ---------------------------
    const user = await prisma.userapi_userprofile.findUnique({
      where: { id: BigInt(payload.userId) },
      select: { totalservice: true },
    });

    if (!user)
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    if (user.totalservice >= 2) {
      return NextResponse.json(
        {
          success: false,
          message: "You can only create 2 services per account.",
        },
        { status: 403 }
      );
    }

    // ---------------------------
    // 4️⃣ Create service in DB
    // ---------------------------
    const service = await prisma.service.create({
      data: {
        title,
        description,
        price: parseFloat(price),
        userId: BigInt(payload.userId),
        imageurl,
        imagepublicid,
      },
    });

    // ---------------------------
    // 5️⃣ Increment user's service count
    // ---------------------------
    await prisma.userapi_userprofile.update({
      where: { id: BigInt(payload.userId) },
      data: { totalservice: { increment: 1 } },
    });

    return NextResponse.json(
      {
        data: toPlainObject(service),
        success: true,
        message: "Service created!",
      },
      { status: 201 }
    );
  } catch (err) {
    console.error("Create service error:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
