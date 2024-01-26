import { getRecords } from "@/actions/getRecords";
import { DataTable } from "@/components/DataTable";
import EntryForm from "@/components/EntryForm";
import { columns } from "@/components/columns";

export default async function Home() {
  const records = await getRecords();

  return (
    <div className="flex flex-col">
      <div className="w-full h-[80px] bg-slate-900"></div>
      <div className="w-full h-screen flex flex-col items-center">
        <EntryForm />

        <div className="sm:w-full md:w-[60%] px-26">
          {records ? (
            <DataTable columns={columns} data={records} searchKey="VisitorId" />
          ) : (
            "No Records!!"
          )}
        </div>
      </div>
    </div>
  );
}
