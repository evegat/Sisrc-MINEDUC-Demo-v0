
import React, { useState, useEffect, useRef } from 'react';
import { SchoolData, ExpenseItem, AiChatMessage } from '../types';
import { CheckCircle2, Bot, Send, FileText, UploadCloud, RefreshCw, Sparkles, TrendingUp, Wand2, Info } from 'lucide-react';

interface SostenedorViewProps {
  data: SchoolData;
  onUpdate: (data: SchoolData) => void;
}

const SostenedorView: React.FC<SostenedorViewProps> = ({ data, onUpdate }) => {
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<AiChatMessage[]>([
    { role: 'assistant', content: 'Hola. Soy tu Asesor Virtual SISRC. ¿Tienes dudas sobre la imputación de gastos SEP o PIE?' }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [justifyingId, setJustifyingId] = useState<string | null>(null);
  const [showUniverseDetail, setShowUniverseDetail] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [chatMessages]);

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;
    
    const newMessages = [...chatMessages, { role: 'user', content: inputMessage } as AiChatMessage];
    setChatMessages(newMessages);
    setInputMessage('');

    // Simulated AI Response
    setTimeout(() => {
      let response = "Puedo ayudarte a revisar la normativa vigente.";
      if (inputMessage.toLowerCase().includes('transporte') || inputMessage.toLowerCase().includes('bus')) {
        response = "Según la circular 30, los gastos de transporte deben estar asociados directamente a actividades pedagógicas. (Respuesta generada por IA - Depende de factibilidad técnica futura)";
      } else if (inputMessage.toLowerCase().includes('sueldo') || inputMessage.toLowerCase().includes('honorario')) {
        response = "Los gastos en personal han sido precargados desde la Dirección del Trabajo (LRE). Si detectas inconsistencias, debes rectificar primero en el portal de la DT.";
      }
      setChatMessages([...newMessages, { role: 'assistant', content: response }]);
    }, 1000);
  };

  const handleAiJustification = (expenseId: string) => {
    setJustifyingId(expenseId);
    setTimeout(() => {
      const updatedExpenses = data.expenses.map(e => {
        if (e.id === expenseId) {
          return { 
            ...e, 
            justification: `Gasto imputado al item ${e.category} conforme al PME 2025. Cumple con requisitos de pertinencia educativa según Circular 30. (Texto generado automáticamente por IA)`
          };
        }
        return e;
      });
      onUpdate({ ...data, expenses: updatedExpenses });
      setJustifyingId(null);
    }, 1500);
  };

  const submitRendicion = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      onUpdate({
        ...data,
        status: 'Enviado',
        progress: 100,
        lastUpdate: 'Hace un momento'
      });
      setIsSubmitting(false);
    }, 1500);
  };

  const totalAmount = data.expenses.reduce((sum, item) => sum + item.amount, 0);
  const percentUsed = (totalAmount / data.totalGrant) * 100;
  const projectedAmount = totalAmount * 1.15; // Simulated projection
  const projectedPercent = (projectedAmount / data.totalGrant) * 100;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
        <div className="relative z-10">
          <h2 className="text-2xl font-bold mb-2">Rendición Noviembre 2025: ABIERTO</h2>
          <p className="opacity-90 max-w-2xl">
            Bienvenido, {data.name}. Hemos detectado y precargado el 92% de tus movimientos 
            gracias a la integración con SII y DT.
          </p>
        </div>
        <div className="absolute right-0 top-0 h-full w-1/3 bg-white/10 skew-x-12 transform translate-x-10"></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Form Area */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Predictive Insight Card */}
          <div className="bg-gradient-to-br from-indigo-50 to-white dark:from-slate-800 dark:to-slate-900 rounded-xl shadow-sm border border-indigo-100 dark:border-slate-700 p-4 relative overflow-hidden">
             <div className="absolute top-0 right-0 p-2 opacity-10">
               <Sparkles size={64} className="text-indigo-600 dark:text-indigo-400" />
             </div>
             <h3 className="text-indigo-900 dark:text-indigo-200 font-semibold flex items-center mb-2">
               <TrendingUp size={18} className="mr-2 text-indigo-600 dark:text-indigo-400" />
               Análisis Predictivo de Gastos
             </h3>
             <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
               Basado en tu comportamiento histórico, la IA proyecta un <span className="font-bold text-green-600 dark:text-green-400">cierre exitoso</span>.
               Se estima un uso del 98% del presupuesto.
             </p>
             <div className="w-full bg-gray-200 dark:bg-slate-700 rounded-full h-3 relative">
               <div className="bg-green-500 h-3 rounded-full absolute top-0 left-0 z-10" style={{ width: `${percentUsed}%` }}></div>
               <div className="bg-green-200 dark:bg-green-800 h-3 rounded-full absolute top-0 left-0 pattern-diagonal-lines opacity-50" style={{ width: `${projectedPercent}%` }}></div>
             </div>
             <div className="flex justify-between text-xs mt-1 text-gray-500 dark:text-gray-400">
               <span>Actual: {percentUsed.toFixed(0)}%</span>
               <span className="text-indigo-600 dark:text-indigo-400 font-medium">Proyectado IA: {projectedPercent.toFixed(0)}%</span>
             </div>
          </div>

          {/* Inputs Strategy Card */}
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 dark:border-slate-700 flex justify-between items-center bg-gray-50 dark:bg-slate-900">
              <h3 className="font-semibold text-gray-800 dark:text-white flex items-center">
                <RefreshCw className="w-4 h-4 mr-2 text-blue-500" />
                Movimientos (Pre-Carga Inteligente)
              </h3>
              <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">
                Sincronizado
              </span>
            </div>
            
            <div className="divide-y divide-gray-100 dark:divide-slate-700">
              {data.expenses.map((expense) => (
                <div key={expense.id} className="p-4 hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors">
                  <div className="flex items-start justify-between group">
                    <div className="flex items-start gap-4">
                      <div className={`p-2 rounded-lg mt-1 ${
                        expense.source === 'Manual' ? 'bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400' : 
                        expense.source === 'SII (DTE)' ? 'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400' : 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400'
                      }`}>
                        {expense.source === 'Manual' ? <FileText size={20} /> : <UploadCloud size={20} />}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">{expense.category}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{expense.description}</p>
                        
                        {/* AI Justification Section */}
                        {expense.justification ? (
                           <div className="mt-2 p-2 bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800 rounded-md">
                             <p className="text-xs text-indigo-800 dark:text-indigo-300 italic flex items-start">
                               <Sparkles size={10} className="mr-1 mt-0.5 flex-shrink-0" />
                               {expense.justification}
                             </p>
                           </div>
                        ) : (
                          <button 
                            onClick={() => handleAiJustification(expense.id)}
                            disabled={justifyingId === expense.id}
                            className="mt-2 text-xs text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 flex items-center transition-colors font-medium"
                          >
                            {justifyingId === expense.id ? (
                               <><RefreshCw size={12} className="mr-1 animate-spin" /> Generando justificación...</>
                            ) : (
                               <><Wand2 size={12} className="mr-1" /> Autocompletar con IA</>
                            )}
                          </button>
                        )}

                        <div className="flex items-center mt-2">
                          <span className="text-xs bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-gray-300 px-2 py-0.5 rounded mr-2">
                            Fuente: {expense.source}
                          </span>
                          {expense.status === 'Validated' && (
                            <span className="flex items-center text-xs text-green-600 dark:text-green-400">
                              <CheckCircle2 size={12} className="mr-1" /> Validado
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-gray-900 dark:text-white">${expense.amount.toLocaleString('es-CL')}</p>
                      <button className="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-800 opacity-0 group-hover:opacity-100 transition-opacity mt-1">
                        Editar
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-4 bg-gray-50 dark:bg-slate-900 border-t border-gray-100 dark:border-slate-700 text-center">
              <button className="text-sm text-gray-600 dark:text-gray-400 font-medium hover:text-gray-900 dark:hover:text-white flex items-center justify-center mx-auto">
                + Agregar Gasto Manual (Legacy)
              </button>
            </div>
          </div>

        </div>

        {/* Sidebar Summary & AI */}
        <div className="space-y-6">
          {/* Summary Card */}
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700 p-6 relative">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Resumen Financiero</h3>
            <div className="space-y-4">
              <div className="relative">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-500 dark:text-gray-400 flex items-center gap-1 cursor-pointer hover:text-blue-500" onClick={() => setShowUniverseDetail(!showUniverseDetail)}>
                    Total Subvención <Info size={14} />
                  </span>
                  <span className="font-medium dark:text-gray-200">${data.totalGrant.toLocaleString('es-CL')}</span>
                </div>
                
                {/* Universe Detail Popup */}
                {showUniverseDetail && (
                   <div className="absolute left-0 top-full mt-2 w-full bg-white dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-lg shadow-xl z-20 p-3 text-xs animate-fade-in-up">
                      <p className="font-bold text-gray-700 dark:text-gray-200 mb-2 border-b dark:border-slate-600 pb-1">Composición de Recursos</p>
                      <div className="space-y-1">
                          <div className="flex justify-between">
                              <span className="text-indigo-600 dark:text-indigo-300">General:</span>
                              <span className="dark:text-gray-300">${data.subventions?.general.toLocaleString('es-CL')}</span>
                          </div>
                          <div className="flex justify-between">
                              <span className="text-pink-600 dark:text-pink-300">SEP:</span>
                              <span className="dark:text-gray-300">${data.subventions?.sep.toLocaleString('es-CL')}</span>
                          </div>
                          <div className="flex justify-between">
                              <span className="text-violet-600 dark:text-violet-300">PIE:</span>
                              <span className="dark:text-gray-300">${data.subventions?.pie.toLocaleString('es-CL')}</span>
                          </div>
                          <div className="flex justify-between">
                              <span className="text-emerald-600 dark:text-emerald-300">FAEP:</span>
                              <span className="dark:text-gray-300">${data.subventions?.faep.toLocaleString('es-CL')}</span>
                          </div>
                      </div>
                   </div>
                )}

                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-500 dark:text-gray-400">Total Rendido</span>
                  <span className="font-bold text-gray-900 dark:text-white">${totalAmount.toLocaleString('es-CL')}</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-slate-700 rounded-full h-2.5 mt-2">
                  <div 
                    className={`h-2.5 rounded-full ${percentUsed > 100 ? 'bg-red-500' : 'bg-blue-600'}`} 
                    style={{ width: `${Math.min(percentUsed, 100)}%` }}
                  ></div>
                </div>
                <p className="text-xs text-right mt-1 text-gray-500 dark:text-gray-400">{percentUsed.toFixed(1)}% Ejecutado</p>
              </div>

              {data.status !== 'Enviado' ? (
                <button 
                  onClick={submitRendicion}
                  disabled={isSubmitting}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-4 rounded-lg transition-colors flex items-center justify-center shadow-lg"
                >
                  {isSubmitting ? (
                    <RefreshCw className="animate-spin w-5 h-5 mr-2" />
                  ) : (
                    <Send className="w-4 h-4 mr-2" />
                  )}
                  {isSubmitting ? 'Procesando...' : 'Enviar Rendición'}
                </button>
              ) : (
                <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-3 text-center">
                  <p className="text-green-700 dark:text-green-300 font-medium flex items-center justify-center">
                    <CheckCircle2 className="w-5 h-5 mr-2" />
                    Rendición Enviada Exitosamente
                  </p>
                  <p className="text-xs text-green-600 dark:text-green-400 mt-1">Folio: #2025-NOV-8832</p>
                </div>
              )}
            </div>
          </div>

          {/* AI Advisor Widget */}
          <div className={`bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-indigo-100 dark:border-slate-700 flex flex-col transition-all duration-300 ${chatOpen ? 'h-96' : 'h-auto'}`}>
            <div 
              className="p-4 bg-indigo-600 dark:bg-indigo-700 rounded-t-xl flex justify-between items-center cursor-pointer"
              onClick={() => setChatOpen(!chatOpen)}
            >
              <div className="flex items-center text-white">
                <Bot className="w-5 h-5 mr-2" />
                <span className="font-medium">Asesor Virtual SISRC</span>
              </div>
              <span className="text-indigo-200 text-xs bg-indigo-800 dark:bg-indigo-900 px-2 py-1 rounded">IA Beta</span>
            </div>
            
            {chatOpen && (
              <>
                <div className="flex-1 p-4 overflow-y-auto bg-gray-50 dark:bg-slate-900 space-y-3">
                  {chatMessages.map((msg, idx) => (
                    <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[85%] rounded-lg p-3 text-sm ${
                        msg.role === 'user' 
                          ? 'bg-indigo-600 text-white rounded-tr-none' 
                          : 'bg-white dark:bg-slate-700 border border-gray-200 dark:border-slate-600 text-gray-800 dark:text-gray-200 rounded-tl-none shadow-sm'
                      }`}>
                        {msg.content}
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
                <div className="p-3 border-t border-gray-100 dark:border-slate-700 bg-white dark:bg-slate-800 rounded-b-xl">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      placeholder="Pregunta sobre la Circular 30..."
                      className="flex-1 text-sm border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-gray-800 dark:text-white"
                    />
                    <button 
                      onClick={handleSendMessage}
                      className="bg-indigo-600 dark:bg-indigo-700 text-white p-2 rounded-md hover:bg-indigo-700"
                    >
                      <Send size={16} />
                    </button>
                  </div>
                </div>
              </>
            )}
            {!chatOpen && (
               <div className="p-4 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-800 dark:text-indigo-300 text-sm cursor-pointer hover:bg-indigo-100 dark:hover:bg-indigo-900/40 transition-colors" onClick={() => setChatOpen(true)}>
                 <div className="flex items-start">
                    <Sparkles className="w-4 h-4 mr-2 text-indigo-500 mt-0.5 flex-shrink-0" />
                    <p>"¿Tu ejecución SEP está baja (40%). Revisa facturas pendientes."</p>
                 </div>
                 <p className="text-xs text-indigo-400 mt-2 font-medium text-right">Click para expandir el asistente</p>
               </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SostenedorView;
