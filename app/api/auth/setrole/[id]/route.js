import prisma from "@/lib/prisma";

function toPlainObject(data) {
  return JSON.parse(
    JSON.stringify(data, (key, value) =>
      typeof value === "bigint" ? value.toString() : value
    )
  );
}

export async function PUT(req, { params }) {
  try {
    // Await params because it's a Promise in Next.js App Router
    const { id } = await params;

    if (!id) {
      return new Response(JSON.stringify({ error: "User ID is required in URL" }), {
        status: 400,
      });
    }

    const userId = BigInt(id); // Convert safely
    const { role } = await req.json();

    const validRoles = ["ADMIN", "CLIENT", "USER"];
    if (!validRoles.includes(role)) {
      return new Response(JSON.stringify({ error: "Invalid role" }), { status: 400 });
    }

    const updatedUser = await prisma.userapi_userprofile.update({
      where: { id: userId },
      data: { role },
    });

    return new Response(JSON.stringify(toPlainObject(updatedUser)), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
