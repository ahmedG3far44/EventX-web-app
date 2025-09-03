import { useAuth, type UserType } from "@/contexts/AuthProvider";
import { Link } from "react-router-dom";
import { Button } from "./button";
import User from "./User";
import { useState } from "react";

const Header = () => {
  const { user, isAdmin, isAuthenticated, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="sticky top-0 left-0 z-50 bg-white backdrop-blur-md border-b border-gray-200 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              Event<span className="text-green-600">X</span> Studios
            </h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {!isAuthenticated ? (
              <>
                <Link
                  className="text-gray-700 hover:text-green-600 font-medium transition-colors duration-300 relative after:absolute after:w-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-green-600 after:transition-all after:duration-300 hover:after:w-full"
                  to="/login"
                >
                  Login
                </Link>
                <Link
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium transition-all duration-300 shadow-md hover:shadow-lg"
                  to="/signup"
                >
                  Sign Up
                </Link>
              </>
            ) : (
              <div className="flex items-center space-x-6">
                {isAdmin ? (
                  <Link
                    className="text-gray-700 hover:text-green-600 font-medium transition-colors duration-300 relative after:absolute after:w-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-green-600 after:transition-all after:duration-300 hover:after:w-full"
                    to="/dashboard/insights"
                  >
                    Dashboard
                  </Link>
                ) : (
                  <div className="flex items-center space-x-6">
                    <Link
                      className="text-gray-700 hover:text-green-600 font-medium transition-colors duration-300 relative after:absolute after:w-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-green-600 after:transition-all after:duration-300 hover:after:w-full"
                      to="/"
                    >
                      Events
                    </Link>
                    <Link
                      className="text-gray-700 hover:text-green-600 font-medium transition-colors duration-300 relative after:absolute after:w-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-green-600 after:transition-all after:duration-300 hover:after:w-full"
                      to="/tickets"
                    >
                      My Tickets
                    </Link>
                  </div>
                )}
                <div className="flex items-center space-x-4">
                  <User user={user as UserType} />
                  <Button
                    className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-medium transition-all duration-300"
                    onClick={logout}
                  >
                    Logout
                  </Button>
                </div>
              </div>
            )}
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="text-gray-700 hover:text-green-600 focus:outline-none focus:text-green-600 transition-colors duration-300"
              aria-label="Toggle menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMobileMenuOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white/95 backdrop-blur-sm">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {!isAuthenticated ? (
                <>
                  <Link
                    className="block px-3 py-2 text-gray-700 hover:text-green-600 hover:bg-green-50 rounded-lg font-medium transition-all duration-300"
                    to="/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    className="block px-3 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-all duration-300 text-center"
                    to="/signup"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </>
              ) : (
                <div className="space-y-1">
                  {isAdmin ? (
                    <Link
                      className="block px-3 py-2 text-gray-700 hover:text-green-600 hover:bg-green-50 rounded-lg font-medium transition-all duration-300"
                      to="/dashboard/insights"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Dashboard
                    </Link>
                  ) : (
                    <>
                      <Link
                        className="block px-3 py-2 text-gray-700 hover:text-green-600 hover:bg-green-50 rounded-lg font-medium transition-all duration-300"
                        to="/events"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Events
                      </Link>
                      <Link
                        className="block px-3 py-2 text-gray-700 hover:text-green-600 hover:bg-green-50 rounded-lg font-medium transition-all duration-300"
                        to="/tickets"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        My Tickets
                      </Link>
                    </>
                  )}
                  <div className="border-t border-gray-200 pt-2 mt-2">
                    <div className="px-3 py-2">
                      <User user={user as UserType} />
                    </div>
                    <Button
                      className="w-full mt-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-medium transition-all duration-300"
                      onClick={() => {
                        logout();
                        setIsMobileMenuOpen(false);
                      }}
                    >
                      Logout
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
