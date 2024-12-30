import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BarChart2 } from 'lucide-react';

const Header: React.FC = () => {
  const location = useLocation();
  
  return (
    <header className="bg-white shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-xl font-bold text-blue-600">
          <BarChart2 className="h-6 w-6" />
          <span>RiskManager</span>
        </Link>
        
        <div className="flex items-center gap-6">
          <NavLink to="/profile" active={location.pathname === '/profile'}>
            Dashboard
          </NavLink>
          <Link
            to="/profile"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Get Started
          </Link>
        </div>
      </nav>
    </header>
  );
};

interface NavLinkProps {
  to: string;
  active: boolean;
  children: React.ReactNode;
}

const NavLink: React.FC<NavLinkProps> = ({ to, active, children }) => (
  <Link
    to={to}
    className={`text-sm font-medium ${
      active 
        ? 'text-blue-600'
        : 'text-gray-600 hover:text-gray-900'
    }`}
  >
    {children}
  </Link>
);

export default Header;