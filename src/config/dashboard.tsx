import { SidebarNavItem } from "@/models/navigation.mode";
import { MdOutlineSpaceDashboard } from "react-icons/md";

export interface DashboardConfig {
  sidebarNav: SidebarNavItem[];
}

export const dashboardConfig: DashboardConfig = {
  sidebarNav: [
    {
      title: "Cotizaciones",
      href: "/dashboard/order",
      icon: (
        <MdOutlineSpaceDashboard className="mr-2 h-4 w-4" aria-hidden="true" />
      ),
      items: [],
      shortcut: "C",
    },
  ],
};
