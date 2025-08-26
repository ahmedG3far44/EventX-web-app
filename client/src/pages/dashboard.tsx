<<<<<<< HEAD
import AsideMenu from "@/components/ui/AsideMenu";
import { Button } from "@/components/ui/button";
import { LucideMenu, LucideX } from "lucide-react";
import { useState } from "react";
=======
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  LucideActivity,
  LucideChartScatter,
  LucideLayoutDashboard,
  LucideMenu,
  LucidePlus,
  LucideSection,
  LucideUser,
  LucideVenusAndMars,
  LucideX,
} from "lucide-react";
>>>>>>> 0f51173e87bcda22ac4013aa4572895aaf7384f5

import { Outlet } from "react-router-dom";

const DashboardPage = () => {
  const [isMobile, setMobile] = useState<boolean>(false);
  const handleOpenMenu = () => {
    setMobile(!isMobile);
  };
  return (
    <div className="w-full flex  min-h-screen">
      {isMobile && <AsideMenu />}
      <main
        className={`${
          isMobile ? "w-full" : "lg:w-full"
        } bg-zinc-300 w-full  min-h-screen`}
      >
        <div className="fixed z-50 right-5 top-5">
          <Button
            className="cursor-pointer hover:bg-green-700 duration-300 bg-green-600 text-white "
            onClick={handleOpenMenu}
          >
            {!isMobile ? <LucideMenu size={30} /> : <LucideX size={30} />}
          </Button>
        </div>
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardPage;

// function AsideMenu() {
//   const size = 20;
//   const location = useLocation();
//   const activePath = location.pathname.split("/").pop();

<<<<<<< HEAD
//   const dashboardLinks = [
//     {
//       id: 1,
//       path: "insights",
//       name: "Dashboard",
//       icon: <LucideLayoutDashboard size={size} />,
//     },
//     {
//       id: 2,
//       path: "add",
//       name: "Quick Add",
//       icon: <LucidePlus size={size} />,
//     },
//     {
//       id: 3,
//       path: "events",
//       name: "All Events Insights",
//       icon: <LucideVenusAndMars size={size} />,
//     },
//     {
//       id: 4,
//       path: "manage-events",
//       name: "Manage Events",
//       icon: <LucideActivity size={size} />,
//     },
//     {
//       id: 5,
//       path: "categories",
//       name: "Mange Categories",
//       icon: <LucideSection size={size} />,
//     },
//     {
//       id: 6,
//       path: "users",
//       name: "Manage Users",
//       icon: <LucideUser size={size} />,
//     },
//     {
//       id: 7,
//       path: "reports",
//       name: "Analytics & reports",
//       icon: <LucideChartScatter size={size} />,
//     },
//   ];
//   return (
//     <aside
//       className={`p-8 bg-zinc-100  max-w-3/4 lg:w-[20%] fixed lg:sticky md:sticky min-h-screen shadow-md left-0 top-0 z-50`}
//     >
//       <ul>
//         {dashboardLinks.map((url) => {
//           return (
//             <Link
//               className={`${
//                 activePath === url.path && "bg-green-600 text-white"
//               } flex justify-start items-center gap-2 px-4 py-2 rounded-md  text-nowrap text-sm hover:bg-zinc-200 duration-300 my-2`}
//               to={`/dashboard/${url.path}`}
//             >
//               <span>{url.icon}</span>
//               {url.name}
//             </Link>
//           );
//         })}
//       </ul>
//     </aside>
//   );
// }
=======
  const dashboardLinks = [
    {
      id: 1,
      path: "insights",
      name: "Dashboard",
      icon: <LucideLayoutDashboard size={size} />,
    },
    {
      id: 2,
      path: "add",
      name: "Quick Add",
      icon: <LucidePlus size={size} />,
    },
    {
      id: 3,
      path: "events",
      name: "All Events Insights",
      icon: <LucideVenusAndMars size={size} />,
    },
    {
      id: 4,
      path: "manage-events",
      name: "Manage Events",
      icon: <LucideActivity size={size} />,
    },
    {
      id: 5,
      path: "categories",
      name: "Mange Categories",
      icon: <LucideSection size={size} />,
    },
    {
      id: 6,
      path: "users",
      name: "Manage Users",
      icon: <LucideUser size={size} />,
    },
    {
      id: 7,
      path: "reports",
      name: "Analytics & reports",
      icon: <LucideChartScatter size={size} />,
    },
  ];
  return (
    <aside
      className={`p-8 bg-zinc-100  max-w-3/4 lg:w-[20%] fixed lg:sticky animate- md:sticky min-h-screen shadow-md left-0 top-0 z-50`}
    >
      <ul>
        {dashboardLinks.map((url) => {
          return (
            <Link
              className={`${
                activePath === url.path && "bg-green-600 text-white"
              } flex justify-start items-center gap-2 px-4 py-2 rounded-md  text-nowrap text-sm hover:bg-zinc-200 duration-300 my-2`}
              to={`/dashboard/${url.path}`}
            >
              <span>{url.icon}</span>
              {url.name}
            </Link>
          );
        })}
      </ul>
    </aside>
  );
}
>>>>>>> 0f51173e87bcda22ac4013aa4572895aaf7384f5
