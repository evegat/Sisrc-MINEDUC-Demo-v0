import React, { useState } from 'react';
import { SchoolData, FilterState } from '../types';
import FilterBar from './FilterBar';
import { ShieldAlert, Search, Eye, AlertOctagon, Cpu, FileCheck, BrainCircuit, X, Bot, User } from 'lucide-react';

interface SieViewProps {
  schools: SchoolData[];
}

const SieView: React.FC<SieViewProps> = ({ schools }) => {
  const [analyzing, setAnalyzing] = useState(false);
  const [aiResult, setAiResult] = useState<string | null>(null);
  const [selectedCase, setSelectedCase] = useState<SchoolData | null>(null);
  const [filters, setFilters] = useState<FilterState>({
    region: 'Todas',
    rutSostenedor: '',
    dependence: ''
  });

  // Filter Logic
  const filteredSchools = schools.filter(s => {
    const matchesRegion = filters.region === 'Todas' || s.region === filters.region;
    const matchesRut = filters.rutSostenedor === '' || 
                       s.rbd.includes(filters.rutSostenedor) || 
                       s.name.toLowerCase().includes(filters.rutSostenedor.toLowerCase());
    const matchesDep = filters.dependence === '' || s.dependence === filters.dependence;
    return matchesRegion && matchesRut && matchesDep;
  });

  // Sort by Risk Score
  const riskySchools = filteredSchools.filter(s => s.riskScore > 10).sort((a, b) => b.riskScore - a.riskScore);

  const runAiAudit = () => {
    setAnalyzing(true);
    setAiResult(null);
    setTimeout(() => {
        setAnalyzing(false);
        setAiResult("Se detectó una anomalía en Colegio Santa María: Aumento del 40% en gastos de RRHH sin correlación con aumento de matrícula. Posible inconsistencia normativa Circular 30. (IA Model detected)");
    }, 2000);
  };

  const openSmartDossier = (school: SchoolData) => {
      setSelectedCase(school);
  };

  return (
    <div className="space-y-6 animate-fade-in relative">
      {/* Header with Action */}
      <div className="bg-slate-800 dark:bg-black rounded-xl p-6 text-white shadow-lg flex flex-col md:flex-row justify-between items-center relative overflow-hidden">
        <div className="relative z-10">
            <h2 className="text-2xl font-bold flex items-center gap-2">
                <ShieldAlert className="text-orange-500" />
                Fiscalización Digital Integrada
            </h2>
            <p className="text-slate-400 mt-1">Matriz de Riesgo + Alertas Complejas (Bots & Humanos)</p>
        </div>
        <div className="flex gap-3 relative z-10 mt-4 md:mt-0">
            <div className="text-right mr-4 hidden md:block">
                <div className="text-xs text-slate-400 uppercase tracking-wider font-bold">Capacidad Operativa</div>
                <div className="flex items-center justify-end gap-2 text-sm">
                    <span className="flex items-center text-green-400"><Bot size={14} className="mr-1"/> 12 Bots Activos</span>
                    <span className="flex items-center text-blue-400"><User size={14} className="mr-1"/> 5 Auditores</span>
                </div>
            </div>
            <button 
                onClick={runAiAudit}
                disabled={analyzing}
                className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg font-medium flex items-center transition-all shadow-lg hover:shadow-orange-500/20"
            >
                {analyzing ? (
                    <>
                        <Cpu className="animate-spin mr-2" /> Analizando Patrones...
                    </>
                ) : (
                    <>
                        <Cpu className="mr-2" /> Ejecutar Barrido Nacional
                    </>
                )}
            </button>
        </div>
        {/* Abstract tech background */}
        <div className="absolute right-0 top-0 h-full w-1/2 bg-gradient-to-l from-orange-900/20 to-transparent pointer-events-none"></div>
      </div>

      <FilterBar filters={filters} onFilterChange={setFilters} />

      {/* AI Result Alert */}
      {aiResult && (
          <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 p-4 rounded-r-lg shadow-sm animate-pulse">
              <div className="flex">
                  <div className="flex-shrink-0">
                      <AlertOctagon className="h-5 w-5 text-red-500" aria-hidden="true" />
                  </div>
                  <div className="ml-3">
                      <p className="text-sm text-red-700 dark:text-red-300 font-bold">Nueva Alerta Crítica Detectada</p>
                      <p className="text-sm text-red-600 dark:text-red-400 mt-1">{aiResult}</p>
                  </div>
              </div>
          </div>
      )}

      {/* Data Table */}
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700 overflow-hidden">
        <div className="p-4 border-b border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-900 flex flex-col md:flex-row gap-4 justify-between items-center">
            <div className="flex items-center gap-2 text-sm text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30 px-3 py-1 rounded-full border border-indigo-100 dark:border-indigo-800 w-full md:w-auto">
                <BrainCircuit size={14} />
                <span className="font-medium">Lista priorizada por IA según tu historial de fiscalización (RRHH focus)</span>
            </div>
        </div>

        <table className="min-w-full divide-y divide-gray-200 dark:divide-slate-700">
            <thead className="bg-gray-50 dark:bg-slate-900">
                <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Establecimiento</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">RBD</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Estado</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Tipo Revisión</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Score Riesgo</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Acción</th>
                </tr>
            </thead>
            <tbody className="bg-white dark:bg-slate-800 divide-y divide-gray-200 dark:divide-slate-700">
                {riskySchools.map((school) => (
                    <tr key={school.id} className="hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900 dark:text-white">{school.name}</div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">{school.region} • {school.dependence}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{school.rbd}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                ${school.status === 'Enviado' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : 
                                  school.status === 'Abierto' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'}`}>
                                {school.status}
                            </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                            {school.riskScore > 70 ? (
                                <span className="flex items-center text-xs text-purple-600 dark:text-purple-400 font-medium bg-purple-50 dark:bg-purple-900/20 px-2 py-1 rounded w-fit">
                                    <Bot size={12} className="mr-1" /> Automática (Bot)
                                </span>
                            ) : (
                                <span className="flex items-center text-xs text-gray-600 dark:text-gray-400 font-medium bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded w-fit">
                                    <User size={12} className="mr-1" /> Manual
                                </span>
                            )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                                <div className="flex-1 w-24 bg-gray-200 dark:bg-slate-600 rounded-full h-2 mr-2">
                                    <div 
                                        className={`h-2 rounded-full ${
                                            school.riskScore > 80 ? 'bg-red-600' : 
                                            school.riskScore > 50 ? 'bg-orange-500' : 'bg-green-500'
                                        }`} 
                                        style={{ width: `${school.riskScore}%` }}
                                    ></div>
                                </div>
                                <span className="text-sm text-gray-600 dark:text-gray-300 font-medium">{school.riskScore}</span>
                            </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button 
                                onClick={() => openSmartDossier(school)}
                                className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-900 dark:hover:text-indigo-300 flex items-center justify-end w-full"
                            >
                                <BrainCircuit className="w-4 h-4 mr-1" /> Dossier IA
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
      </div>

      {/* Smart Dossier Modal */}
      {selectedCase && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-fade-in-up border border-gray-200 dark:border-slate-700">
                <div className="p-6 border-b border-gray-100 dark:border-slate-700 flex justify-between items-center bg-gray-50 dark:bg-slate-900 rounded-t-2xl">
                    <div className="flex items-center gap-3">
                         <div className="bg-red-100 dark:bg-red-900/30 p-2 rounded-full">
                             <ShieldAlert className="text-red-600 dark:text-red-400" size={24} />
                         </div>
                         <div>
                             <h3 className="text-lg font-bold text-gray-900 dark:text-white">Dossier Inteligente: {selectedCase.name}</h3>
                             <p className="text-xs text-gray-500 dark:text-gray-400">Generado automáticamente por Motor SISRC</p>
                         </div>
                    </div>
                    <button onClick={() => setSelectedCase(null)} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
                        <X size={24} />
                    </button>
                </div>
                
                <div className="p-6 space-y-6">
                    <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg p-4">
                        <h4 className="font-bold text-orange-800 dark:text-orange-300 text-sm mb-2 flex items-center">
                            <AlertOctagon size={16} className="mr-2" /> Hipótesis de Riesgo (IA)
                        </h4>
                        <p className="text-sm text-orange-800 dark:text-orange-200 opacity-90">
                            El establecimiento presenta una desviación del 35% en gastos de remuneraciones respecto al año anterior, sin que exista un incremento proporcional en la dotación docente registrada en SIGE. Se sugiere auditar contratos nuevos.
                        </p>
                    </div>

                    <div className="space-y-3">
                        <h4 className="font-semibold text-gray-900 dark:text-white text-sm border-b dark:border-slate-700 pb-2">Evidencia Sugerida para Fiscalización</h4>
                        <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-slate-700/50 rounded border border-gray-200 dark:border-slate-600">
                            <div className="flex items-center">
                                <FileCheck className="text-gray-400 dark:text-gray-500 mr-3" size={18} />
                                <span className="text-sm text-gray-700 dark:text-gray-200">Libro de Remuneraciones Octubre 2025</span>
                            </div>
                            <span className="text-xs bg-gray-200 dark:bg-slate-600 text-gray-600 dark:text-gray-300 px-2 py-1 rounded">No Revisado</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-slate-700/50 rounded border border-gray-200 dark:border-slate-600">
                            <div className="flex items-center">
                                <FileCheck className="text-gray-400 dark:text-gray-500 mr-3" size={18} />
                                <span className="text-sm text-gray-700 dark:text-gray-200">Contratos de Trabajo (Muestreo 10%)</span>
                            </div>
                            <span className="text-xs bg-gray-200 dark:bg-slate-600 text-gray-600 dark:text-gray-300 px-2 py-1 rounded">No Revisado</span>
                        </div>
                    </div>

                    <div className="flex justify-end gap-3 pt-4 border-t border-gray-100 dark:border-slate-700">
                         <button onClick={() => setSelectedCase(null)} className="px-4 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200">
                             Cerrar
                         </button>
                         <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm hover:bg-indigo-700 shadow-md">
                             Iniciar Fiscalización Digital
                         </button>
                    </div>
                </div>
            </div>
        </div>
      )}

    </div>
  );
};

export default SieView;