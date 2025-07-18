import { Link, NavLink } from "react-router-dom";
import { FaSearch, FaUser } from "react-icons/fa";
import { useState } from "react";
import { Link as ScrollLink } from "react-scroll";

const Header = () => {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <header className="w-full bg-white shadow-sm top-0 z-50 px-24">
      {/* Top Bar */}
      <div className="border-b border-gray-200">
        <div className="flex items-center justify-between px-6 py-3 mx-auto">
          {/* Left - Logo */}
          <div className="flex-shrink-0">
            <Link
              to="/"
              className="flex items-center gap-2 transition-transform hover:scale-105"
            >
              <img
                src="/logo.png"
                alt="Poseidon"
                className="h-16 w-auto"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    "https://via.placeholder.com/150?text=Poseidon";
                }}
              />
            </Link>
          </div>

          {/* Center - Nav Items */}
          <nav className="hidden md:flex items-center justify-center gap-8 text-sm font-medium">
            {[
              { label: "Hem", id: "home" },
              { label: "Tjänster", id: "services" },
              { label: "Om Oss", id: "about" },
              { label: "Kontakt", id: "contact" },
            ].map(({ label, id }) => (
              <ScrollLink
                key={id}
                to={id}
                smooth={true}
                duration={600}
                offset={-80}
                spy={true}
                activeClass="text-secondary font-semibold"
                className="cursor-pointer px-1 py-2 transition-colors duration-300 relative group text-gray-600 hover:text-secondary"
              >
                {label}
                <span className="absolute bottom-0 left-0 h-0.5 bg-blue-500 w-0 group-hover:w-full transition-all duration-300"></span>
              </ScrollLink>
            ))}
          </nav>

          {/* Right - Sign In & Search */}
          <div className="flex items-center gap-4">
            <Link
              to="/login"
              className="hidden sm:flex items-center gap-2 border border-gray-300 px-4 py-1.5 rounded-full hover:bg-blue-50 hover:border-blue-200 hover:text-blue-600 transition-all duration-300 text-sm font-medium"
            >
              <FaUser className="text-sm" />
              Logga in
            </Link>

            <div className="relative">
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-2 text-gray-600 hover:text-blue-500 transition-colors duration-300"
              >
                <FaSearch />
              </button>

              {searchOpen && (
                <div className="absolute right-0 top-full mt-2 w-64 bg-white shadow-lg rounded-md p-2 z-10 animate-fadeIn">
                  <input
                    type="text"
                    placeholder="Sök..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    autoFocus
                  />
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <button className="md:hidden p-2 text-gray-600 hover:text-blue-500">
              <svg
                className="w-6 h-6"
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
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
