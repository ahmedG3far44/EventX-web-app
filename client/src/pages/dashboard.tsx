import { Link, Outlet } from "react-router-dom";

const DashboardPage = () => {
  return (
    <div className="flex gap-4">
      <AsideMenu />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardPage;

function AsideMenu() {
  return (
    <aside>
      <ul>
        <li>
          <Link to={"/dashboard/users"}>Users </Link>
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
