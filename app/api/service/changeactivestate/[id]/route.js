import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { serialize } from '@/lib/serialize';
export async function PUT(_, { params }) {
  try {
    const { id } = await params;
    const serviceId = Number(id);
    const service = await prisma.service.findUnique({
      where: { id: serviceId },
    });

    if (!service) {
      return NextResponse.json(
        {
          success: false,
          message: 'Service is no longer in the database',
        },
        {
          status: 200,
        }
      );
    }

    const updateservice = await prisma.service.update({
      where: { id },
      data: {
        isactive: !service.isactive,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: 'change active of service successfully',
        updateservice: serialize(updateservice),
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        error: 'error occured !!!!!!!',
      },
      {
        status: 500,
      }
    );
  }
}
