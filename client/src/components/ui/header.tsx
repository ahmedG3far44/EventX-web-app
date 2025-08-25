import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="flex items-center justify-between sticky left-0 top-0 p-4 w-3/4 m-auto">
      <h1 className="text-2xl font-bold">
        Event<span className="text-green-600">X</span> Studios
      </h1>
      <nav className="space-x-4">
        <Link
          className="hover:underline hover:text-green-500 duration-300"
          to={"/events"}
        >
          Events
        </Link>
        <Link
          className="hover:underline hover:text-green-500 duration-300"
          to={"/tickets"}
        >
          My Tickets
        </Link>
      </nav>
    </header>
  );
};

export default Header;
