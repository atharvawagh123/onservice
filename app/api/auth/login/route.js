import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return new Response(
        JSON.stringify({ error: "Email and password required" }),
        { status: 400 }
      );
    }

    const user = await prisma.userapi_userprofile.findUnique({
      where: { email },
    });

    // console.log("check user :- ",user)
    if (!user || !user.password) {
      // User not found OR password not set
      return new Response(JSON.stringify({ error: "Invalid credentials" }), {
        status: 401,
      });
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return new Response(JSON.stringify({ error: "Invalid credentials" }), {
        status: 401,
      });
    }

    const token = jwt.sign(
      { userId: user.id.toString(), email: user.email, name: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    const cookie = `token=${token}; HttpOnly; Path=/; Max-Age=3600; SameSite=None; Secure=true`;

    // ✅ Login successful
    return new Response(
      JSON.stringify({
        message: "Login successful",
        userId: user.id.toString(),
        token,
        success: true,
        name: user.name,
      }),
      {
        status: 200,
        headers: {
          "Set-Cookie": cookie,
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*", // <--- frontend origin
          "Access-Control-Allow-Methods": "POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type, Authorization",
        },
      }
    );
  } catch (err) {
    console.error("Login error:", err);
    return new Response(
      JSON.stringify({ error: "Internal Server Error", success: false }),
      {
        status: 500,
      }
    );
  }
}
