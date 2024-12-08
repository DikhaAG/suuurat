import Link from "next/link";

import { ChartColumnBig, Timer, CheckCheck } from "lucide-react";

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuBadge,
} from "@/components/ui/sidebar";
import { countAllRequestedSurat } from "@/app/lib/actions";

const items = [
  {
    title: "Dashboard",
    url: "/admin",
    icon: ChartColumnBig,
  },
  {
    title: "Menunggu validasi",
    url: "/admin/requested",
    icon: Timer,
  },
  {
    title: "Sukses",
    url: "/admin/history",
    icon: CheckCheck,
  },
];

export default async function SidebarContentAdmin() {
  const requestedCount = await countAllRequestedSurat();
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
              {item.url === "/admin/requested" && (
                <SidebarMenuBadge>{requestedCount}</SidebarMenuBadge>
              )}
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
