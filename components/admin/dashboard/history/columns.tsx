"use client";

import { MoreHorizontal } from "lucide-react";
import { ArrowUpDown } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { ColumnDef } from "@tanstack/react-table";
import { ConfirmedSuratModel } from "@/app/lib/models";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

interface AuthorType {
  name: string;
}

export const AdminHistoryColumns: ColumnDef<ConfirmedSuratModel>[] = [
  {
    accessorKey: "subject",
    header: "Subjek",
  },
  {
    accessorKey: "author",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Penulis
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const pembuat = (row.getValue("author") as AuthorType).name;
      return pembuat;
    },
  },
  {
    accessorKey: "receiver",
    header: "Penerima",
  },
  {
    accessorKey: "createdAt",
    header: "Dibuat",
    cell: ({ row }) => {
      const dibuat = (row.getValue("createdAt") as Date)
        .toString()
        .slice(0, 25);
      return dibuat;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const confirmedSurat = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem>
              <Link
                href={`/admin/history/viewer/${confirmedSurat.id}`}
                className=" hover:cursor-pointer"
              >
                Tampilkan berkas
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];