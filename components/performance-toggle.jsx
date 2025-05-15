"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Zap } from "lucide-react"

export default function PerformanceToggle({ onToggle }) {
  const [isLiteMode, setIsLiteMode] = useState(false)

  useEffect(() => {
    // Check if user has previously set a preference
    const savedPreference = localStorage.getItem("zoca-lite-mode")
    if (savedPreference) {
      setIsLiteMode(savedPreference === "true")
      if (onToggle) onToggle(savedPreference === "true")
    }
  }, [onToggle])

  const togglePerformanceMode = () => {
    const newMode = !isLiteMode
    setIsLiteMode(newMode)
    localStorage.setItem("zoca-lite-mode", String(newMode))
    if (onToggle) onToggle(newMode)
  }

  return (
    <Button
      variant="outline"
      size="sm"
      className={`fixed bottom-4 right-4 z-50 ${isLiteMode ? "bg-yellow-100 border-yellow-400" : "bg-white"}`}
      onClick={togglePerformanceMode}
    >
      <Zap className={`h-4 w-4 mr-2 ${isLiteMode ? "text-yellow-600" : "text-gray-600"}`} />
      {isLiteMode ? "Lite Mode: On" : "Lite Mode"}
    </Button>
  )
}
