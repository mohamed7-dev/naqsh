import { routes } from "@/config/routes";
import { Home } from "lucide-react";

const sidebarItems = {
  firstGroup: [
    {
      title: "Home",
      Icon: Home,
      href: routes.landing,
      isActive: (pathname: string) => pathname === routes.landing,
    },
  ],
  secondGroup: [],
};

export { sidebarItems };
