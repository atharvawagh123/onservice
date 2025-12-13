import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { serialize } from "@/lib/serialize.js";

export async function PUT(req, { params }) {
  try {
    const { id } = params;
    const body = await req.json();

    const subadmin = await prisma.userapi_userprofile.update({
      where: { id: BigInt(id) },
      data: body,
    });

    return Response.json({
      success: true,
      message: "Subadmin updated",
      subadmin,
    });
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Update failed" }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    const { id } = params;

    await prisma.userapi_userprofile.delete({
      where: { id: BigInt(id) },
    });

    return Response.json({
      success: true,
      message: "Subadmin deleted",
    });
  } catch (error) {
    return Response.json({ error: "Delete failed" }, { status: 500 });
  }
}
