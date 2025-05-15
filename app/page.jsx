"use client"

import { useEffect, useState } from "react"
import dynamic from "next/dynamic"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import ContactForm from "@/components/contact-form"
import { Phone, Mail, ChevronRight, Zap, Coffee, Award, Star, Info, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"

// Dynamically import the map component to avoid SSR issues
const LocationMap = dynamic(() => import("@/components/location-map"), {
  ssr: false,
  loading: () => (
    <div className="h-[500px] bg-gray-100 flex items-center justify-center">
      <div className="text-center">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-black border-r-transparent"></div>
        <p className="mt-4 text-gray-700">Loading map...</p>
      </div>
    </div>
  ),
})

// Only load 3D components when explicitly requested
const HeroScene = dynamic(() => import("@/components/3d/hero-scene"), {
  ssr: false,
  loading: () => <StaticLoadingIndicator text="Loading 3D Hero..." />,
})

const StatsScene = dynamic(() => import("@/components/3d/stats-scene"), {
  ssr: false,
  loading: () => <StaticLoadingIndicator text="Loading 3D Stats..." />,
})

const AboutScene = dynamic(() => import("@/components/3d/about-scene"), {
  ssr: false,
  loading: () => <StaticLoadingIndicator text="Loading 3D About..." />,
})

const MenuScene = dynamic(() => import("@/components/3d/menu-scene"), {
  ssr: false,
  loading: () => <StaticLoadingIndicator text="Loading 3D Menu..." />,
})

function StaticLoadingIndicator({ text }) {
  return (
    <div className="h-full w-full flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-black border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
        <p className="mt-4 text-lg font-medium text-gray-700">{text}</p>
        <p className="text-sm text-gray-500 mt-2">This may take a moment</p>
      </div>
    </div>
  )
}

export default function Home() {
  const [isMounted, setIsMounted] = useState(false)
  const [use3D, setUse3D] = useState(false)
  const [activeMenuTab, setActiveMenuTab] = useState("beverages")

  // Only enable client-side features after hydration
  useEffect(() => {
    setIsMounted(true)
  }, [])

  const toggle3DMode = () => {
    setUse3D(!use3D)
  }

  // Menu data
  const menuCategories = [
    {
      id: "beverages",
      name: "Beverages",
      items: [
        { name: "Signature Coffee", price: "₹180", description: "Our house blend with a rich, smooth flavor" },
        { name: "Bubble Tea", price: "₹220", description: "Classic milk tea with tapioca pearls" },
        { name: "Fruit Smoothies", price: "₹200", description: "Freshly blended fruits with yogurt" },
        { name: "Iced Latte", price: "₹190", description: "Espresso with cold milk and ice" },
        { name: "Hot Chocolate", price: "₹170", description: "Rich chocolate with steamed milk and whipped cream" },
      ],
    },
    {
      id: "food",
      name: "Food",
      items: [
        { name: "Gourmet Pizza", price: "₹350", description: "Thin crust pizza with premium toppings" },
        { name: "American Burger", price: "₹280", description: "Juicy beef patty with cheese and fresh veggies" },
        { name: "Pasta Bowl", price: "₹320", description: "Al dente pasta with your choice of sauce" },
        { name: "Club Sandwich", price: "₹250", description: "Triple-decker sandwich with chicken and bacon" },
        { name: "Caesar Salad", price: "₹220", description: "Crisp romaine lettuce with our signature dressing" },
      ],
    },
    {
      id: "desserts",
      name: "Desserts",
      items: [
        { name: "New York Cheesecake", price: "₹220", description: "Creamy cheesecake with graham cracker crust" },
        { name: "Chocolate Brownie", price: "₹180", description: "Warm chocolate brownie with vanilla ice cream" },
        { name: "Ice Cream Sundae", price: "₹250", description: "Three scoops with toppings and whipped cream" },
        { name: "Tiramisu", price: "₹230", description: "Classic Italian dessert with coffee-soaked ladyfingers" },
        { name: "Apple Pie", price: "₹200", description: "Warm apple pie with a scoop of vanilla ice cream" },
      ],
    },
  ]

  return (
    <div className="flex min-h-screen flex-col bg-white">
      {/* Top bar */}
      <div className="bg-black text-white py-2 px-4 flex justify-between items-center text-sm z-50 relative">
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <Phone className="h-4 w-4 mr-2" />
            <span>+91 9971153336</span>
          </div>
          <div className="hidden md:flex items-center">
            <Mail className="h-4 w-4 mr-2" />
            <span>info@frankart.global</span>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <Navbar />

      {/* 3D Mode Toggle */}
      <Button
        variant="outline"
        size="sm"
        className={`fixed bottom-4 right-4 z-50 ${use3D ? "bg-yellow-100 border-yellow-400" : "bg-white"}`}
        onClick={toggle3DMode}
      >
        <Zap className={`h-4 w-4 mr-2 ${use3D ? "text-yellow-600" : "text-gray-600"}`} />
        {use3D ? "3D Mode: On" : "Enable 3D Mode"}
      </Button>

      {/* Hero Section */}
      <section id="home" className="relative">
        <div className="h-screen w-full">
          {isMounted && use3D ? (
            <HeroScene />
          ) : (
            <div className="h-full w-full flex items-center justify-center bg-gray-50">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div>
                    <div className="flex justify-start mb-8">
                      <div className="relative h-24 w-24 border-2 border-black">
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <span className="text-4xl font-bold">ZO</span>
                          <span className="text-4xl font-bold">CA</span>
                        </div>
                      </div>
                    </div>
                    <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                      <span className="block">Experience the</span>
                      <span className="block text-black">Urban Cafe Culture</span>
                    </h1>
                    <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl">
                      A High-End Urban Cafe and an extremely popular cafe among youngsters. The primary focus was on
                      giving a cute, cosy vibe to the cafe while curating a true-blue American menu.
                    </p>
                    <div className="mt-5 sm:mt-8 sm:flex sm:justify-start">
                      <div className="rounded-md shadow">
                        <Button
                          className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-black hover:bg-gray-800 md:py-4 md:text-lg md:px-10"
                          onClick={() => {
                            const menuSection = document.getElementById("menu")
                            if (menuSection) menuSection.scrollIntoView({ behavior: "smooth" })
                          }}
                        >
                          Our Menu
                        </Button>
                      </div>
                      <div className="mt-3 sm:mt-0 sm:ml-3">
                        <Button
                          variant="outline"
                          className="w-full flex items-center justify-center px-8 py-3 border border-black text-base font-medium rounded-md text-black bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10"
                          onClick={() => {
                            const locationsSection = document.getElementById("locations")
                            if (locationsSection) locationsSection.scrollIntoView({ behavior: "smooth" })
                          }}
                        >
                          Find Location <ChevronRight className="ml-2 h-5 w-5" />
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="relative h-64 sm:h-72 md:h-96 overflow-hidden rounded-lg shadow-xl">
                    <Image
                      src="/placeholder.svg?height=800&width=1200"
                      alt="ZOCA Cafe"
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Stats Section */}
      <section id="stats" className="py-16 bg-gray-50">
        {isMounted && use3D ? (
          <div className="h-screen w-full">
            <StatsScene />
          </div>
        ) : (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Achievements</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                We've come a long way since our founding. Here are some of our key milestones and achievements.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-lg shadow-sm text-center">
                <div className="flex justify-center mb-4">
                  <div className="bg-black rounded-full p-4">
                    <Coffee className="h-10 w-10 text-white" />
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-2">Established in 2015</h3>
                <p className="text-gray-600">More than 5 years in existence</p>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-sm text-center">
                <div className="flex justify-center mb-4">
                  <div className="bg-black rounded-full p-4">
                    <Award className="h-10 w-10 text-white" />
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-2">Successfully running 135+ outlets</h3>
                <p className="text-gray-600">PAN India</p>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-sm text-center">
                <div className="flex justify-center mb-4">
                  <div className="bg-black rounded-full p-4">
                    <Star className="h-10 w-10 text-white" />
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-2">4.4 star rated</h3>
                <p className="text-gray-600">on Swiggy and Zomato</p>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* About Section */}
      <section id="about" className="py-16 bg-white">
        {isMounted && use3D ? (
          <div className="h-screen w-full">
            <AboutScene />
          </div>
        ) : (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="flex justify-start mb-6">
                  <div className="bg-black rounded-full p-4">
                    <Info className="h-8 w-8 text-white" />
                  </div>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">About ZOCA</h2>
                <p className="text-gray-600 mb-4">
                  ZOCA is a High-End Urban Cafe and an extremely popular cafe among youngsters. The primary focus was on
                  giving a cute, cosy vibe to the cafe while curating a true-blue American menu.
                </p>
                <p className="text-gray-600 mb-6">
                  Our cafes provide a perfect blend of comfort and style, making it an ideal spot for casual meetings,
                  work sessions, or simply enjoying a great cup of coffee with friends.
                </p>
                <Button
                  className="bg-black hover:bg-gray-800 text-white"
                  onClick={() => {
                    const menuSection = document.getElementById("menu")
                    if (menuSection) menuSection.scrollIntoView({ behavior: "smooth" })
                  }}
                >
                  Learn More <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
              <div className="relative h-96 rounded-lg overflow-hidden shadow-xl">
                <Image
                  src="/placeholder.svg?height=600&width=800"
                  alt="ZOCA Cafe Interior"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Menu Section */}
      <section id="menu" className="py-16 bg-gray-50">
        {isMounted && use3D ? (
          <div className="h-screen w-full">
            <MenuScene />
          </div>
        ) : (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Menu</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Explore our diverse menu featuring signature coffees, gourmet food, and delectable desserts.
              </p>
            </div>

            <Tabs
              defaultValue="beverages"
              className="w-full max-w-4xl mx-auto"
              onValueChange={setActiveMenuTab}
              value={activeMenuTab}
            >
              <TabsList className="grid w-full grid-cols-3 mb-8">
                {menuCategories.map((category) => (
                  <TabsTrigger key={category.id} value={category.id} className="text-lg">
                    {category.name}
                  </TabsTrigger>
                ))}
              </TabsList>

              {menuCategories.map((category) => (
                <TabsContent key={category.id} value={category.id} className="mt-0">
                  <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="relative h-48">
                      <Image
                        src={`/placeholder.svg?height=300&width=800`}
                        alt={category.name}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                        <h3 className="text-3xl font-bold text-white">{category.name}</h3>
                      </div>
                    </div>
                    <div className="p-6">
                      <ul className="space-y-4">
                        {category.items.map((item) => (
                          <li key={item.name} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                            <div className="flex justify-between items-center">
                              <span className="font-medium text-lg">{item.name}</span>
                              <span className="font-bold">{item.price}</span>
                            </div>
                            <p className="text-gray-600 text-sm mt-1">{item.description}</p>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        )}
      </section>

      {/* Locations Section with Google Map */}
      <section id="locations" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex justify-center mb-4">
              <div className="bg-black rounded-full p-4">
                <MapPin className="h-8 w-8 text-white" />
              </div>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Locations</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Find a ZOCA cafe near you. We have over 135 outlets across India, ready to serve you our signature coffee
              and delicious food.
            </p>
          </div>

          {/* Google Map Component */}
          <LocationMap />
        </div>
      </section>

      {/* Franchise Section */}
      <section id="franchise" className="py-16 px-4 md:px-8 bg-gray-900 text-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Become a ZOCA Franchise Partner</h2>
              <p className="text-gray-300 mb-6">
                Join the successful ZOCA family with over 135+ outlets across India. We provide comprehensive support to
                ensure your franchise success.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <ChevronRight className="h-5 w-5 mr-2 text-gray-400 mt-0.5" />
                  <span>Complete business setup and training</span>
                </li>
                <li className="flex items-start">
                  <ChevronRight className="h-5 w-5 mr-2 text-gray-400 mt-0.5" />
                  <span>Marketing and operational support</span>
                </li>
                <li className="flex items-start">
                  <ChevronRight className="h-5 w-5 mr-2 text-gray-400 mt-0.5" />
                  <span>Proven business model with high ROI</span>
                </li>
              </ul>
              <Button className="bg-white text-black hover:bg-gray-200">Franchise Enquiry</Button>
            </div>
            <div className="relative h-[400px] rounded-lg overflow-hidden">
              <Image src="/placeholder.svg?height=400&width=600" alt="ZOCA Franchise" fill className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 px-4 md:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Get In Touch</h2>
              <p className="text-gray-600 mb-8">
                Have questions about ZOCA or interested in franchising opportunities? Reach out to us.
              </p>

              <div className="space-y-4">
                <div className="flex items-start">
                  <Phone className="h-5 w-5 mr-3 text-black mt-1" />
                  <div>
                    <h3 className="font-bold">Phone</h3>
                    <p className="text-gray-600">+91 9971153336</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Mail className="h-5 w-5 mr-3 text-black mt-1" />
                  <div>
                    <h3 className="font-bold">Email</h3>
                    <p className="text-gray-600">info@frankart.global</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-4">Send us a message</h3>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  )
}
