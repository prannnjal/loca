"use client"

import { useState } from "react"
import Link from "next/link"
import { Instagram, Facebook, Twitter, Mail, Phone } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function Footer() {
  const { toast } = useToast()
  const [email, setEmail] = useState("")

  const handleSubscribe = (e) => {
    e.preventDefault()

    if (email) {
      toast({
        title: "Subscribed!",
        description: "Thank you for subscribing to our newsletter.",
      })
      setEmail("")
    }
  }

  // Update the handleNavClick function to safely check for DOM elements
  const handleNavClick = (e, href) => {
    e.preventDefault()

    if (typeof window !== "undefined") {
      const targetId = href.replace("#", "")
      const element = document.getElementById(targetId)

      if (element) {
        element.scrollIntoView({ behavior: "smooth" })
      }
    }
  }

  return (
    <footer className="bg-black text-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center">
              <div className="relative h-12 w-12 border-2 border-white mr-3">
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-lg font-bold">ZO</span>
                  <span className="text-lg font-bold">CA</span>
                </div>
              </div>
              <span className="text-xl font-bold">ZOCA</span>
            </div>
            <p className="text-gray-300 text-sm">
              A High-End Urban Cafe with a true-blue American menu and cozy atmosphere.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-300 hover:text-white">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-300 hover:text-white">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-300 hover:text-white">
                <Twitter className="h-5 w-5" />
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#about"
                  className="text-gray-300 hover:text-white text-sm"
                  onClick={(e) => handleNavClick(e, "#about")}
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="#menu"
                  className="text-gray-300 hover:text-white text-sm"
                  onClick={(e) => handleNavClick(e, "#menu")}
                >
                  Our Menu
                </Link>
              </li>
              <li>
                <Link
                  href="#franchise"
                  className="text-gray-300 hover:text-white text-sm"
                  onClick={(e) => handleNavClick(e, "#franchise")}
                >
                  Franchise
                </Link>
              </li>
              <li>
                <Link
                  href="#contact"
                  className="text-gray-300 hover:text-white text-sm"
                  onClick={(e) => handleNavClick(e, "#contact")}
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Contact</h3>
            <ul className="space-y-2">
              <li className="flex items-center text-gray-300 text-sm">
                <Phone className="h-4 w-4 mr-2" />
                +91 9971153336
              </li>
              <li className="flex items-center text-gray-300 text-sm">
                <Mail className="h-4 w-4 mr-2" />
                info@frankart.global
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Newsletter</h3>
            <p className="text-gray-300 text-sm mb-4">Subscribe to our newsletter for updates and offers.</p>
            <form className="flex" onSubmit={handleSubscribe}>
              <input
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="px-3 py-2 bg-gray-800 text-white rounded-l-md focus:outline-none focus:ring-2 focus:ring-white text-sm flex-1"
              />
              <button type="submit" className="bg-white text-black px-4 py-2 rounded-r-md font-medium text-sm">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-300 text-sm">&copy; {new Date().getFullYear()} ZOCA. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="#" className="text-gray-300 hover:text-white text-sm">
              Privacy Policy
            </Link>
            <Link href="#" className="text-gray-300 hover:text-white text-sm">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
