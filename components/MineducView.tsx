
import React, { useState } from 'react';
import { SchoolData, AiExecutiveReport, FilterState, SubventionBreakdown } from '../types';
import FilterBar from './FilterBar';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend, AreaChart, Area } from 'recharts';
import { TrendingUp, AlertTriangle, CheckCircle, Clock, Sparkles, FileText, ChevronRight, Coins, Wallet } from 'lucide-react';

interface MineducViewProps {
  schools: SchoolData[];
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
const SUBVENTION_COLORS = {
  general: '#6366f1', // Indigo
  sep: '#ec4899',     // Pink
  pie: '#8b5cf6',     // Violet
  faep: '#10b981',    // Emerald
  others: '#94a3b8'   // Slate
};

const MineducView: React.FC<MineducViewProps> = ({ schools }) => {
  const [report, setReport] = useState<AiExecutiveReport | null>(null);
  const [generatingReport, setGeneratingReport] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    region: 'Todas',
    rutSostenedor: '',
    dependence: ''
  });

  // FILTER LOGIC
  const filteredSchools = schools.filter(s => {
    const matchesRegion = filters.region === 'Todas' || s.region === filters.region;
    const matchesRut = filters.rutSostenedor === '' || 
                       s.rbd.includes(filters.rutSostenedor) || 
                       s.name.toLowerCase().includes(filters.rutSostenedor.toLowerCase());
    const matchesDep = filters.dependence === '' || s.dependence === filters.dependence;
    return matchesRegion && matchesRut && matchesDep;
  });

  // Aggregate Data
  const totalSchools = filteredSchools.length;
  const submittedSchools = filteredSchools.filter(s => s.status === 'Enviado' || s.status === 'Aprobado').length;
  const closureRate = totalSchools > 0 ? ((submittedSchools / totalSchools) * 100).toFixed(1) : "0.0";
  
  // Calculate Universe (Subventions)
  const universe: SubventionBreakdown = filteredSchools.reduce((acc, school) => ({
    general: acc.general + school.subventions.general,
    sep: acc.sep + school.subventions.sep,
    pie: acc.pie + school.subventions.pie,
    faep: acc.faep + school.subventions.faep,
    others: acc.others + school.subventions.others
  }), { general: 0, sep: 0, pie: 0, faep: 0, others: 0 });

  const totalUniverseAmount = Object.values(universe).reduce((a, b) => a + b, 0);
  const totalReportedAmount = filteredSchools.reduce((acc, s) => acc + s.totalDeclared, 0);

  // Chart Data preparation
  const subventionData = [
    { name: 'General', universe: universe.general, reported: universe.general * 0.9, fill: SUBVENTION_COLORS.general },
    { name: 'SEP', universe: universe.sep, reported: universe.sep * 0.85, fill: SUBVENTION_COLORS.sep },
    { name: 'PIE', universe: universe.pie, reported: universe.pie * 0.95, fill: SUBVENTION_COLORS.pie },
    { name: 'FAEP', universe: universe.faep, reported: universe.faep * 0.60, fill: SUBVENTION_COLORS.faep },
  ];

  const statusData = [
    { name: 'Abierto', value: filteredSchools.filter(s => s.status === 'Abierto').length },
    { name: 'Enviado', value: filteredSchools.filter(s => s.status === 'Enviado').length },
    { name: 'Observado', value: filteredSchools.filter(s => s.status === 'Observado').length },
    { name: 'Aprobado', value: filteredSchools.filter(s => s.status === 'Aprobado').length },
  ];

  const regionData = [
    { name: 'RM', submitted: 45, total: 60, projected: 55 },
    { name: 'Valpo', submitted: 20, total: 35, projected: 32 },
    { name: 'BioBio', submitted: 30, total: 40, projected: 38 },
    { name: 'Norte', submitted: 15, total: 25, projected: 22 },
    { name: 'Sur', submitted: 25, total: 30, projected: 29 },
  ];

  const generateAiReport = () => {
    setGeneratingReport(true);
    setTimeout(() => {
        setReport({
            generatedAt: new Date().toLocaleTimeString(),
            summary: "El cierre de Noviembre muestra un avance acelerado del 75%, impulsado por la Región Metropolitana. Se observa una baja ejecución en los fondos FAEP (60%) respecto al universo transferido, lo que podría generar saldos pendientes.",
            alerts: ["Baja ejecución FAEP en Macrozona Norte", "Incremento inusual en item 'Servicios' en región BioBío"],
            recommendation: "Enviar alerta preventiva a sostenedores con saldos FAEP superiores al 40%."
        });
        setGeneratingReport(false);
    }, 2000);
  };

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP', notation: 'compact' }).format(val);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-end mb-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Monitor Nacional en Línea</h2>
          <p className="text-gray-500 dark:text-gray-400">Consolidación de Rendiciones - Noviembre 2025</p>
        </div>
        <div className="flex gap-3">
             <button 
                onClick={generateAiReport}
                disabled={generatingReport}
                className="inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium bg-indigo-600 hover:bg-indigo-700 text-white transition-all shadow-md"
            >
                {generatingReport ? <Sparkles className="w-4 h-4 mr-2 animate-spin" /> : <Sparkles className="w-4 h-4 mr-2" />}
                {generatingReport ? 'Analizando...' : 'Generar Minuta Ejecutiva IA'}
            </button>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 dark:bg-green-900/40 text-green-800 dark:text-green-300">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
                En vivo
            </span>
        </div>
      </div>

      <FilterBar filters={filters} onFilterChange={setFilters} />

      {/* UNIVERSE OF DATA SECTION */}
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-slate-800 dark:to-slate-900 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-slate-700">
          <div className="flex items-center mb-6">
              <div className="p-2 bg-indigo-100 dark:bg-indigo-900/40 rounded-lg mr-3">
                  <Coins className="text-indigo-600 dark:text-indigo-400" size={24} />
              </div>
              <div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">Universo de Subvenciones: Origen de Fondos</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Distribución de recursos transferidos vs. montos rendidos por programa (M$)</p>
              </div>
              <div className="ml-auto text-right">
                  <p className="text-sm text-gray-500 dark:text-gray-400">Total Universo Transferido</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{formatCurrency(totalUniverseAmount)}</p>
              </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 h-64">
                   <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={subventionData} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                          <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={true} stroke="#475569" opacity={0.2} />
                          <XAxis type="number" stroke="#94a3b8" tickFormatter={(val) => `$${val/1000000}M`} />
                          <YAxis dataKey="name" type="category" stroke="#94a3b8" width={60} />
                          <Tooltip 
                              cursor={{fill: 'transparent'}}
                              contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff' }}
                              formatter={(value: number) => formatCurrency(value)}
                          />
                          <Legend wrapperStyle={{ color: '#94a3b8' }} />
                          <Bar dataKey="universe" name="Total Transferido (Universo)" fill="#6366f1" radius={[0, 4, 4, 0]} barSize={20} />
                          <Bar dataKey="reported" name="Rendido a la Fecha" fill="#10b981" radius={[0, 4, 4, 0]} barSize={20} />
                      </BarChart>
                   </ResponsiveContainer>
              </div>
              
              <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-gray-100 dark:border-slate-700 flex flex-col justify-center space-y-4">
                  <div className="flex justify-between items-center pb-2 border-b border-gray-100 dark:border-slate-700">
                      <span className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                          <span className="w-3 h-3 rounded-full bg-pink-500 mr-2"></span> SEP
                      </span>
                      <span className="font-semibold dark:text-white">{formatCurrency(universe.sep)}</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b border-gray-100 dark:border-slate-700">
                      <span className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                          <span className="w-3 h-3 rounded-full bg-violet-500 mr-2"></span> PIE
                      </span>
                      <span className="font-semibold dark:text-white">{formatCurrency(universe.pie)}</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b border-gray-100 dark:border-slate-700">
                      <span className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                          <span className="w-3 h-3 rounded-full bg-indigo-500 mr-2"></span> General
                      </span>
                      <span className="font-semibold dark:text-white">{formatCurrency(universe.general)}</span>
                  </div>
                  <div className="mt-2 pt-2 text-center">
                      <p className="text-xs text-indigo-600 dark:text-indigo-400 font-medium">
                          La ejecución global alcanza el {((totalReportedAmount / totalUniverseAmount) * 100).toFixed(1)}% del universo.
                      </p>
                  </div>
              </div>
          </div>
      </div>

      {/* AI Executive Report Panel */}
      {report && (
          <div className="bg-gradient-to-r from-indigo-50 to-white dark:from-indigo-900/20 dark:to-slate-800 border-l-4 border-indigo-500 p-6 rounded-r-xl shadow-md mb-6 animate-fade-in">
              <div className="flex items-start">
                  <div className="p-2 bg-indigo-100 dark:bg-indigo-900 rounded-full mr-4">
                      <FileText className="text-indigo-600 dark:text-indigo-300 w-6 h-6" />
                  </div>
                  <div className="flex-1">
                      <h3 className="font-bold text-indigo-900 dark:text-indigo-100 text-lg mb-2">Resumen Ejecutivo Generado por IA</h3>
                      <p className="text-gray-800 dark:text-gray-300 mb-3 leading-relaxed">{report.summary}</p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                          <div className="bg-white dark:bg-slate-700 p-3 rounded border border-indigo-100 dark:border-slate-600">
                              <h4 className="text-xs font-bold text-red-500 uppercase tracking-wider mb-2">Alertas Detectadas</h4>
                              <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-300 space-y-1">
                                  {report.alerts.map((alert, i) => <li key={i}>{alert}</li>)}
                              </ul>
                          </div>
                          <div className="bg-white dark:bg-slate-700 p-3 rounded border border-indigo-100 dark:border-slate-600">
                              <h4 className="text-xs font-bold text-blue-500 uppercase tracking-wider mb-2">Recomendación IA</h4>
                              <p className="text-sm text-gray-600 dark:text-gray-300 flex items-start">
                                  <ChevronRight size={16} className="text-blue-500 mr-1 mt-0.5" />
                                  {report.recommendation}
                              </p>
                          </div>
                      </div>
                      <p className="text-xs text-gray-400 mt-3 text-right">Generado a las {report.generatedAt} - (Factibilidad técnica futura)</p>
                  </div>
              </div>
          </div>
      )}

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700">
            <div className="flex justify-between items-start">
                <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Cierre Mes</p>
                    <h3 className="text-3xl font-bold text-gray-900 dark:text-white mt-2">{closureRate}%</h3>
                </div>
                <div className="p-2 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                    <TrendingUp className="text-blue-600 dark:text-blue-400" size={24} />
                </div>
            </div>
            <div className="mt-4 text-xs text-green-600 dark:text-green-400 flex items-center">
                <TrendingUp size={12} className="mr-1" /> +2.4% vs mes anterior
            </div>
        </div>

        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700">
            <div className="flex justify-between items-start">
                <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Deuda Presunta</p>
                    <h3 className="text-3xl font-bold text-gray-900 dark:text-white mt-2">$4.5B</h3>
                </div>
                <div className="p-2 bg-orange-50 dark:bg-orange-900/30 rounded-lg">
                    <AlertTriangle className="text-orange-600 dark:text-orange-400" size={24} />
                </div>
            </div>
            <div className="mt-4 text-xs text-gray-500 dark:text-gray-400">
               Detectada por cruce SIGFE
            </div>
        </div>

        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700">
            <div className="flex justify-between items-start">
                <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Rendiciones Enviadas</p>
                    <h3 className="text-3xl font-bold text-gray-900 dark:text-white mt-2">{submittedSchools}</h3>
                </div>
                <div className="p-2 bg-green-50 dark:bg-green-900/30 rounded-lg">
                    <CheckCircle className="text-green-600 dark:text-green-400" size={24} />
                </div>
            </div>
            <div className="mt-4 text-xs text-gray-500 dark:text-gray-400">
               De un total de {totalSchools} filtrados
            </div>
        </div>

        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700">
            <div className="flex justify-between items-start">
                <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Tiempo Promedio</p>
                    <h3 className="text-3xl font-bold text-gray-900 dark:text-white mt-2">1.2 Días</h3>
                </div>
                <div className="p-2 bg-purple-50 dark:bg-purple-900/30 rounded-lg">
                    <Clock className="text-purple-600 dark:text-purple-400" size={24} />
                </div>
            </div>
            <div className="mt-4 text-xs text-gray-500 dark:text-gray-400">
               Desde apertura a envío
            </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-6">Estado de Rendiciones (Filtrado)</h3>
            <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={statusData}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={80}
                            fill="#8884d8"
                            paddingAngle={5}
                            dataKey="value"
                        >
                            {statusData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff' }} />
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>

        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Avance y Proyección (IA)</h3>
                <span className="text-xs bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 px-2 py-1 rounded border border-indigo-200 dark:border-indigo-700">
                    <TrendingUp size={12} className="inline mr-1" />
                    Modelo Predictivo Activo
                </span>
            </div>
            <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={regionData}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#475569" opacity={0.3} />
                        <XAxis dataKey="name" stroke="#94a3b8" />
                        <YAxis stroke="#94a3b8" />
                        <Tooltip 
                            contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff' }}
                            formatter={(value, name) => [value, name === 'projected' ? 'Proyección IA' : name === 'submitted' ? 'Enviadas' : 'Total']}
                        />
                        <Legend wrapperStyle={{ color: '#94a3b8' }} />
                        <Bar dataKey="submitted" stackId="a" fill="#00C49F" name="Enviadas" radius={[0, 0, 0, 0]} />
                        <Bar dataKey="total" stackId="a" fill="#E5E7EB" name="Total Esperado" radius={[4, 4, 0, 0]} />
                        {/* Fake line to show projection */}
                    </BarChart>
                </ResponsiveContainer>
            </div>
            <div className="mt-2 text-center">
                 <p className="text-xs text-gray-500 dark:text-gray-400">
                    <span className="inline-block w-3 h-3 bg-indigo-500 rounded-full mr-1 opacity-20"></span>
                    La proyección considera comportamiento histórico de los últimos 5 años.
                 </p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default MineducView;
