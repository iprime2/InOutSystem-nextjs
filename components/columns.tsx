"use client";

import { format, formatDistanceToNow } from "date-fns";
import { ColumnDef } from "@tanstack/react-table";
import { cn } from "@/lib/utils";

export type Records = {
  id: string;
  visitorName: string;
  visitorId: string;
  studentId: string | null;
  teacherId: string | null;
  in: boolean | null;
  out: boolean | null;
  inTime: Date;
  outTime: Date | null;
  createdAt: Date;
  updatedAt: Date;
};

export const columns: ColumnDef<Records>[] = [
  {
    accessorKey: "visitorId",
    header: "Visitor Id",
  },
  {
    accessorKey: "visitorName",
    header: "Visitor Name",
  },
  {
    accessorKey: "inTime",
    header: "In Time",
    cell: ({ row }) => (
      <div className="flex">{format(row.original?.inTime, "p")}</div>
    ),
  },
  {
    accessorKey: "outTime",
    header: "Out Time",
    cell: ({ row }) => (
      <div className="flex">
        {row.original.outTime ? format(row.original?.outTime, "p") : "NAN"}
      </div>
    ),
  },
  {
    accessorKey: "Total Time",
    header: "Total Time",
    cell: ({ row }) => (
      <div
        className={cn(
          "flex p-1 text-white",
          row.original.outTime ? "bg-green-500" : "bg-red-500"
        )}
      >
        {row.original.inTime ? formatDistanceToNow(row.original.inTime) : "NAN"}
      </div>
    ),
  },
  {
    accessorKey: "createdAt",
    header: "Date",
    cell: ({ row }) => (
      <div className="flex">
        {row.original.createdAt ? format(row.original.createdAt, "PP") : "NAN"}
      </div>
    ),
  },
];
