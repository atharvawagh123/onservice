import { cookies } from 'next/headers';

export async function verifyuser() {
  try {
    const cookiestore = await cookies();
    const token = cookiestore.get('token').value;
    return token;
  } catch (error) {
    console.log(error);
    return Response.json(
      {
        error: 'error !!!!!',
      },
      {
        status: 500,
      }
    );
  }
}
