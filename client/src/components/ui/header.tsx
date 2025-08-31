import { useAuth, type UserType } from "@/contexts/AuthProvider";
import { Link } from "react-router-dom";
import { Button } from "./button";
import User from "./User";

const Header = () => {
  const { user, isAdmin, isAuthenticated, logout } = useAuth();
  return (
    <header className="flex items-center justify-between sticky left-0 top-0 p-4 w-3/4 m-auto">
      <h1 className="text-2xl font-bold">
        Event<span className="text-green-600">X</span> Studios
      </h1>
      <nav className="space-x-4">
        {!isAuthenticated ? (
          <>
            <Link
              className="hover:underline hover:text-green-500 duration-300"
              to={"/login"}
            >
              login
            </Link>
            <Link
              className="hover:underline hover:text-green-500 duration-300"
              to={"/signup"}
            >
              signup
            </Link>
          </>
        ) : (
          <div className="flex items-center gap-2">
            {isAdmin ? (
              <Link
                className="hover:underline hover:text-green-500 duration-300"
                to={"/dashboard/insights"}
              >
                Dashboard
              </Link>
            ) : (
              <div className="mr-30 space-x-4">
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
              </div>
            )}
            <div className="flex items-center gap-4">
              <User user={user as UserType} />
              <Button
                className="cursor-pointer hover:opacity-85 duration-300"
                onClick={logout}
              >
                Logout
              </Button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
