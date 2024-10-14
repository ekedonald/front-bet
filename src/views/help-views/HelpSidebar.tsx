import React from 'react';
import { NavLink } from 'react-router-dom';

const HelpSidebar: React.FC = () => {
  return (
    <div className="w-64 bg-gray-200 p-4">
      <nav className="space-y-2">
        <NavLink to="/help/introduction" className="block p-2 bg-gray-300 rounded">
          Introduction
        </NavLink>
        <NavLink to="/help/getting-started" className="block p-2 bg-gray-300 rounded">
          Getting Started
        </NavLink>
        <NavLink to="/help/faq" className="block p-2 bg-gray-300 rounded">
          FAQ
        </NavLink>
      </nav>
    </div>
  );
};

export default HelpSidebar;
