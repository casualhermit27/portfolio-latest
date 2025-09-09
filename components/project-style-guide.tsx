"use client"

import React from "react"
import { motion } from "framer-motion"

interface ProjectStyleGuideProps {
  project: {
    title: string
    type: string
    accentColor: string
    details: {
      technologies: string[]
    }
  }
}

const ProjectStyleGuide: React.FC<ProjectStyleGuideProps> = ({ project }) => {
  // Define typography and color schemes for each project
  const getProjectStyle = (projectTitle: string) => {
    switch (projectTitle) {
      case "Insightix AI":
        return {
          typography: {
            primary: "Montserrat",
            secondary: "JetBrains Mono",
            weights: {
              light: 300,
              regular: 400,
              medium: 500,
              semibold: 600,
              bold: 700
            },
            sizes: {
              display: "6rem",
              heading: "3rem",
              subheading: "1.5rem",
              body: "1rem",
              caption: "0.875rem"
            }
          },
          colors: {
            primary: "#3B82F6",
            secondary: "#1E40AF",
            accent: "#60A5FA",
            neutral: {
              50: "#F8FAFC",
              100: "#F1F5F9",
              200: "#E2E8F0",
              300: "#CBD5E1",
              400: "#94A3B8",
              500: "#64748B",
              600: "#475569",
              700: "#334155",
              800: "#1E293B",
              900: "#0F172A"
            },
            semantic: {
              success: "#10B981",
              warning: "#F59E0B",
              error: "#EF4444",
              info: "#3B82F6"
            }
          }
        }
      
      case "Eevolution":
        return {
          typography: {
            primary: "Outfit",
            secondary: "Outfit",
            weights: {
              light: 300,
              regular: 400,
              medium: 500,
              semibold: 600,
              bold: 700
            },
            sizes: {
              display: "5.5rem",
              heading: "2.75rem",
              subheading: "1.375rem",
              body: "1rem",
              caption: "0.875rem"
            }
          },
          colors: {
            primary: "#F97316",
            secondary: "#EA580C",
            accent: "#FB923C",
            neutral: {
              50: "#FFF7ED",
              100: "#FFEDD5",
              200: "#FED7AA",
              300: "#FDBA74",
              400: "#FB923C",
              500: "#F97316",
              600: "#EA580C",
              700: "#C2410C",
              800: "#9A3412",
              900: "#7C2D12"
            },
            semantic: {
              success: "#22C55E",
              warning: "#F59E0B",
              error: "#EF4444",
              info: "#3B82F6"
            }
          }
        }
      
      case "Aimee":
        return {
          typography: {
            primary: "Inter",
            secondary: "Geist Mono",
            weights: {
              light: 300,
              regular: 400,
              medium: 500,
              semibold: 600,
              bold: 700
            },
            sizes: {
              display: "6rem",
              heading: "3rem",
              subheading: "1.5rem",
              body: "1rem",
              caption: "0.875rem"
            }
          },
          colors: {
            primary: "#10B981",
            secondary: "#059669",
            accent: "#34D399",
            neutral: {
              50: "#F0FDF4",
              100: "#DCFCE7",
              200: "#BBF7D0",
              300: "#86EFAC",
              400: "#4ADE80",
              500: "#22C55E",
              600: "#16A34A",
              700: "#15803D",
              800: "#166534",
              900: "#14532D"
            },
            semantic: {
              success: "#10B981",
              warning: "#F59E0B",
              error: "#EF4444",
              info: "#3B82F6"
            }
          }
        }
      
      case "Spotly":
        return {
          typography: {
            primary: "Outfit",
            secondary: "Outfit",
            weights: {
              light: 300,
              regular: 400,
              medium: 500,
              semibold: 600,
              bold: 700
            },
            sizes: {
              display: "6rem",
              heading: "3rem",
              subheading: "1.5rem",
              body: "1rem",
              caption: "0.875rem"
            }
          },
          colors: {
            primary: "#22C55E",
            secondary: "#16A34A",
            accent: "#4ADE80",
            neutral: {
              50: "#F0FDF4",
              100: "#DCFCE7",
              200: "#BBF7D0",
              300: "#86EFAC",
              400: "#4ADE80",
              500: "#22C55E",
              600: "#16A34A",
              700: "#15803D",
              800: "#166534",
              900: "#14532D"
            },
            semantic: {
              success: "#22C55E",
              warning: "#F59E0B",
              error: "#EF4444",
              info: "#3B82F6"
            }
          }
        }
      
      default:
        return {
          typography: {
            primary: "Inter",
            secondary: "JetBrains Mono",
            weights: {
              light: 300,
              regular: 400,
              medium: 500,
              semibold: 600,
              bold: 700
            },
            sizes: {
              display: "6rem",
              heading: "3rem",
              subheading: "1.5rem",
              body: "1rem",
              caption: "0.875rem"
            }
          },
          colors: {
            primary: project.accentColor,
            secondary: project.accentColor,
            accent: project.accentColor,
            neutral: {
              50: "#FAFAFA",
              100: "#F5F5F5",
              200: "#E5E5E5",
              300: "#D4D4D4",
              400: "#A3A3A3",
              500: "#737373",
              600: "#525252",
              700: "#404040",
              800: "#262626",
              900: "#171717"
            },
            semantic: {
              success: "#10B981",
              warning: "#F59E0B",
              error: "#EF4444",
              info: "#3B82F6"
            }
          }
        }
    }
  }

  const style = getProjectStyle(project.title)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="space-y-16"
    >
      {/* Typography Section */}
      <div className="space-y-8">
        <div className="flex items-center gap-4">
          <div 
            className="w-1 h-8 rounded-full"
            style={{ backgroundColor: style.colors.primary }}
          />
          <h3 className="text-2xl font-light text-[var(--text-primary)]">
            Typography
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Primary Font */}
          <div className="space-y-4">
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-[var(--text-secondary)] uppercase tracking-wider">
                Primary Font
              </h4>
              <div 
                className={`text-3xl font-light ${
                  style.typography.primary === 'Outfit' ? 'font-outfit' : 
                  style.typography.primary === 'Montserrat' ? 'font-montserrat' : ''
                }`}
                style={{ 
                  color: style.colors.primary
                }}
              >
                {style.typography.primary}
              </div>
              <p className="text-sm text-[var(--text-tertiary)]">
                Used for headings and primary text
              </p>
            </div>

            {/* Font Weights */}
            <div className="space-y-3">
              <h5 className="text-xs font-medium text-[var(--text-secondary)] uppercase tracking-wider">
                Weights
              </h5>
              <div className="space-y-2">
                {Object.entries(style.typography.weights).map(([weight, value]) => (
                  <div key={weight} className="flex items-center justify-between">
                    <span className="text-sm text-[var(--text-tertiary)] capitalize">
                      {weight}
                    </span>
                    <span 
                      className="text-sm font-mono"
                      style={{ 
                        fontWeight: value,
                        color: style.colors.primary
                      }}
                    >
                      {value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Secondary Font */}
          <div className="space-y-4">
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-[var(--text-secondary)] uppercase tracking-wider">
                Secondary Font
              </h4>
              <div 
                className={`text-2xl font-mono ${
                  style.typography.secondary === 'JetBrains Mono' ? 'font-jetbrains-mono' : 
                  style.typography.secondary === 'Geist Mono' ? 'font-geist-mono' : 
                  style.typography.secondary === 'Outfit' ? 'font-outfit' : ''
                }`}
                style={{ 
                  color: style.colors.secondary
                }}
              >
                {style.typography.secondary}
              </div>
              <p className="text-sm text-[var(--text-tertiary)]">
                Used for code and technical elements
              </p>
            </div>

            {/* Font Sizes */}
            <div className="space-y-3">
              <h5 className="text-xs font-medium text-[var(--text-secondary)] uppercase tracking-wider">
                Sizes
              </h5>
              <div className="space-y-2">
                {Object.entries(style.typography.sizes).map(([size, value]) => (
                  <div key={size} className="flex items-center justify-between">
                    <span className="text-sm text-[var(--text-tertiary)] capitalize">
                      {size}
                    </span>
                    <span 
                      className="text-sm font-mono"
                      style={{ 
                        fontSize: value,
                        color: style.colors.primary
                      }}
                    >
                      {value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Color Palette Section */}
      <div className="space-y-8">
        <div className="flex items-center gap-4">
          <div 
            className="w-1 h-8 rounded-full"
            style={{ backgroundColor: style.colors.primary }}
          />
          <h3 className="text-2xl font-light text-[var(--text-primary)]">
            Color Palette
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Primary Colors */}
          <div className="space-y-6">
            <h4 className="text-sm font-medium text-[var(--text-secondary)] uppercase tracking-wider">
              Primary Colors
            </h4>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[var(--text-tertiary)]">Primary</span>
                  <span className="text-xs font-mono text-[var(--text-tertiary)]">
                    {style.colors.primary}
                  </span>
                </div>
                <div 
                  className="w-full h-12 rounded-lg border"
                  style={{ backgroundColor: style.colors.primary }}
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[var(--text-tertiary)]">Secondary</span>
                  <span className="text-xs font-mono text-[var(--text-tertiary)]">
                    {style.colors.secondary}
                  </span>
                </div>
                <div 
                  className="w-full h-12 rounded-lg border"
                  style={{ backgroundColor: style.colors.secondary }}
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[var(--text-tertiary)]">Accent</span>
                  <span className="text-xs font-mono text-[var(--text-tertiary)]">
                    {style.colors.accent}
                  </span>
                </div>
                <div 
                  className="w-full h-12 rounded-lg border"
                  style={{ backgroundColor: style.colors.accent }}
                />
              </div>
            </div>
          </div>

          {/* Neutral Colors */}
          <div className="space-y-6">
            <h4 className="text-sm font-medium text-[var(--text-secondary)] uppercase tracking-wider">
              Neutral Scale
            </h4>
            
            <div className="space-y-2">
              {Object.entries(style.colors.neutral).map(([shade, color]) => (
                <div key={shade} className="flex items-center gap-3">
                  <div 
                    className="w-8 h-8 rounded border flex-shrink-0"
                    style={{ backgroundColor: color }}
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-[var(--text-tertiary)]">
                        {shade}
                      </span>
                      <span className="text-xs font-mono text-[var(--text-tertiary)]">
                        {color}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Semantic Colors */}
        <div className="space-y-6">
          <h4 className="text-sm font-medium text-[var(--text-secondary)] uppercase tracking-wider">
            Semantic Colors
          </h4>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.entries(style.colors.semantic).map(([semantic, color]) => (
              <div key={semantic} className="space-y-2">
                <div 
                  className="w-full h-16 rounded-lg border"
                  style={{ backgroundColor: color }}
                />
                <div className="text-center">
                  <div className="text-xs font-medium text-[var(--text-tertiary)] capitalize">
                    {semantic}
                  </div>
                  <div className="text-xs font-mono text-[var(--text-tertiary)]">
                    {color}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Usage Examples */}
      <div className="space-y-8">
        <div className="flex items-center gap-4">
          <div 
            className="w-1 h-8 rounded-full"
            style={{ backgroundColor: style.colors.primary }}
          />
          <h3 className="text-2xl font-light text-[var(--text-primary)]">
            Usage Examples
          </h3>
        </div>

        <div className="space-y-6">
          {/* Typography Example */}
          <div className="p-6 rounded-xl border" style={{ backgroundColor: style.colors.neutral[50] }}>
            <div className="space-y-4">
              <h4 
                className={`text-3xl font-semibold ${
                  style.typography.primary === 'Outfit' ? 'font-outfit' : 
                  style.typography.primary === 'Montserrat' ? 'font-montserrat' : ''
                }`}
                style={{ 
                  color: style.colors.primary
                }}
              >
                {project.title}
              </h4>
              <p 
                className={`text-lg ${
                  style.typography.primary === 'Outfit' ? 'font-outfit' : 
                  style.typography.primary === 'Montserrat' ? 'font-montserrat' : ''
                }`}
                style={{ 
                  color: style.colors.neutral[700]
                }}
              >
                {project.type}
              </p>
              <p 
                className={`text-sm font-mono ${
                  style.typography.secondary === 'JetBrains Mono' ? 'font-jetbrains-mono' : 
                  style.typography.secondary === 'Geist Mono' ? 'font-geist-mono' : 
                  style.typography.secondary === 'Outfit' ? 'font-outfit' : ''
                }`}
                style={{ 
                  color: style.colors.neutral[500]
                }}
              >
                {project.details.technologies.join(" • ")}
              </p>
            </div>
          </div>

          {/* Color Harmony Example */}
          <div className="grid grid-cols-3 gap-4">
            <div 
              className="h-24 rounded-lg flex items-center justify-center text-white font-medium"
              style={{ backgroundColor: style.colors.primary }}
            >
              Primary
            </div>
            <div 
              className="h-24 rounded-lg flex items-center justify-center text-white font-medium"
              style={{ backgroundColor: style.colors.secondary }}
            >
              Secondary
            </div>
            <div 
              className="h-24 rounded-lg flex items-center justify-center text-white font-medium"
              style={{ backgroundColor: style.colors.accent }}
            >
              Accent
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default ProjectStyleGuide
