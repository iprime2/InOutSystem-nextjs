import { getRecords } from "@/actions/getRecords";
import { DataTable } from "@/components/DataTable";
import EntryForm from "@/components/EntryForm";
import Navbar from "@/components/Navbar";
import { columns } from "@/components/columns";
import { prismaClient } from "@/lib/prismaClient";
import { useEffect } from "react";

export default async function Home() {
  "use server";
  const records = await prismaClient.record.findMany({
    orderBy: {
      inTime: "desc",
    },
  });

  return (
    <div className="flex flex-col">
      <Navbar />
      <div className="w-full h-screen flex flex-col items-center">
        <EntryForm />

        <div className="sm:w-full md:w-[60%] h-full">
          {records ? (
            <DataTable columns={columns} data={records} searchKey="visitorId" />
          ) : (
            "No Records!!"
          )}
        </div>
      </div>
    </div>
  );
}
