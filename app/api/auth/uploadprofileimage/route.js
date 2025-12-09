import  prisma from "@/lib/prisma";
import { verifyuser } from "@/lib/auth";
import cloudinary from "@/lib/cloudinary";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import { Buffer } from "buffer"; // ✅ important

export async function POST(req) {
  try {
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
        { status: 400 }
      );
    }

    const user = await prisma.userapi_userprofile.findUnique({
      where: { id: BigInt(payload.userId) },
    });
    console.log("Available fields:", Object.keys(user));

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    if (user.imagePublicId) {
      await cloudinary.uploader.destroy(user.imagePublicId);
    }

    const arrayBuffer = await file.arrayBuffer();
    const base64 = Buffer.from(arrayBuffer).toString("base64");

    let uploadedImage;
    try {
      uploadedImage = await cloudinary.uploader.upload(
        `data:${file.type};base64,${base64}`,
        { folder: "profile_images" }
      );
    } catch (err) {
      console.error("Cloudinary upload error:", err);
      return NextResponse.json(
        { error: "Image upload failed" },
        { status: 500 }
      );
    }
    const updatedUser = await prisma.userapi_userprofile.update({
      where: { id: BigInt(payload.userId) },
      data: {
        imageurl: uploadedImage.secure_url, // ✅ match schema
        imagepublicid: uploadedImage.public_id, // ✅ match schema
      },
    });

    return NextResponse.json(
      {
        message: "Profile image updated",
        imageUrl: updatedUser.imageUrl,
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("Upload profile image error:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
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
        { status: 401 }
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
          { status: 500 }
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
      { status: 200 }
    );
  } catch (err) {
    console.error("Delete profile image error:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
