import { db } from "@/lib/prismaClient";

async function seed() {
  const students = [
    {
      name: "Sushil Gupta",
      prn: "1132230901",
    },
    {
      name: "Athrava Joshi",
      prn: "1132230902",
    },
    {
      name: "Dharesj polish",
      prn: "1132230903",
    },
    {
      name: "Satvik",
      prn: "1132230904",
    },
    {
      name: "Veeraj",
      prn: "1132230905",
    },
  ];

  const teachers = [
    {
      name: "Ms. Rajshree",
      prn: "1122230001",
    },
    {
      name: "Mr. Anuradha",
      prn: "1122230002",
    },
    {
      name: "Mr. Navnath",
      prn: "1122230003",
    },
    {
      name: "Mr. Harish",
      prn: "1122230004",
    },
    {
      name: "Mr. Sagar",
      prn: "1122230005",
    },
  ];

  const records = [
    {
      visitorId: "1132230901",
      visitorName: "Sushil Gupta",
      studentId: "1132230901",
      teacherId: null,
      in: true,
      out: false,
    },
    {
      visitorId: "1132230902",
      visitorName: "Athrava Joshi",
      studentId: "1132230902",
      teacherId: null,
      in: true,
      out: false,
    },
    {
      visitorId: "1132230902",
      visitorName: "Ms. Rajshree",
      studentId: null,
      teacherId: "1122230001",
      in: true,
      out: false,
    },
    {
      visitorId: "113223004",
      visitorName: "Mr. Harish",
      studentId: null,
      teacherId: "1122230004",
      in: true,
      out: false,
    },
  ];

  // Insert the array of students into the database
  const createdStudents = await db.student.createMany({
    data: students,
  });

  // Insert the array of teachers into the database
  const createdTeachers = await db.teacher.createMany({
    data: teachers,
  });

  // Insert the array of records into the database
  const createdRecords = await db.record.createMany({
    data: records,
  });

  console.log(`${createdStudents.count} students seeded successfully`);
  console.log(`${createdTeachers.count} teachers seeded successfully`);
  console.log(`${createdRecords.count} records seeded successfully`);
}

seed()
  .catch((error) => {
    console.error(error);
  })
  .finally(async () => {
    await db.$disconnect();
  });
