import AsideMenu from "./AsideMenu";

const MobileMenu = () => {
  return (
    <div
      className={`fixed left-0 top-0 w-full min-h-screen shadow-2xl z-[50] bg-black/90 lg:hidden xl:hidden`}
    >
      <AsideMenu />
    </div>
  );
};

export default MobileMenu;
