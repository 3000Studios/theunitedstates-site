import { Canvas, useFrame } from '@react-three/fiber'
import { Float, PerspectiveCamera, Sparkles, Stars } from '@react-three/drei'
import { useRef, useState, type JSX } from 'react'
import * as THREE from 'three'

function UsaHaloSphere() {
  const mesh = useRef<THREE.Mesh>(null)
  useFrame(({ clock }) => {
    if (!mesh.current) return
    mesh.current.rotation.y = clock.elapsedTime * 0.12
    mesh.current.rotation.x = Math.sin(clock.elapsedTime * 0.2) * 0.15
  })
  return (
    <Float speed={2} rotationIntensity={0.35} floatIntensity={0.6}>
      <mesh ref={mesh}>
        <sphereGeometry args={[1.35, 64, 64]} />
        <meshStandardMaterial
          color="#0a1f44"
          emissive="#1e3a8a"
          emissiveIntensity={0.35}
          metalness={0.35}
          roughness={0.35}
        />
      </mesh>
    </Float>
  )
}

function Rig() {
  const cam = useRef<THREE.PerspectiveCamera>(null)
  useFrame(({ clock }) => {
    if (!cam.current) return
    const t = clock.elapsedTime
    cam.current.position.x = Math.sin(t * 0.15) * 0.35
    cam.current.position.y = 0.35 + Math.sin(t * 0.25) * 0.08
    cam.current.lookAt(0, 0, 0)
  })
  return <PerspectiveCamera ref={cam} makeDefault position={[0, 0.35, 4.2]} fov={48} />
}

function webglSupported(): boolean {
  try {
    const c = document.createElement('canvas')
    return !!(c.getContext('webgl') || c.getContext('webgl2'))
  } catch {
    return false
  }
}

export function HeroGlobe(): JSX.Element {
  const [ok] = useState(webglSupported)

  if (!ok) {
    return (
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,#1d4ed8_0%,transparent_45%),radial-gradient(circle_at_80%_30%,#b22234_0%,transparent_40%),linear-gradient(135deg,#050d1a,#0a1f44_60%,#020617)]" />
    )
  }

  return (
    <div className="absolute inset-0">
      <Canvas dpr={[1, 1.75]} gl={{ antialias: true, alpha: true }}>
        <color attach="background" args={['#050d1a']} />
        <ambientLight intensity={0.35} />
        <directionalLight position={[4, 3, 5]} intensity={1.25} color="#93c5fd" />
        <pointLight position={[-4, -2, 3]} intensity={0.9} color="#b22234" />
        <Rig />
        <Stars radius={80} depth={40} count={3500} factor={3.5} saturation={0} fade speed={0.4} />
        <Sparkles
          count={520}
          scale={[3.8, 3.8, 3.8]}
          size={2.4}
          speed={0.45}
          opacity={0.75}
          color="#60a5fa"
        />
        <UsaHaloSphere />
      </Canvas>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-[#050d1a]/25 to-[#050d1a]" />
    </div>
  )
}
