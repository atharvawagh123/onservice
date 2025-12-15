import prisma from "@/lib/prisma";
import { verifyuser } from "@/lib/auth";
import cloudinary from "@/lib/cloudinary";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import { serialize } from "@/lib/serialize";

export async function PUT(req, { params }) {
  try {
    const body = await req.json();
    const { email, age, first_name, last_name, username } = body;

    console.log("data from frontend:", body);

    const { id } = await params; // Extract id correctly
    console.log("ID from params:", id);

    // Find the user by id
    const usergoingtoupdate = await prisma.userapi_userprofile.update({
      where: { id: BigInt(id) },
      data: {
        email,
        age,
        first_name,
        last_name,
        username,
      },
    });

    if (!usergoingtoupdate) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // // Example: update a message field
    // const updatedUser = await prisma.userapi_userprofile.update({
    //   where: { id: BigInt(id) },
    //   data: { message },
    // });

    return NextResponse.json({
      message: "Subadmin updated properly",
      params: id,
      user: serialize(usergoingtoupdate),
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Error from client, check frontend field" },
      { status: 500 },
    );
  }
}
