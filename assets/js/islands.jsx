
import React, { useState, useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Environment, Icosahedron, Stars } from '@react-three/drei';
import { motion } from 'framer-motion';
import { Globe, Users, TrendingUp, Leaf, RefreshCw } from 'lucide-react';

// --- 3D SCENE COMPONENT ---
const DataNode = ({ position, color, scale = 1 }) => {
  const ref = useRef(null);
  useFrame((state) => {
    if (ref.current) {
      const t = state.clock.getElapsedTime();
      ref.current.position.y = position[1] + Math.sin(t + position[0]) * 0.1;
      ref.current.rotation.x = t * 0.2;
      ref.current.rotation.y = t * 0.3;
    }
  });
  return (
    <Icosahedron ref={ref} args={[1, 0]} position={position} scale={scale}>
      <meshStandardMaterial
        color={color}
        roughness={0.3}
        metalness={0.8}
        emissive={color}
        emissiveIntensity={0.2}
        wireframe
      />
    </Icosahedron>
  );
};

const FloatingLeaf = ({ position, rotation }) => {
    const ref = useRef(null);
    useFrame((state) => {
        if (ref.current) {
            const t = state.clock.getElapsedTime();
            ref.current.rotation.z = Math.sin(t * 0.5 + position[0]) * 0.1;
            ref.current.position.y = position[1] + Math.sin(t * 0.5) * 0.2;
        }
    });
    return (
        <group ref={ref} position={position} rotation={rotation}>
            <mesh>
                <boxGeometry args={[0.8, 0.05, 1.2]} />
                <meshStandardMaterial color="#059669" transparent opacity={0.8} />
            </mesh>
        </group>
    )
}

const EcoNetworkScene = () => {
  return (
    <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
        <ambientLight intensity={0.7} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
          <DataNode position={[0, 0, 0]} color="#059669" scale={1.5} />
          <DataNode position={[-3, 1, -2]} color="#34D399" scale={0.6} />
          <DataNode position={[3, -1, -3]} color="#064E3B" scale={0.8} />
          <DataNode position={[-2, -2, 1]} color="#10B981" scale={0.5} />
          <FloatingLeaf position={[2, 2, -1]} rotation={[0.5, 0.5, 0]} />
          <FloatingLeaf position={[-2, -1, 0]} rotation={[-0.5, -0.2, 0]} />
        </Float>
        <Environment preset="park" />
        <Stars radius={100} depth={50} count={400} factor={4} saturation={0} fade speed={0.5} />
    </Canvas>
  );
};

// --- DIAGRAM COMPONENTS ---
const TripleBottomLineDiagram = () => {
  const [active, setActive] = useState('planet');
  const data = {
    planet: { label: "PIANETA", desc: "Impatto Ambientale", kpis: ["Impronta Carbonica", "Efficienza Energetica", "E-waste"], color: "bg-emerald-600", icon: <Globe className="w-6 h-6 text-white" /> },
    people: { label: "PERSONE", desc: "Responsabilità Sociale", kpis: ["Inclusione Digitale", "Accessibilità", "Privacy"], color: "bg-blue-500", icon: <Users className="w-6 h-6 text-white" /> },
    profit: { label: "PROFITTO", desc: "Sostenibilità Economica", kpis: ["Riduzione TCO", "Mitigazione Rischio", "Brand"], color: "bg-amber-600", icon: <TrendingUp className="w-6 h-6 text-white" /> }
  };

  return (
    <div className="flex flex-col items-center p-8 bg-white rounded-xl shadow-lg border border-stone-200 my-8 w-full max-w-2xl">
      <h3 className="font-serif text-2xl mb-2 text-stone-800">Il Triple Bottom Line</h3>
      <p className="text-sm text-stone-500 mb-8 text-center">Clicca per esplorare le dimensioni.</p>
      
      <div className="flex flex-col md:flex-row gap-8 items-center justify-center w-full">
          <div className="relative w-64 h-64">
              <button onClick={() => setActive('planet')} className={`absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 rounded-full flex items-center justify-center transition-all ${active === 'planet' ? 'bg-emerald-600 shadow-xl z-20 scale-110 text-white' : 'bg-emerald-600/40 z-10'}`}>PIANETA</button>
              <button onClick={() => setActive('people')} className={`absolute bottom-0 left-0 w-32 h-32 rounded-full flex items-center justify-center transition-all ${active === 'people' ? 'bg-blue-500 shadow-xl z-20 scale-110 text-white' : 'bg-blue-500/40 z-10'}`}>PERSONE</button>
              <button onClick={() => setActive('profit')} className={`absolute bottom-0 right-0 w-32 h-32 rounded-full flex items-center justify-center transition-all ${active === 'profit' ? 'bg-amber-600 shadow-xl z-20 scale-110 text-white' : 'bg-amber-600/40 z-10'}`}>PROFITTO</button>
          </div>

          <motion.div key={active} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="flex-1 bg-stone-50 p-6 rounded-lg border border-stone-200 min-h-[200px]">
                <div className={`inline-flex p-3 rounded-full mb-4 ${data[active].color}`}>{data[active].icon}</div>
                <h4 className="text-xl font-bold text-stone-800 mb-1">{data[active].label}</h4>
                <p className="text-sm text-stone-500 italic mb-4">{data[active].desc}</p>
                <ul className="space-y-2">
                    {data[active].kpis.map((kpi, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm text-stone-700">
                            <div className={`w-2 h-2 rounded-full ${data[active].color}`}></div>{kpi}
                        </li>
                    ))}
                </ul>
          </motion.div>
      </div>
    </div>
  );
};

const SoftFrameworkDiagram = () => {
  const [step, setStep] = useState(0);
  const phases = ["STRATEGIA", "IMPLEMENTAZIONE", "OPERAZIONI", "CONFORMITÀ"];
  useEffect(() => { const i = setInterval(() => setStep(s => (s + 1) % 4), 3000); return () => clearInterval(i); }, []);

  return (
    <div className="flex flex-col items-center p-8 bg-[#F5F4F0] rounded-xl border border-stone-200 my-8 w-full">
      <div className="flex w-full gap-2 overflow-x-auto no-scrollbar pb-4">
        {phases.map((name, idx) => (
            <div key={idx} className={`flex-1 min-w-[120px] p-4 rounded-lg border-2 text-center transition-all duration-500 ${step === idx ? 'border-emerald-600 bg-white shadow-lg' : 'border-stone-300 bg-stone-100 opacity-70'}`}>
                <div className={`text-xs font-bold mb-1 ${step === idx ? 'text-emerald-600' : 'text-stone-500'}`}>{idx + 1}</div>
                <h4 className="font-bold text-sm">{name}</h4>
            </div>
        ))}
      </div>
      <div className="mt-4 flex items-center gap-2 text-emerald-600 text-sm font-bold">
          <RefreshCw size={16} className={step === 3 ? "animate-spin" : ""} /> Ciclo Continuo
      </div>
    </div>
  );
};

const CarbonCostDiagram = () => {
    return (
        <div className="w-full max-w-md h-64 bg-stone-800/50 rounded-xl border border-stone-700/50 p-6 relative">
            <div className="absolute inset-6 border-l border-b border-stone-600"></div>
            <svg className="absolute inset-0 w-full h-full overflow-visible">
                <motion.path d="M30,50 C80,50 130,80 180,120 C230,160 280,170 350,190" fill="none" stroke="#059669" strokeWidth="3" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} transition={{ duration: 2 }} />
                <motion.path d="M30,60 C80,60 130,90 180,130 C230,170 280,180 350,200" fill="none" stroke="#D97706" strokeWidth="3" strokeDasharray="5,5" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} transition={{ duration: 2, delay: 0.5 }} />
            </svg>
            <div className="absolute top-4 left-4 text-xs text-stone-500">High</div>
            <div className="absolute bottom-4 right-4 text-xs text-stone-500">Low</div>
            <div className="absolute bottom-4 left-16 flex gap-4 text-xs">
                <span className="text-emerald-500">● Carbon</span>
                <span className="text-amber-600">● Cost</span>
            </div>
        </div>
    )
}

// --- MOUNTING LOGIC ---
// Mounts components only if their container div exists in the HTML
const mount = (id, Component) => {
    const el = document.getElementById(id);
    if (el) createRoot(el).render(<Component />);
};

mount('island-3d-background', EcoNetworkScene);
mount('island-diagram-tbl', TripleBottomLineDiagram);
mount('island-diagram-soft', SoftFrameworkDiagram);
mount('island-diagram-cost', CarbonCostDiagram);
