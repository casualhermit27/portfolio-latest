"use client"

import type React from "react"

import { useEffect, useState, useRef, lazy, Suspense } from "react"
import { Github, Linkedin, Mail, ArrowUpRight, ExternalLink, Code, X, ArrowLeft, ArrowRight, ThumbsUp } from "lucide-react"
import { gsap } from "gsap"
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { useRouter, useSearchParams } from 'next/navigation'

// Lazy load heavy components
const SimpleStyleGuide = lazy(() => import("@/components/simple-style-guide"))

const projects = [
  {
    title: "Insightix AI",
    type: "AI Analytics Platform",
    description: "AI-driven insights that transform your business",
    index: "01",
    hoverColor: "bg-[#E8F4FF]", // Soft blue
    accentColor: "#3B82F6", // Blue
    details: {
      overview:
        "A sophisticated AI analytics platform that unlocks the power of your data with AI-driven insights. Features a clean, modern interface with powerful analytics and visualization tools tailored for modern enterprises.",
      technologies: ["React", "Next.js", "Tailwind CSS", "TypeScript", "Data Visualization"],
      aiTools: ["Cursor", "v0", "Claude 3.5 Sonnet", "GPT-4"],
      features: ["AI-driven analytics", "Real-time data visualization", "Business intelligence", "Custom dashboards", "Enterprise scalability"],
      liveUrl: "https://insightx-ai.vercel.app/",
      codeUrl: "#",
      image: "/landings/hero insightx AI.png",
      fullWebsiteImage: "/landings/full_insightx.png",
    },
  },
  {
    title: "Eevolution",
    type: "E-commerce Platform",
    description: "Modern e-commerce with AI-powered recommendations",
    index: "02",
    hoverColor: "bg-[#FFF0E8]", // Light orange
    accentColor: "#F97316", // Orange
    details: {
      overview:
        "A cutting-edge e-commerce platform that revolutionizes online shopping with AI-powered product recommendations, seamless user experience, and advanced analytics. Built with modern web technologies for optimal performance and scalability.",
      technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Prisma"],
      aiTools: ["Cursor", "Lovable", "Gemini", "GPT-4 Turbo"],
      features: ["AI recommendations", "Smart search", "Real-time analytics", "Mobile-first design", "Payment integration"],
      liveUrl: "https://eevolution-wd2u.vercel.app/",
      codeUrl: "#",
      image: "/landings/hero_eevolution.png",
      fullWebsiteImage: "/landings/full_eevolution.png",
    },
  },
  {
    title: "Aimee",
    type: "AI Meeting Assistant",
    description: "AI-powered meeting notes and summaries",
    index: "03",
    hoverColor: "bg-[#E8F5F0]", // Light green
    accentColor: "#10B981", // Green
    details: {
      overview:
        "An intelligent AI meeting assistant that automatically captures notes, generates summaries, and extracts action items from your conversations. Focus on the discussion while Aimee handles the documentation.",
      technologies: ["React", "Next.js", "WebRTC", "TypeScript", "Tailwind CSS"],
      aiTools: ["Cursor", "Bolt", "GPT-4", "Claude 3 Opus"],
      features: ["AI transcription", "Auto-generated summaries", "Action item extraction", "Multi-platform integration", "Real-time processing"],
      liveUrl: "https://aimee-jo9p.vercel.app/",
      codeUrl: "#",
      image: "/landings/hero_aimee.png",
      fullWebsiteImage: "/landings/full_aimee.png",
    },
  },
  {
    title: "Spotly",
    type: "AI SEO Analysis Tool",
    description: "AI-powered SEO insights for landing pages",
    index: "04",
    hoverColor: "bg-[#F0FDF4]", // Light green
    accentColor: "#22C55E", // Lime Green
    details: {
      overview:
        "An AI-powered SEO analysis tool that combines visual design evaluation with technical SEO checks to maximize landing page performance. Upload screenshots or URLs to get comprehensive insights and actionable recommendations.",
      technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS", "SEO APIs"],
      aiTools: ["Cursor", "Replit", "Grok", "Claude Sonnet"],
      features: ["AI-powered analysis", "Visual design evaluation", "Technical SEO checks", "Performance metrics", "Actionable insights"],
      liveUrl: "https://seo-spotly.vercel.app/",
      codeUrl: "#",
      image: "/landings/hero_spotly.png",
      fullWebsiteImage: "/landings/full_spotly.png",
    },
  },
  {
    title: "Doze",
    type: "E-commerce Platform",
    description: "Marketplace with AI-powered recommendations",
    index: "05",
    hoverColor: "bg-[#FFE8E8]", // Light coral
    accentColor: "#EF4444", // Red
    details: {
      overview:
        "A full-featured e-commerce platform with AI-powered product recommendations and advanced inventory management.",
      technologies: ["Next.js", "Prisma", "Vercel", "OpenAI", "PostgreSQL"],
      aiTools: ["Cursor", "v0", "Claude 3 Opus", "GPT-4o"],
      features: ["AI recommendations", "Payment processing", "Inventory management", "Order tracking"],
      liveUrl: "https://doze.vercel.app/",
      codeUrl: "#",
      image: "/landings/hero_doze.png",
      fullWebsiteImage: "/landings/doze_full.png",
    },
  },
  {
    title: "Acme Health",
    type: "Digital Health Platform",
    description: "Comprehensive healthcare management system",
    index: "06",
    hoverColor: "bg-[#E8F5F0]", // Light green
    accentColor: "#10B981", // Green
    details: {
      overview:
        "A comprehensive digital health platform that reimagines healthcare delivery through streamlined, interoperable care. Features secure data exchange, unified digital workflows, and integrated LIMS (Laboratory Information Management System) for modern healthcare organizations.",
      technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Healthcare APIs"],
      aiTools: ["Cursor", "v0", "Claude 3.5 Sonnet", "GPT-4"],
      features: ["Digital Health Records", "LIMS Integration", "Secure Data Exchange", "Real-time Analytics", "Interoperable Care"],
      liveUrl: "https://acme-health-kappa.vercel.app/",
      codeUrl: "#",
      image: "/landings/acme_hero.png",
      fullWebsiteImage: "/landings/acme_full.png",
    },
  },
  {
    title: "Work in Progress",
    type: "Coming Soon",
    description: "New project in development",
    index: "07",
    hoverColor: "bg-[#F3E8FF]", // Light purple
    accentColor: "#8B5CF6", // Purple
    details: {
      overview: "A new project currently in development. Stay tuned for updates!",
      technologies: ["Coming Soon"],
      aiTools: ["Coming Soon"],
      features: ["Coming Soon"],
      liveUrl: "#",
      codeUrl: "#",
      image: "/placeholder.svg?height=400&width=600",
    },
  },
]

function PortfolioContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  const [hoveredProject, setHoveredProject] = useState<number | null>(null)
  const [selectedProject, setSelectedProject] = useState<number | null>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isAnimating, setIsAnimating] = useState(false)
  const [isFullscreenView, setIsFullscreenView] = useState(false)
  const [viewMode, setViewMode] = useState<'grid'>('grid')
  const [displayMode, setDisplayMode] = useState<'landings' | 'logos'>('landings')
  const [emailCopied, setEmailCopied] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)
  const [showPopup, setShowPopup] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [loadingProgress, setLoadingProgress] = useState(0)
  const [lastClickTime, setLastClickTime] = useState(0)

  // Refs for GSAP animations
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const mainContentRef = useRef<HTMLDivElement>(null)
  const projectDetailsRef = useRef<HTMLDivElement>(null)

  // URL state management
  useEffect(() => {
    const projectId = searchParams.get('project')
    if (projectId) {
      const projectIndex = parseInt(projectId)
      if (projectIndex >= 0 && projectIndex < projects.length) {
        setSelectedProject(projectIndex)
        setIsFullscreenView(true)
      }
    }
  }, [searchParams])

  // Update URL when project changes
  useEffect(() => {
    if (selectedProject !== null) {
      router.push(`?project=${selectedProject}`, { scroll: false })
    } else {
      router.push('/', { scroll: false })
    }
  }, [selectedProject, router])

  // Mobile detection helper
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768

  // Enhanced loading effect with smooth easing
  useEffect(() => {
    const startTime = Date.now()
    const duration = 2500 // 2.5 seconds for smoother feel
    
    // Smooth easing function for more natural progress
    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3)
    let lastProgress = 0
    
    const updateProgress = () => {
      const elapsed = Date.now() - startTime
      const rawProgress = Math.min(elapsed / duration, 1)
      const easedProgress = easeOutCubic(rawProgress) * 100
      const roundedProgress = Math.round(easedProgress)
      
      // Only update state if progress actually changed to reduce re-renders
      if (roundedProgress !== lastProgress) {
        setLoadingProgress(roundedProgress)
        lastProgress = roundedProgress
      }
      
      if (rawProgress < 1) {
        requestAnimationFrame(updateProgress)
      } else {
        // Add a small delay before hiding for smooth transition
        setTimeout(() => {
          setIsLoading(false)
          triggerPageAnimations()
        }, 300)
      }
    }
    
    requestAnimationFrame(updateProgress)
  }, [])

  // Function to trigger existing page animations after loading completes
  const triggerPageAnimations = () => {
    // The existing GSAP animations in the useEffect will automatically trigger
    // when the refs are available, so we don't need to do anything here
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    // Direct, immediate cursor tracking for smooth movement
    setMousePosition({
      x: e.clientX,
      y: e.clientY,
    })
  }

  const handleEmailCopy = async () => {
    try {
      await navigator.clipboard.writeText('harshachaganti12@gmail.com')
      setEmailCopied(true)
      setShowConfetti(true)

      // Keep the success state until page reload - no timeout reset
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement('textarea')
      textArea.value = 'harshachaganti12@gmail.com'
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand('copy')
      document.body.removeChild(textArea)

      setEmailCopied(true)
      setShowConfetti(true)
      setShowPopup(true)
      // Keep the success state until page reload - no timeout reset
    }
  }

  const handleProjectClick = (index: number) => {
    // Prevent multiple rapid clicks with debouncing
    const now = Date.now()
    if (isAnimating || (now - lastClickTime) < 300) return
    
    setLastClickTime(now)
    setIsAnimating(true)
    setSelectedProject(index)

    if (mainContentRef.current && projectDetailsRef.current) {
      // Set initial state properly
      gsap.set(projectDetailsRef.current, {
        y: "100%",
        autoAlpha: 0,
        pointerEvents: "none"
      })

      // Create a quick, smooth animation timeline with mobile optimizations
      const tl = gsap.timeline({
        onComplete: () => {
          setIsFullscreenView(true)
          setIsAnimating(false)
          // Enable pointer events after animation
          if (projectDetailsRef.current) {
            projectDetailsRef.current.style.pointerEvents = 'auto'
          }
        }
      })

      // Mobile-optimized animation sequence
      const isMobile = window.innerWidth < 768
      const duration = isMobile ? 0.2 : 0.3
      const ease = isMobile ? "power1.out" : "power2.out"

      tl.to(mainContentRef.current, {
        y: isMobile ? "-2%" : "-5%",
        scale: isMobile ? 0.995 : 0.99,
        autoAlpha: 0,
        duration: duration,
        ease: ease,
        force3D: true
      })
        .to(projectDetailsRef.current, {
          y: "0%",
          autoAlpha: 1,
          duration: duration,
          ease: ease,
          force3D: true
        }, "-=0.1") // Reduced overlap for mobile
    }
  }

  const closeFullscreenView = () => {
    // Prevent multiple rapid clicks
    if (isAnimating) return
    
    setIsAnimating(true)

    if (mainContentRef.current && projectDetailsRef.current) {
      const tl = gsap.timeline({
        onComplete: () => {
          setSelectedProject(null)
          setIsFullscreenView(false)
          setIsAnimating(false)
          // Update URL to go back to main
          router.push('/', { scroll: false })
          // Ensure proper cleanup
          if (projectDetailsRef.current) {
            projectDetailsRef.current.style.pointerEvents = 'none'
          }
        }
      })

      // Mobile-optimized close animation
      const isMobile = window.innerWidth < 768
      const duration = isMobile ? 0.2 : 0.3
      const ease = isMobile ? "power1.in" : "power2.in"

      tl.to(projectDetailsRef.current, {
        y: "100%",
        autoAlpha: 0,
        duration: duration,
        ease: ease,
        force3D: true
      })
        .to(mainContentRef.current, {
          y: "0%",
          scale: 1,
          autoAlpha: 1,
          duration: duration,
          ease: "power2.out",
          force3D: true
        }, "-=0.1") // Reduced overlap for mobile
    }
  }

  // Add a function to close fullscreen view
  const handleCloseFullscreen = () => {
    setSelectedProject(null)
    setIsFullscreenView(false)
    // Update URL to go back to main
    router.push('/', { scroll: false })
    // Reset main content style to ensure visibility
    if (mainContentRef.current) {
      mainContentRef.current.style.transform = 'translateY(0) scale(1)'
      mainContentRef.current.style.opacity = '1'
      mainContentRef.current.style.visibility = 'visible'
      mainContentRef.current.style.pointerEvents = 'auto'
    }
  }

  // Close panel on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeFullscreenView()
      }
    }

    if (selectedProject !== null) {
      document.addEventListener("keydown", handleEscape)
      return () => document.removeEventListener("keydown", handleEscape)
    }
  }, [selectedProject])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in")
          }
        })
      },
      { threshold: 0.2 },
    )

    const elements = document.querySelectorAll(".project-item")
    elements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  // GSAP Animation for title
  useEffect(() => {
    if (titleRef.current && subtitleRef.current && !isLoading) {
      // Create beautiful split text animation
      titleRef.current.innerHTML = `
        <div class="line-wrapper" style="overflow: hidden; padding-bottom: 0.3em;">
          <div class="line font-light italic transition-colors duration-300" style="transform: translateY(100%); color: inherit;">Harsha</div>
        </div>
        <div class="line-wrapper" style="overflow: hidden; padding-bottom: 0.2em;">
          <div class="line font-semibold transition-colors duration-300" style="transform: translateY(100%); color: inherit;">Chaganti</div>
        </div>
      `

      // Create animated subtitle with enhanced highlighted words
      subtitleRef.current.innerHTML = `
        <span class="highlight-word engineer-word transition-colors duration-300 font-light italic">Engineer + Designer</span> focused on building sharp <span class="highlight-word frontend-word transition-colors duration-300 font-light italic">frontends</span> and <span class="highlight-word ai-word transition-colors duration-300 font-light italic">AI-powered tools</span> with <span class="highlight-word speed-word transition-colors duration-300 font-light italic">speed</span>, <span class="highlight-word ux-word transition-colors duration-300 font-light italic">UX clarity</span>, and pixel-perfect execution.
      `

      // Enhanced animation timeline with mobile optimization
      const titleLines = titleRef.current.querySelectorAll('.line')
      const engineerWord = subtitleRef.current.querySelector('.engineer-word')
      const frontendWord = subtitleRef.current.querySelector('.frontend-word')
      const aiWord = subtitleRef.current.querySelector('.ai-word')
      const speedWord = subtitleRef.current.querySelector('.speed-word')
      const uxWord = subtitleRef.current.querySelector('.ux-word')

      const tl = gsap.timeline()

      // Set initial state
      gsap.set(titleRef.current, { opacity: 1 })
      gsap.set(subtitleRef.current, { opacity: 0, y: 20 })

      // Mobile-optimized but identical animations
      const isMobile = window.innerWidth < 768
      const titleDuration = isMobile ? 0.35 : 0.4
      const subtitleDuration = isMobile ? 0.25 : 0.3

      tl.to(titleLines, {
        y: 0,
        duration: titleDuration,
        ease: "back.out(1.7)",
        stagger: 0.05,
        delay: 0.1,
        force3D: true
      })
        .to(subtitleRef.current,
          {
            opacity: 1,
            y: 0,
            duration: subtitleDuration,
            ease: "power2.out",
            force3D: true
          },
          "-=0.2"
        )
        .call(() => {
          // Smooth continuous animation - no vanishing/coming back
          const words = [engineerWord, frontendWord, aiWord, speedWord, uxWord]
          const colors = ["#2563EB", "#10B981", "#EF4444"]

          // Set initial state - all words visible with first animation color
          gsap.set(words, {
            opacity: 1,
            y: 0,
            scale: 1,
            color: colors[0], // Start with blue
            textShadow: `0 0 12px ${colors[0]}40`
          })

          // Create a smooth, continuous animation timeline
          const masterTl = gsap.timeline({ repeat: -1 })

          // Smooth color transition animation with proper timing
          const colorTl = gsap.timeline({ repeat: -1 })

          // Mobile-optimized durations but same visual effect
          const colorDuration = isMobile ? 1.8 : 2.0
          const gapDuration = isMobile ? 0.8 : 1.0

          // Blue - 2 seconds
          colorTl.to(words, {
            color: colors[0], // Blue
            textShadow: `0 0 12px ${colors[0]}40`,
            duration: colorDuration,
            ease: "power2.inOut",
            stagger: {
              each: 0.1,
              from: "start"
            },
            force3D: true
          })

          // Green - 2 seconds  
          colorTl.to(words, {
            color: colors[1], // Green
            textShadow: `0 0 12px ${colors[1]}40`,
            duration: colorDuration,
            ease: "power2.inOut",
            stagger: {
              each: 0.1,
              from: "start"
            },
            force3D: true
          })

          // Red - 2 seconds
          colorTl.to(words, {
            color: colors[2], // Red
            textShadow: `0 0 12px ${colors[2]}40`,
            duration: colorDuration,
            ease: "power2.inOut",
            stagger: {
              each: 0.1,
              from: "start"
            },
            force3D: true
          })

          // Gap - 1 second pause so red stays at full clarity
          colorTl.to({}, { duration: gapDuration })

          // Subtle floating animation - continuous gentle movement
          gsap.to(words, {
            y: -2,
            duration: isMobile ? 2.2 : 2.5,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
            stagger: {
              each: 0.2,
              from: "random"
            },
            force3D: true
          })

          // Gentle scale pulsing - very subtle
          gsap.to(words, {
            scale: 1.02,
            duration: isMobile ? 2.8 : 3,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
            stagger: {
              each: 0.3,
              from: "random"
            },
            force3D: true
          })

          // Add hover interactions (desktop only)
          if (!isMobile) {
            words.forEach((word, index) => {
              if (word) {
                word.addEventListener('mouseenter', () => {
                  gsap.to(word, {
                    scale: 1.08,
                    y: -4,
                    rotation: 1,
                    color: colors[index],
                    textShadow: `0 0 20px ${colors[index]}60`,
                    duration: 0.4,
                    ease: "power2.out",
                    force3D: true
                  })
                })

                word.addEventListener('mouseleave', () => {
                  gsap.to(word, {
                    scale: 1,
                    y: 0,
                    rotation: 0,
                    color: "var(--text-primary)",
                    textShadow: "none",
                    duration: 0.4,
                    ease: "power2.out",
                    force3D: true
                  })
                })
              }
            })
          }
        })
    }
  }, [isLoading])

  return (
    <div className="min-h-screen bg-[var(--background)] relative overflow-hidden transition-colors duration-300">
      {/* Enhanced Loading Screen */}
      <AnimatePresence>
        {isLoading && (
          <motion.div 
            className="fixed inset-0 z-50 bg-[var(--background)] flex items-center justify-center"
            initial={{ opacity: 1 }}
            exit={{ 
              opacity: 0,
              scale: 1.05,
              transition: { 
                duration: 0.6, 
                ease: [0.25, 0.46, 0.45, 0.94] 
              }
            }}
          >
          <div className="text-center space-y-8">
            {/* Animated percentage with smooth transitions */}
            <motion.div 
              className="text-3xl font-mono text-[var(--text-primary)] font-light"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <motion.span
                key={loadingProgress}
                initial={{ scale: 1.02, opacity: 0.9 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ 
                  duration: 0.15, 
                  ease: "easeOut",
                  type: "tween"
                }}
                style={{ 
                  willChange: "transform, opacity",
                  backfaceVisibility: "hidden"
                }}
              >
                {loadingProgress}%
              </motion.span>
            </motion.div>

            {/* Enhanced progress bar with glow effect */}
            <div className="relative">
              <div className="w-64 h-2 bg-[var(--border)] rounded-full overflow-hidden shadow-inner">
                <motion.div 
                  className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full relative"
                  style={{ width: `${loadingProgress}%` }}
                  initial={{ width: 0 }}
                  animate={{ width: `${loadingProgress}%` }}
                  transition={{ 
                    duration: 0.4, 
                    ease: [0.25, 0.46, 0.45, 0.94] 
                  }}
                >
                  {/* Shimmer effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                    animate={{
                      x: ['-100%', '100%'],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                  
                  {/* Glow effect */}
                  <div className="absolute inset-0 rounded-full shadow-lg"
                    style={{
                      boxShadow: `0 0 20px rgba(147, 51, 234, 0.4), 0 0 40px rgba(59, 130, 246, 0.2)`
                    }}
                  />
                </motion.div>
              </div>
            </div>
          </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Texture Background */}
      <div className="fixed inset-0 w-full h-full pointer-events-none z-0 animated-gradient-bg" />

      {/* Tint overlay for texture */}
      <div className="fixed inset-0 w-full h-full bg-white/20 dark:bg-black/30 pointer-events-none z-1" />

      {/* Subtle overlay for better text readability */}
      <div className="fixed inset-0 w-full h-full bg-[var(--background)]/70 dark:bg-[var(--background)]/75 pointer-events-none z-5" />

      {/* Theme Switcher */}

      {/* Cursor Follower */}
      {hoveredProject !== null && !isFullscreenView && displayMode === 'landings' && (
        <div
          className="fixed pointer-events-none z-40 will-change-transform"
          style={{
            transform: `translate3d(${mousePosition.x + 20}px, ${mousePosition.y - 20}px, 0)`,
            transition: 'transform 0.12s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          }}
        >
          <div
            className="px-4 py-2 rounded-full text-sm font-medium shadow-xl text-white transition-all duration-200"
            style={{
              background: projects[hoveredProject].accentColor,
              border: `1px solid ${projects[hoveredProject].accentColor}80`,
            }}
          >
            {projects[hoveredProject].title === "Work in Progress" ? "Work in Progress" : "View Project"}
          </div>
        </div>
      )}

      {/* Main Content */}
      <div
        ref={mainContentRef}
        className="relative z-20 transform-gpu"
        style={{
          transform: isFullscreenView ? 'translateY(-5%) scale(0.99)' : 'translateY(0) scale(1)',
          opacity: isFullscreenView ? 0 : 1,
          visibility: isFullscreenView ? 'hidden' : 'visible',
          transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          pointerEvents: isFullscreenView ? 'none' : 'auto',
          zIndex: isFullscreenView ? 1 : 20
        }}
      >
        {/* Header Section */}
        <header className="pt-16 sm:pt-20 md:pt-24 pb-12 sm:pb-16 md:pb-20 px-4 sm:px-6 md:px-16 lg:px-24 xl:px-32 transition-colors duration-300">
          <div className="max-w-6xl mx-auto">
            <div className="mb-8 sm:mb-10 md:mb-12">
              <h1
                ref={titleRef}
                className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl text-[var(--text-primary)] leading-none tracking-tight mb-4 sm:mb-6 transition-colors duration-300"
              >
                <span className="block mb-1 sm:mb-2 font-light italic">Harsha</span>
                <span className="block font-semibold">Chaganti</span>
              </h1>
            </div>

            <div className="grid md:grid-cols-2 gap-8 sm:gap-10 md:gap-12 items-end">
              <div className="space-y-3 sm:space-y-4">
                <p
                  ref={subtitleRef}
                  className="text-base sm:text-lg md:text-xl text-[var(--text-secondary)] leading-relaxed font-normal transition-colors duration-300"
                >
                  <motion.span
                    className="inline-block font-light italic text-[var(--text-primary)] relative cursor-pointer"
                    animate={{
                      y: [0, -1, 0],
                      scale: [1, 1.01, 1]
                    }}
                    transition={{
                      duration: 6,
                      repeat: -1,
                      ease: "easeInOut"
                    }}
                    whileHover={{
                      scale: 1.05,
                      y: -3,
                      rotate: 1,
                      color: "#2563EB",
                      textShadow: "0 0 12px rgba(37, 99, 235, 0.4)",
                      transition: {
                        type: "spring",
                        stiffness: isMobile ? 400 : 300,
                        damping: isMobile ? 25 : 20
                      }
                    }}
                    whileTap={{
                      scale: 0.98,
                      transition: {
                        type: "spring",
                        stiffness: isMobile ? 400 : 300,
                        damping: isMobile ? 25 : 20
                      }
                    }}
                  >
                    Engineer + Designer
                  </motion.span> focused on building sharp{' '}
                  <motion.span
                    className="inline-block font-light italic text-[var(--text-primary)] relative cursor-pointer"
                    animate={{
                      y: [0, -1, 0],
                      scale: [1, 1.01, 1]
                    }}
                    transition={{
                      duration: 4,
                      repeat: -1,
                      ease: "easeInOut",
                      delay: 0.5
                    }}
                    whileHover={{
                      scale: 1.05,
                      y: -3,
                      rotate: 1,
                      color: "#10B981",
                      textShadow: "0 0 12px rgba(16, 185, 129, 0.4)",
                      transition: {
                        type: "spring",
                        stiffness: 300,
                        damping: 20
                      }
                    }}
                    whileTap={{
                      scale: 0.98,
                      transition: {
                        type: "spring",
                        stiffness: 300,
                        damping: 20
                      }
                    }}
                  >
                    frontends
                  </motion.span> and{' '}
                  <motion.span
                    className="inline-block font-light italic text-[var(--text-primary)] relative cursor-pointer"
                    animate={{
                      y: [0, -1, 0],
                      scale: [1, 1.01, 1]
                    }}
                    transition={{
                      duration: 4,
                      repeat: -1,
                      ease: "easeInOut",
                      delay: 1
                    }}
                    whileHover={{
                      scale: 1.05,
                      y: -3,
                      rotate: 1,
                      color: "#EF4444",
                      textShadow: "0 0 12px rgba(239, 68, 68, 0.4)",
                      transition: {
                        type: "spring",
                        stiffness: 300,
                        damping: 20
                      }
                    }}
                    whileTap={{
                      scale: 0.98,
                      transition: {
                        type: "spring",
                        stiffness: 300,
                        damping: 20
                      }
                    }}
                  >
                    AI-powered tools
                  </motion.span> with{' '}
                  <motion.span
                    className="inline-block font-light italic text-[var(--text-primary)] relative cursor-pointer"
                    animate={{
                      y: [0, -1, 0],
                      scale: [1, 1.01, 1]
                    }}
                    transition={{
                      duration: 4,
                      repeat: -1,
                      ease: "easeInOut",
                      delay: 1.5
                    }}
                    whileHover={{
                      scale: 1.05,
                      y: -3,
                      rotate: 1,
                      color: "#2563EB",
                      textShadow: "0 0 12px rgba(37, 99, 235, 0.4)",
                      transition: {
                        type: "spring",
                        stiffness: 300,
                        damping: 20
                      }
                    }}
                    whileTap={{
                      scale: 0.98,
                      transition: {
                        type: "spring",
                        stiffness: 300,
                        damping: 20
                      }
                    }}
                  >
                    speed
                  </motion.span>,{' '}
                  <motion.span
                    className="inline-block font-light italic text-[var(--text-primary)] relative cursor-pointer"
                    animate={{
                      y: [0, -1, 0],
                      scale: [1, 1.01, 1]
                    }}
                    transition={{
                      duration: 4,
                      repeat: -1,
                      ease: "easeInOut",
                      delay: 2
                    }}
                    whileHover={{
                      scale: 1.05,
                      y: -3,
                      rotate: 1,
                      color: "#10B981",
                      textShadow: "0 0 12px rgba(16, 185, 129, 0.4)",
                      transition: {
                        type: "spring",
                        stiffness: 300,
                        damping: 20
                      }
                    }}
                    whileTap={{
                      scale: 0.98,
                      transition: {
                        type: "spring",
                        stiffness: 300,
                        damping: 20
                      }
                    }}
                  >
                    UX clarity
                  </motion.span>, and pixel-perfect execution.
                </p>
              </div>

              <div className="flex justify-start sm:justify-end relative">
                <motion.button
                  onClick={handleEmailCopy}
                  className={`group relative px-8 py-4 rounded-full font-medium text-lg transition-all duration-300 will-change-auto shadow-lg hover:shadow-xl overflow-hidden ${
                    emailCopied 
                      ? 'bg-green-500 text-white' 
                      : 'bg-white text-gray-900 hover:bg-purple-600 hover:text-white'
                  }`}
                  whileHover={!emailCopied ? {
                    y: -2,
                    boxShadow: "0 8px 25px rgba(147, 51, 234, 0.3)"
                  } : {}}
                  whileTap={{ scale: 0.98 }}
                  animate={emailCopied ? {
                    scale: [1, 1.05, 1],
                    boxShadow: [
                      "0 4px 20px rgba(34, 197, 94, 0.3)",
                      "0 8px 30px rgba(34, 197, 94, 0.4)",
                      "0 4px 20px rgba(34, 197, 94, 0.3)"
                    ]
                  } : {
                    boxShadow: [
                      "0 4px 20px rgba(0,0,0,0.1)",
                      "0 6px 25px rgba(147, 51, 234, 0.15)",
                      "0 4px 20px rgba(0,0,0,0.1)"
                    ]
                  }}
                  transition={{
                    boxShadow: {
                      duration: 2.5,
                      repeat: -1,
                      ease: "easeInOut"
                    }
                  }}
                >
                  {/* Success background animation */}
                  {emailCopied && (
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-500"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}

                  {/* Content container */}
                  <div className="relative z-10 flex items-center gap-2">
                    <motion.span
                      animate={emailCopied ? {
                        y: [0, -2, 0],
                      } : {
                        x: [0, 2, 0],
                        y: [0, -1, 0]
                      }}
                      transition={emailCopied ? {
                        duration: 0.6,
                        ease: "easeInOut"
                      } : {
                        duration: 1.8,
                        repeat: -1,
                        ease: "easeInOut"
                      }}
                    >
                      {emailCopied ? "Email Copied!" : "Get in Touch"}
                    </motion.span>

                    <motion.div
                      className="w-5 h-5 flex items-center justify-center"
                      animate={emailCopied ? {
                        scale: [1, 1.2, 1],
                        rotate: [0, 0, 0]
                      } : {
                        rotate: [0, 15, -15, 0],
                        scale: 1
                      }}
                      transition={emailCopied ? {
                        duration: 0.4,
                        ease: "easeInOut"
                      } : {
                        duration: 3,
                        repeat: -1,
                        ease: "easeInOut"
                      }}
                    >
                      {emailCopied ? (
                        <motion.div
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ duration: 0.4, delay: 0.1 }}
                        >
                          <ThumbsUp className="text-white w-5 h-5" />
                        </motion.div>
                      ) : (
                        <ArrowUpRight className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                      )}
                    </motion.div>
                  </div>

                  {/* Shimmer effect on success */}
                  {emailCopied && (
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                      initial={{ x: '-100%' }}
                      animate={{ x: '100%' }}
                      transition={{ duration: 0.8, delay: 0.3 }}
                    />
                  )}
                </motion.button>

                {/* Confetti around button */}
                {showConfetti && (
                  <div className="absolute inset-0 pointer-events-none">
                    {[...Array(15)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-3 h-3 rounded-full"
                        style={{
                          backgroundColor: ['#6366F1', '#8B5CF6', '#EC4899', '#F59E0B', '#10B981', '#F97316', '#EF4444'][i % 7],
                          left: '50%',
                          top: '50%'
                        }}
                        initial={{
                          x: 0,
                          y: 0,
                          scale: 0,
                          rotate: 0
                        }}
                        animate={{
                          x: (Math.random() - 0.5) * 150,
                          y: (Math.random() - 0.5) * 100 - 50,
                          scale: [0, 1.2, 0.8, 0],
                          rotate: [0, 180, 360]
                        }}
                        transition={{
                          duration: 1.5,
                          delay: i * 0.05,
                          ease: "easeOut"
                        }}
                      />
                    ))}
                  </div>
                )}

              </div>
            </div>
          </div>
        </header>

        {/* Projects Section */}
        <section className="px-4 sm:px-6 md:px-16 lg:px-24 xl:px-32 pb-16 sm:pb-20 md:pb-24 transition-colors duration-300">
          <div className="max-w-6xl mx-auto">
            {/* Section Header */}
            <div className="mb-12 sm:mb-16 md:mb-20">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 sm:mb-8 gap-4 sm:gap-0">
                <motion.h2
                  className="text-2xl sm:text-3xl md:text-4xl font-normal text-[var(--text-primary)]"
                  animate={{
                    textShadow: [
                      "0 0 0px rgba(0, 0, 0, 0)",
                      "0 0 20px rgba(0, 0, 0, 0.1)",
                      "0 0 0px rgba(0, 0, 0, 0)"
                    ]
                  }}
                  transition={{
                    duration: 7,
                    repeat: -1,
                    ease: "easeInOut"
                  }}
                >
                  Selected Work
                </motion.h2>

                {/* Display Mode Switch */}
                <div className="bg-[var(--card)] rounded-full p-1 border border-[var(--border)] w-full sm:w-auto">
                  <div className="flex">
                    <button
                      onClick={() => setDisplayMode('landings')}
                      className={`flex-1 sm:flex-none px-4 sm:px-6 py-2 sm:py-3 rounded-full text-sm font-medium transition-all duration-300 ${displayMode === 'landings'
                        ? 'bg-[var(--text-primary)] text-[var(--background)] shadow-lg'
                        : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                        }`}
                    >
                      Landings
                    </button>
                    <button
                      onClick={() => setDisplayMode('logos')}
                      className={`flex-1 sm:flex-none px-4 sm:px-6 py-2 sm:py-3 rounded-full text-sm font-medium transition-all duration-300 ${displayMode === 'logos'
                        ? 'bg-[var(--text-primary)] text-[var(--background)] shadow-lg'
                        : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                        }`}
                    >
                      Logos
                    </button>
                  </div>
                </div>
              </div>
              <motion.div
                className="w-full h-px bg-white/20 my-12"
                animate={{
                  scaleX: [1, 1.1, 1],
                  opacity: [0.6, 1, 0.6]
                }}
                transition={{
                  duration: 3,
                  repeat: -1,
                  ease: "easeInOut"
                }}
              />
            </div>

            {/* Projects Grid */}
            <motion.div
              key="grid"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className={`grid gap-4 sm:gap-6 mt-8 sm:mt-10 md:mt-12 ${displayMode === 'logos'
                ? 'grid-cols-2'
                : 'grid-cols-1 sm:grid-cols-2'
                }`}
            >
              {projects.filter((project, index) =>
                displayMode === 'landings' ? index < 7 : (project.index === "02" || project.index === "04" || project.index === "06")
              ).map((project, index) => (
                <motion.div
                  key={index}
                  className="w-full"
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{
                    duration: 0.4,
                    ease: [0.25, 0.46, 0.45, 0.94],
                    delay: index * 0.05,
                    type: "spring",
                    stiffness: 120,
                    damping: 15
                  }}
                  whileHover={{
                    transition: { duration: 0.2, ease: "easeOut" }
                  }}
                  whileTap={{ 
                    scale: 0.98,
                    transition: { duration: 0.1 }
                  }}
                  onClick={project.title !== "Work in Progress" ? () => handleProjectClick(index) : undefined}
                  style={{
                    WebkitTapHighlightColor: 'transparent',
                    WebkitTouchCallout: 'none',
                    WebkitUserSelect: 'none',
                    userSelect: 'none'
                  }}
                >
                  <div
                    className={`relative overflow-hidden rounded-lg group ${displayMode === 'logos' || project.title === "Work in Progress" ? 'cursor-default' : 'cursor-pointer'
                      }`}
                    style={{
                      backgroundColor: project.accentColor + '10',
                      border: `1px solid ${project.accentColor}20`,
                      touchAction: 'manipulation'
                    }}
                    onMouseEnter={() => setHoveredProject(index)}
                    onMouseLeave={() => setHoveredProject(null)}
                    onMouseMove={handleMouseMove}
                  >
                    {/* Image placeholder with project accent - responsive aspect ratio */}
                    <div
                      className={`bg-gradient-to-br from-[var(--card)] to-[var(--background)] flex items-center justify-center relative overflow-hidden rounded-lg border ${displayMode === 'logos' ? 'aspect-square' : 'aspect-[3/2]'
                        }`}
                      style={{
                        borderColor: project.accentColor + '30',
                        background: displayMode === 'landings'
                          ? (project.title === "Work in Progress"
                            ? `linear-gradient(135deg, ${project.accentColor}15, ${project.accentColor}05)`
                            : project.index === "01"
                              ? `url('/landings/hero insightx AI.png') center/cover no-repeat`
                              : project.index === "02"
                                ? `url('/landings/hero_eevolution.png') center/cover no-repeat`
                                : project.index === "03"
                                  ? `url('/landings/hero_aimee.png') center/cover no-repeat`
                                  : project.index === "04"
                                    ? `url('/landings/hero_spotly.png') center/cover no-repeat`
                                    : project.index === "05"
                                      ? `url('/landings/hero_doze.png') center/cover no-repeat`
                                      : project.index === "06"
                                        ? `url('/landings/acme_hero.png') center/cover no-repeat`
                                        : `linear-gradient(135deg, ${project.accentColor}15, ${project.accentColor}05)`)
                          : `linear-gradient(135deg, ${project.accentColor}15, ${project.accentColor}05)`
                      }}
                    >
                      {/* Subtle accent overlay */}
                      <div
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                        style={{
                          background: `radial-gradient(circle at 50% 50%, ${project.accentColor}20 0%, transparent 70%)`
                        }}
                      />


                      {/* Work in Progress special content */}
                      {displayMode === 'landings' && project.title === "Work in Progress" && (
                        <div className="text-center relative z-10">
                          <p className="text-[var(--text-tertiary)] text-sm font-mono tracking-wide opacity-60">
                            Work in Progress
                          </p>
                          <div className="flex justify-center mt-2 space-x-1">
                            <div className="w-1 h-1 bg-[var(--text-tertiary)] rounded-full animate-pulse opacity-40"></div>
                            <div className="w-1 h-1 bg-[var(--text-tertiary)] rounded-full animate-pulse opacity-40" style={{ animationDelay: '0.2s' }}></div>
                            <div className="w-1 h-1 bg-[var(--text-tertiary)] rounded-full animate-pulse opacity-40" style={{ animationDelay: '0.4s' }}></div>
                          </div>
                        </div>
                      )}

                      {/* Logo Display Mode */}
                      {displayMode === 'logos' && (
                        <div className="w-full h-full flex items-center justify-center relative group">
                          {project.index === "02" ? (
                            <>
                              <img
                                src="/logos/Eevolution logo.png"
                                alt="Eevolution Logo"
                                className="w-full h-full object-contain"
                              />
                              {/* Cursor-style tooltip */}
                              <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 px-3 py-1.5 rounded-full text-xs font-medium text-white shadow-lg backdrop-blur-sm"
                                style={{
                                  background: project.accentColor,
                                  border: `1px solid ${project.accentColor}80`,
                                }}>
                                Eevolution
                              </div>
                            </>
                          ) : project.index === "04" ? (
                            <>
                              <img
                                src="/logos/spotly logo.png"
                                alt="Spotly Logo"
                                className="w-full h-full object-cover"
                              />
                              {/* Cursor-style tooltip */}
                              <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 px-3 py-1.5 rounded-full text-xs font-medium text-white shadow-lg backdrop-blur-sm"
                                style={{
                                  background: project.accentColor,
                                  border: `1px solid ${project.accentColor}80`,
                                }}>
                                Spotly
                              </div>
                            </>
                          ) : project.index === "06" ? (
                            <>
                              <img
                                src="/logos/acme health logo.png"
                                alt="Acme Health Logo"
                                className="w-full h-full object-contain"
                              />
                              {/* Cursor-style tooltip */}
                              <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 px-3 py-1.5 rounded-full text-xs font-medium text-white shadow-lg backdrop-blur-sm"
                                style={{
                                  background: project.accentColor,
                                  border: `1px solid ${project.accentColor}80`,
                                }}>
                                Acme Health
                              </div>
                            </>
                          ) : null}
                        </div>
                      )}

                      {/* Hover accent dots */}
                      {displayMode === 'landings' && (
                        <>
                          <motion.div
                            className="absolute top-4 right-4 w-2 h-2 opacity-0 group-hover:opacity-100 rounded-full"
                            style={{ backgroundColor: project.accentColor }}
                            initial={{ scale: 0, rotate: 0 }}
                            whileHover={{ scale: 1, rotate: 180 }}
                            transition={{ duration: 0.2, delay: 0.05 }}
                          />
                          <motion.div
                            className="absolute bottom-4 right-4 w-1.5 h-1.5 opacity-0 group-hover:opacity-100 rounded-full"
                            style={{ backgroundColor: project.accentColor }}
                            initial={{ scale: 0, rotate: 0 }}
                            whileHover={{ scale: 1, rotate: -180 }}
                            transition={{ duration: 0.2, delay: 0.1 }}
                          />
                        </>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <footer className="px-4 sm:px-6 md:px-16 lg:px-24 xl:px-32 pt-8 sm:pt-10 md:pt-12 pb-12 sm:pb-14 md:pb-16 transition-colors duration-300">
          <div className="max-w-6xl mx-auto">
            <div className="w-full h-px bg-white/20 my-8 sm:my-10 md:my-12"></div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-center text-center md:text-left">
              <div>
                <p className="text-[var(--text-tertiary)] text-sm font-mono">
                  2025 Harsha Chaganti. Crafted with precision and care.
                </p>
              </div>

              <div className="flex justify-center md:justify-end gap-6">
                <a
                  href="https://linkedin.com"
                  className="text-[var(--text-tertiary)] hover:text-[var(--text-primary)] transition-colors duration-200"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={20} />
                </a>
                <a
                  href="mailto:hello@harshachaganti.com"
                  className="text-[var(--text-tertiary)] hover:text-[var(--text-primary)] transition-colors duration-200"
                  aria-label="Email"
                >
                  <Mail size={20} />
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>

      {/* Fullscreen Project Details View */}
      <div
        ref={projectDetailsRef}
        className="fixed inset-0 z-50 bg-[var(--background)] transform-gpu"
        style={{
          transform: 'translateY(100%)',
          visibility: selectedProject !== null ? 'visible' : 'hidden',
          opacity: selectedProject !== null ? 1 : 0,
          pointerEvents: selectedProject !== null ? 'auto' : 'none'
        }}
      >
        {selectedProject !== null && (
          <div className="h-screen w-full flex flex-col">
            {/* Project Navigation Header */}
            <div className="flex-shrink-0 bg-[var(--background)]/90 backdrop-blur-xl border-b border-[var(--border)] transition-colors duration-300">
              <div className="max-w-7xl mx-auto px-8 py-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-6">
                    <button
                      onClick={closeFullscreenView}
                      className="w-10 h-10 rounded-full bg-[var(--card)] hover:bg-[var(--border)] flex items-center justify-center transition-all duration-300 hover:scale-105"
                    >
                      <ArrowLeft size={18} className="text-[var(--text-primary)]" />
                    </button>
                    <div className="flex items-center gap-4">
                      <div
                        className="px-3 py-1.5 rounded-full text-sm font-mono"
                        style={{
                          backgroundColor: `${projects[selectedProject].accentColor}15`,
                          color: projects[selectedProject].accentColor
                        }}
                      >
                        {projects[selectedProject].index}
                      </div>
                      <span className="text-[var(--text-primary)] font-medium text-lg">
                        {projects[selectedProject].title}
                      </span>
                    </div>
                  </div>
                  <div className="w-1/2 flex justify-center">
                    {/* Empty space - View Live button removed */}
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile Layout */}
            <div className="lg:hidden flex-1 overflow-y-auto">
              <div className="p-4 sm:p-6 space-y-6 sm:space-y-8">
                {/* Mobile Project Header */}
                <div className="space-y-4">
                  <div className="relative w-12 h-1 rounded-full overflow-hidden">
                    <div
                      className="w-full h-full rounded-full"
                      style={{ backgroundColor: projects[selectedProject].accentColor }}
                    />
                    <div className="absolute inset-0 rounded-full glass-shine-separator"></div>
                  </div>
                  <h1 className="text-3xl sm:text-4xl font-light text-[var(--text-primary)] leading-tight">
                    {projects[selectedProject].title}
                  </h1>
                </div>

                {/* Mobile Tech Stack */}
                <div className="space-y-4">
                  <h3 className="text-lg sm:text-xl font-light text-[var(--text-primary)]">Tech Stack</h3>
                  <div className="flex flex-wrap gap-2">
                    {projects[selectedProject].details.technologies.map((tech, index) => (
                      <span
                        key={index}
                        className="px-3 py-2 rounded-full text-sm font-medium bg-[var(--card)] text-[var(--text-secondary)] border border-[var(--border)]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Mobile AI Tools */}
                <div className="space-y-4">
                  <h3 className="text-lg sm:text-xl font-light text-[var(--text-primary)]">AI Tools Used</h3>
                  <div className="flex flex-wrap gap-2">
                    {projects[selectedProject].details.aiTools.map((tool, index) => {
                      const getToolLogo = (toolName: string) => {
                        const logos: { [key: string]: string } = {
                          'Cursor': 'https://cursor.sh/favicon.ico',
                          'v0': 'https://v0.dev/favicon.ico',
                          'Claude 3.5 Sonnet': 'https://claude.ai/favicon.ico',
                          'GPT-4': 'https://openai.com/favicon.ico',
                          'GPT-4o': 'https://openai.com/favicon.ico',
                          'Claude 3 Opus': 'https://claude.ai/favicon.ico',
                          'Gemini': 'https://ai.google.dev/favicon.ico',
                          'Lovable': 'https://lovable.dev/favicon.ico',
                          'Bolt': 'https://bolt.new/favicon.ico',
                          'Replit': 'https://replit.com/favicon.ico',
                          'Grok': 'https://x.ai/favicon.ico',
                          'Claude Sonnet': 'https://claude.ai/favicon.ico'
                        }
                        return logos[toolName] || null
                      }

                      const logoUrl = getToolLogo(tool)

                      return (
                        <span
                          key={index}
                          className="px-3 py-2 rounded-full text-sm font-medium flex items-center gap-2"
                          style={{
                            backgroundColor: `${projects[selectedProject].accentColor}15`,
                            color: projects[selectedProject].accentColor,
                            border: `1px solid ${projects[selectedProject].accentColor}30`
                          }}
                        >
                          {logoUrl && (
                            <img
                              src={logoUrl}
                              alt={`${tool} logo`}
                              className="w-4 h-4 rounded-sm"
                              onError={(e) => {
                                e.currentTarget.style.display = 'none'
                              }}
                            />
                          )}
                          {tool}
                        </span>
                      )
                    })}
                  </div>
                </div>


                {/* Mobile Visit Site Button */}
                <div className="pt-4">
                  <a
                    href={projects[selectedProject].details.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative inline-flex items-center justify-center gap-3 w-full sm:w-auto px-6 py-4 rounded-full text-base font-medium text-white transition-all duration-300 hover:scale-105 overflow-hidden"
                    style={{
                      backgroundColor: projects[selectedProject].accentColor,
                      boxShadow: `0 8px 25px ${projects[selectedProject].accentColor}40`
                    }}
                  >
                    {/* Shine animation on hover */}
                    <div
                      className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500"
                      style={{
                        background: `linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.6), transparent)`,
                        transform: 'translateX(-100%)',
                        animation: 'shine 0.8s ease-out'
                      }}
                    />

                    <span className="relative z-10">Visit Website</span>
                    <ArrowUpRight size={18} />
                  </a>
                </div>
              </div>
            </div>

            {/* Desktop Layout - New Scrollable Design */}
            <div className="hidden lg:flex flex-1 overflow-y-auto">
              <div className="w-full">
                {/* Project Details Section - Centered at Top */}
                <div className="min-h-screen flex items-center justify-center px-20 py-20">
                  <div className="max-w-4xl mx-auto text-center space-y-16">
                    {/* Project Header */}
                    <div className="space-y-8">
                      <div className="relative w-24 h-1 rounded-full mx-auto overflow-hidden">
                        <div
                          className="w-full h-full rounded-full"
                          style={{ backgroundColor: projects[selectedProject].accentColor }}
                        />
                        <div className="absolute inset-0 rounded-full glass-shine-separator"></div>
                      </div>
                      <h1 className="text-8xl font-light text-[var(--text-primary)] leading-none">
                        {projects[selectedProject].title}
                      </h1>
                    </div>

                    {/* Style Guide */}
                    <div className="flex justify-center">
                      <Suspense fallback={<div className="w-32 h-8 bg-gray-200 rounded animate-pulse"></div>}>
                        <SimpleStyleGuide project={projects[selectedProject]} />
                      </Suspense>
                    </div>

                    {/* Tech Stack & AI Tools Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                      {/* Tech Stack */}
                      <div className="space-y-6">
                        <h3 className="text-2xl font-light text-[var(--text-primary)]">Tech Stack</h3>
                        <div className="flex flex-wrap gap-3 justify-center">
                          {projects[selectedProject].details.technologies.map((tech, index) => (
                            <span
                              key={index}
                              className="px-4 py-2 rounded-full text-sm font-medium bg-[var(--card)] text-[var(--text-secondary)] border border-[var(--border)] transition-all duration-300 hover:scale-105 hover:shadow-lg"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* AI Tools */}
                      <div className="space-y-6">
                        <h3 className="text-2xl font-light text-[var(--text-primary)]">AI Tools Used</h3>
                        <div className="flex flex-wrap gap-3 justify-center">
                          {projects[selectedProject].details.aiTools.map((tool, index) => {
                            const getToolLogo = (toolName: string) => {
                              switch (toolName) {
                                case "Cursor":
                                  return "https://cursor.sh/favicon.ico"
                                case "v0":
                                  return "https://vercel.com/favicon.ico"
                                case "Lovable":
                                  return "https://lovable.dev/favicon.ico"
                                case "Bolt":
                                  return "https://bolt.new/favicon.ico"
                                case "Replit":
                                  return "https://replit.com/favicon.ico"
                                case "Claude 3.5 Sonnet":
                                case "Claude 3 Opus":
                                case "Claude Sonnet":
                                  return "https://claude.ai/favicon.ico"
                                case "GPT-4":
                                case "GPT-4 Turbo":
                                case "GPT-4o":
                                  return "https://openai.com/favicon.ico"
                                case "Gemini":
                                case "Gemini Pro":
                                  return "https://gemini.google.com/favicon.ico"
                                case "Grok":
                                  return "https://x.com/favicon.ico"
                                default:
                                  return null
                              }
                            }

                            const logoUrl = getToolLogo(tool)

                            return (
                              <span
                                key={index}
                                className="px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg flex items-center gap-2"
                                style={{
                                  backgroundColor: `${projects[selectedProject].accentColor}15`,
                                  color: projects[selectedProject].accentColor,
                                  border: `1px solid ${projects[selectedProject].accentColor}30`
                                }}
                              >
                                {logoUrl && (
                                  <img
                                    src={logoUrl}
                                    alt={`${tool} logo`}
                                    className="w-4 h-4 rounded-sm"
                                    onError={(e) => {
                                      e.currentTarget.style.display = 'none'
                                    }}
                                  />
                                )}
                                {tool}
                              </span>
                            )
                          })}
                        </div>
                      </div>
                    </div>

                    {/* Visit Site Button */}
                    <div className="pt-8">
                      <a
                        href={projects[selectedProject].details.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-2xl text-base font-medium text-white transition-all duration-300 hover:scale-105 overflow-hidden border-2 shine-button"
                        style={{
                          backgroundColor: projects[selectedProject].accentColor,
                          borderColor: `${projects[selectedProject].accentColor}60`
                        }}
                      >
                        {/* Enhanced shine animation on hover */}
                        <div
                          className="absolute inset-0 rounded-2xl shine-overlay"
                          style={{
                            background: `linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.8) 50%, transparent 100%)`,
                            transform: 'translateX(-100%)'
                          }}
                        />

                        <span className="relative z-10">Visit Live Site</span>
                        <motion.div
                          className="w-5 h-5 flex items-center justify-center relative z-10"
                          animate={{
                            x: [0, 3, 0],
                            y: [0, -2, 0],
                            rotate: [0, 5, -5, 0]
                          }}
                          transition={{
                            duration: 2,
                            repeat: -1,
                            ease: "easeInOut"
                          }}
                        >
                          <ExternalLink size={16} />
                        </motion.div>
                      </a>
                    </div>

                    {/* Scroll Indicator - Simple Design */}
                    <div className="pt-16">
                      <div className="flex flex-col items-center justify-center space-y-4">
                        {/* Bigger down arrow in circle */}
                        <motion.div
                          className="relative"
                          animate={{
                            y: [0, 6, 0]
                          }}
                          transition={{
                            duration: 2,
                            repeat: -1,
                            ease: "easeInOut"
                          }}
                        >
                          <div
                            className="w-12 h-12 rounded-full border-2 flex items-center justify-center"
                            style={{
                              borderColor: projects[selectedProject].accentColor,
                              backgroundColor: `${projects[selectedProject].accentColor}10`
                            }}
                          >
                            <svg
                              width="20"
                              height="20"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke={projects[selectedProject].accentColor}
                              strokeWidth="2.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M12 5v14M5 12l7 7 7-7" />
                            </svg>
                          </div>
                        </motion.div>

                        {/* Text */}
                        <div className="text-sm font-medium tracking-wide"
                          style={{ color: projects[selectedProject].accentColor }}>
                          Scroll to view
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Image Container Section - Scrollable */}
                <div className="min-h-screen bg-[var(--card)] flex items-center justify-center">
                  <div className="w-full max-w-6xl mx-auto p-8">
                    {projects[selectedProject].details.fullWebsiteImage ? (
                      <div className="w-full">
                        <Image
                          src={projects[selectedProject].details.fullWebsiteImage}
                          alt={`${projects[selectedProject].title} - Complete Website`}
                          width={1200}
                          height={800}
                          quality={100}
                          className="w-full h-auto object-contain rounded-2xl shadow-2xl"
                        />
                      </div>
                    ) : (
                      <div className="w-full max-w-4xl mx-auto space-y-8">
                        <div className="aspect-[16/10] rounded-3xl overflow-hidden bg-[var(--background)] shadow-2xl group">
                          <Image
                            src={projects[selectedProject].details.image}
                            alt={projects[selectedProject].title}
                            width={800}
                            height={500}
                            quality={100}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                          <div
                            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                            style={{
                              background: `linear-gradient(to bottom, transparent 50%, ${projects[selectedProject].accentColor}20)`
                            }}
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                          <div className="aspect-square rounded-2xl overflow-hidden bg-[var(--background)] shadow-xl group">
                            <Image
                              src={projects[selectedProject].details.image}
                              alt={`${projects[selectedProject].title} detail 1`}
                              width={400}
                              height={400}
                              quality={100}
                              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div
                              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                              style={{
                                background: `linear-gradient(to bottom, transparent 50%, ${projects[selectedProject].accentColor}20)`
                              }}
                            />
                          </div>
                          <div className="aspect-square rounded-2xl overflow-hidden bg-[var(--background)] shadow-xl group">
                            <Image
                              src={projects[selectedProject].details.image}
                              alt={`${projects[selectedProject].title} detail 2`}
                              width={400}
                              height={400}
                              quality={100}
                              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div
                              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                              style={{
                                background: `linear-gradient(to bottom, transparent 50%, ${projects[selectedProject].accentColor}20)`
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>

  )
}

export default function Portfolio() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[var(--background)] flex items-center justify-center">
        <div className="text-center">
          <div className="text-2xl font-mono text-[var(--text-primary)] mb-4">
            Loading...
          </div>
        </div>
      </div>
    }>
      <PortfolioContent />
    </Suspense>
  )
}