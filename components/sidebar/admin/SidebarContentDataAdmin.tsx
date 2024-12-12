import { ChevronDown, ShieldCheck, User } from "lucide-react";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

export default function SidebarContentDataAdmin() {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Data</SidebarGroupLabel>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton asChild>
            <Link href={"/admin/data/validation-stage"}>
              <ShieldCheck />
              <span>Tahap Validasi</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton>
                <div className="flex aspect-square size-5 items-center justify-center rounded-md">
                  <User className="size-4" />
                </div>
                <span className="truncate ">Akun</span>
                <ChevronDown className="opacity-50" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-64 rounded-lg"
              align="start"
              side="bottom"
              sideOffset={4}
            >
              <DropdownMenuItem asChild className="gap-2 p-2 cursor-pointer">
                <Link href={"/admin/data/user"}>User</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className="gap-2 p-2 cursor-pointer">
                <Link href={"/admin/data/validator"}>Validator</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className="gap-2 p-2 cursor-pointer">
                <Link href={"/admin/data/admin"}>Admin</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  );
}
