import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useTheme } from "../../contexts";
import { FiMenu, FiX } from "react-icons/fi";

function Header() {
  const { themeMode, toLightTheme, toDarkTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleTheme = () => {
    themeMode === "light" ? toDarkTheme() : toLightTheme();
  };

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  const getNavLinkClass = (isActive) =>
    `transition-all duration-300 ease-in-out ${
      isActive
        ? "text-orange-500 dark:text-orange-400 font-semibold"
        : "text-gray-600 dark:text-gray-400 hover:text-orange-600 dark:hover:text-orange-300"
    }`;

  return (
    <header className="w-full px-6 py-4 bg-white dark:bg-gray-900 shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Toh, Do!
        </h2>
        <nav className="hidden md:flex gap-8 text-sm font-medium items-center">
          <NavLink
            to="/"
            className={({ isActive }) => getNavLinkClass(isActive)}
          >
            Home
          </NavLink>
          <NavLink
            to="/stats"
            className={({ isActive }) => getNavLinkClass(isActive)}
          >
            Stats
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) => getNavLinkClass(isActive)}
          >
            About
          </NavLink>

          <button
            onClick={toggleTheme}
            className="ml-4 text-xl"
            aria-label="Toggle Theme"
          >
            {themeMode === "light" ? "🌙" : "☀️"}
          </button>
        </nav>

        <div className="md:hidden flex items-center gap-2">
          <button
            onClick={toggleTheme}
            className="text-xl"
            aria-label="Toggle Theme"
          >
            {themeMode === "light" ? "🌙" : "☀️"}
          </button>
          <button
            onClick={toggleMenu}
            className="text-2xl text-gray-700 dark:text-white"
            aria-label="Toggle Menu"
          >
            {menuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>
      {menuOpen && (
        <div className="md:hidden flex flex-col gap-4 mt-4 px-4 py-3 pb-4 text-sm font-medium bg-white dark:bg-gray-900 shadow-inner rounded-md">
          <NavLink
            to="/"
            className={({ isActive }) => getNavLinkClass(isActive)}
            onClick={toggleMenu}
          >
            Home
          </NavLink>
          <NavLink
            to="/stats"
            className={({ isActive }) => getNavLinkClass(isActive)}
            onClick={toggleMenu}
          >
            Stats
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) => getNavLinkClass(isActive)}
            onClick={toggleMenu}
          >
            About
          </NavLink>
        </div>
      )}
    </header>
  );
}

export default Header;
