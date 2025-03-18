"use client"

import type React from "react"
import { useState, useRef, useEffect, useCallback } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import useEmblaCarousel from 'embla-carousel-react'

interface TechStack {
  name: string
  icon: React.ReactNode
}

interface TechStackCarouselProps {
  techStacks: TechStack[]
}

export function TechStackCarousel({ techStacks }: TechStackCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    loop: true,
  })

  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false)
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false)

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi])

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setPrevBtnEnabled(emblaApi.canScrollPrev())
    setNextBtnEnabled(emblaApi.canScrollNext())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    onSelect()
    emblaApi.on('select', onSelect)
    return () => {
      emblaApi.off('select', onSelect)
    }
  }, [emblaApi, onSelect])

  // Group techStacks into sets of 12 (6x2 grid)
  const groupedTechStacks = techStacks.reduce((acc, curr, i) => {
    const groupIndex = Math.floor(i / 12)
    if (!acc[groupIndex]) {
      acc[groupIndex] = []
    }
    acc[groupIndex].push(curr)
    return acc
  }, [] as TechStack[][]);

  return (
    <div className="relative w-full max-w-[1200px] mx-auto">
      <div className="overflow-hidden bg-white rounded-xl" ref={emblaRef}>
        <div className="flex">
          {groupedTechStacks.map((group, groupIndex) => (
            <div key={groupIndex} className="flex-[0_0_100%] min-w-0 relative p-8">
              <div className="grid grid-cols-3 md:grid-cols-6 gap-8">
                {group.slice(0, 6).map((tech, index) => (
                  <div
                    key={`${groupIndex}-${index}`}
                    className="flex flex-col items-center justify-center gap-4"
                  >
                    <div className="w-24 h-24 flex items-center justify-center bg-gray-900 rounded-xl shadow-lg transition-transform hover:scale-105">
                      <div className="w-16 h-16 flex items-center justify-center">
                        {tech.icon}
                      </div>
                    </div>
                    <span className="text-sm font-medium text-gray-600">
                      {tech.name}
                    </span>
                  </div>
                ))}
              </div>
              {group.length > 6 && (
                <div className="grid grid-cols-3 md:grid-cols-6 gap-8 mt-8">
                  {group.slice(6, 12).map((tech, index) => (
                    <div
                      key={`${groupIndex}-${index + 6}`}
                      className="flex flex-col items-center justify-center gap-4"
                    >
                      <div className="w-24 h-24 flex items-center justify-center bg-gray-900 rounded-xl shadow-lg transition-transform hover:scale-105">
                        <div className="w-16 h-16 flex items-center justify-center">
                          {tech.icon}
                        </div>
                      </div>
                      <span className="text-sm font-medium text-gray-600">
                        {tech.name}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <button
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur rounded-full p-2 shadow-lg hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed z-10"
        onClick={scrollPrev}
        disabled={!prevBtnEnabled}
      >
        <ChevronLeft className="w-6 h-6 text-gray-800" />
      </button>
      <button
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur rounded-full p-2 shadow-lg hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed z-10"
        onClick={scrollNext}
        disabled={!nextBtnEnabled}
      >
        <ChevronRight className="w-6 h-6 text-gray-800" />
      </button>
    </div>
  )
}

