import { Canvas } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera, Stars, Float, Html } from '@react-three/drei'
import { Suspense, useRef, useState, useMemo } from 'react'
import * as THREE from 'three'
import { Seo } from '@/components/seo/Seo'
import { US_STATES } from '@/data/usStates'
import { Link } from 'react-router-dom'

function StatePin({ state, onSelect }: { state: any; onSelect: (s: any) => void }) {
  const [hovered, setHovered] = useState(false)
  
  // Approximate latitude/longitude to 3D sphere coordinates
  // Note: This is a simplified projection for the "Dream Site" visual effect
  const position = useMemo(() => {
    const lat = state.latitude || 37 // Fallback to center US
    const lon = state.longitude || -95
    const phi = (90 - lat) * (Math.PI / 180)
    const theta = (lon + 180) * (Math.PI / 180)
    const radius = 2.02
    return new THREE.Vector3(
      -(radius * Math.sin(phi) * Math.cos(theta)),
      radius * Math.cos(phi),
      radius * Math.sin(phi) * Math.sin(theta)
    )
  }, [state])

  return (
    <group position={position}>
      <mesh
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={() => onSelect(state)}
      >
        <sphereGeometry args={[0.03, 16, 16]} />
        <meshStandardMaterial
          color={hovered ? '#60a5fa' : '#ef4444'}
          emissive={hovered ? '#60a5fa' : '#ef4444'}
          emissiveIntensity={hovered ? 2 : 0.5}
        />
      </mesh>
      {hovered && (
        <Html distanceFactor={10}>
          <div className="pointer-events-none select-none rounded-lg border border-white/20 bg-black/80 px-2 py-1 text-[10px] font-bold text-white shadow-xl backdrop-blur-md">
            {state.name}
          </div>
        </Html>
      )}
    </group>
  )
}

function EarthModel() {
  const globeRef = useRef<THREE.Mesh>(null)
  
  return (
    <group>
      <mesh ref={globeRef}>
        <sphereGeometry args={[2, 64, 64]} />
        <meshStandardMaterial
          color="#1e293b"
          metalness={0.6}
          roughness={0.4}
          emissive="#0f172a"
          emissiveIntensity={0.2}
        />
      </mesh>
      {/* Continental US Glow Effect */}
      <mesh position={[-0.4, 0.8, 1.8]} rotation={[0, 0.2, 0]}>
        <planeGeometry args={[1.5, 1]} />
        <meshBasicMaterial color="#3b82f6" transparent opacity={0.1} blending={THREE.AdditiveBlending} />
      </mesh>
    </group>
  )
}

export function ExplorePage() {
  const [selectedState, setSelectedState] = useState<any>(null)

  return (
    <>
      <Seo
        title="Immersive 3D USA Exploration | The United States"
        description="Fly across the 50 states in an immersive 3D environment. Explore landmarks, live cams, and real-time state data."
        path="/explore"
      />

      <div className="relative h-[80vh] w-full overflow-hidden rounded-[3rem] border border-white/10 bg-[#020617] shadow-2xl">
        <div className="absolute inset-0 z-0">
          <Canvas dpr={[1, 2]}>
            <Suspense fallback={null}>
              <PerspectiveCamera makeDefault position={[0, 0, 6]} fov={45} />
              <OrbitControls
                enablePan={false}
                minDistance={3}
                maxDistance={8}
                autoRotate={!selectedState}
                autoRotateSpeed={0.5}
              />
              <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
              <ambientLight intensity={0.5} />
              <pointLight position={[10, 10, 10]} intensity={1.5} color="#60a5fa" />
              <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ef4444" />
              
              <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
                <EarthModel />
                {US_STATES.map((st) => (
                  <StatePin key={st.id} state={st} onSelect={setSelectedState} />
                ))}
              </Float>
            </Suspense>
          </Canvas>
        </div>

        {/* UI Overlay */}
        <div className="pointer-events-none relative z-10 flex h-full flex-col justify-between p-8 md:p-12">
          <header className="hero-reveal">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.25em] text-sky-200/80 backdrop-blur-md">
              Immersive Discovery
            </div>
            <h1 className="mt-4 font-[family-name:var(--font-display)] text-4xl font-extrabold tracking-tight text-white md:text-6xl">
              <span className="gradient-text glow-text">Explore</span> America
            </h1>
            <p className="mt-4 max-w-lg text-sm leading-relaxed text-slate-300 md:text-base">
              Interact with the 3D globe to discover states, landmarks, and real-time updates. Tap a pin to dive deep.
            </p>
          </header>

          <footer className="flex items-end justify-between">
            <div className="hero-reveal flex gap-4">
              <div className="glass-panel pointer-events-auto rounded-2xl p-4 backdrop-blur-xl">
                <div className="text-[10px] font-bold uppercase tracking-widest text-sky-200/80">Live Cams</div>
                <div className="mt-1 font-bold text-white">124 Active</div>
              </div>
              <div className="glass-panel pointer-events-auto rounded-2xl p-4 backdrop-blur-xl">
                <div className="text-[10px] font-bold uppercase tracking-widest text-sky-200/80">Weather</div>
                <div className="mt-1 font-bold text-white">Live Doppler</div>
              </div>
            </div>
          </footer>
        </div>

        {/* Selection Sidebar */}
        <AnimatePresence>
          {selectedState && (
            <motion.aside
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 20 }}
              className="absolute right-0 top-0 z-20 h-full w-full border-l border-white/10 bg-black/40 p-8 backdrop-blur-2xl md:w-96"
            >
              <button
                onClick={() => setSelectedState(null)}
                className="absolute right-6 top-6 rounded-full border border-white/10 bg-white/5 p-2 text-white hover:bg-white/10"
              >
                ✕
              </button>
              
              <div className="mt-12">
                <div className="text-xs font-bold uppercase tracking-widest text-sky-200/80">{selectedState.abbreviation}</div>
                <h2 className="mt-2 font-[family-name:var(--font-display)] text-4xl font-extrabold text-white">
                  {selectedState.name}
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-slate-300">
                  {selectedState.capital} is the heart of this great state. Explore history, nature, and community updates.
                </p>
                
                <div className="mt-8 space-y-4">
                  <Link
                    to={`/states/${selectedState.slug}`}
                    className="flex w-full items-center justify-center rounded-2xl bg-gradient-to-r from-sky-500 to-indigo-600 py-3 text-sm font-bold text-white shadow-lg"
                  >
                    View State Guide
                  </Link>
                  <Link
                    to="/itinerary"
                    className="flex w-full items-center justify-center rounded-2xl border border-white/10 bg-white/5 py-3 text-sm font-semibold text-white hover:bg-white/10"
                  >
                    Plan Trip with AI
                  </Link>
                </div>

                <div className="mt-10">
                  <div className="text-[11px] font-bold uppercase tracking-widest text-slate-400">Real-time Data</div>
                  <div className="mt-4 grid grid-cols-2 gap-3">
                    <div className="rounded-xl bg-white/5 p-3">
                      <div className="text-[10px] text-slate-400">Temp</div>
                      <div className="text-lg font-bold text-white">72°F</div>
                    </div>
                    <div className="rounded-xl bg-white/5 p-3">
                      <div className="text-[10px] text-slate-400">Status</div>
                      <div className="text-lg font-bold text-emerald-400">Clear</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.aside>
          )}
        </AnimatePresence>
      </div>

      <section className="mt-12 grid gap-8 md:grid-cols-3">
        <div className="glass-panel rounded-3xl p-6">
          <h3 className="font-[family-name:var(--font-display)] text-xl font-bold text-white">Live Earth Cams</h3>
          <p className="mt-2 text-sm text-slate-400">Stream live footage from National Parks and city centers across the USA.</p>
        </div>
        <div className="glass-panel rounded-3xl p-6">
          <h3 className="font-[family-name:var(--font-display)] text-xl font-bold text-white">Historical Overlays</h3>
          <p className="mt-2 text-sm text-slate-400">Toggle "1776 Mode" to see the original 13 colonies and historical trails.</p>
        </div>
        <div className="glass-panel rounded-3xl p-6">
          <h3 className="font-[family-name:var(--font-display)] text-xl font-bold text-white">Community Heatmap</h3>
          <p className="mt-2 text-sm text-slate-400">See where other travelers are currently exploring and sharing stories.</p>
        </div>
      </section>
    </>
  )
}

import { AnimatePresence, motion } from 'framer-motion'
