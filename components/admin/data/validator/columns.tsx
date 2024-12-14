"use client";

import { ArrowUpDown, MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { UserValidatorModel } from "@/app/lib/models";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import DataValidatorDeleteAlertDialog from "@/components/admin/data/validator/delete-alert-dialog";
import { ValidationStage } from "@prisma/client";

export const DataValidatorColumnHeader: { [key: string]: string } = {
  name: "nama",
  password: "password",
  validationStage: "tahap validasi",
  createdAt: "dibuat",
  actions: "opsi",
};

export const DataValidatorColumns: ColumnDef<UserValidatorModel>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nama
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const name = row.getValue("name");
      return name;
    },
  },
  {
    accessorKey: "password",
    header: "Password",
  },
  {
    accessorKey: "validationStage",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Tahap Validasi
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const validationStageTitle = (
        row.getValue("validationStage") as ValidationStage
      )?.title;
      return validationStageTitle;
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
      const userValidatorData = row.original;

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
            <Separator />
            <DropdownMenuItem asChild>
              <DataValidatorDeleteAlertDialog
                userValidatorData={userValidatorData}
              />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
