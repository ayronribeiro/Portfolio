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
  const [itemsPerPage, setItemsPerPage] = useState(6)

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

  useEffect(() => {
    const updateItemsPerPage = () => {
      if (window.innerWidth >= 1024) {
        setItemsPerPage(12)
      } else if (window.innerWidth >= 640) {
        setItemsPerPage(8)
      } else {
        setItemsPerPage(6)
      }
    }

    updateItemsPerPage()
    window.addEventListener('resize', updateItemsPerPage)
    return () => window.removeEventListener('resize', updateItemsPerPage)
  }, [])

  // Group techStacks into sets based on itemsPerPage
  const groupedTechStacks = techStacks.reduce((acc, curr, i) => {
    const groupIndex = Math.floor(i / itemsPerPage)
    if (!acc[groupIndex]) {
      acc[groupIndex] = []
    }
    acc[groupIndex].push(curr)
    return acc
  }, [] as TechStack[][])

  return (
    <div className="relative w-full mx-auto">
      <div className="overflow-hidden bg-background rounded-xl" ref={emblaRef}>
        <div className="flex">
          {groupedTechStacks.map((group, groupIndex) => (
            <div key={groupIndex} className="flex-[0_0_100%] min-w-0 relative px-4">
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-x-0.5 gap-y-4 sm:gap-6 max-w-[200px] sm:max-w-[1400px] mx-auto">
                {group.map((tech, index) => (
                  <div
                    key={`${groupIndex}-${index}`}
                    className="flex flex-col items-center justify-center gap-1 sm:gap-4"
                  >
                    <div className="w-16 h-16 sm:w-24 sm:h-24 flex items-center justify-center bg-zinc-900 rounded-xl shadow-lg transition-transform hover:scale-105">
                      <div className="w-10 h-10 sm:w-16 sm:h-16 flex items-center justify-center">
                        {tech.icon}
                      </div>
                    </div>
                    <span className="text-[10px] sm:text-sm font-medium text-muted-foreground">
                      {tech.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <button
        className="absolute left-0 sm:left-2 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur rounded-full p-1 sm:p-2 shadow-lg hover:bg-background transition-colors disabled:opacity-50 disabled:cursor-not-allowed z-10"
        onClick={scrollPrev}
        disabled={!prevBtnEnabled}
      >
        <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-foreground" />
      </button>
      <button
        className="absolute right-0 sm:right-2 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur rounded-full p-1 sm:p-2 shadow-lg hover:bg-background transition-colors disabled:opacity-50 disabled:cursor-not-allowed z-10"
        onClick={scrollNext}
        disabled={!nextBtnEnabled}
      >
        <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-foreground" />
      </button>
    </div>
  )
}

