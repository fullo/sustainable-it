/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Globe, Users, TrendingUp, RefreshCw, Leaf } from 'lucide-react';

// --- TRIPLE BOTTOM LINE DIAGRAM ---
export const TripleBottomLineDiagram: React.FC = () => {
  const [active, setActive] = useState<'planet' | 'people' | 'profit'>('planet');

  const data = {
    planet: {
        label: "PIANETA",
        desc: "Impatto Ambientale",
        kpis: ["Impronta Carbonica", "Efficienza Energetica (PUE)", "Riduzione Rifiuti Elettronici", "Uso dell'Acqua"],
        color: "bg-eco-main",
        icon: <Globe className="w-6 h-6 text-white" aria-hidden="true" />
    },
    people: {
        label: "PERSONE",
        desc: "Responsabilità Sociale",
        kpis: ["Inclusione Digitale", "Accessibilità (WCAG)", "Privacy ed Etica", "Lavoro nella Supply Chain"],
        color: "bg-blue-500",
        icon: <Users className="w-6 h-6 text-white" aria-hidden="true" />
    },
    profit: {
        label: "PROFITTO",
        desc: "Sostenibilità Economica",
        kpis: ["Riduzione TCO", "Mitigazione del Rischio", "Reputazione del Brand", "Efficienza Operativa"],
        color: "bg-eco-accent",
        icon: <TrendingUp className="w-6 h-6 text-white" aria-hidden="true" />
    }
  };

  return (
    <div className="flex flex-col items-center p-8 bg-white rounded-xl shadow-lg border border-stone-200 my-8 w-full max-w-2xl" role="region" aria-label="Diagramma interattivo Triple Bottom Line">
      <h3 className="font-serif text-2xl mb-2 text-stone-800">Il Triple Bottom Line</h3>
      <p className="text-sm text-stone-500 mb-8 text-center">
        La vera sostenibilità bilancia tre dimensioni. Clicca per esplorare le metriche.
      </p>
      
      <div className="flex flex-col md:flex-row gap-8 items-center justify-center w-full">
          {/* Visualizer - Intersecting Circles */}
          <div className="relative w-64 h-64" role="tablist" aria-label="Selettore dimensioni sostenibilità">
              <motion.button 
                role="tab"
                aria-selected={active === 'planet'}
                aria-controls="tbl-panel"
                onClick={() => setActive('planet')}
                className={`absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 rounded-full opacity-80 flex items-center justify-center transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-eco-main ${active === 'planet' ? 'bg-eco-main shadow-xl z-20 scale-110' : 'bg-eco-main/40 z-10'}`}
              >
                  <span className="text-white font-bold">PIANETA</span>
              </motion.button>
              <motion.button 
                role="tab"
                aria-selected={active === 'people'}
                aria-controls="tbl-panel"
                onClick={() => setActive('people')}
                className={`absolute bottom-0 left-0 w-32 h-32 rounded-full opacity-80 flex items-center justify-center transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 ${active === 'people' ? 'bg-blue-500 shadow-xl z-20 scale-110' : 'bg-blue-500/40 z-10'}`}
              >
                  <span className="text-white font-bold">PERSONE</span>
              </motion.button>
              <motion.button 
                role="tab"
                aria-selected={active === 'profit'}
                aria-controls="tbl-panel"
                onClick={() => setActive('profit')}
                className={`absolute bottom-0 right-0 w-32 h-32 rounded-full opacity-80 flex items-center justify-center transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-eco-accent ${active === 'profit' ? 'bg-eco-accent shadow-xl z-20 scale-110' : 'bg-eco-accent/40 z-10'}`}
              >
                  <span className="text-white font-bold">PROFITTO</span>
              </motion.button>
              
              {/* Center intersection */}
              <div className="absolute top-[35%] left-[35%] w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full z-30 flex items-center justify-center text-[10px] text-stone-800 font-bold pointer-events-none" aria-hidden="true">
                  SOSTENIBILE
              </div>
          </div>

          {/* Info Card */}
          <motion.div 
            id="tbl-panel"
            role="tabpanel"
            key={active}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex-1 bg-stone-50 p-6 rounded-lg border border-stone-200 min-h-[250px]"
          >
                <div className={`inline-flex p-3 rounded-full mb-4 ${data[active].color}`}>
                    {data[active].icon}
                </div>
                <h4 className="text-xl font-bold text-stone-800 mb-1">{data[active].label}</h4>
                <p className="text-sm text-stone-500 italic mb-4">{data[active].desc}</p>
                <ul className="space-y-2">
                    {data[active].kpis.map((kpi, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm text-stone-700 bg-white p-2 rounded border border-stone-100">
                            <div className={`w-2 h-2 rounded-full ${data[active].color}`} aria-hidden="true"></div>
                            {kpi}
                        </li>
                    ))}
                </ul>
          </motion.div>
      </div>
    </div>
  );
};

// --- SOFT FRAMEWORK DIAGRAM ---
export const SoftFrameworkDiagram: React.FC = () => {
  const [step, setStep] = useState(0);

  const phases = [
      { name: "STRATEGIA", desc: "Governance, OKR, Formazione" },
      { name: "IMPLEMENTAZIONE", desc: "Strumenti, Automazione, DevOps" },
      { name: "OPERAZIONI", desc: "Monitoraggio, Miglioramento" },
      { name: "CONFORMITÀ", desc: "Reporting, Audit, CSRD" }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
        setStep(s => (s + 1) % 4);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center p-8 bg-[#F5F4F0] rounded-xl border border-stone-200 my-8 w-full" aria-label="Diagramma del Framework SOFT">
      <h3 className="font-serif text-2xl mb-2 text-stone-900">Il Framework SOFT</h3>
      <p className="text-sm text-stone-600 mb-8 text-center">
        Un ciclo continuo per la trasformazione: Strategia, Operazioni, Finanza/Implementazione, Tecnologia/Conformità.
      </p>

      <div className="relative flex items-center justify-center w-full max-w-4xl gap-4 flex-wrap md:flex-nowrap" aria-live="polite">
        {phases.map((phase, idx) => (
            <div key={idx} className="flex flex-col items-center relative w-full md:w-1/4">
                <motion.div 
                    className={`w-full p-4 rounded-lg border-2 text-center transition-all duration-500 h-32 flex flex-col justify-center items-center relative z-10
                    ${step === idx ? 'border-eco-main bg-white shadow-lg scale-105' : 'border-stone-300 bg-stone-100 opacity-70'}`}
                >
                    <div className={`text-xs font-bold tracking-widest mb-2 ${step === idx ? 'text-eco-main' : 'text-stone-500'}`}>STEP {idx + 1}</div>
                    <h4 className="font-serif font-bold text-lg mb-1">{phase.name}</h4>
                    <p className="text-xs text-stone-500 leading-tight">{phase.desc}</p>
                </motion.div>
                
                {/* Connector Line */}
                {idx < 3 && (
                    <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-stone-300 z-0" aria-hidden="true"></div>
                )}
                
                {/* Mobile Connector */}
                {idx < 3 && (
                    <div className="md:hidden h-4 w-0.5 bg-stone-300 my-2" aria-hidden="true"></div>
                )}
            </div>
        ))}
      </div>
      
      <div className="mt-8 p-4 bg-white rounded-lg border border-stone-200 text-center max-w-lg">
          <div className="flex items-center justify-center gap-2 mb-2 text-eco-main font-bold">
              <RefreshCw size={18} className={step === 3 ? "animate-spin" : ""} aria-hidden="true" />
              <span>Ciclo di Miglioramento Continuo</span>
          </div>
          <p className="text-sm text-stone-500">
            La sostenibilità non è una destinazione, ma un ciclo. I risultati della conformità alimentano la strategia per l'iterazione successiva.
          </p>
      </div>
    </div>
  );
};

// --- CARBON COST CORRELATION CHART ---
export const CarbonCostDiagram: React.FC = () => {
    // Data simulation: As efficiency increases, both cost and carbon drop.
    // X-Axis: Time/Maturity
    // Y-Axis: Index (100 = Baseline)
    
    return (
        <div className="flex flex-col md:flex-row gap-8 items-center p-8 bg-stone-900 text-stone-100 rounded-xl my-8 border border-stone-800 shadow-lg w-full">
            <div className="flex-1 min-w-[240px]">
                <div className="inline-block px-2 py-1 bg-eco-main text-white text-xs font-bold rounded mb-2">IL PARADOSSO DELLA CRESCITA</div>
                <h3 className="font-serif text-2xl mb-2 text-white">Sostenibilità = Profittabilità</h3>
                <p className="text-stone-400 text-sm mb-6 leading-relaxed">
                    La scelta "Green" è spesso la scelta "Lean". Ottimizzare per il carbonio significa solitamente ottimizzare le risorse di calcolo, riducendo direttamente le bollette cloud e il TCO hardware.
                </p>
                
                <div className="space-y-4">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-eco-main/20 flex items-center justify-center text-eco-main" aria-hidden="true">
                            <Leaf size={16} />
                        </div>
                        <div>
                            <div className="text-sm font-bold text-white">-30% Emissioni</div>
                            <div className="text-xs text-stone-500">Utilizzo Cloud Ottimizzato</div>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-eco-accent/20 flex items-center justify-center text-eco-accent" aria-hidden="true">
                            <TrendingUp size={16} />
                        </div>
                        <div>
                            <div className="text-sm font-bold text-white">-25% Budget IT</div>
                            <div className="text-xs text-stone-500">Risparmi sui Costi Diretti</div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="relative w-full max-w-md h-64 bg-stone-800/50 rounded-xl border border-stone-700/50 p-6" role="img" aria-label="Grafico che mostra la correlazione tra riduzione del carbonio e riduzione dei costi nel tempo">
                {/* Chart Lines */}
                <div className="absolute left-6 right-6 top-6 bottom-6">
                    {/* Grid */}
                    <div className="w-full h-full border-l border-b border-stone-600 relative">
                        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-stone-700/50 -translate-y-12"></div>
                        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-stone-700/50 -translate-y-24"></div>
                        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-stone-700/50 -translate-y-36"></div>
                    </div>

                    {/* Lines */}
                    <svg className="absolute inset-0 w-full h-full overflow-visible">
                        <title>Grafico costi vs emissioni</title>
                        <desc>Due linee discendenti che mostrano come la riduzione delle emissioni (verde) sia correlata alla riduzione dei costi (oro).</desc>
                        {/* Carbon Line (Green) */}
                        <motion.path 
                            d="M0,20 C50,20 100,50 150,90 C200,130 250,140 320,160" 
                            fill="none" 
                            stroke="#059669" 
                            strokeWidth="3"
                            initial={{ pathLength: 0 }}
                            whileInView={{ pathLength: 1 }}
                            transition={{ duration: 2 }}
                        />
                        {/* Cost Line (Gold) */}
                        <motion.path 
                            d="M0,30 C50,30 100,60 150,100 C200,140 250,150 320,170" 
                            fill="none" 
                            stroke="#D97706" 
                            strokeWidth="3"
                            strokeDasharray="5,5"
                            initial={{ pathLength: 0 }}
                            whileInView={{ pathLength: 1 }}
                            transition={{ duration: 2, delay: 0.5 }}
                        />
                    </svg>
                    
                    {/* Labels */}
                    <div className="absolute top-0 left-0 text-xs text-stone-500">Baseline</div>
                    <div className="absolute bottom-0 right-0 text-xs text-stone-500">Ottimizzato</div>
                    
                    {/* Floating Badge */}
                    <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 2 }}
                        className="absolute bottom-4 right-8 bg-stone-900 border border-stone-600 p-2 rounded text-xs"
                    >
                        <div className="flex items-center gap-2 text-eco-main"><div className="w-2 h-2 bg-eco-main rounded-full"></div> Carbonio</div>
                        <div className="flex items-center gap-2 text-eco-accent"><div className="w-2 h-2 bg-eco-accent rounded-full"></div> Costo</div>
                    </motion.div>
                </div>
            </div>
        </div>
    )
}