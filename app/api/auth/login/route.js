import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return new Response(
        JSON.stringify({ error: "Email and password required" }),
        {
          status: 400,
        }
      );
    }

    // 🔍 Find user
    const user = await prisma.userapi_userprofile.findUnique({
      where: { email },
    });

    if (!user || !user.password) {
      return new Response(JSON.stringify({ error: "Invalid credentials" }), {
        status: 401,
      });
    }

    // 🔐 Compare password
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return new Response(JSON.stringify({ error: "Invalid credentials" }), {
        status: 401,
      });
    }

    // 🚫 ALLOW ONLY ONE ACTIVE SESSION: delete old sessions
    await prisma.session.deleteMany({
      where: { userId: BigInt(user.id) }, // important: BigInt()
    });
    const forwarded = req.headers.get("x-forwarded-for");
    const ip = forwarded ? forwarded.split(",")[0] : "unknown";

    // 🆕 Create new session
    const newSession = await prisma.session.create({
      data: {
        userId: BigInt(user.id),
        device: req.headers.get("user-agent"), // browser info
        ip: forwarded ? forwarded.split(",")[0] : "unknown",
      },
    });

    // 🧾 Create JWT
    const token = jwt.sign(
      {
        sessionId: newSession.id,
        userId: user.id.toString(),
        email: user.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // 🍪 Set cookie
    const cookie = `token=${token}; HttpOnly; Path=/; Max-Age=3600; SameSite=None; Secure=true`;

    return new Response(
      JSON.stringify({
        message: "Login successful",
        sessionId: newSession.id,
        userId: user.id.toString(),
        token,
        success: true,
      }),
      {
        status: 200,
        headers: {
          "Set-Cookie": cookie,
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
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
