"use client";
import { DataTable } from "@/components/DataTable";
import EntryForm from "@/components/EntryForm";
import Navbar from "@/components/Navbar";
import { columns } from "@/components/columns";
import { ToastAction } from "@/components/ui/toast";
import { toast } from "@/components/ui/use-toast";
import { useEffect, useState } from "react";
import axios from "axios";
import ClipLoader from "react-spinners/ClipLoader";

export default function Home() {
  const [records, setRecords] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await axios.get(`/api/record`);
      setRecords(res.data);
      toast({
        description: "Data Fetched",
        variant: "success",
      });
    } catch (error: any) {
      setLoading(false);
      console.log(error);
      toast({
        description: "Something went wrong!!",
        variant: "destructive",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col">
      <Navbar />
      <div className="w-full h-screen flex flex-col items-center">
        <EntryForm />

        <div className="sm:w-full md:w-[60%] h-full">
          {loading && (
            <div className="w-full h-auto p-3 mt-4 flex items-center justify-center">
              <ClipLoader
                loading={loading}
                size={200}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            </div>
          )}
          {records && (
            <DataTable columns={columns} data={records} searchKey="visitorId" />
          )}
        </div>
      </div>
    </div>
  );
}
