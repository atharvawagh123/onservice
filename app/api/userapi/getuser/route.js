import prisma from "@/lib/prisma";

export async function GET(req) {
  try {
    const url = new URL(req.url);

    const page = parseInt(url.searchParams.get("page") || "1");
    const limit = parseInt(url.searchParams.get("limit") || "10");
    const skip = (page - 1) * limit;

    // Fetch paginated users
    const users = await prisma.userapi_userprofile.findMany({
      skip,
      take: limit,
      orderBy: { id: "asc" },
    });

    // Total user count for pagination
    const totalUsers = await prisma.userapi_userprofile.count();

    // Remove password & format data
    const serializedUsers = (users || []).map((user) => {
      const rest = { ...user };
      delete rest.password;

      return {
        ...rest,
        id: user.id.toString(),
        date_joined: user.date_joined?.toISOString()?.split("T")[0] || "",
      };
    });

    return new Response(
      JSON.stringify({
        success: true,
        page,
        limit,
        totalUsers,
        totalPages: Math.ceil(totalUsers / limit),
        users: serializedUsers, // always an array
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      },
    );
  } catch (err) {
    console.error("Get User error:", err);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
