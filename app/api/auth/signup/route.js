import  prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    const { email, password, first_name, last_name, username, name, age } =
      await req.json();

    if (!email || !password) {
      return new Response(JSON.stringify({ error: "Email and password required" }), { status: 400 });
    }

    const existingUser = await prisma.userapi_userprofile.findUnique({
      where: { email },
    });

    if (existingUser) {
      return new Response(JSON.stringify({ error: "User already exists" }), { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.userapi_userprofile.create({
      data: {
        name,
        email,
        password: hashedPassword,
        first_name,
        last_name,
        username,
        age,
        is_active: true,
        is_staff: false,
        is_superuser: false,
        date_joined: new Date(),
      },
    });

    // Convert BigInt to string
    return new Response(
      JSON.stringify({ message: "User created", userId: user.id.toString() }),
      { status: 201 }
    );
  } catch (err) {
    console.error("Signup error:", err);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  }
}
