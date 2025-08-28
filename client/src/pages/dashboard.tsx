import { useState } from "react";
import { Button } from "@/components/ui/button";
import { LucideMenu, LucideX } from "lucide-react";
import AsideMenu from "@/components/ui/AsideMenu";

import { Outlet } from "react-router-dom";
import MobileMenu from "@/components/ui/MobileMenu";

const DashboardPage = () => {
  const [isMenuOpen, setMenuOpen] = useState<boolean>(true);

  const handleOpenMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  return (
    <div className="w-full flex min-h-screen relative">
      {/* Always render but control visibility and position */}

      {isMenuOpen ? <MobileMenu /> : <AsideMenu />}

      <main
        className={`bg-zinc-300 min-h-screen w-full transition-all duration-300`}
      >
        <div className="fixed z-50 right-5 top-5">
          <Button
            className="cursor-pointer hover:bg-green-700 duration-300 bg-green-600 text-white"
            onClick={handleOpenMenu}
          >
            {!isMenuOpen ? <LucideMenu size={30} /> : <LucideX size={30} />}
          </Button>
        </div>
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardPage;
