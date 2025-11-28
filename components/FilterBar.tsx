import React from 'react';
import { FilterState } from '../types';
import { Search, MapPin, Building, Filter } from 'lucide-react';

interface FilterBarProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
}

export const REGIONS = [
  "Todas",
  "Arica y Parinacota", "Tarapacá", "Antofagasta", "Atacama", "Coquimbo", 
  "Valparaíso", "Metropolitana", "O'Higgins", "Maule", "Ñuble", "Biobío", 
  "Araucanía", "Los Ríos", "Los Lagos", "Aysén", "Magallanes"
];

const FilterBar: React.FC<FilterBarProps> = ({ filters, onFilterChange }) => {
  const handleChange = (key: keyof FilterState, value: string) => {
    onFilterChange({ ...filters, [key]: value });
  };

  return (
    <div className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700 mb-6 flex flex-col md:flex-row gap-4 items-center animate-fade-in">
      <div className="flex items-center text-gray-500 dark:text-gray-400 font-medium mr-2">
        <Filter className="w-4 h-4 mr-2" />
        Filtros:
      </div>

      {/* Region Selector */}
      <div className="relative w-full md:w-64">
        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <select
          value={filters.region}
          onChange={(e) => handleChange('region', e.target.value)}
          className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-slate-900 border border-gray-300 dark:border-slate-700 rounded-lg text-sm focus:ring-blue-500 focus:border-blue-500 text-gray-700 dark:text-gray-200 appearance-none"
        >
          {REGIONS.map(r => (
            <option key={r} value={r}>{r}</option>
          ))}
        </select>
      </div>

      {/* Dependence Selector */}
      <div className="relative w-full md:w-48">
        <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <select
          value={filters.dependence}
          onChange={(e) => handleChange('dependence', e.target.value)}
          className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-slate-900 border border-gray-300 dark:border-slate-700 rounded-lg text-sm focus:ring-blue-500 focus:border-blue-500 text-gray-700 dark:text-gray-200 appearance-none"
        >
          <option value="">Todas las Dependencias</option>
          <option value="Municipal">Municipal</option>
          <option value="SLEP">SLEP</option>
          <option value="Particular Subvencionado">Particular Subv.</option>
        </select>
      </div>

      {/* RUT Search */}
      <div className="relative flex-1 w-full">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <input
          type="text"
          placeholder="Buscar por RBD o RUT Sostenedor..."
          value={filters.rutSostenedor}
          onChange={(e) => handleChange('rutSostenedor', e.target.value)}
          className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-slate-900 border border-gray-300 dark:border-slate-700 rounded-lg text-sm focus:ring-blue-500 focus:border-blue-500 text-gray-700 dark:text-gray-200"
        />
      </div>
    </div>
  );
};

export default FilterBar;