"use client"

import { useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Text, Environment, Html, OrbitControls } from "@react-three/drei"
import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"

function CafeTable({ position = [0, 0, 0] }) {
  const tableRef = useRef()

  useFrame((state) => {
    if (tableRef.current) {
      tableRef.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.2) * 0.1
    }
  })

  return (
    <group position={position} ref={tableRef}>
      {/* Table Top */}
      <mesh position={[0, 0.8, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[1.5, 1.5, 0.1, 32]} />
        <meshStandardMaterial color="#5D4037" />
      </mesh>

      {/* Table Leg */}
      <mesh position={[0, 0, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.2, 0.2, 1.6, 16]} />
        <meshStandardMaterial color="#4E342E" />
      </mesh>

      {/* Table Base */}
      <mesh position={[0, -0.8, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.8, 0.8, 0.1, 32]} />
        <meshStandardMaterial color="#4E342E" />
      </mesh>

      {/* Coffee Cup */}
      <mesh position={[-0.5, 0.9, 0.3]} castShadow receiveShadow>
        <cylinderGeometry args={[0.2, 0.15, 0.4, 16]} />
        <meshStandardMaterial color="white" />
      </mesh>

      {/* Coffee Surface */}
      <mesh position={[-0.5, 1.05, 0.3]} castShadow receiveShadow>
        <cylinderGeometry args={[0.18, 0.18, 0.05, 16]} />
        <meshStandardMaterial color="#3E2723" />
      </mesh>

      {/* Plate */}
      <mesh position={[0.5, 0.85, -0.3]} castShadow receiveShadow rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.4, 32]} />
        <meshStandardMaterial color="white" />
      </mesh>

      {/* Cake */}
      <mesh position={[0.5, 0.9, -0.3]} castShadow receiveShadow>
        <cylinderGeometry args={[0.2, 0.2, 0.1, 16]} />
        <meshStandardMaterial color="#D7CCC8" />
      </mesh>
      <mesh position={[0.5, 0.95, -0.3]} castShadow receiveShadow>
        <cylinderGeometry args={[0.2, 0.2, 0.05, 16]} />
        <meshStandardMaterial color="#A1887F" />
      </mesh>
    </group>
  )
}

function AboutContent() {
  // Safe scroll function
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
      <Environment preset="sunset" />

      {/* Title */}
      <Text
        position={[0, 3, 0]}
        fontSize={1}
        color="black"
        font="/fonts/Geist_Bold.json"
        anchorX="center"
        anchorY="middle"
      >
        About ZOCA
      </Text>

      {/* Cafe Table */}
      <CafeTable position={[3, -1, 0]} />

      {/* About Text */}
      <Html position={[-3, 0, 0]} transform distanceFactor={10} className="w-64">
        <div className="bg-white bg-opacity-90 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-3">Experience the Urban Cafe Culture</h2>
          <p className="text-gray-700 mb-4">
            ZOCA is a High-End Urban Cafe and an extremely popular cafe among youngsters. The primary focus was on
            giving a cute, cosy vibe to the cafe while curating a true-blue American menu.
          </p>
          <p className="text-gray-700 mb-4">
            Our cafes provide a perfect blend of comfort and style, making it an ideal spot for casual meetings, work
            sessions, or simply enjoying a great cup of coffee with friends.
          </p>
          <Button className="w-full bg-black hover:bg-gray-800 text-white" onClick={() => scrollToSection("menu")}>
            Learn More <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </Html>

      {/* Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]} receiveShadow>
        <planeGeometry args={[50, 50]} />
        <meshStandardMaterial color="#EFEBE9" />
      </mesh>
    </>
  )
}

export default function AboutScene() {
  return (
    <Canvas
      shadows
      dpr={[1, 1.5]}
      gl={{
        powerPreference: "high-performance",
        antialias: false,
        depth: false,
      }}
      performance={{ min: 0.5 }}
    >
      <AboutContent />
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 4}
        enableDamping={false}
      />
    </Canvas>
  )
}
