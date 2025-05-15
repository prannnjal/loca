"use client"

import { useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Text, Float, Environment, Html, OrbitControls } from "@react-three/drei"
import { Building2, Award, Star } from "lucide-react"

function StatBox({ position, icon, title, description, color = "#000000" }) {
  const boxRef = useRef()
  const iconRef = useRef()

  useFrame((state) => {
    if (boxRef.current) {
      boxRef.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.3) * 0.1
    }
    if (iconRef.current) {
      iconRef.current.rotation.y = state.clock.getElapsedTime() * 0.5
    }
  })

  return (
    <group position={position}>
      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
        <group ref={boxRef}>
          {/* Box */}
          <mesh castShadow receiveShadow>
            <boxGeometry args={[3, 2, 0.2]} />
            <meshStandardMaterial color="white" />
          </mesh>

          {/* Icon */}
          <group ref={iconRef} position={[0, 0.7, 0.15]}>
            <Html transform distanceFactor={5}>
              <div className="bg-black rounded-full p-3 flex items-center justify-center">
                {icon === "building" && <Building2 className="h-8 w-8 text-white" />}
                {icon === "award" && <Award className="h-8 w-8 text-white" />}
                {icon === "star" && <Star className="h-8 w-8 text-white" />}
              </div>
            </Html>
          </group>

          {/* Text */}
          <Html position={[0, 0, 0.15]} transform distanceFactor={5} className="w-full">
            <div className="text-center p-4">
              <h3 className="text-lg font-bold mb-1">{title}</h3>
              <p className="text-gray-600 text-sm">{description}</p>
            </div>
          </Html>
        </group>
      </Float>
    </group>
  )
}

function StatsContent() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} castShadow shadow-mapSize={1024} />
      <Environment preset="city" />

      {/* Title */}
      <Text
        position={[0, 3, 0]}
        fontSize={1}
        color="black"
        font="/fonts/Geist_Bold.json"
        anchorX="center"
        anchorY="middle"
      >
        Our Achievements
      </Text>

      {/* Stats Boxes */}
      <StatBox
        position={[-4, 0, 0]}
        icon="building"
        title="Established in 2015"
        description="More than 5 years in existence"
      />
      <StatBox position={[0, 0, 0]} icon="award" title="Successfully running 135+ outlets" description="PAN India" />
      <StatBox position={[4, 0, 0]} icon="star" title="4.4 star rated" description="on Swiggy and Zomato" />

      {/* Background */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]} receiveShadow>
        <planeGeometry args={[50, 50]} />
        <meshStandardMaterial color="#f5f5f5" />
      </mesh>
    </>
  )
}

export default function StatsScene() {
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
      <StatsContent />
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
