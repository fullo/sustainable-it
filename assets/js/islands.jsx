
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
    planet: { label: "PIANETA", desc: "Impatto Ambientale", kpis: ["Impronta Carbonica", "Efficienza Energetica", "E-waste"], color: "#059669", icon: <Globe size={24} color="white" /> },
    people: { label: "PERSONE", desc: "Responsabilità Sociale", kpis: ["Inclusione Digitale", "Accessibilità", "Privacy"], color: "#3B82F6", icon: <Users size={24} color="white" /> },
    profit: { label: "PROFITTO", desc: "Sostenibilità Economica", kpis: ["Riduzione TCO", "Mitigazione Rischio", "Brand"], color: "#D97706", icon: <TrendingUp size={24} color="white" /> }
  };

  const styles = {
      container: { display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', maxWidth: '800px' },
      diagramWrapper: { display: 'flex', flexDirection: 'column', gap: '2rem', alignItems: 'center', width: '100%' },
      circles: { position: 'relative', width: '250px', height: '250px' },
      circle: (color, isActive) => ({
          position: 'absolute',
          width: '130px', height: '130px', borderRadius: '50%',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', transition: 'all 0.3s',
          backgroundColor: isActive ? color : `${color}66`,
          color: 'white', fontWeight: 'bold', fontSize: '0.9rem',
          boxShadow: isActive ? '0 10px 15px -3px rgba(0,0,0,0.1)' : 'none',
          zIndex: isActive ? 10 : 1
      }),
      card: {
          flex: 1, backgroundColor: '#F5F5F4', padding: '1.5rem', borderRadius: '1rem', border: '1px solid #E7E5E4',
          width: '100%', minHeight: '200px'
      },
      iconWrapper: (color) => ({
          display: 'inline-flex', padding: '0.75rem', borderRadius: '50%', marginBottom: '1rem', backgroundColor: color
      })
  };

  // Media Query logic needs CSS, here we use inline for simplicity
  const isDesktop = window.innerWidth > 768;
  if (isDesktop) styles.diagramWrapper.flexDirection = 'row';

  return (
    <div className="diagram-card" style={styles.container}>
      <h3 style={{fontSize: '1.5rem', fontFamily: 'var(--font-serif)', marginBottom: '0.5rem'}}>Il Triple Bottom Line</h3>
      <p style={{color: '#57534E', marginBottom: '2rem', fontSize: '0.875rem'}}>Clicca per esplorare le dimensioni.</p>
      
      <div style={styles.diagramWrapper}>
          <div style={styles.circles}>
              <button onClick={() => setActive('planet')} style={{...styles.circle(data.planet.color, active === 'planet'), top: 0, left: '50%', transform: 'translateX(-50%)'}}>PIANETA</button>
              <button onClick={() => setActive('people')} style={{...styles.circle(data.people.color, active === 'people'), bottom: 0, left: 0}}>PERSONE</button>
              <button onClick={() => setActive('profit')} style={{...styles.circle(data.profit.color, active === 'profit'), bottom: 0, right: 0}}>PROFITTO</button>
          </div>

          <motion.div key={active} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} style={styles.card}>
                <div style={styles.iconWrapper(data[active].color)}>{data[active].icon}</div>
                <h4 style={{fontWeight: 'bold', fontSize: '1.25rem', marginBottom: '0.25rem'}}>{data[active].label}</h4>
                <p style={{fontStyle: 'italic', color: '#57534E', marginBottom: '1rem'}}>{data[active].desc}</p>
                <ul style={{listStyle: 'none', padding: 0}}>
                    {data[active].kpis.map((kpi, i) => (
                        <li key={i} style={{display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', fontSize: '0.9rem'}}>
                            <div style={{width: '8px', height: '8px', borderRadius: '50%', backgroundColor: data[active].color}}></div>{kpi}
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

  const styles = {
      container: { display: 'flex', gap: '0.5rem', width: '100%', overflowX: 'auto', paddingBottom: '1rem' },
      step: (active) => ({
          flex: 1, minWidth: '120px', padding: '1rem', borderRadius: '0.5rem', textAlign: 'center', transition: 'all 0.5s',
          border: active ? '2px solid #059669' : '2px solid #D6D3D1',
          backgroundColor: active ? 'white' : '#F5F5F4',
          opacity: active ? 1 : 0.7,
          boxShadow: active ? '0 4px 6px -1px rgba(0,0,0,0.1)' : 'none'
      }),
      number: (active) => ({
          fontSize: '0.75rem', fontWeight: 'bold', marginBottom: '0.25rem', color: active ? '#059669' : '#78716C'
      }),
      title: { fontWeight: 'bold', fontSize: '0.875rem' }
  };

  return (
    <div className="diagram-card" style={{backgroundColor: '#F5F4F0'}}>
      <div style={styles.container}>
        {phases.map((name, idx) => (
            <div key={idx} style={styles.step(step === idx)}>
                <div style={styles.number(step === idx)}>{idx + 1}</div>
                <h4 style={styles.title}>{name}</h4>
            </div>
        ))}
      </div>
      <div style={{marginTop: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: '#059669', fontWeight: 'bold'}}>
          <RefreshCw size={16} className={step === 3 ? "animate-spin" : ""} /> Ciclo Continuo
      </div>
    </div>
  );
};

const CarbonCostDiagram = () => {
    return (
        <div style={{width: '100%', maxWidth: '450px', height: '250px', backgroundColor: 'rgba(28, 25, 23, 0.5)', borderRadius: '1rem', border: '1px solid rgba(68, 64, 60, 0.5)', padding: '1.5rem', position: 'relative'}}>
            <div style={{position: 'absolute', inset: '1.5rem', borderLeft: '1px solid #57534E', borderBottom: '1px solid #57534E'}}></div>
            <svg style={{position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'visible'}}>
                <motion.path d="M30,50 C80,50 130,80 180,120 C230,160 280,170 350,190" fill="none" stroke="#059669" strokeWidth="3" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} transition={{ duration: 2 }} />
                <motion.path d="M30,60 C80,60 130,90 180,130 C230,170 280,180 350,200" fill="none" stroke="#D97706" strokeWidth="3" strokeDasharray="5,5" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} transition={{ duration: 2, delay: 0.5 }} />
            </svg>
            <div style={{position: 'absolute', top: '1rem', left: '1rem', fontSize: '0.75rem', color: '#78716C'}}>High</div>
            <div style={{position: 'absolute', bottom: '1rem', right: '1rem', fontSize: '0.75rem', color: '#78716C'}}>Low</div>
            <div style={{position: 'absolute', bottom: '1rem', left: '4rem', display: 'flex', gap: '1rem', fontSize: '0.75rem'}}>
                <span style={{color: '#10B981'}}>● Carbon</span>
                <span style={{color: '#D97706'}}>● Cost</span>
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
