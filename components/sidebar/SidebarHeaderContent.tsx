import { HiMiniPaperAirplane } from "react-icons/hi2";

import { SidebarMenu, SidebarMenuItem } from "@/components/ui/sidebar";

export default function SidebarHeaderContent() {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <HiMiniPaperAirplane
          className="text-blue-500 -rotate-45 p-2"
          size={35}
        />
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
