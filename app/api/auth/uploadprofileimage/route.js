import prisma from "@/lib/prisma";
import { verifyuser } from "@/lib/auth";
import cloudinary from "@/lib/cloudinary";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import { Buffer } from "buffer"; // ✅ important

export async function POST(req) {
  try {
    // 🔍 1. Get token from cookies using your custom verify method
    const token = await verifyuser(req);

    if (!token) {
      return NextResponse.json(
        { error: "Token not available" },
        { status: 401 },
      );
    }

    // 🔍 2. Verify JWT
    let payload;
    try {
      payload = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      console.error("Invalid token:", err);
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    // 🔍 3. Parse uploaded file
    const form = await req.formData();
    const file = form.get("file");

    if (
      !file ||
      typeof file === "string" ||
      !file.size ||
      !file.type.startsWith("image/")
    ) {
      return NextResponse.json(
        { error: "Invalid or no file uploaded" },
        { status: 400 },
      );
    }

    // 🔍 4. Check user exists
    const user = await prisma.userapi_userprofile.findUnique({
      where: { id: BigInt(payload.userId) },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    console.log("Updating user image. Existing ID:", user.imagepublicid);

    // 🔍 5. Delete old image if available
    if (user.imagepublicid) {
      try {
        await cloudinary.uploader.destroy(user.imagepublicid);
      } catch (err) {
        console.error("Old image delete failed:", err);
      }
    }

    // 🔍 6. Convert file buffer to Base64
    const arrayBuffer = await file.arrayBuffer();
    const base64 = Buffer.from(arrayBuffer).toString("base64");

    // 🔍 7. Upload to Cloudinary
    let uploadedImage;
    try {
      uploadedImage = await cloudinary.uploader.upload(
        `data:${file.type};base64,${base64}`,
        { folder: "profile_images" },
      );
    } catch (err) {
      console.error("Cloudinary upload error:", err);
      return NextResponse.json(
        { error: "Image upload failed" },
        { status: 500 },
      );
    }

    // 🔍 8. Update user in DB
    const updatedUser = await prisma.userapi_userprofile.update({
      where: { id: BigInt(payload.userId) },
      data: {
        imageurl: uploadedImage.secure_url,
        imagepublicid: uploadedImage.public_id,
      },
    });

    return NextResponse.json(
      {
        message: "Profile image updated",
        imageUrl: updatedUser.imageurl,
      },
      { status: 200 },
    );
  } catch (err) {
    console.error("Upload profile image error:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
export async function DELETE(req) {
  try {
    // Verify user token
    const token = await verifyuser(req);
    if (!token) {
      return NextResponse.json(
        { error: "Token not available" },
        { status: 401 },
      );
    }

    let payload;
    try {
      payload = jwt.verify(token, process.env.JWT_SECRET);
    } catch {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    // Fetch user
    const user = await prisma.userapi_userprofile.findUnique({
      where: { id: BigInt(payload.userId) },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Delete image from Cloudinary if exists
    if (user.imagePublicId) {
      try {
        await cloudinary.uploader.destroy(user.imagePublicId);
      } catch (err) {
        console.error("Cloudinary delete error:", err);
        return NextResponse.json(
          { error: "Failed to delete image" },
          { status: 500 },
        );
      }
    }

    // Update user record in DB
    const updatedUser = await prisma.userapi_userprofile.update({
      where: { id: BigInt(payload.userId) },
      data: {
        imageurl: null, // ✅ match schema
        imagepublicid: null, // ✅ match schema
      },
    });

    return NextResponse.json(
      { message: "Profile image deleted", imageUrl: updatedUser.imageUrl },
      { status: 200 },
    );
  } catch (err) {
    console.error("Delete profile image error:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
