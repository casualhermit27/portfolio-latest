"use client"

import type React from "react"

import { useEffect, useState, useRef } from "react"
import { Github, Linkedin, Mail, ArrowUpRight, ExternalLink, Code, X, ArrowLeft, ArrowRight } from "lucide-react"
import { gsap } from "gsap"
import { ThemeSwitcher } from "@/components/theme-switcher"
import { motion, AnimatePresence } from 'framer-motion'

const projects = [
  {
    title: "Insightix AI",
    type: "AI Analytics Platform",
    description: "AI-driven insights that transform your business",
    index: "01",
    hoverColor: "bg-[#E8F4FF]", // Soft blue
    accentColor: "#3B82F6",
    details: {
      overview:
        "A sophisticated AI analytics platform that unlocks the power of your data with AI-driven insights. Features a clean, modern interface with powerful analytics and visualization tools tailored for modern enterprises.",
      technologies: ["React", "Next.js", "AI/ML", "Tailwind CSS", "TypeScript", "Data Visualization"],
      features: ["AI-driven analytics", "Real-time data visualization", "Business intelligence", "Custom dashboards", "Enterprise scalability"],
      liveUrl: "#",
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
    accentColor: "#F97316",
    details: {
      overview:
        "A cutting-edge e-commerce platform that revolutionizes online shopping with AI-powered product recommendations, seamless user experience, and advanced analytics. Built with modern web technologies for optimal performance and scalability.",
      technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "AI/ML", "Stripe"],
      features: ["AI recommendations", "Smart search", "Real-time analytics", "Mobile-first design", "Payment integration"],
      liveUrl: "#",
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
    accentColor: "#10B981",
    details: {
      overview:
        "An intelligent AI meeting assistant that automatically captures notes, generates summaries, and extracts action items from your conversations. Focus on the discussion while Aimee handles the documentation.",
      technologies: ["React", "Next.js", "AI/ML", "WebRTC", "TypeScript", "Tailwind CSS"],
      features: ["AI transcription", "Auto-generated summaries", "Action item extraction", "Multi-platform integration", "Real-time processing"],
      liveUrl: "#",
      codeUrl: "#",
      image: "/landings/hero_aimee.png",
      fullWebsiteImage: "/landings/full_aimee.png",
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
  const [viewMode, setViewMode] = useState<'grid'>('grid')
  
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

  // Add a function to close fullscreen view
  const handleCloseFullscreen = () => {
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
          // Dynamic rotating gradient animation
          const words = [engineerWord, designerWord, frontendWord, aiWord, speedWord, uxWord]
                     const colors = ["#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4", "#A855F7", "#EC4899", "#10B981", "#F59E0B"]
          
          // Create a continuous color cycling effect - all words together
          const colorCycle = gsap.timeline({ repeat: -1 })
          
          // Cycle through different colors - all words change together
          colors.forEach((color, colorIndex) => {
            colorCycle.to(words, {
              color: color,
              duration: 0.8,
              ease: "power2.inOut",
              delay: colorIndex * 0.1
            })
          })
          
          // Continuous scale pulsing
          gsap.to(words, {
            scale: 1.05,
            duration: 1.2,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
            stagger: {
              each: 0.15,
              repeat: -1
            },
            immediateRender: true
          })
          
          // Rotating glow effect
          gsap.to(words, {
            filter: "drop-shadow(0 0 8px rgba(255, 107, 107, 0.6))",
            duration: 1.5,
            ease: "power2.inOut",
            repeat: -1,
            yoyo: true,
            stagger: {
              each: 0.2,
              repeat: -1
            },
            immediateRender: true
          })
          
          // Add rotation for more dynamic feel
          gsap.to(words, {
            rotation: 2,
            duration: 3,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
            stagger: {
              each: 0.1,
              repeat: -1
            },
            immediateRender: true
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
            
                         {/* Projects Grid */}
             <motion.div
               key="grid"
               initial={{ opacity: 0, y: 24 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.4, ease: 'easeInOut' }}
               className="grid grid-cols-1 md:grid-cols-2 gap-4"
             >
              {projects.map((project, index) => (
                                 <motion.div
                   key={index}
                   className="w-full"
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
                     transition: { duration: 0.4, ease: "easeOut" }
                   }}
                   onClick={() => handleProjectClick(index)}
                 >
                   <div 
                     className="relative overflow-hidden rounded-lg cursor-pointer group"
                     style={{ 
                       backgroundColor: project.accentColor + '10',
                       border: `1px solid ${project.accentColor}20`
                     }}
                     onMouseEnter={() => setHoveredProject(index)}
                     onMouseLeave={() => setHoveredProject(null)}
                     onMouseMove={handleMouseMove}
                   >
                     {/* Image placeholder with project accent - larger aspect ratio */}
                     <div 
                       className="aspect-[3/2] bg-gradient-to-br from-[var(--card)] to-[var(--background)] flex items-center justify-center relative overflow-hidden rounded-lg border"
                       style={{
                         borderColor: project.accentColor + '30',
                         background: project.index === "01" 
                           ? `url('/landings/hero insightx AI.png') center/cover no-repeat`
                           : project.index === "02"
                           ? `url('/landings/hero_eevolution.png') center/cover no-repeat`
                           : project.index === "03"
                           ? `url('/landings/hero_aimee.png') center/cover no-repeat`
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
                   {projects[selectedProject].details.fullWebsiteImage ? (
                     <div className="w-1/2 flex justify-center">
                       <div 
                         className="flex items-center gap-3 px-6 py-3 rounded-2xl text-sm font-medium text-white shadow-lg backdrop-blur-sm border"
                         style={{
                           backgroundColor: `${projects[selectedProject].accentColor}20`,
                           borderColor: `${projects[selectedProject].accentColor}40`,
                           boxShadow: `0 8px 32px ${projects[selectedProject].accentColor}20`
                         }}
                       >
                         <div 
                           className="w-2 h-2 rounded-full animate-pulse"
                           style={{ backgroundColor: projects[selectedProject].accentColor }}
                         ></div>
                         <span>Scroll to explore</span>
                         <motion.div
                           animate={{ y: [0, 4, 0] }}
                           transition={{ duration: 1.5, repeat: -1, ease: "easeInOut" }}
                           className="w-4 h-4 flex items-center justify-center"
                         >
                           <svg 
                             width="12" 
                             height="12" 
                             viewBox="0 0 24 24" 
                             fill="none" 
                             stroke="currentColor" 
                             strokeWidth="2" 
                             strokeLinecap="round" 
                             strokeLinejoin="round"
                           >
                             <path d="M7 13l3 3 3-3M7 6l3 3 3-3"/>
                           </svg>
                         </motion.div>
                       </div>
                     </div>
                   ) : (
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
                   )}
                 </div>
               </div>
             </div>

             {/* Split Screen Content */}
             <div className="flex-1 flex overflow-hidden">
               {/* Left Side - Project Details */}
               <div className="w-1/2 p-20 flex flex-col justify-center overflow-y-auto">
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
                  </div>

                  {/* Tech Stack */}
                  <div className="space-y-8">
                    <h3 className="text-2xl font-light text-[var(--text-primary)]">Tech Stack</h3>
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
                </div>
              </div>

                             {/* Right Side - Visual Showcase */}
               <div className="w-1/2 bg-[var(--card)] overflow-y-auto flex items-start justify-center">
                 <div className="w-full max-w-none">
                   {/* Full Website Screenshot - Single scrollable image */}
                   {projects[selectedProject].details.fullWebsiteImage ? (
                     <div className="w-full h-full">
                       <img
                         src={projects[selectedProject].details.fullWebsiteImage}
                         alt={`${projects[selectedProject].title} - Complete Website`}
                         className="w-full h-auto object-contain min-h-full"
                         style={{ objectFit: 'contain' }}
                       />
                     </div>
                   ) : (
                     /* Regular project images for other projects */
                     <div className="p-16 w-full max-w-2xl mx-auto space-y-8">
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
                   )}
                 </div>
               </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}