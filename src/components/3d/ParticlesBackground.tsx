import React, { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import * as THREE from 'three'

function Particles() {
  const ref = useRef<THREE.Points>(null)
  // Generate static positions
  const positions = React.useMemo(() => {
    const num = 1500
    const arr = new Float32Array(num * 3)
    for (let i = 0; i < num; i++) {
      arr[i * 3 + 0] = (Math.random() - 0.5) * 8
      arr[i * 3 + 1] = (Math.random() - 0.5) * 8
      arr[i * 3 + 2] = (Math.random() - 0.5) * 8
    }
    return arr
  }, [])

  useFrame((state, delta) => {
    if (!ref.current) return
    ref.current.rotation.y += delta * 0.02
    ref.current.rotation.x += delta * 0.01
  })

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled>
      <PointMaterial
        transparent
        color="#00e5ff"
        size={0.02}
        sizeAttenuation
        depthWrite={false}
      />
    </Points>
  )
}

export default function ParticlesBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 4], fov: 60 }}>
        <color attach="background" args={[0, 0, 0]} />
        <Particles />
      </Canvas>
    </div>
  )
}



