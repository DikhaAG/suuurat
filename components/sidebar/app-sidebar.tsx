import { UserModel } from "@/app/lib/models";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar";
import SidebarContentAdmin from "@/components/sidebar/admin/SidebarContentAdmin";
import SidebarContentUser from "@/components/sidebar/user/SidebarContentUser";
import SidebarHeaderContent from "@/components/sidebar/SidebarHeaderContent";
import SidebarContentValidator from "@/components/sidebar/validator/SidebarContentValidator";
import SidebarFooterContent from "@/components/sidebar/SidebarFooterContent";

export function AppSidebar({ userData }: { userData: UserModel | null }) {
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarHeaderContent />
      </SidebarHeader>
      <SidebarContent>
        {userData?.role === "ADMIN" ? (
          <SidebarContentAdmin />
        ) : userData?.role === "VALIDATOR" ? (
          <SidebarContentValidator validatorData={userData} />
        ) : (
          <SidebarContentUser />
        )}
      </SidebarContent>
      <SidebarFooter>
        <SidebarFooterContent userData={userData} />
      </SidebarFooter>
    </Sidebar>
  );
}
