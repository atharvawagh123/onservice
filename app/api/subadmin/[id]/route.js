import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { serialize } from '@/lib/serialize.js';
import cloudinary from '@/lib/cloudinary.js';

export async function PUT(req, { params }) {
  try {
    const { id } = await params;
    const formData = await req.formData();

    // Fetch existing user
    const existingUser = await prisma.userapi_userprofile.findUnique({
      where: { id: BigInt(id) },
    });

    if (!existingUser) {
      return Response.json({ error: 'User not found' }, { status: 404 });
    }

    // Extract fields
    const first_name = formData.get('first_name');
    const last_name = formData.get('last_name');
    const email = formData.get('email');
    const age = Number(formData.get('age'));
    const password = formData.get('password');
    const image = formData.get('image'); // optional

    let imageurl = existingUser.imageurl;
    let imagepublicid = existingUser.imagepublicid;

    // 🔹 If new image uploaded
    if (image && image.size > 0) {
      // Remove old image from Cloudinary
      if (existingUser.imagepublicid) {
        await cloudinary.uploader.destroy(existingUser.imagepublicid);
      }

      // Upload new image
      const buffer = Buffer.from(await image.arrayBuffer());

      const uploadResult = await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream({ folder: 'subadmins' }, (err, result) => {
            if (err) reject(err);
            resolve(result);
          })
          .end(buffer);
      });

      imageurl = uploadResult.secure_url;
      imagepublicid = uploadResult.public_id;
    }

    // 🔹 Update user
    const updatedUser = await prisma.userapi_userprofile.update({
      where: { id: BigInt(id) },
      data: {
        first_name,
        last_name,
        email,
        age,
        ...(password && { password: await bcrypt.hash(password, 10) }),
        imageurl,
        imagepublicid,
      },
    });

    return Response.json({
      success: true,
      message: 'Subadmin updated successfully',
      updatedUser: serialize(updatedUser),
    });
  } catch (error) {
    console.error(error);
    return Response.json({ error: 'Update failed' }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    const { id } = await params;

    // Fetch user
    const user = await prisma.userapi_userprofile.findUnique({
      where: { id: BigInt(id) },
    });

    if (!user) {
      return Response.json({ error: 'User not found' }, { status: 404 });
    }

    // 🔹 Remove image from Cloudinary
    if (user.imagepublicid) {
      await cloudinary.uploader.destroy(user.imagepublicid);
    }

    // 🔹 Delete user
    await prisma.userapi_userprofile.delete({
      where: { id: BigInt(id) },
    });

    return Response.json({
      success: true,
      message: 'Subadmin deleted successfully',
      id: id.toString(),
    });
  } catch (error) {
    console.error(error);
    return Response.json({ error: 'Delete failed' }, { status: 500 });
  }
}
