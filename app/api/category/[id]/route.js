import prisma from "@/lib/prisma";
import { serialize } from "@/lib/serialize";

export async function GET(req, { params }) {
  try {
    const id = BigInt(params.id);

    const category = await prisma.category.findUnique({
      where: { id },
    });

    if (!category)
      return Response.json({ error: "Category not found" }, { status: 404 });

    return Response.json(category, { status: 200 });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(req, { params }) {
  try {
    const id = BigInt(params.id);
    const { name } = await req.json();

    const updated = await prisma.category.update({
      where: { id },
      data: { name, updatedat: new Date() },
    });

    return Response.json(updated, { status: 200 });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    const { id } = await params;

    const category = await prisma.category.delete({
      where: { id: BigInt(id) },
    });
    console.log("delete category : ", category);
    return Response.json(
      {
        message: "Category deleted successfully",
        success: true,
        category: serialize(category),
      },
      { status: 200 },
    );
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
