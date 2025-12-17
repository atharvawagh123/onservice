// import prisma from "@/lib/prisma";
// import { verifyuser } from "@/lib/auth";
// import cloudinary from "@/lib/cloudinary";
// import jwt from "jsonwebtoken";
// import { NextResponse } from "next/server";
// import { serialize } from "@/lib/serialize";

// export async function PUT(req) {
//   try {

//     const formdata = await req.formData();

//     const email = formdata.get("email");
//     const age = formdata.get("age");
//     const first_name = formdata.get("first_name");
//     const last_name = formdata.get("last_name");
//     const username = formdata.get("username");
//     const file = formdata.get("file");

//     let imageurl;
//     let imagepublicid;

//     // 🔹 Get current user to check old image
//     const currentUser = await prisma.userapi_userprofile.findUnique({
//       where: { id: BigInt(id) },
//     });

//     // 🔹 Upload new image only if file exists
//     if (file && typeof file !== "string" && file.size > 0) {
//       if (!file.type.startsWith("image/")) {
//         return NextResponse.json(
//           { error: "Only image files are allowed" },
//           { status: 400 }
//         );
//       }

//       // 🔹 Delete old image from Cloudinary if exists
//       if (currentUser.imagepublicid) {
//         try {
//           await cloudinary.uploader.destroy(currentUser.imagepublicid);
//         } catch (err) {
//           console.error("Cloudinary delete error:", err);
//           // You can continue even if delete fails
//         }
//       }

//       const arrayBuffer = await file.arrayBuffer();
//       const base64 = Buffer.from(arrayBuffer).toString("base64");

//       try {
//         const uploadedImage = await cloudinary.uploader.upload(
//           `data:${file.type};base64,${base64}`,
//           { folder: "profile_images" }
//         );

//         imageurl = uploadedImage.secure_url;
//         imagepublicid = uploadedImage.public_id;
//       } catch (err) {
//         console.error("Cloudinary upload error:", err);
//         return NextResponse.json(
//           { error: "Image upload failed" },
//           { status: 500 }
//         );
//       }
//     }

//     // 🔹 Update user
//     const updatedUser = await prisma.userapi_userprofile.update({
//       where: { id: BigInt(id) },
//       data: {
//         email,
//         age: Number(age),
//         first_name,
//         last_name,
//         username,
//         ...(imageurl && {
//           imageurl,
//           imagepublicid,
//         }),
//       },
//     });

//     return NextResponse.json({
//       success: true,
//       message: "User updated successfully",
//       user: serialize(updatedUser),
//     });
//   } catch (error) {
//     console.error(error);

//     return NextResponse.json(
//       { success: false, error: "Failed to update user" },
//       { status: 500 }
//     );
//   }
// }
