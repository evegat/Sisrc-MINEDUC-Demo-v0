import React from 'react';
import { Database, Server, Globe, ArrowRight, Activity, Users, FileText, Lock, Cloud, Cpu, ArrowDown, ShieldAlert } from 'lucide-react';

const DataFlowView: React.FC = () => {
  return (
    <div className="space-y-8 animate-fade-in p-4">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Arquitectura Funcional & Flujo de Datos</h2>
        <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
          Visualización del ecosistema SISRC: Integración de fuentes externas, procesamiento en el Núcleo y distribución a los distintos actores.
        </p>
      </div>

      <div className="relative bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-xl border border-gray-200 dark:border-slate-700 overflow-hidden">
        
        {/* Background Grid */}
        <div className="absolute inset-0 bg-grid-slate-100 dark:bg-grid-slate-900/[0.04] bg-[bottom_1px_center] [mask-image:linear-gradient(to_bottom,transparent,black)] pointer-events-none"></div>

        <div className="relative flex flex-col lg:flex-row items-stretch justify-between gap-8 z-10">
          
          {/* COLUMN 1: INPUTS */}
          <div className="flex-1 space-y-4">
            <h3 className="text-sm font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider text-center mb-6">Fuentes de Datos (Inputs)</h3>
            
            <div className="group relative bg-blue-50 dark:bg-slate-700 border-l-4 border-blue-500 p-4 rounded-r-lg shadow-sm hover:shadow-md transition-all">
              <div className="absolute right-[-20px] top-1/2 -mt-1 hidden lg:block">
                 <ArrowRight className="text-blue-300 animate-pulse" />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-blue-900 dark:text-blue-100">DT (LRE) + Previred</h4>
                  <p className="text-xs text-blue-600 dark:text-blue-300">Gastos en Personal</p>
                </div>
                <Users className="text-blue-400" />
              </div>
            </div>

            <div className="group relative bg-purple-50 dark:bg-slate-700 border-l-4 border-purple-500 p-4 rounded-r-lg shadow-sm hover:shadow-md transition-all">
              <div className="absolute right-[-20px] top-1/2 -mt-1 hidden lg:block">
                 <ArrowRight className="text-purple-300 animate-pulse" />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-purple-900 dark:text-purple-100">SII (DTE)</h4>
                  <p className="text-xs text-purple-600 dark:text-purple-300">Facturas y Boletas</p>
                </div>
                <FileText className="text-purple-400" />
              </div>
            </div>

            <div className="group relative bg-orange-50 dark:bg-slate-700 border-l-4 border-orange-500 p-4 rounded-r-lg shadow-sm hover:shadow-md transition-all">
              <div className="absolute right-[-20px] top-1/2 -mt-1 hidden lg:block">
                 <ArrowRight className="text-orange-300 animate-pulse" />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-orange-900 dark:text-orange-100">Legacy SIE</h4>
                  <p className="text-xs text-orange-600 dark:text-orange-300">Datos Históricos</p>
                </div>
                <Database className="text-orange-400" />
              </div>
            </div>
          </div>

          {/* COLUMN 2: CORE (SISRC) */}
          <div className="flex-1 flex flex-col justify-center relative">
            {/* Connecting Lines for Large Screen */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none hidden lg:block overflow-visible" style={{zIndex: -1}}>
              <path className="flow-line stroke-gray-300 dark:stroke-slate-600" fill="none" strokeWidth="2" d="M -10 60 C 50 60, 50 150, 100 150" />
              <path className="flow-line stroke-gray-300 dark:stroke-slate-600" fill="none" strokeWidth="2" d="M -10 160 C 50 160, 50 160, 100 160" />
              <path className="flow-line stroke-gray-300 dark:stroke-slate-600" fill="none" strokeWidth="2" d="M -10 260 C 50 260, 50 170, 100 170" />
            </svg>

            <div className="bg-gradient-to-br from-indigo-600 to-blue-700 rounded-2xl p-6 text-white shadow-2xl relative overflow-hidden transform hover:scale-105 transition-transform duration-500">
               <div className="absolute inset-0 bg-white/5 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20"></div>
               <div className="relative z-10 text-center space-y-4">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto backdrop-blur-sm">
                    <Cpu size={32} className="animate-spin-slow" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">NÚCLEO SISRC</h3>
                    <p className="text-indigo-200 text-sm">Motor de Consolidación</p>
                  </div>
                  <div className="bg-white/10 rounded-lg p-3 text-xs text-left space-y-2">
                    <div className="flex items-center gap-2">
                      <Activity size={12} className="text-green-300" />
                      <span>Cruce Masivo (Transf. vs Gasto)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Lock size={12} className="text-yellow-300" />
                      <span>Validación Normativa (Circular 30)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Cloud size={12} className="text-blue-300" />
                      <span>Microservicios Docker/K8s</span>
                    </div>
                  </div>
               </div>
            </div>

             {/* Outgoing Lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none hidden lg:block overflow-visible" style={{zIndex: -1}}>
              <path className="flow-line stroke-indigo-300 dark:stroke-indigo-700" fill="none" strokeWidth="2" d="M 330 150 C 380 150, 380 60, 420 60" />
              <path className="flow-line stroke-indigo-300 dark:stroke-indigo-700" fill="none" strokeWidth="2" d="M 330 160 C 380 160, 380 160, 420 160" />
              <path className="flow-line stroke-indigo-300 dark:stroke-indigo-700" fill="none" strokeWidth="2" d="M 330 170 C 380 170, 380 260, 420 260" />
            </svg>
          </div>

          {/* COLUMN 3: OUTPUTS (ROLES) */}
          <div className="flex-1 space-y-4">
            <h3 className="text-sm font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider text-center mb-6">Plataforma Integral (Vistas)</h3>

            <div className="bg-white dark:bg-slate-700 p-4 rounded-xl border border-gray-200 dark:border-slate-600 shadow-sm flex items-center gap-4">
              <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
                <Globe className="text-green-600 dark:text-green-400" />
              </div>
              <div>
                <h4 className="font-bold text-gray-800 dark:text-white">Front Sostenedor</h4>
                <p className="text-xs text-gray-500 dark:text-gray-400">Validación Pre-Carga, Asesor Virtual</p>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-700 p-4 rounded-xl border border-gray-200 dark:border-slate-600 shadow-sm flex items-center gap-4">
              <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <Server className="text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h4 className="font-bold text-gray-800 dark:text-white">Admin MINEDUC</h4>
                <p className="text-xs text-gray-500 dark:text-gray-400">Gestión Regional, Monitor Cierre</p>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-700 p-4 rounded-xl border border-gray-200 dark:border-slate-600 shadow-sm flex items-center gap-4">
              <div className="p-3 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
                <ShieldAlert className="text-orange-600 dark:text-orange-400" />
              </div>
              <div>
                <h4 className="font-bold text-gray-800 dark:text-white">Fiscalización (SIE)</h4>
                <p className="text-xs text-gray-500 dark:text-gray-400">Fiscalización Digital (Bots), Matrices Riesgo</p>
              </div>
            </div>

          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-100 dark:border-slate-700 grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">99.9%</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">SLA Disponibilidad</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">ISO 27001</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Estándar Seguridad</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">0% Papel</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Transformación Digital</p>
            </div>
        </div>

      </div>
    </div>
  );
};

export default DataFlowView;