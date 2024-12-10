import Link from "next/link";

import { Timer, CheckCheck, Plus } from "lucide-react";

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const items = [
  {
    title: "Bikin surat",
    url: "/user",
    icon: Plus,
  },
  {
    title: "Menunggu persetujuan",
    url: "/user/requested",
    icon: Timer,
  },
  {
    title: "Berhasil",
    url: "/user/history",
    icon: CheckCheck,
  },
];
export default function SidebarContentUser() {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Surat</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild={true}>
                <Link href={item.url}>
                  <item.icon />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
