"use client"

import { useState, useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Text, Environment, Html, OrbitControls, Float } from "@react-three/drei"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

const menuCategories = [
  {
    id: "beverages",
    name: "Beverages",
    items: [
      { name: "Signature Coffee", price: "₹180", description: "Our house blend with a rich, smooth flavor" },
      { name: "Bubble Tea", price: "₹220", description: "Classic milk tea with tapioca pearls" },
      { name: "Fruit Smoothies", price: "₹200", description: "Freshly blended fruits with yogurt" },
    ],
  },
  {
    id: "food",
    name: "Food",
    items: [
      { name: "Gourmet Pizza", price: "₹350", description: "Thin crust pizza with premium toppings" },
      { name: "American Burger", price: "₹280", description: "Juicy beef patty with cheese and fresh veggies" },
      { name: "Pasta Bowl", price: "₹320", description: "Al dente pasta with your choice of sauce" },
    ],
  },
  {
    id: "desserts",
    name: "Desserts",
    items: [
      { name: "New York Cheesecake", price: "₹220", description: "Creamy cheesecake with graham cracker crust" },
      { name: "Chocolate Brownie", price: "₹180", description: "Warm chocolate brownie with vanilla ice cream" },
      { name: "Ice Cream Sundae", price: "₹250", description: "Three scoops with toppings and whipped cream" },
    ],
  },
]

function FoodItem({ position, name, price, description, rotation = [0, 0, 0] }) {
  const itemRef = useRef()

  useFrame((state) => {
    if (itemRef.current) {
      itemRef.current.rotation.y = state.clock.getElapsedTime() * 0.3
    }
  })

  return (
    <group position={position} rotation={rotation}>
      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
        <group ref={itemRef}>
          {/* Food Item Base */}
          <mesh castShadow receiveShadow>
            <cylinderGeometry args={[1, 1, 0.2, 32]} />
            <meshStandardMaterial color="white" />
          </mesh>

          {/* Food Item Label */}
          <Text
            position={[0, 0.15, 0]}
            fontSize={0.2}
            color="black"
            font="/fonts/Geist_Bold.json"
            anchorX="center"
            anchorY="middle"
            maxWidth={1.8}
          >
            {name}
          </Text>

          {/* Food Item Price */}
          <Text
            position={[0, -0.05, 0]}
            fontSize={0.15}
            color="#4E342E"
            font="/fonts/Geist_Regular.json"
            anchorX="center"
            anchorY="middle"
          >
            {price}
          </Text>
        </group>
      </Float>
    </group>
  )
}

function MenuContent() {
  const [activeCategory, setActiveCategory] = useState("beverages")

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
        Our Menu
      </Text>

      {/* Menu Tabs */}
      <Html position={[0, 1.5, 0]} transform distanceFactor={10} className="w-96">
        <Tabs defaultValue="beverages" className="w-full" onValueChange={setActiveCategory}>
          <TabsList className="grid w-full grid-cols-3">
            {menuCategories.map((category) => (
              <TabsTrigger key={category.id} value={category.id} className="text-lg">
                {category.name}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </Html>

      {/* Food Items */}
      {activeCategory === "beverages" && (
        <>
          <FoodItem
            position={[-3, 0, 0]}
            name="Signature Coffee"
            price="₹180"
            description="Our house blend with a rich, smooth flavor"
          />
          <FoodItem
            position={[0, 0, 0]}
            name="Bubble Tea"
            price="₹220"
            description="Classic milk tea with tapioca pearls"
          />
          <FoodItem
            position={[3, 0, 0]}
            name="Fruit Smoothies"
            price="₹200"
            description="Freshly blended fruits with yogurt"
          />
        </>
      )}

      {activeCategory === "food" && (
        <>
          <FoodItem
            position={[-3, 0, 0]}
            name="Gourmet Pizza"
            price="₹350"
            description="Thin crust pizza with premium toppings"
          />
          <FoodItem
            position={[0, 0, 0]}
            name="American Burger"
            price="₹280"
            description="Juicy beef patty with cheese and fresh veggies"
          />
          <FoodItem
            position={[3, 0, 0]}
            name="Pasta Bowl"
            price="₹320"
            description="Al dente pasta with your choice of sauce"
          />
        </>
      )}

      {activeCategory === "desserts" && (
        <>
          <FoodItem
            position={[-3, 0, 0]}
            name="New York Cheesecake"
            price="₹220"
            description="Creamy cheesecake with graham cracker crust"
          />
          <FoodItem
            position={[0, 0, 0]}
            name="Chocolate Brownie"
            price="₹180"
            description="Warm chocolate brownie with vanilla ice cream"
          />
          <FoodItem
            position={[3, 0, 0]}
            name="Ice Cream Sundae"
            price="₹250"
            description="Three scoops with toppings and whipped cream"
          />
        </>
      )}

      {/* View Full Menu Button */}
      <Html position={[0, -2, 0]} transform distanceFactor={10}>
        <Button className="bg-black hover:bg-gray-800 text-white">View Full Menu</Button>
      </Html>

      {/* Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -3, 0]} receiveShadow>
        <planeGeometry args={[50, 50]} />
        <meshStandardMaterial color="#EFEBE9" />
      </mesh>
    </>
  )
}

export default function MenuScene() {
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
      <MenuContent />
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
