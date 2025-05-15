"use client"

import { useRef, useState, useEffect } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { Text, Float, Environment, OrbitControls, Html } from "@react-three/drei"
import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"
import * as THREE from "three"

function ZocaLogo({ position = [0, 0, 0], rotation = [0, 0, 0], scale = 1 }) {
  return (
    <group position={position} rotation={rotation} scale={scale}>
      <mesh position={[0, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[2, 2, 0.2]} />
        <meshStandardMaterial color="black" />
      </mesh>
      <Text
        position={[0, 0.3, 0.15]}
        fontSize={0.7}
        color="white"
        font="/fonts/Geist_Bold.json"
        anchorX="center"
        anchorY="middle"
      >
        ZO
      </Text>
      <Text
        position={[0, -0.3, 0.15]}
        fontSize={0.7}
        color="white"
        font="/fonts/Geist_Bold.json"
        anchorX="center"
        anchorY="middle"
      >
        CA
      </Text>
    </group>
  )
}

function CoffeeModel({ position = [0, 0, 0], rotation = [0, 0, 0] }) {
  const cupRef = useRef()
  const steamRef = useRef()

  useFrame((state) => {
    if (steamRef.current) {
      steamRef.current.rotation.y += 0.01
      steamRef.current.position.y = Math.sin(state.clock.getElapsedTime() * 2) * 0.05 + 1.2
    }
    if (cupRef.current) {
      cupRef.current.rotation.y += 0.002
    }
  })

  return (
    <group position={position} rotation={rotation} ref={cupRef}>
      {/* Coffee Cup */}
      <mesh castShadow receiveShadow position={[0, 0, 0]}>
        <cylinderGeometry args={[0.7, 0.5, 1.2, 32]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>

      {/* Cup Handle */}
      <mesh castShadow receiveShadow position={[0.9, 0.2, 0]}>
        <torusGeometry args={[0.3, 0.1, 16, 32, Math.PI]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>

      {/* Coffee Surface */}
      <mesh receiveShadow position={[0, 0.5, 0]}>
        <cylinderGeometry args={[0.65, 0.65, 0.1, 32]} />
        <meshStandardMaterial color="#3E2723" />
      </mesh>

      {/* Steam */}
      <group ref={steamRef} position={[0, 1.2, 0]}>
        <mesh>
          <sphereGeometry args={[0.2, 16, 16]} />
          <meshStandardMaterial color="white" transparent opacity={0.4} />
        </mesh>
        <mesh position={[0.15, 0.2, 0]}>
          <sphereGeometry args={[0.15, 16, 16]} />
          <meshStandardMaterial color="white" transparent opacity={0.3} />
        </mesh>
        <mesh position={[-0.15, 0.3, 0]}>
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshStandardMaterial color="white" transparent opacity={0.2} />
        </mesh>
      </group>
    </group>
  )
}

function CafeEnvironment() {
  const { camera } = useThree()
  const [cameraPosition] = useState(() => new THREE.Vector3(0, 2, 8))

  useEffect(() => {
    camera.position.copy(cameraPosition)
    camera.lookAt(0, 0, 0)
  }, [camera, cameraPosition])

  // Safe scroll function for menu button
  const scrollToSection = (sectionId) => {
    if (typeof window !== "undefined") {
      const section = document.getElementById(sectionId)
      if (section) {
        section.scrollIntoView({ behavior: "smooth" })
      }
    }
  }

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} castShadow shadow-mapSize={1024} />
      <directionalLight position={[-10, 10, 5]} intensity={0.5} />
      <Environment preset="city" />

      {/* Cafe Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]} receiveShadow>
        <planeGeometry args={[50, 50]} />
        <meshStandardMaterial color="#D7CCC8" />
      </mesh>

      {/* ZOCA Logo */}
      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
        <ZocaLogo position={[0, 1, 0]} />
      </Float>

      {/* Coffee Cup */}
      <CoffeeModel position={[3, -1, 1]} />

      {/* Hero Text and Buttons */}
      <Html position={[-4, 0, 0]} transform distanceFactor={10} className="w-64">
        <div className="bg-white bg-opacity-90 p-6 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold mb-2">Experience the Urban Cafe Culture</h1>
          <p className="text-gray-700 mb-4">
            A High-End Urban Cafe with a true-blue American menu and cozy atmosphere.
          </p>
          <div className="flex flex-col space-y-2">
            <Button className="w-full bg-black hover:bg-gray-800 text-white" onClick={() => scrollToSection("menu")}>
              Our Menu
            </Button>
            <Button
              variant="outline"
              className="w-full border-black text-black hover:bg-black hover:text-white"
              onClick={() => scrollToSection("franchise")}
            >
              Find Location <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </Html>
    </>
  )
}

export default function HeroScene() {
  return (
    <Canvas
      shadows
      dpr={[1, 1.5]} // Reduced DPR for better performance
      gl={{
        powerPreference: "high-performance",
        antialias: false, // Disable antialiasing for performance
        depth: false, // Disable depth buffer for performance
      }}
      performance={{ min: 0.5 }} // Allow ThreeJS to reduce quality for performance
    >
      <CafeEnvironment />
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 4}
        enableDamping={false} // Disable damping for performance
      />
    </Canvas>
  )
}
