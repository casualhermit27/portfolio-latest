"use client"

import { useState, useEffect, useRef } from "react"
import { useTheme } from "next-themes"
import { Sun, Moon } from "lucide-react"
import { gsap } from "gsap"

interface ThemeSwitcherProps {
  isHidden?: boolean
}

export function ThemeSwitcher({ isHidden = false }: ThemeSwitcherProps) {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()
  const toggleRef = useRef<HTMLButtonElement>(null)
  const sliderRef = useRef<HTMLDivElement>(null)
  const iconContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (mounted && sliderRef.current && iconContainerRef.current) {
      const isDark = theme === "dark"
      
      // Animate slider position
      gsap.to(sliderRef.current, {
        x: isDark ? 30 : 0,
        duration: 0.4,
        ease: "power2.out"
      })
      
      // Animate icon container
      gsap.to(iconContainerRef.current, {
        rotation: isDark ? 180 : 0,
        scale: 0.9,
        duration: 0.2,
        ease: "power2.in",
        onComplete: () => {
          gsap.to(iconContainerRef.current, {
            scale: 1,
            duration: 0.3,
            ease: "back.out(1.7)"
          })
        }
      })
    }
  }, [theme, mounted])

  const toggleTheme = () => {
    if (toggleRef.current) {
      // Satisfying click animation
      gsap.to(toggleRef.current, {
        scale: 0.95,
        duration: 0.1,
        ease: "power2.out",
        yoyo: true,
        repeat: 1
      })
    }
    
    // Temporarily disable transitions to prevent flicker
    document.documentElement.classList.add('theme-transition-disable')
    
    // Small delay to ensure class is applied before theme change
    setTimeout(() => {
      setTheme(theme === "dark" ? "light" : "dark")
      
      // Re-enable transitions after theme change
      setTimeout(() => {
        document.documentElement.classList.remove('theme-transition-disable')
      }, 100)
    }, 10)
  }

  if (!mounted) {
    return null
  }

  const isDark = theme === "dark"

      return (
      <button
        ref={toggleRef}
        onClick={toggleTheme}
        className={`fixed top-8 right-8 z-[9999] group transition-all duration-300 ${
          isHidden ? 'opacity-0 pointer-events-none scale-75' : 'opacity-100 pointer-events-auto scale-100'
        }`}
        aria-label="Toggle theme"
      >
        {/* Toggle Container */}
        <div 
          className="relative w-16 h-8 rounded-full border-2 transition-all duration-300 hover:scale-105"
          style={{
            backgroundColor: isDark ? '#374151' : '#e5e7eb',
            borderColor: isDark ? '#4b5563' : '#d1d5db',
          }}
        >
          
          {/* Sliding Indicator */}
          <div
            ref={sliderRef}
            className="absolute top-0.5 left-0.5 w-6 h-6 rounded-full transition-all duration-400 flex items-center justify-center"
            style={{
              backgroundColor: isDark ? '#1f2937' : '#ffffff',
              boxShadow: isDark 
                ? '0 2px 8px rgba(0, 0, 0, 0.3)' 
                : '0 2px 8px rgba(0, 0, 0, 0.1)',
            }}
          >
            {/* Icon Container */}
            <div
              ref={iconContainerRef}
              className="flex items-center justify-center"
            >
              {/* Sun Icon */}
              <Sun 
                size={14} 
                className={`absolute transition-opacity duration-300 ${
                  isDark ? 'opacity-0 text-gray-400' : 'opacity-100 text-yellow-600'
                }`}
              />
              
              {/* Moon Icon */}
              <Moon 
                size={14} 
                className={`absolute transition-opacity duration-300 ${
                  isDark ? 'opacity-100 text-blue-400' : 'opacity-0 text-gray-400'
                }`}
              />
            </div>
          </div>
        </div>
        
        {/* Floating Label */}
        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <span className="text-xs text-[var(--text-tertiary)] font-medium whitespace-nowrap">
            {isDark ? 'Light Mode' : 'Dark Mode'}
          </span>
        </div>
      </button>
    )
} 