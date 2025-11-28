import React from 'react';
import { Role } from '../types';
import { LayoutDashboard, Building2, ShieldAlert, Network, Sun, Moon } from 'lucide-react';

interface HeaderProps {
  currentRole: Role;
  onRoleChange: (role: Role) => void;
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const Header: React.FC<HeaderProps> = ({ currentRole, onRoleChange, darkMode, toggleDarkMode }) => {
  return (
    <header className="bg-white dark:bg-slate-900 shadow-sm sticky top-0 z-50 border-b border-gray-200 dark:border-slate-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center text-white font-bold text-lg">S</div>
              <span className="font-bold text-xl text-slate-800 dark:text-white tracking-tight">SISRC <span className="text-slate-400 text-sm font-normal">| MINEDUC</span></span>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            {/* View/Role Switcher */}
            <div className="flex bg-gray-100 dark:bg-slate-800 p-1 rounded-lg overflow-x-auto">
               <button
                onClick={() => onRoleChange(Role.ARCHITECTURE)}
                className={`flex items-center px-3 py-1.5 rounded-md text-sm font-medium transition-colors whitespace-nowrap ${
                  currentRole === Role.ARCHITECTURE
                    ? 'bg-white dark:bg-slate-700 text-indigo-700 dark:text-indigo-300 shadow-sm'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
                }`}
              >
                <Network className="w-4 h-4 mr-1.5" />
                Arquitectura
              </button>
              <div className="w-px bg-gray-300 dark:bg-slate-600 mx-1"></div>
              <button
                onClick={() => onRoleChange(Role.SOSTENEDOR)}
                className={`flex items-center px-3 py-1.5 rounded-md text-sm font-medium transition-colors whitespace-nowrap ${
                  currentRole === Role.SOSTENEDOR
                    ? 'bg-white dark:bg-slate-700 text-green-700 dark:text-green-300 shadow-sm'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
                }`}
              >
                <Building2 className="w-4 h-4 mr-1.5" />
                Sostenedor
              </button>
              <button
                onClick={() => onRoleChange(Role.MINEDUC)}
                className={`flex items-center px-3 py-1.5 rounded-md text-sm font-medium transition-colors whitespace-nowrap ${
                  currentRole === Role.MINEDUC
                    ? 'bg-white dark:bg-slate-700 text-blue-700 dark:text-blue-300 shadow-sm'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
                }`}
              >
                <LayoutDashboard className="w-4 h-4 mr-1.5" />
                Mineduc
              </button>
              <button
                onClick={() => onRoleChange(Role.SIE)}
                className={`flex items-center px-3 py-1.5 rounded-md text-sm font-medium transition-colors whitespace-nowrap ${
                  currentRole === Role.SIE
                    ? 'bg-white dark:bg-slate-700 text-orange-700 dark:text-orange-300 shadow-sm'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
                }`}
              >
                <ShieldAlert className="w-4 h-4 mr-1.5" />
                SIE
              </button>
            </div>

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-yellow-400 hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors"
              aria-label="Toggle Dark Mode"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;