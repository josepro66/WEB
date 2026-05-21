import React from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Icosahedron, OrbitControls } from '@react-three/drei'
import { useRef } from 'react'
import * as THREE from 'three'

function SpinningIcosahedron() {
  const groupRef = useRef<THREE.Group>(null)
  useFrame((_, delta) => {
    if (!groupRef.current) return
    groupRef.current.rotation.y += delta * 0.3
    groupRef.current.rotation.x += delta * 0.15
  })
  return (
    <group ref={groupRef}>
      <Icosahedron args={[1.4, 0]}>
        <meshBasicMaterial color={'#00F5FF'} wireframe />
      </Icosahedron>
    </group>
  )
}

export default function RotatingShape() {
  return (
    <div className="h-80 w-full sm:h-96 md:h-[28rem]">
      <Canvas camera={{ position: [0, 0, 5] }}>
        <color attach="background" args={[0, 0, 0]} />
        <SpinningIcosahedron />
        <OrbitControls enablePan={false} enableZoom={false} autoRotate={false} />
      </Canvas>
    </div>
  )
}


