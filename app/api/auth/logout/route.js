import prisma from "@/lib/prisma";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function POST(req) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    console.log("Token from cookie:", token);

    if (token) {
      let payload;
      try {
        payload = jwt.verify(token, process.env.JWT_SECRET);
      } catch (err) {
        console.error("JWT verify failed:", err);
        payload = null;
      }
      console.log("Payload after verify:", payload);

      if (payload?.sessionId) {
        console.log("Deleting session:", payload.sessionId);
        await prisma.session.deleteMany({
          where: { id: Number(payload.sessionId) }, // <-- FIXED here
        });
      }
    }

    // Clear cookie
    const cookie = `token=; HttpOnly; Path=/; Max-Age=0; SameSite=Lax; Secure=${
      process.env.NODE_ENV === "production" ? "true" : "false"
    }`;

    return new Response(
      JSON.stringify({ message: "Logout successful", success: true }),
      {
        status: 200,
        headers: {
          "Set-Cookie": cookie,
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": "true",
        },
      }
    );
  } catch (err) {
    console.error("Logout error:", err);
    return new Response(
      JSON.stringify({ error: "Internal Server Error", success: false }),
      { status: 500 }
    );
  }
}
