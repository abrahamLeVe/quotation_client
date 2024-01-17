import { type SidebarNavItem } from "@/models/navigation.model";
import { BsCreditCard, BsGear } from "react-icons/bs";
import { MdOutlineSpaceDashboard } from "react-icons/md";

export interface DashboardConfig {
  sidebarNav: SidebarNavItem[];
}

export const dashboardConfig: DashboardConfig = {
  sidebarNav: [
    {
      title: "Panel",
      href: "/dashboard/account",
      icon: (
        <MdOutlineSpaceDashboard className="mr-2 h-4 w-4" aria-hidden="true" />
      ),
      items: [],
      shortcut: "P",
    },
    {
      title: "Facturación",
      href: "/dashboard/stores",
      icon: <BsCreditCard className="mr-2 h-4 w-4" aria-hidden="true" />,
      items: [],
      shortcut: "F",
    },
    {
      title: "Ajustes",
      href: "/dashboard/purchases",
      icon: <BsGear className="mr-2 h-4 w-4" aria-hidden="true" />,
      items: [],
      shortcut: "A",
    },
  ],
};
