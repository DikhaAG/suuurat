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
import NotesViewDialog from "./notes-view-dialog";
import { SuratModel } from "@/app/lib/models";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

interface AuthorType {
  name: string;
}

export const ValidatorHistoryTableColumnHeader: { [key: string]: string } = {
  subject: "subjek",
  author: "penulis",
  receiver: "penerima",
  createdAt: "dibuat",
  actions: "opsi",
};

export const ValidatorHistoryTableColumns: ColumnDef<SuratModel>[] = [
  {
    accessorKey: "subject",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Subjek
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const subjek = row.getValue("subject");
      return subjek;
    },
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
      const penulis = (row.getValue("author") as AuthorType).name;
      return penulis;
    },
  },
  {
    accessorKey: "receiver",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Penerima
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const penerima = row.getValue("receiver");
      return penerima;
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Dibuat
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
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
            <DropdownMenuLabel>Opsi</DropdownMenuLabel>
            <DropdownMenuItem>
              <Link
                href={`/admin/history/viewer/${confirmedSurat.id}`}
                className=" hover:cursor-pointer"
              >
                Lihat berkas
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <NotesViewDialog notes={confirmedSurat.notes} />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
