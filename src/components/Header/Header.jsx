import React from "react";
import { NavLink } from "react-router-dom";
import { useTheme } from "../../contexts";

function Header() {
  const { themeMode, toLightTheme, toDarkTheme } = useTheme();

  const toggleTheme = () => {
    themeMode == "light" ? toDarkTheme() : toLightTheme();
  };

  return (
    <header className="w-full px-6 py-4 bg-white dark:bg-gray-900 shadow-md">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold text-black dark:text-white">
          Toh, Do!
        </h1>

        <nav className="flex gap-6 text-sm font-medium">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `transition-all duration-300 ease-in-out ${
                isActive
                  ? "text-orange-500 dark:text-white font-semibold"
                  : "text-orange-200 dark:text-gray-500 hover:text-orange-700 dark:hover:text-primary-400 hover:scale-105"
              }`
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/stats"
            className={({ isActive }) =>
              `transition-all duration-300 ease-in-out ${
                isActive
                  ? "text-orange-500 dark:text-white font-semibold"
                  : "text-orange-200 dark:text-gray-500 hover:text-orange-700 dark:hover:text-primary-400 hover:scale-105"
              }`
            }
          >
            Stats
          </NavLink>

          <NavLink
            to="/about"
            className={({ isActive }) =>
              `transition-all duration-300 ease-in-out ${
                isActive
                  ? "text-orange-500 dark:text-white font-semibold"
                  : "text-orange-200 dark:text-gray-500 hover:text-orange-700 dark:hover:text-primary-400 hover:scale-105"
              }`
            }
          >
            About
          </NavLink>

          {/* Theme Toggle */}
          <div>
            <button
              onClick={toggleTheme}
              className="rounded-full text-lg font-medium px-2 dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-white transition-all"
            >
              {themeMode === "light" ? "🌙" : "☀️"}
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Header;
