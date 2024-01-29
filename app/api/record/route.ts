import { prismaClient } from "@/lib/prismaClient";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const records = await prismaClient.record.findMany({
      orderBy: {
        inTime: "desc",
      },
    });
    return NextResponse.json(records);
  } catch (error) {
    console.log("GET_RECORDS");
    console.log("Error:" + error);
  }
}

export async function POST(req: Request) {
  try {
    const { prn } = await req.json();

    if (!prn) {
      return new Response("ID MISSING", { status: 400 });
    }

    const recordExists = await prismaClient.record.findMany({
      where: {
        visitorId: prn,
        out: false,
      },
    });

    if (recordExists.length > 0) {
      const updateRecord = await prismaClient.record.updateMany({
        where: {
          visitorId: prn,
        },
        data: {
          out: true,
          outTime: new Date(),
        },
      });

      return NextResponse.json(updateRecord);
    }

    const student = await prismaClient.student.findMany({
      where: {
        prn,
      },
    });

    const teacher = await prismaClient.teacher.findMany({
      where: {
        prn,
      },
    });

    if (!student && !teacher) {
      return new Response("ID NOT FOUND", { status: 404 });
    }

    let record;

    if (student.length > 0) {
      record = await prismaClient.record.create({
        data: {
          visitorId: prn,
          visitorName: student[0]?.name,
          studentId: student[0]?.id,
        },
      });
    } else if (teacher.length > 0) {
      record = await prismaClient.record.create({
        data: {
          visitorId: prn,
          visitorName: teacher[0]?.name,
          teacherId: teacher[0]?.id,
        },
      });
    }

    if (!record) {
      return new Response("Record Not Created", { status: 500 });
    }

    return NextResponse.json(record);
  } catch (error) {
    console.log("[RECORD_POST]");
    console.log("Error:", error);
  }
}
