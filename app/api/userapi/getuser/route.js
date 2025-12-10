import prisma from "@/lib/prisma";

export async function GET(req) {
  try {
    const users = await prisma.userapi_userprofile.findMany({
      orderBy: {
        id: "asc", // You can change "id" to "date_joined" or any other field
      },
    });

    const serializedUsers = users.map((user) => {
      const { password, ...rest } = user;
      return {
        ...rest,
        id: user.id.toString(),
        date_joined: user.date_joined.toISOString().split("T")[0],
      };
    });

    return new Response(JSON.stringify(serializedUsers), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Get User error:", err);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}
