"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface TechStack {
  name: string
  icon: React.ReactNode
}

interface TechStackCarouselProps {
  techStacks: TechStack[]
}

export function TechStackCarousel({ techStacks }: TechStackCarouselProps) {
  const [scrollPosition, setScrollPosition] = useState(0)
  const [maxScroll, setMaxScroll] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  // Group tech stacks into sets of 8 (4x2 grid on desktop, 2x4 grid on mobile)
  const groupedStacks = techStacks.reduce((acc, curr, i) => {
    const groupIndex = Math.floor(i / 8)
    if (!acc[groupIndex]) {
      acc[groupIndex] = []
    }
    acc[groupIndex].push(curr)
    return acc
  }, [] as typeof techStacks[])

  useEffect(() => {
    if (containerRef.current) {
      setMaxScroll(containerRef.current.scrollWidth - containerRef.current.clientWidth)
    }

    const handleResize = () => {
      if (containerRef.current) {
        setMaxScroll(containerRef.current.scrollWidth - containerRef.current.clientWidth)
      }
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [techStacks])

  const scroll = (direction: "left" | "right") => {
    if (containerRef.current) {
      const scrollAmount = containerRef.current.clientWidth
      const newPosition =
        direction === "left"
          ? Math.max(scrollPosition - scrollAmount, 0)
          : Math.min(scrollPosition + scrollAmount, maxScroll)

      containerRef.current.scrollTo({
        left: newPosition,
        behavior: "smooth",
      })
      setScrollPosition(newPosition)
    }
  }

  return (
    <div className="relative px-12">
      <div className="absolute left-0 top-1/2 -translate-y-1/2 z-10">
        <Button
          variant="outline"
          size="icon"
          className="rounded-full bg-background/80 backdrop-blur-sm"
          onClick={() => scroll("left")}
          disabled={scrollPosition <= 0}
        >
          <ChevronLeft className="h-5 w-5" />
          <span className="sr-only">Scroll left</span>
        </Button>
      </div>

      <div
        ref={containerRef}
        className="overflow-x-auto scrollbar-hide snap-x snap-mandatory"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        <div className="flex">
          {groupedStacks.map((group, groupIndex) => (
            <div
              key={groupIndex}
              className="grid min-w-full p-4 snap-start gap-6 grid-cols-2 md:grid-cols-4 grid-rows-4 md:grid-rows-2"
            >
              {group.map((tech, index) => (
                <Card
                  key={index}
                  className="border hover:shadow-md transition-shadow bg-gray-800"
                >
                  <CardContent className="p-4 flex flex-col items-center justify-center gap-2">
                    <div className="w-12 h-12 flex items-center justify-center">
                      {tech.icon}
                    </div>
                    <h3 className="text-sm font-medium text-center">{tech.name}</h3>
                  </CardContent>
                </Card>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="absolute right-0 top-1/2 -translate-y-1/2 z-10">
        <Button
          variant="outline"
          size="icon"
          className="rounded-full bg-background/80 backdrop-blur-sm"
          onClick={() => scroll("right")}
          disabled={scrollPosition >= maxScroll}
        >
          <ChevronRight className="h-5 w-5" />
          <span className="sr-only">Scroll right</span>
        </Button>
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  )
}

