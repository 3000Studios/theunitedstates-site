import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera, Sphere, Stars } from '@react-three/drei'
import { useEffect, useMemo, useRef, useState, type JSX } from 'react'
import * as THREE from 'three'

const EARTH_DAY = 'https://threejs.org/examples/textures/planets/earth_atmos_2048.jpg'
const EARTH_NORMAL = 'https://threejs.org/examples/textures/planets/earth_normal_2048.jpg'
const EARTH_LIGHTS = 'https://threejs.org/examples/textures/planets/earth_lights_2048.png'
const EARTH_CLOUDS = 'https://threejs.org/examples/textures/planets/earth_clouds_1024.png'

function scrollMix(): number {
  if (typeof window === 'undefined') return 0
  return Math.max(0, Math.min(1, window.scrollY / 900))
}

function Earth({ nightMix }: { nightMix: number }) {
  const globe = useRef<THREE.Mesh>(null)
  const clouds = useRef<THREE.Mesh>(null)
  const [dayMapSource, normalMapSource, lightsMapSource, cloudsMapSource] = useLoader(THREE.TextureLoader, [
    EARTH_DAY,
    EARTH_NORMAL,
    EARTH_LIGHTS,
    EARTH_CLOUDS,
  ])

  const [dayMap, normalMap, lightsMap, cloudsMap] = useMemo(() => {
    const day = dayMapSource.clone()
    const normal = normalMapSource.clone()
    const lights = lightsMapSource.clone()
    const clouds = cloudsMapSource.clone()

    day.colorSpace = THREE.SRGBColorSpace
    lights.colorSpace = THREE.SRGBColorSpace
    clouds.colorSpace = THREE.SRGBColorSpace

    day.anisotropy = 8
    normal.anisotropy = 8
    lights.anisotropy = 8
    clouds.anisotropy = 8

    day.needsUpdate = true
    normal.needsUpdate = true
    lights.needsUpdate = true
    clouds.needsUpdate = true

    return [day, normal, lights, clouds]
  }, [cloudsMapSource, dayMapSource, lightsMapSource, normalMapSource])

  useFrame(({ clock, pointer }) => {
    if (!globe.current || !clouds.current) return
    const driftY = clock.elapsedTime * 0.05
    const driftX = Math.sin(clock.elapsedTime * 0.35) * 0.02

    globe.current.rotation.y = driftY + pointer.x * 0.3
    globe.current.rotation.x = driftX + pointer.y * 0.18
    clouds.current.rotation.y = driftY * 1.18 + 0.15
    clouds.current.rotation.x = driftX + pointer.y * 0.16
  })

  return (
    <group position={[0.9, 0.2, 0]}>
      <Sphere ref={globe} args={[1.34, 96, 96]}>
        <meshStandardMaterial
          map={dayMap}
          normalMap={normalMap}
          emissiveMap={lightsMap}
          emissive={new THREE.Color('#ffc977')}
          emissiveIntensity={0.15 + nightMix * 0.95}
          metalness={0.08}
          roughness={0.82}
        />
      </Sphere>
      <Sphere ref={clouds} args={[1.39, 80, 80]}>
        <meshStandardMaterial
          map={cloudsMap}
          transparent
          opacity={0.18 + (1 - nightMix) * 0.18}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </Sphere>
      <Sphere args={[1.52, 72, 72]}>
        <meshBasicMaterial color={nightMix > 0.55 ? '#9ad6ff' : '#5fb2ff'} transparent opacity={0.08 + nightMix * 0.12} />
      </Sphere>
    </group>
  )
}

function Scene({ nightMix }: { nightMix: number }) {
  const camera = useRef<THREE.PerspectiveCamera>(null)

  useFrame(({ clock }) => {
    if (!camera.current) return
    camera.current.position.x = Math.sin(clock.elapsedTime * 0.12) * 0.1
    camera.current.position.y = 0.22 + Math.cos(clock.elapsedTime * 0.16) * 0.04
    camera.current.lookAt(0.8, 0.15, 0)
  })

  return (
    <>
      <color attach="background" args={[nightMix > 0.52 ? '#020611' : '#081629']} />
      <fog attach="fog" args={[nightMix > 0.52 ? '#020611' : '#081629', 5.5, 9.5]} />
      <ambientLight intensity={0.55 - nightMix * 0.18} color={nightMix > 0.5 ? '#6ba8ff' : '#dbeafe'} />
      <directionalLight position={[4, 2.6, 4.5]} intensity={1.45 - nightMix * 0.65} color="#f8fafc" />
      <pointLight position={[-2.2, -1.2, 3]} intensity={0.7 + nightMix * 0.55} color={nightMix > 0.45 ? '#ffb35d' : '#60a5fa'} />
      <PerspectiveCamera ref={camera} makeDefault position={[0, 0.24, 4.25]} fov={42} />
      <Stars radius={70} depth={48} count={nightMix > 0.45 ? 5200 : 1700} factor={4} saturation={0} fade speed={0.45} />
      <Earth nightMix={nightMix} />
      <OrbitControls
        enablePan={false}
        enableZoom={false}
        minPolarAngle={Math.PI * 0.34}
        maxPolarAngle={Math.PI * 0.66}
        rotateSpeed={0.55}
        autoRotate
        autoRotateSpeed={nightMix > 0.45 ? 0.45 : 0.72}
      />
    </>
  )
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
  const [nightMix, setNightMix] = useState(0)

  useEffect(() => {
    const onScroll = () => setNightMix(scrollMix())
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (!ok) {
    return (
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_35%,rgba(96,165,250,0.35),transparent_22%),radial-gradient(circle_at_78%_34%,rgba(255,255,255,0.14),transparent_14%),linear-gradient(135deg,#050d1a,#0a1f44_60%,#020617)]" />
    )
  }

  return (
    <div className="absolute inset-0">
      <Canvas dpr={[1, 1.8]} gl={{ antialias: true, alpha: true }}>
        <Scene nightMix={nightMix} />
      </Canvas>
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-500"
        style={{
          background:
            nightMix > 0.52
              ? 'radial-gradient(circle at 74% 30%, rgba(255,196,120,0.12), transparent 18%), linear-gradient(180deg, rgba(2,6,23,0.08), rgba(2,6,23,0.86))'
              : 'radial-gradient(circle at 74% 30%, rgba(125,211,252,0.18), transparent 20%), linear-gradient(180deg, rgba(2,6,23,0.05), rgba(2,6,23,0.76))',
        }}
      />
    </div>
  )
}
