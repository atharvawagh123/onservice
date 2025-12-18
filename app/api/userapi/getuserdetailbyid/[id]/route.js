import prisma from "@/lib/prisma";
// import { verifyuser } from "@/lib/auth";
// import cloudinary from "@/lib/cloudinary";
// import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import { serialize } from "@/lib/serialize";

function serializeUser(user) {
  return {
    ...user,
    id: user.id.toString(), // BigInt fix
  };
}
export async function GET(req, { params }) {
  try {
    console.log(
      "hitt........................................................................",
    );
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        {
          message: "error user not found check user id or update migration",
          success: false,
        },
        { status: 404 },
      );
    }
    const user = await prisma.userapi_userprofile.findUnique({
      where: { id: BigInt(id) },
    });

    if (!user) {
      return NextResponse.json(
        {
          message: "error user not found check user id or update migration",
          success: false,
        },
        { status: 404 },
      );
    }

    const userprofile = serializeUser(user);
    console.log("user getuserbydetailbyid", userprofile);

    return NextResponse.json(
      {
        message: "user profile fetched properly",
        success: true,
        user: userprofile,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Error from frontend check client side" },
      { status: 500 },
    );
  }
}
