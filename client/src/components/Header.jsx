import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { logout } from "../store/features/authSlice";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { token, user } = useSelector((state) => state.auth);
  const isLoggedIn = Boolean(token || user);

  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logout successfully");
    setIsOpen(false);
    navigate("/login");
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "All Cars", path: "/cars" },
    { name: "Contact", path: "/contact" },
    { name: "My Account", path: "/profile" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#3f3f3f] bg-[#212121] text-[#ececec]">
      
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* Brand */}
        <Link
          to="/"
          className="flex items-center gap-2 text-xl font-semibold tracking-tight transition hover:opacity-80"
        >
          <i className="fa fa-car text-lg"></i>

          <span>Virtuacarz</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className="rounded-lg px-4 py-2 text-sm font-medium text-[#b4b4b4] transition hover:bg-[#2f2f2f] hover:text-[#ececec]"
            >
              {link.name}
            </Link>
          ))}

          <div className="mx-2 h-5 w-px bg-[#424242]"></div>

          {isLoggedIn ? (
            <button
              type="button"
              onClick={handleLogout}
              className="ml-1 rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700 active:scale-95"
            >
              Logout
            </button>
          ) : (
            <>
              <Link
                to="/login"
                className="rounded-lg px-4 py-2 text-sm font-medium text-[#b4b4b4] transition hover:bg-[#2f2f2f] hover:text-[#ececec]"
              >
                Log in
              </Link>

              <Link
                to="/register"
                className="ml-1 rounded-lg bg-[#ececec] px-4 py-2 text-sm font-semibold text-[#212121] transition hover:bg-[#d4d4d4] active:scale-95"
              >
                Sign up
              </Link>
            </>
          )}
        </nav>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="rounded-lg p-2 text-[#ececec] transition hover:bg-[#2f2f2f] md:hidden"
          aria-label="Toggle menu"
          aria-expanded={isOpen}
        >
          {isOpen ? (
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <nav className="border-t border-[#3f3f3f] bg-[#212121] px-4 py-3 md:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-1">

            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className="rounded-lg px-4 py-3 text-sm font-medium text-[#b4b4b4] transition hover:bg-[#2f2f2f] hover:text-[#ececec]"
              >
                {link.name}
              </Link>
            ))}

            <div className="my-2 border-t border-[#3f3f3f]"></div>

            {isLoggedIn ? (
              <button
                type="button"
                onClick={handleLogout}
                className="rounded-lg bg-red-600 px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-red-700 active:scale-95"
              >
                Logout
              </button>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className="rounded-lg px-4 py-3 text-sm font-medium text-[#b4b4b4] transition hover:bg-[#2f2f2f] hover:text-[#ececec]"
                >
                  Log in
                </Link>

                <Link
                  to="/register"
                  onClick={() => setIsOpen(false)}
                  className="rounded-lg bg-[#ececec] px-4 py-3 text-center text-sm font-semibold text-[#212121] transition hover:bg-[#d4d4d4]"
                >
                  Sign up
                </Link>
              </>
            )}

          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;