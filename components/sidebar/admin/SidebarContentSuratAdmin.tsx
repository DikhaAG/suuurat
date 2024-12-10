import Link from "next/link";
import { countAllRequestedSurat } from "@/app/lib/actions";

import { type LucideIcon } from "lucide-react";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";

export default async function SidebarContentSuratAdmin({
  surats,
}: {
  surats: { title: string; url: string; icon: LucideIcon }[];
}) {
  const requestedCount = await countAllRequestedSurat();

  return (
    <SidebarGroup>
      <SidebarGroupLabel> Surat</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {surats.map(
            (surat: { title: string; url: string; icon: LucideIcon }) => (
              <SidebarMenuItem key={surat.title}>
                <SidebarMenuButton asChild={true}>
                  <Link href={surat.url}>
                    <surat.icon />
                    <span>{surat.title}</span>
                  </Link>
                </SidebarMenuButton>
                {surat.url === "/admin/requested" && (
                  <SidebarMenuBadge>{requestedCount}</SidebarMenuBadge>
                )}
              </SidebarMenuItem>
            ),
          )}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
