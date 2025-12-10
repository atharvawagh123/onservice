import prisma from "@/lib/prisma";
import { verifyuser } from "@/lib/auth";
import jwt from "jsonwebtoken";

export async function GET(req) {
  try {
    // Pass the request to verifyuser
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
      return new Response(JSON.stringify({ error: "Invalid token" }), {
        status: 401,
      });
    }

    // Fetch the user from DB
    const user = await prisma.userapi_userprofile.findUnique({
      where: { id: BigInt(payload.userId) }, // convert back to BigInt
      select: {
        id: true,
        first_name: true,
        last_name: true,
        username: true,
        email: true,
        age: true,
        totalservice: true,
        imageurl: true, // lowercase to match Prisma schema
        imagepublicid: true, // lowercase to match Prisma schema
      },
    });

    if (!user) {
      return new Response(JSON.stringify({ error: "User not found" }), {
        status: 404,
      });
    }

    // Convert BigInt to string before sending
    const serializedUser = { ...user, id: user.id.toString() };

    return new Response(JSON.stringify({ ...serializedUser, success: true }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*", // <--- frontend origin
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    });
  } catch (err) {
    console.error("Get current user error:", err);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}
