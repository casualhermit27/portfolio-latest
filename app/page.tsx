"use client"

import type React from "react"

import { useEffect, useState, useRef } from "react"
import { Github, Linkedin, Mail, ArrowUpRight, ExternalLink, Code, X, ArrowLeft, ArrowRight } from "lucide-react"
import { gsap } from "gsap"
import { ThemeSwitcher } from "@/components/theme-switcher"
import { motion, AnimatePresence } from 'framer-motion'

const projects = [
  {
    title: "AI Content Generator",
    type: "Web Application",
    description: "Smart content creation with GPT-4o integration",
    index: "01",
    hoverColor: "bg-[#EEF2FF]", // Soft indigo
    accentColor: "#6366F1",
    details: {
      overview:
        "A sophisticated content generation platform that leverages GPT-4o to create high-quality, contextually relevant content for various use cases.",
      technologies: ["React", "Next.js", "GPT-4o API", "Tailwind CSS", "TypeScript"],
      features: ["Real-time content generation", "Multiple content formats", "Custom prompts", "Export functionality"],
      liveUrl: "#",
      codeUrl: "#",
      image: "/placeholder.svg?height=400&width=600",
    },
  },
  {
    title: "Design System Builder",
    type: "Developer Tool",
    description: "Component library with automated documentation",
    index: "02",
    hoverColor: "bg-[#F0E8FF]", // Light lavender
    accentColor: "#8B5CF6",
    details: {
      overview:
        "A comprehensive tool for building and maintaining design systems with automated documentation generation and component testing.",
      technologies: ["TypeScript", "Storybook", "Figma API", "CSS-in-JS", "Jest"],
      features: ["Component generation", "Auto documentation", "Design token sync", "Visual regression testing"],
      liveUrl: "#",
      codeUrl: "#",
      image: "/placeholder.svg?height=400&width=600",
    },
  },
  {
    title: "Performance Dashboard",
    type: "Data Visualization",
    description: "Real-time analytics with custom visualizations",
    index: "03",
    hoverColor: "bg-[#FFF0E8]", // Pale peach
    accentColor: "#F97316",
    details: {
      overview:
        "A real-time performance monitoring dashboard with custom data visualizations and advanced analytics capabilities.",
      technologies: ["React", "D3.js", "Node.js", "PostgreSQL", "WebSocket"],
      features: ["Real-time data streaming", "Custom charts", "Performance metrics", "Alert system"],
      liveUrl: "#",
      codeUrl: "#",
      image: "/placeholder.svg?height=400&width=600",
    },
  },
  {
    title: "Mobile Banking App",
    type: "Mobile Application",
    description: "Secure fintech with biometric authentication",
    index: "04",
    hoverColor: "bg-[#E8F4FF]", // Soft sky blue
    accentColor: "#3B82F6",
    details: {
      overview:
        "A secure mobile banking application featuring biometric authentication and comprehensive financial management tools.",
      technologies: ["React Native", "TypeScript", "Firebase", "Stripe API", "Biometric SDK"],
      features: ["Biometric login", "Transaction history", "Bill payments", "Budget tracking"],
      liveUrl: "#",
      codeUrl: "#",
      image: "/placeholder.svg?height=400&width=600",
    },
  },
  {
    title: "E-commerce Platform",
    type: "Full-Stack",
    description: "Marketplace with AI-powered recommendations",
    index: "05",
    hoverColor: "bg-[#FFE8E8]", // Light coral
    accentColor: "#EF4444",
    details: {
      overview:
        "A full-featured e-commerce platform with AI-powered product recommendations and advanced inventory management.",
      technologies: ["Next.js", "Prisma", "Stripe", "Vercel", "OpenAI"],
      features: ["AI recommendations", "Payment processing", "Inventory management", "Order tracking"],
      liveUrl: "#",
      codeUrl: "#",
      image: "/placeholder.svg?height=400&width=600",
    },
  },
  {
    title: "Developer Tools Suite",
    type: "CLI Tool",
    description: "Rapid prototyping and deployment automation",
    index: "06",
    hoverColor: "bg-[#FFFBE8]", // Gentle yellow
    accentColor: "#EAB308",
    details: {
      overview: "A comprehensive CLI toolkit designed for rapid prototyping and automated deployment workflows.",
      technologies: ["Node.js", "TypeScript", "Docker", "AWS", "GitHub Actions"],
      features: ["Project scaffolding", "Auto deployment", "Environment management", "CI/CD integration"],
      liveUrl: "#",
      codeUrl: "#",
      image: "/placeholder.svg?height=400&width=600",
    },
  },
  {
    title: "Social Media Scheduler",
    type: "SaaS Platform",
    description: "Multi-platform scheduling with optimization",
    index: "07",
    hoverColor: "bg-[#F8E8FF]", // Soft pink
    accentColor: "#EC4899",
    details: {
      overview:
        "A SaaS platform for scheduling and optimizing social media content across multiple platforms with AI-powered insights.",
      technologies: ["Vue.js", "Python", "Redis", "OpenAI", "Social APIs"],
      features: ["Multi-platform posting", "Content optimization", "Analytics dashboard", "Team collaboration"],
      liveUrl: "#",
      codeUrl: "#",
      image: "/placeholder.svg?height=400&width=600",
    },
  },
  {
    title: "Crypto Trading Bot",
    type: "Algorithm",
    description: "Automated trading with ML predictions",
    index: "08",
    hoverColor: "bg-[#E8F5F0]", // Light sage
    accentColor: "#10B981",
    details: {
      overview:
        "An intelligent cryptocurrency trading bot that uses machine learning algorithms to predict market trends and execute trades.",
      technologies: ["Python", "TensorFlow", "WebSocket", "MongoDB", "Trading APIs"],
      features: ["ML predictions", "Risk management", "Portfolio tracking", "Backtesting"],
      liveUrl: "#",
      codeUrl: "#",
      image: "/placeholder.svg?height=400&width=600",
    },
  },
]

export default function Portfolio() {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null)
  const [selectedProject, setSelectedProject] = useState<number | null>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isAnimating, setIsAnimating] = useState(false)
  const [isFullscreenView, setIsFullscreenView] = useState(false)
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list')
  
  // Refs for GSAP animations
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const mainContentRef = useRef<HTMLDivElement>(null)
  const projectDetailsRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    // Direct, immediate cursor tracking for smooth movement
    setMousePosition({
      x: e.clientX,
      y: e.clientY,
    })
  }

  const handleProjectClick = (index: number) => {
    setIsAnimating(true)
    setSelectedProject(index)
    
    if (mainContentRef.current && projectDetailsRef.current) {
      // Ensure project details view is positioned correctly
      gsap.set(projectDetailsRef.current, {
        y: "100%",
        display: "block",
        autoAlpha: 1
      })

      // Create the animation timeline with smoother easing
      const tl = gsap.timeline({
        onComplete: () => {
          setIsFullscreenView(true)
          setIsAnimating(false)
        }
      })

      // Smoother animation sequence
      tl.to(mainContentRef.current, {
        y: "-10%", // Reduced movement for subtlety
        scale: 0.98, // Subtler scale
        autoAlpha: 0,
        duration: 0.8,
        ease: "power2.inOut"
      })
      .to(projectDetailsRef.current, {
        y: "0%",
        duration: 0.8,
        ease: "power2.inOut"
      }, "-=0.6") // More overlap for seamless transition
    }
  }

  const closeFullscreenView = () => {
    setIsAnimating(true)

    if (mainContentRef.current && projectDetailsRef.current) {
      const tl = gsap.timeline({
        onComplete: () => {
          setSelectedProject(null)
          setIsFullscreenView(false)
          setIsAnimating(false)
        }
      })

      tl.to(projectDetailsRef.current, {
        y: "100%",
        duration: 0.8,
        ease: "power2.inOut"
      })
      .to(mainContentRef.current, {
        y: "0%",
        scale: 1,
        autoAlpha: 1,
        duration: 0.8,
        ease: "power2.inOut"
      }, "-=0.6")
    }
  }

  // Add a function to handle view mode change and close fullscreen view
  const handleViewModeChange = (mode: 'list' | 'grid') => {
    setViewMode(mode)
    setSelectedProject(null)
    setIsFullscreenView(false)
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
    if (titleRef.current && subtitleRef.current) {
      // Create beautiful split text animation
      titleRef.current.innerHTML = `
        <div class="line-wrapper" style="overflow: hidden; padding-bottom: 0.2em;">
          <div class="line font-light transition-colors duration-300" style="transform: translateY(100%); color: inherit;">Harsha</div>
        </div>
        <div class="line-wrapper" style="overflow: hidden; padding-bottom: 0.2em;">
          <div class="line font-semibold transition-colors duration-300" style="transform: translateY(100%); color: inherit;">Chaganti</div>
        </div>
      `
      
      // Create animated subtitle with enhanced highlighted words
      subtitleRef.current.innerHTML = `
        <span class="highlight-word engineer-word transition-colors duration-300" style="filter: drop-shadow(0 0 8px rgba(99, 102, 241, 0.3));">Engineer</span> + <span class="highlight-word designer-word transition-colors duration-300" style="filter: drop-shadow(0 0 8px rgba(139, 92, 246, 0.3));">Designer</span> focused on building sharp <span class="highlight-word frontend-word transition-colors duration-300" style="filter: drop-shadow(0 0 8px rgba(99, 102, 241, 0.3));">frontends</span> and <span class="highlight-word ai-word transition-colors duration-300" style="filter: drop-shadow(0 0 8px rgba(139, 92, 246, 0.3));">AI-powered tools</span> with <span class="highlight-word speed-word transition-colors duration-300" style="filter: drop-shadow(0 0 8px rgba(99, 102, 241, 0.3));">speed</span>, <span class="highlight-word ux-word transition-colors duration-300" style="filter: drop-shadow(0 0 8px rgba(16, 185, 129, 0.3));">UX clarity</span>, and seamless dev handoffs.
      `
      
      // Enhanced animation timeline
      const titleLines = titleRef.current.querySelectorAll('.line')
      const engineerWord = subtitleRef.current.querySelector('.engineer-word')
      const designerWord = subtitleRef.current.querySelector('.designer-word')
      const frontendWord = subtitleRef.current.querySelector('.frontend-word')
      const aiWord = subtitleRef.current.querySelector('.ai-word')
      const speedWord = subtitleRef.current.querySelector('.speed-word')
      const uxWord = subtitleRef.current.querySelector('.ux-word')
      
      const tl = gsap.timeline()
      
      // Set initial state
      gsap.set(titleRef.current, { opacity: 1 })
      gsap.set(subtitleRef.current, { opacity: 0, y: 20 })
      
      tl.to(titleLines, {
          y: 0,
          duration: 0.6,
          ease: "back.out(1.7)",
          stagger: 0.1,
          delay: 0.2,
        })
        .to(subtitleRef.current, 
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "power2.out"
          },
          "-=0.3"
        )
        .call(() => {
          // Simplified animations to fix compilation issues
          // Engineer word - simple animation
          gsap.to(engineerWord, {
            y: -4,
            duration: 2,
            ease: "power1.inOut",
            repeat: 1,
            yoyo: true,
            delay: 0
          })
          
          // Designer word - simple animation
          gsap.to(designerWord, {
            y: -4,
            duration: 2,
            ease: "power1.inOut",
            repeat: 1,
            yoyo: true,
            delay: 0.3
          })
          
          // Frontend word - simple animation
          gsap.to(frontendWord, {
            y: -4,
            duration: 2,
            ease: "power1.inOut",
            repeat: 1,
            yoyo: true,
            delay: 0.6
          })
          
          // AI word - simple animation
          gsap.to(aiWord, {
            y: -4,
            duration: 2,
            ease: "power1.inOut",
            repeat: 1,
            yoyo: true,
            delay: 0.9
          })
          
          // Speed word - simple animation
          gsap.to(speedWord, {
            y: -4,
            duration: 2,
            ease: "power1.inOut",
            repeat: 1,
            yoyo: true,
            delay: 1.2
          })
          
          // UX word - simple animation
          gsap.to(uxWord, {
            y: -4,
            duration: 2,
            ease: "power1.inOut",
            repeat: 1,
            yoyo: true,
            delay: 1.5
          })
          
          // Simple color animation
          gsap.to([engineerWord, designerWord, frontendWord, aiWord, speedWord, uxWord], {
            color: "#6366F1",
            duration: 1.5,
            ease: "power1.inOut",
            stagger: {
              each: 0.2,
              repeat: 1,
              repeatDelay: 1
            },
            yoyo: true
          })
        })
    }
  }, [])

  return (
    <div className="min-h-screen bg-[var(--background)] relative overflow-hidden transition-colors duration-300">
      {/* Theme Switcher */}
      <ThemeSwitcher isHidden={isFullscreenView} />
      
      {/* Cursor Follower */}
      {hoveredProject !== null && !isFullscreenView && (
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
            View Project
          </div>
        </div>
      )}

      {/* Main Content */}
      <div 
        ref={mainContentRef}
        className="relative z-10 transform-gpu"
        style={{
          transform: isFullscreenView ? 'translateY(-20%) scale(0.95)' : 'translateY(0) scale(1)',
          opacity: isFullscreenView ? 0 : 1,
          visibility: isFullscreenView ? 'hidden' : 'visible',
          transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
          pointerEvents: isFullscreenView ? 'none' : 'auto'
        }}
      >
        {/* Header Section */}
        <header className="pt-24 pb-20 px-8 md:px-16 lg:px-24 xl:px-32 transition-colors duration-300">
          <div className="max-w-6xl mx-auto">
            <div className="mb-12">
              <h1 
                ref={titleRef}
                className="text-5xl md:text-7xl lg:text-8xl font-light text-[var(--text-primary)] leading-none tracking-tight mb-6 transition-colors duration-300"
              >
                Harsha
                Chaganti
              </h1>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-end">
              <div className="space-y-4">
                <p 
                  ref={subtitleRef}
                  className="text-lg md:text-xl text-[var(--text-secondary)] leading-relaxed font-light transition-colors duration-300"
                >
                  Engineer + Designer focused on building sharp frontends and AI-powered tools with speed, UX clarity,
                  and seamless dev handoffs.
                </p>
              </div>

              <div className="flex justify-end">
                <motion.button 
                  className="group bg-[var(--text-primary)] text-[var(--background)] px-8 py-4 rounded-full font-medium text-lg hover:bg-[#6366F1] hover:text-white transition-all duration-300 will-change-auto"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  animate={{
                    boxShadow: [
                      "0 4px 20px rgba(0,0,0,0.1)",
                      "0 8px 30px rgba(0,0,0,0.15)",
                      "0 4px 20px rgba(0,0,0,0.1)"
                    ]
                  }}
                  transition={{
                    boxShadow: {
                      duration: 3,
                      repeat: -1,
                      ease: "easeInOut"
                    }
                  }}
                >
                  <motion.span
                    animate={{ 
                      x: [0, 2, 0],
                      y: [0, -1, 0]
                    }}
                    transition={{
                      duration: 2,
                      repeat: -1,
                      ease: "easeInOut"
                    }}
                  >
                    Get a Sample
                  </motion.span>
                  <motion.div
                    className="inline-block ml-2 w-5 h-5"
                    animate={{
                      rotate: [0, 15, -15, 0]
                    }}
                    transition={{
                      duration: 4,
                      repeat: -1,
                      ease: "easeInOut"
                    }}
                  >
                    <ArrowUpRight className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </motion.div>
                </motion.button>
              </div>
            </div>
          </div>
        </header>

        {/* Projects Section */}
        <section className="px-8 md:px-16 lg:px-24 xl:px-32 pb-24 transition-colors duration-300">
          <div className="max-w-6xl mx-auto">
            {/* Section Header */}
            <div className="mb-20">
              <div className="flex items-baseline justify-between mb-6">
                <motion.h2 
                  className="text-3xl md:text-4xl font-light text-[var(--text-primary)]"
                  animate={{
                    textShadow: [
                      "0 0 0px rgba(99, 102, 241, 0)",
                      "0 0 20px rgba(99, 102, 241, 0.3)",
                      "0 0 0px rgba(99, 102, 241, 0)"
                    ]
                  }}
                  transition={{
                    duration: 4,
                    repeat: -1,
                    ease: "easeInOut"
                  }}
                >
                  Selected Work
                </motion.h2>
                
                {/* View Mode Toggle */}
                <div className="relative flex items-center bg-[var(--card)] border border-[var(--border)] rounded-full p-1 shadow-sm">
                  {/* Sliding background pill */}
                  <motion.div
                    className="absolute top-1 h-8 rounded-full bg-[var(--background)] shadow-sm"
                    initial={false}
                    animate={{
                      width: "4.5rem",
                      x: viewMode === 'list' ? 2 : 66
                    }}
                    transition={{ 
                      type: "spring", 
                      stiffness: 300, 
                      damping: 25,
                      duration: 0.4
                    }}
                  />
                  
                  {/* List button */}
                  <button
                    className={`relative z-10 w-[4.5rem] h-8 rounded-full text-sm font-medium transition-colors duration-200 flex items-center justify-center ${
                      viewMode === 'list' 
                        ? 'text-[var(--text-primary)]' 
                        : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                    }`}
                    onClick={() => handleViewModeChange('list')}
                    aria-pressed={viewMode === 'list'}
                  >
                    <span>List</span>
                  </button>
                  
                  {/* Grid button */}
                  <button
                    className={`relative z-10 w-[4.5rem] h-8 rounded-full text-sm font-medium transition-colors duration-200 flex items-center justify-center ${
                      viewMode === 'grid' 
                        ? 'text-[var(--text-primary)]' 
                        : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                    }`}
                    onClick={() => handleViewModeChange('grid')}
                    aria-pressed={viewMode === 'grid'}
                  >
                    <span>Grid</span>
                  </button>
                </div>
              </div>
              <motion.div 
                className="w-full h-px bg-[var(--border)]"
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
            
            {/* Projects List or Grid */}
            <AnimatePresence mode="wait" initial={false}>
              {viewMode === 'list' ? (
                <motion.div
                  key="list"
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -24 }}
                  transition={{ duration: 0.4, ease: 'easeInOut' }}
                  className="space-y-0"
                >
                  {projects.map((project, index) => (
                    <motion.div
                      key={index}
                      className="project-item border-b border-[var(--border)] last:border-b-0 group"
                      initial={{ opacity: 0, x: -20, scale: 0.95 }}
                      animate={{ opacity: 1, x: 0, scale: 1 }}
                      transition={{ 
                        duration: 0.5, 
                        ease: [0.25, 0.46, 0.45, 0.94],
                        delay: index * 0.08,
                        type: "spring",
                        stiffness: 100,
                        damping: 15
                      }}
                      whileHover={{ 
                        scale: 1.01, 
                        x: 8,
                        boxShadow: '0 2px 16px 0 rgba(0,0,0,0.04)',
                        transition: { duration: 0.3, ease: "easeOut" }
                      }}
                      onMouseEnter={() => setHoveredProject(index)}
                      onMouseLeave={() => setHoveredProject(null)}
                      onMouseMove={handleMouseMove}
                      onClick={() => handleProjectClick(index)}
                    >
                      <div className="py-10 md:py-12 transition-all duration-500 cursor-pointer hover:bg-gray-50/80 dark:hover:bg-white/5">
                        <div className="grid grid-cols-12 gap-4 md:gap-8 items-center">
                          <div className="col-span-1">
                            <motion.span
                              className="font-mono text-sm transition-colors duration-300"
                              style={{ color: hoveredProject === index ? project.accentColor : 'var(--text-tertiary)' }}
                              whileHover={{ scale: 1.1, rotate: 5 }}
                              transition={{ duration: 0.2 }}
                            >
                              {project.index}
                            </motion.span>
                          </div>
                          <div className="col-span-8 md:col-span-7">
                            <motion.h3
                              className="text-2xl md:text-3xl lg:text-4xl font-light leading-tight transition-all duration-300"
                              style={{ color: hoveredProject === index ? project.accentColor : 'var(--text-primary)' }}
                              whileHover={{ x: 8 }}
                              transition={{ duration: 0.3, ease: "easeOut" }}
                            >
                              {project.title}
                            </motion.h3>
                          </div>
                          <div className="col-span-3 md:col-span-4 text-right">
                            <motion.div 
                              className="space-y-1 opacity-60 group-hover:opacity-100 transition-opacity duration-300"
                              whileHover={{ y: -2 }}
                              transition={{ duration: 0.2 }}
                            >
                              <p className="text-[var(--text-tertiary)] font-mono text-xs uppercase tracking-wider">{project.type}</p>
                              <p className="text-[var(--text-secondary)] text-sm leading-relaxed hidden md:block">
                                {project.description}
                              </p>
                            </motion.div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  key="grid"
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -24 }}
                  transition={{ duration: 0.4, ease: 'easeInOut' }}
                  className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6"
                >
                  {projects.map((project, index) => (
                    <motion.div
                      key={index}
                      className="break-inside-avoid mb-6"
                      initial={{ opacity: 0, y: 30, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ 
                        duration: 0.6, 
                        ease: [0.25, 0.46, 0.45, 0.94],
                        delay: index * 0.1,
                        type: "spring",
                        stiffness: 80,
                        damping: 20
                      }}
                      whileHover={{ 
                        scale: 1.02, 
                        y: -4,
                        boxShadow: '0 20px 40px 0 rgba(0,0,0,0.12)',
                        transition: { duration: 0.4, ease: "easeOut" }
                      }}
                      onClick={() => handleProjectClick(index)}
                    >
                      <div 
                        className="relative overflow-hidden rounded-2xl cursor-pointer group"
                        style={{ 
                          backgroundColor: project.accentColor + '10',
                          border: `1px solid ${project.accentColor}20`
                        }}
                        onMouseEnter={() => setHoveredProject(index)}
                        onMouseLeave={() => setHoveredProject(null)}
                        onMouseMove={handleMouseMove}
                      >
                        {/* Image placeholder with project accent */}
                        <div 
                          className="aspect-[4/3] bg-gradient-to-br from-[var(--card)] to-[var(--background)] flex items-center justify-center relative overflow-hidden"
                          style={{
                            background: `linear-gradient(135deg, ${project.accentColor}15, ${project.accentColor}05)`
                          }}
                        >
                          {/* Subtle accent overlay */}
                          <div 
                            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                            style={{
                              background: `radial-gradient(circle at 50% 50%, ${project.accentColor}20 0%, transparent 70%)`
                            }}
                          />
                          
                          {/* Project index in corner */}
                          <div 
                            className="absolute top-4 left-4 px-3 py-1.5 rounded-full text-sm font-mono font-medium opacity-60 group-hover:opacity-100 transition-all duration-300"
                            style={{
                              backgroundColor: project.accentColor + '20',
                              color: project.accentColor
                            }}
                          >
                            {project.index}
                          </div>
                          
                          {/* Hover accent dots */}
                          <motion.div
                            className="absolute top-4 right-4 w-2 h-2 rounded-full opacity-0 group-hover:opacity-100"
                            style={{ backgroundColor: project.accentColor }}
                            initial={{ scale: 0, rotate: 0 }}
                            whileHover={{ scale: 1, rotate: 180 }}
                            transition={{ duration: 0.4, delay: 0.1 }}
                          />
                          <motion.div
                            className="absolute bottom-4 right-4 w-1.5 h-1.5 rounded-full opacity-0 group-hover:opacity-100"
                            style={{ backgroundColor: project.accentColor }}
                            initial={{ scale: 0, rotate: 0 }}
                            whileHover={{ scale: 1, rotate: -180 }}
                            transition={{ duration: 0.4, delay: 0.2 }}
                          />
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>

        {/* Footer */}
        <footer className="px-8 md:px-16 lg:px-24 xl:px-32 pb-16 transition-colors duration-300">
          <div className="max-w-6xl mx-auto">
            <div className="w-full h-px bg-[var(--border)] mb-12"></div>

            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <p className="text-[var(--text-tertiary)] text-sm font-mono">
                  © 2024 Harsha Chaganti. Crafted with precision and care.
                </p>
              </div>

              <div className="flex justify-end gap-6">
                <a
                  href="https://github.com"
                  className="text-[var(--text-tertiary)] hover:text-[var(--text-primary)] transition-colors duration-200"
                  aria-label="GitHub"
                >
                  <Github size={20} />
                </a>
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
          opacity: selectedProject !== null ? 1 : 0
        }}
      >
        {selectedProject !== null && (
          <div className="min-h-screen w-full flex flex-col">
            {/* Project Navigation Header */}
            <div className="sticky top-0 z-50 bg-[var(--background)]/90 backdrop-blur-xl border-b border-[var(--border)] transition-colors duration-300">
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
                  <a
                    href={projects[selectedProject].details.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-5 py-2 rounded-full bg-[var(--card)] hover:bg-[var(--border)] text-sm text-[var(--text-primary)] transition-all duration-300 hover:scale-105 group"
                  >
                    <span>View Live</span>
                    <ExternalLink 
                      size={14} 
                      className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" 
                    />
                  </a>
                </div>
              </div>
            </div>

            {/* Split Screen Content */}
            <div className="flex-1 flex">
              {/* Left Side - Project Details */}
              <div className="w-1/2 p-20 flex flex-col justify-center">
                <div className="max-w-2xl space-y-20">
                  {/* Project Header */}
                  <div className="space-y-12">
                    <div
                      className="w-20 h-1 rounded-full"
                      style={{ backgroundColor: projects[selectedProject].accentColor }}
                    />
                    <h1 className="text-7xl md:text-8xl font-light text-[var(--text-primary)] leading-none">
                      {projects[selectedProject].title}
                    </h1>
                    <p className="text-2xl text-[var(--text-secondary)] leading-relaxed max-w-xl">
                      {projects[selectedProject].details.overview}
                    </p>
                  </div>

                  {/* Technologies */}
                  <div className="space-y-8">
                    <h3 className="text-2xl font-light text-[var(--text-primary)]">Technologies</h3>
                    <div className="flex flex-wrap gap-4">
                      {projects[selectedProject].details.technologies.map((tech, index) => (
                        <span
                          key={index}
                          className="px-6 py-3 rounded-full text-base font-medium bg-[var(--card)] text-[var(--text-secondary)] border border-[var(--border)] transition-all duration-300 hover:scale-105 hover:shadow-lg"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Key Features */}
                  <div className="space-y-12">
                    <h3 className="text-2xl font-light text-[var(--text-primary)]">Key Features</h3>
                    <ul className="space-y-8">
                      {projects[selectedProject].details.features.map((feature, index) => (
                        <li 
                          key={index} 
                          className="flex items-start gap-6 group"
                        >
                          <div
                            className="w-3 h-3 rounded-full mt-3 flex-shrink-0 transition-all duration-300 group-hover:scale-150"
                            style={{ 
                              backgroundColor: projects[selectedProject].accentColor,
                              opacity: 0.8
                            }}
                          />
                          <span className="text-xl text-[var(--text-secondary)] leading-relaxed transition-colors duration-300 group-hover:text-[var(--text-primary)]">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Right Side - Visual Showcase */}
              <div className="w-1/2 bg-[var(--card)] overflow-y-auto">
                <div className="p-16 w-full max-w-2xl mx-auto space-y-8">
                  {/* Main Project Image */}
                  <div className="aspect-[16/10] rounded-3xl overflow-hidden bg-[var(--background)] shadow-2xl group">
                    <img
                      src={projects[selectedProject].details.image}
                      alt={projects[selectedProject].title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div 
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{
                        background: `linear-gradient(to bottom, transparent 50%, ${projects[selectedProject].accentColor}20)`
                      }}
                    />
                  </div>
                  
                  {/* Additional Images Grid */}
                  <div className="grid grid-cols-2 gap-6">
                    <div className="aspect-square rounded-2xl overflow-hidden bg-[var(--background)] shadow-xl group">
                      <img
                        src={projects[selectedProject].details.image}
                        alt={`${projects[selectedProject].title} detail 1`}
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
                      <img
                        src={projects[selectedProject].details.image}
                        alt={`${projects[selectedProject].title} detail 2`}
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
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}