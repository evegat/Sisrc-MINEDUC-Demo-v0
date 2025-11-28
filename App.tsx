import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import SostenedorView from './components/SostenedorView';
import MineducView from './components/MineducView';
import SieView from './components/SieView';
import DataFlowView from './components/DataFlowView';
import { Role, SchoolData } from './types';
import { initialSchools } from './services/mockData';

const App: React.FC = () => {
  const [currentRole, setCurrentRole] = useState<Role>(Role.MINEDUC);
  const [schools, setSchools] = useState<SchoolData[]>(initialSchools);
  const [darkMode, setDarkMode] = useState(false);

  // Initial Data Mockup adjustment to include new fields like dependence
  useEffect(() => {
     // Enrich mock data if needed dynamically, though types are updated
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // Apply dark mode class to html element
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Focus on the first school for the Sostenedor view Demo
  const activeSchool = schools[0];

  const handleUpdateSchool = (updatedSchool: SchoolData) => {
    setSchools(prev => prev.map(s => s.id === updatedSchool.id ? updatedSchool : s));
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-slate-900 flex flex-col font-sans transition-colors duration-300">
      <Header 
        currentRole={currentRole} 
        onRoleChange={setCurrentRole} 
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* View Switcher Logic */}
        {currentRole === Role.ARCHITECTURE && (
          <DataFlowView />
        )}

        {currentRole === Role.SOSTENEDOR && (
          <SostenedorView 
            data={activeSchool} 
            onUpdate={handleUpdateSchool} 
          />
        )}

        {currentRole === Role.MINEDUC && (
          <MineducView schools={schools} />
        )}

        {currentRole === Role.SIE && (
          <SieView schools={schools} />
        )}

      </main>

      <footer className="bg-white dark:bg-slate-900 border-t border-gray-200 dark:border-slate-800 mt-auto transition-colors duration-300">
        <div className="max-w-7xl mx-auto py-6 px-4 flex justify-between items-center text-xs text-gray-400 dark:text-gray-500">
          <p>SISRC v1.0 MVP - Proyecto Estratégico MINEDUC 2025</p>
          <div className="flex gap-4">
            <span>Seguridad ISO 27001</span>
            <span>Interoperabilidad SII/DT/SUSESO</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;