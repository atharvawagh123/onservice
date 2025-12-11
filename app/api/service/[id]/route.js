import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";

function convertBigInt(obj) {
  return JSON.parse(
    JSON.stringify(obj, (_, value) =>
      typeof value === "bigint" ? value.toString() : value,
    ),
  );
}

export async function GET(req, context) {
  const params = await context.params;

  if (!params?.id) {
    return NextResponse.json({ error: "ID missing" }, { status: 400 });
  }

  try {
    const id = BigInt(params.id);

    const service = await prisma.service.findUnique({
      where: { id },
    });

    if (!service) {
      return NextResponse.json({ error: "Service not found" }, { status: 404 });
    }

    return NextResponse.json(convertBigInt(service));
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// UPDATE SERVICE
export async function PUT(req, context) {
  try {
    // Await the params promise
    const params = await context.params;

    if (!params?.id) {
      return NextResponse.json({ error: "ID missing" }, { status: 400 });
    }

    const id = BigInt(params.id);
    const body = await req.json();

    // Update service
    const updated = await prisma.service.update({
      where: { id },
      data: {
        title: body.title,
        description: body.description,
        price: parseFloat(body.price),
      },
    });

    return NextResponse.json({
      updated: convertBigInt(updated),
      success: true,
      message: "Service updated successfully",
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// DELETE SERVICE
export async function DELETE(req, context) {
  try {
    const params = await context.params;
    const { id } = params;

    if (!id) {
      return NextResponse.json({ error: "ID missing" }, { status: 400 });
    }

    const service = await prisma.service.findUnique({
      where: { id: BigInt(id) },
      select: { userId: true, imagepublicid: true },
    });

    if (!service) {
      return NextResponse.json({ error: "Service not found" }, { status: 404 });
    }

    // Delete image from Cloudinary if exists
    if (service.imagepublicid) {
      await cloudinary.uploader.destroy(service.imagepublicid);
    }

    // Delete dependent Enquiry rows first
    await prisma.enquiry.deleteMany({
      where: { service_id: BigInt(id) }, // match schema exactly
    });

    // Delete the Service
    await prisma.service.delete({ where: { id: BigInt(id) } });

    // Decrement user's totalservice count
    await prisma.userapi_userprofile.update({
      where: { id: service.userId },
      data: { totalservice: { decrement: 1 } },
    });

    return NextResponse.json({
      message: "Service deleted successfully",
      success: true,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
