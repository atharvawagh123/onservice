import prisma from "@/lib/prisma";
import { verifyuser } from "@/lib/auth";
import jwt from "jsonwebtoken";

export async function PATCH(req) {
  try {
    // 1️⃣ Verify User Token
    const token = await verifyuser(req);

    if (!token) {
      return new Response(JSON.stringify({ error: "Token not available" }), {
        status: 401,
      });
    }

    let payload;
    try {
      payload = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      console.log(err);
      return new Response(JSON.stringify({ error: "Invalid token" }), {
        status: 401,
      });
    }

    // 2️⃣ Parse body { is_active }
    const { is_active } = await req.json();

    if (typeof is_active !== "boolean") {
      return new Response(
        JSON.stringify({ error: "is_active must be true or false" }),
        { status: 400 },
      );
    }

    // 3️⃣ Update user
    const updatedUser = await prisma.userapi_userprofile.update({
      where: { id: BigInt(payload.userId) },
      data: {
        is_active,
      },
      select: {
        id: true,
        email: true,
        first_name: true,
        last_name: true,
        username: true,
        is_active: true,
      },
    });

    // Convert BigInt → string
    updatedUser.id = updatedUser.id.toString();

    return new Response(
      JSON.stringify({
        message: "User activity status updated successfully",
        user: updatedUser,
        success: true,
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      },
    );
  } catch (err) {
    console.error("Update active status error:", err);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}
