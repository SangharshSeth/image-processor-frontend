// src/components/Navbar.tsx
import React from "react";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  return (
    <nav className="bg-white font-inter flex items-center justify-between p-4 border-b border-2 sticky top-0 z-50">
      <div className="text-2xl font-bold">
        <Link
          to="/"
          className="text-white bg-green-600 rounded-md px-2 py-2 transition-colors duration-300"
        >
          Emage
        </Link>
      </div>
      <ul className="flex space-x-4">
        <li>
          <Link
            to="/techstack"
            className="hover:bg-green-400 px-3 py-2 rounded transition-colors duration-300"
          >
            TechStack
          </Link>
        </li>
        <li>
          <Link
            to="/process-image"
            className="bg-green-500 text-white px-6 py-3 rounded-lg font-inter transition-colors duration-300"
          >
            Get Started
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
