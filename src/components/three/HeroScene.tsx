'use client'
// src/components/three/HeroScene.tsx
import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Sphere, Box, Torus, Float, Stars } from '@react-three/drei'
import * as THREE from 'three'

function FloatingPlate({ position }: { position: [number, number, number] }) {
  const ref = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.3
      ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.1
    }
  })

  return (
    <Float speed={2} rotationIntensity={0.4} floatIntensity={0.8}>
      <mesh ref={ref} position={position}>
        <cylinderGeometry args={[0.8, 0.85, 0.08, 32]} />
        <meshStandardMaterial color="#c9a84c" metalness={0.9} roughness={0.1} />
      </mesh>
    </Float>
  )
}

function GoldParticles() {
  const count = 200
  const ref = useRef<THREE.Points>(null)

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20
    }
    return pos
  }, [])

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.02
      ref.current.rotation.x = state.clock.elapsedTime * 0.01
    }
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.05} color="#c9a84c" transparent opacity={0.6} sizeAttenuation />
    </points>
  )
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight position={[10, 10, 5]} intensity={1.5} color="#e8c87a" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#c9a84c" />
      <Stars radius={50} depth={50} count={1000} factor={4} saturation={0} fade speed={1} />
      <GoldParticles />
      <FloatingPlate position={[3, 0, -2]} />
      <FloatingPlate position={[-3, 1, -3]} />
      <Float speed={1.5} floatIntensity={0.5}>
        <Torus args={[1.5, 0.05, 8, 64]} position={[0, 0, -5]} rotation={[Math.PI / 2, 0, 0]}>
          <meshStandardMaterial color="#c9a84c" metalness={0.9} roughness={0.1} />
        </Torus>
      </Float>
    </>
  )
}

export default function HeroScene() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <Scene />
      </Canvas>
    </div>
  )
}
