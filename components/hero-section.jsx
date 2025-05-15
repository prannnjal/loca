"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"
import { useRouter } from "next/navigation"

export default function HeroSection() {
  const router = useRouter()

  const handleMenuClick = (e) => {
    e.preventDefault()
    const menuSection = document.getElementById("menu")
    if (menuSection) {
      menuSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  const handleLocationClick = (e) => {
    e.preventDefault()
    const locationsSection = document.getElementById("locations")
    if (locationsSection) {
      locationsSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section className="relative bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
          <svg
            className="hidden lg:block absolute right-0 inset-y-0 h-full w-48 text-white transform translate-x-1/2"
            fill="currentColor"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <polygon points="50,0 100,0 50,100 0,100" />
          </svg>

          <div className="pt-10 sm:pt-16 lg:pt-8 xl:pt-16">
            <div className="sm:text-center lg:text-left px-4 sm:px-8 xl:pl-12">
              <div className="flex justify-center lg:justify-start mb-8">
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
              <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto lg:mx-0">
                A High-End Urban Cafe and an extremely popular cafe among youngsters. The primary focus was on giving a
                cute, cosy vibe to the cafe while curating a true-blue American menu.
              </p>
              <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                <div className="rounded-md shadow">
                  <Button
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-black hover:bg-gray-800 md:py-4 md:text-lg md:px-10"
                    onClick={handleMenuClick}
                  >
                    Our Menu
                  </Button>
                </div>
                <div className="mt-3 sm:mt-0 sm:ml-3">
                  <Button
                    variant="outline"
                    className="w-full flex items-center justify-center px-8 py-3 border border-black text-base font-medium rounded-md text-black bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10"
                    onClick={handleLocationClick}
                  >
                    Find Location <ChevronRight className="ml-2 h-5 w-5" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
        <div className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full">
          <Image src="/placeholder.svg?height=800&width=1200" alt="ZOCA Cafe" fill className="object-cover" priority />
        </div>
      </div>
    </section>
  )
}
