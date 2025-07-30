import { useState } from "react";
import { Link } from "react-router-dom";
import { FaSearch, FaUser } from "react-icons/fa";

import { Link as RouterLink } from "react-router-dom";

const Header = () => {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <header className="w-full bg-white shadow-sm top-0 z-50 px-24">
      <div className="border-b border-gray-200">
        <div className="flex items-center justify-between px-6 py-3 mx-auto">

          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center gap-2 hover:scale-105 transition-transform">
              <img
                src="/logo.png"
                alt="Poseidon"
                className="h-16 w-auto"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://via.placeholder.com/150?text=Poseidon";
                }}
              />
            </Link>
          </div>

          {/* Nav */}
          <nav className="hidden md:flex items-center justify-center gap-8 text-sm font-medium">
            <RouterLink to="/" className="nav-link">Hem</RouterLink>

            {/* Dropdown - Tjänster */}
            <div className="relative group">
              <span className="cursor-pointer px-1 py-2 text-gray-600 hover:text-secondary transition-colors">
                Tjänster
              </span>
              <div className="absolute hidden group-hover:block bg-white shadow-md rounded-lg mt-2 z-40 min-w-[220px]">
  <RouterLink to="/category/687b71ba252221dd770c3c6d" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
    Möbelrengöring
  </RouterLink>
  <RouterLink to="/category/687b744c252221dd770c3c70" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
    Biltvättstjänster
  </RouterLink>
  <RouterLink to="/category/687b744c252221dd770c3c76" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
    Rekonditionering
  </RouterLink>
  <RouterLink to="/category/687b744c252221dd770c3c78" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
    Husbil & Båt
  </RouterLink>
  <RouterLink to="/category/687b744c252221dd770c3c79" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
    Lackreparation & Små Bucklor
  </RouterLink>
</div>

            </div>
           <RouterLink to="/category/687b744c252221dd770c3c7e" className="nav-link">Mobil tjänster</RouterLink>
              <RouterLink to="/category/687b744c252221dd770c3c7f" className="nav-link">Företagstjänster</RouterLink>
            <RouterLink to="about" smooth duration={600} offset={-80} className="nav-link">Om Oss</RouterLink>
            <RouterLink to="contactus" smooth duration={600} offset={-80} className="nav-link">Kontakt</RouterLink>
            <RouterLink to="/FAQ" className="nav-link">FAQ</RouterLink>
  
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-4">
            <Link to="/login" className="p-2 rounded-xl border-1 border-black flex gap-1">
              <FaUser className="text-lg" /> Logga in
            </Link>

            <div className="relative">
              <button onClick={() => setSearchOpen(!searchOpen)} className="p-2 text-gray-600 hover:text-blue-500">
                <FaSearch />
              </button>
              {searchOpen && (
                <div className="absolute right-0 top-full mt-2 w-64 bg-white shadow-lg rounded-md p-2 z-10">
                  <input
                    type="text"
                    placeholder="Sök..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    autoFocus
                  />
                </div>
              )}
            </div>

            <button className="md:hidden p-2 text-gray-600 hover:text-blue-500">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
