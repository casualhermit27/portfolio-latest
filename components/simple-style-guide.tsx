"use client"

import React from "react"

interface SimpleStyleGuideProps {
  project: {
    title: string
    accentColor: string
    details: {
      technologies: string[]
    }
  }
}

const SimpleStyleGuide: React.FC<SimpleStyleGuideProps> = ({ project }) => {
  // Define proper design system for each project
  const getProjectStyle = (projectTitle: string) => {
    switch (projectTitle) {
      case "Insightix AI":
        return {
          typography: {
            headings: "Montserrat",
            body: "Montserrat",
            mono: "JetBrains Mono"
          },
          brandColors: {
            primary: "#0a1123", // Deep navy blue
            secondary: "#fafaf7", // White
            accent: "#3B82F6" // Vibrant blue accent
          },
          neutrals: {
            white: "#fafaf7", // White
            gray50: "#f3f3f2", // Light gray
            gray100: "#e7e7e7", // Medium gray
            gray500: "#64748B",
            gray800: "#0a1123", // Deep navy
            gray900: "#000000"
          },
          states: {
            success: "#10B981", // Green accent
            warning: "#F59E0B", // Orange accent
            error: "#EF4444" // Magenta accent
          }
        }
      
      case "Eevolution":
        return {
          typography: {
            headings: "Playfair Display",
            body: "Outfit",
            mono: "Outfit"
          },
          brandColors: {
            primary: "#f7f7f8", // Clean white
            secondary: "#c35f22", // Rich terracotta orange
            accent: "#f7ece0" // Light beige
          },
          neutrals: {
            white: "#f7f7f8", // Clean white
            gray50: "#f7ece0", // Light beige
            gray100: "#ececec", // Medium gray
            gray500: "#6B7280",
            gray800: "#c35f22", // Rich terracotta orange
            gray900: "#000000"
          },
          states: {
            success: "#c35f22", // Rich terracotta orange
            warning: "#F59E0B",
            error: "#EF4444"
          }
        }
      
      case "Aimee":
        return {
          typography: {
            headings: "Plus Jakarta Sans",
            body: "Plus Jakarta Sans",
            mono: "JetBrains Mono"
          },
          brandColors: {
            primary: "#fcfcfd", // Crisp white
            secondary: "#a020f0", // Vibrant purple
            accent: "#d5e6ff" // Light blue pastel
          },
          neutrals: {
            white: "#fcfcfd", // Crisp white
            gray50: "#f3f2fa", // Pale gray
            gray100: "#d5e6ff", // Light blue pastel
            gray500: "#6B7280",
            gray800: "#a020f0", // Vibrant purple
            gray900: "#000000" // Black text for contrast
          },
          states: {
            success: "#dbfff3", // Mint green pastel
            warning: "#ffe2fa", // Soft pink pastel
            error: "#a020f0" // Vibrant purple
          }
        }
      
      case "Spotly":
        return {
          typography: {
            headings: "Sora",
            body: "Inter",
            mono: "Inter"
          },
          brandColors: {
            primary: "#13151c", // Dark navy
            secondary: "#fbfbfa", // White
            accent: "#ff6900" // Bright orange for CTA
          },
          neutrals: {
            white: "#fbfbfa", // White
            gray50: "#c9fdee", // Muted cyan for background highlights
            gray100: "#f3f3f0", // Light gray
            gray500: "#6B7280",
            gray800: "#13151c", // Dark navy
            gray900: "#000000"
          },
          states: {
            success: "#12c2a8", // Vibrant green gradient start
            warning: "#0fab8e", // Vibrant green gradient end
            error: "#ff6900" // Bright orange
          }
        }
      
      default:
        return {
          typography: {
            headings: "Inter",
            body: "Inter",
            mono: "JetBrains Mono"
          },
          brandColors: {
            primary: project.accentColor,
            secondary: "#374151",
            accent: project.accentColor
          },
          neutrals: {
            white: "#FFFFFF",
            gray50: "#F9FAFB",
            gray100: "#F3F4F6",
            gray500: "#6B7280",
            gray800: "#1F2937",
            gray900: "#111827"
          },
          states: {
            success: "#10B981",
            warning: "#F59E0B",
            error: "#EF4444"
          }
        }
    }
  }

  const style = getProjectStyle(project.title)

  return (
    <div className="space-y-4">
      {/* Project Name */}
      <div>
        <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">
          {project.title}
        </h3>
      </div>

    </div>
  )
}

export default SimpleStyleGuide
