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
import { countAllValidationSurat } from "@/app/lib/actions";
import { UserModel } from "@/app/lib/models";

const items = [
  {
    title: "Home",
    url: "/validator",
    icon: ChartColumnBig,
  },
  {
    title: "Menunggu validasi",
    url: "/validator/requested",
    icon: Timer,
  },
  {
    title: "Riwayat",
    url: "/validator/history",
    icon: CheckCheck,
  },
];

export default async function SidebarContentValidator({
  validatorData,
}: {
  validatorData: UserModel | null;
}) {
  const requestedSuratCount = await countAllValidationSurat(
    validatorData!.validationStage!.id,
  );
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
              {item.url === "/validator/requested" && (
                <SidebarMenuBadge>{requestedSuratCount}</SidebarMenuBadge>
              )}
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
