export async function POST(req) {
  try {
    // Clear the 'token' cookie by setting it with Max-Age=0
    const cookie = `token=; HttpOnly; Path=/; Max-Age=0; SameSite=Strict; Secure=${
      process.env.NODE_ENV === "production" ? "true" : "false"
    }`;

    return new Response(
      JSON.stringify({ message: "Logout successful", success: true }),
      {
        status: 200,
        headers: {
          "Set-Cookie": cookie,
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin":
            "https://myonservice-p9hl3can4-aths-projects-1561d76f.vercel.app", // <--- frontend origin
          "Access-Control-Allow-Methods": "POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type, Authorization",
        },
      }
    );
  } catch (err) {
    console.error("Logout error:", err);
    return new Response(
      JSON.stringify({ error: "Internal Server Error", success: false }),
      {
        status: 500,
      }
    );
  }
}
