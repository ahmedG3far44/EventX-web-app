import { Link, Outlet } from "react-router-dom";

const DashboardPage = () => {
  return (
    <div className="w-full flex  min-h-screen">
      <AsideMenu />
      <main className="p-8 bg-zinc-300 w-[85%] min-h-screen">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardPage;

function AsideMenu() {
  return (
    <aside className="p-8 bg-zinc-100  w-[15%] sticky left-0 top-0 z-50">
      <ul>
        <li>
          <Link to={"/dashboard/events"}> Manage Events </Link>
        </li>
        <li>
          <Link to={"/dashboard/users"}>Users </Link>
        </li>
        <li>
          <Link to={"/dashboard/users"}>Users </Link>
        </li>
        <li>
          <Link to={"/dashboard/users"}>Users </Link>
        </li>
      </ul>
    </aside>
  );
}
