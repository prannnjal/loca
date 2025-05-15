"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { Menu, X, Search } from "lucide-react"

// Define the navigation items
const navItems = [
  { name: "HOME", href: "#home" },
  { name: "STATS", href: "#stats" },
  { name: "ABOUT", href: "#about" },
  { name: "MENU", href: "#menu" },
  { name: "FRANCHISE", href: "#franchise" },
  { name: "CONTACT", href: "#contact" },
]

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const [isScrolled, setIsScrolled] = useState(false)
  const scrollListenerRef = useRef(null)

  // Toggle mobile menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  // Close mobile menu when a link is clicked
  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  // Handle smooth scrolling
  const handleNavClick = (e, href) => {
    e.preventDefault()
    closeMenu()

    if (typeof window !== "undefined") {
      const targetId = href.replace("#", "")
      const element = document.getElementById(targetId)

      if (element) {
        const offsetTop = element.getBoundingClientRect().top + window.pageYOffset
        window.scrollTo({
          top: offsetTop - 80, // Adjust for header height
          behavior: "smooth",
        })
        setActiveSection(targetId)
      }
    }
  }

  // Update active section based on scroll position
  useEffect(() => {
    // Define the scroll handler
    const handleScroll = () => {
      if (typeof window === "undefined") return

      setIsScrolled(window.scrollY > 10)

      // Find the current active section
      const sections = ["home", "stats", "about", "menu", "franchise", "contact"]

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    // Only add event listener on client side
    if (typeof window !== "undefined") {
      // Store the handler reference
      scrollListenerRef.current = handleScroll

      // Add event listener
      window.addEventListener("scroll", scrollListenerRef.current)

      // Initial call to set correct state
      handleScroll()

      // Cleanup function
      return () => {
        if (scrollListenerRef.current) {
          window.removeEventListener("scroll", scrollListenerRef.current)
        }
      }
    }
  }, [])

  return (
    <header className={`bg-white sticky top-0 z-50 transition-shadow duration-300 ${isScrolled ? "shadow-md" : ""}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="#home" className="flex-shrink-0 flex items-center" onClick={(e) => handleNavClick(e, "#home")}>
              <div className="relative h-10 w-10 mr-2">
                <div className="absolute inset-0 bg-black flex items-center justify-center text-white font-bold">
                  <span className="text-xs">FG</span>
                </div>
              </div>
              <span className="font-bold text-lg">Frankart Global</span>
            </Link>
          </div>

          <nav className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`text-gray-900 hover:text-gray-600 px-3 py-2 text-sm font-medium ${
                  activeSection === item.href.replace("#", "") ? "border-b-2 border-black" : ""
                }`}
                onClick={(e) => handleNavClick(e, item.href)}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="flex items-center">
            <button
              className="p-2 rounded-full text-gray-500 hover:text-gray-900 focus:outline-none"
              onClick={() => alert("Search functionality coming soon!")}
            >
              <Search className="h-5 w-5" />
            </button>
            <div className="md:hidden ml-2">
              <button
                onClick={toggleMenu}
                className="p-2 rounded-full text-gray-500 hover:text-gray-900 focus:outline-none"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`block px-3 py-2 text-base font-medium text-gray-900 hover:bg-gray-50 rounded-md ${
                  activeSection === item.href.replace("#", "") ? "bg-gray-100" : ""
                }`}
                onClick={(e) => handleNavClick(e, item.href)}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}
