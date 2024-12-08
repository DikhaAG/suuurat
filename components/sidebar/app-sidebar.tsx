import { UserModel } from "@/app/lib/models";

import { HiMiniPaperAirplane } from "react-icons/hi2";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import SidebarContentAdmin from "./SidebarContentAdmin";
import SidebarContentUser from "./SidebarContentUser";
import SidebarHeaderContent from "./SidebarHeadeContent";

export function AppSidebar({ userData }: { userData: UserModel | null }) {
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarHeaderContent />
      </SidebarHeader>
      <SidebarContent>
        {userData?.isAdmin ? <SidebarContentAdmin /> : <SidebarContentUser />}
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
