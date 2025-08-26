import { useState } from "react";
import { Button } from "@/components/ui/button";
import { LucideMenu, LucideX } from "lucide-react";
import AsideMenu from "@/components/ui/AsideMenu";

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
