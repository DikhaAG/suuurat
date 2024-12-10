import { ChartColumnBig, Timer, CheckCheck } from "lucide-react";

import SidebarContentSuratAdmin from "@/components/sidebar/admin/SidebarContentSuratAdmin";
import SidebarContentDataAdmin from "./SidebarContentDataAdmin";

const surats = [
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
  return (
    <>
      <SidebarContentSuratAdmin surats={surats} />
      <SidebarContentDataAdmin />
    </>
  );
}
