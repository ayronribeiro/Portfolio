import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface TechStack {
  name: string
  icon: React.ReactNode
}

interface TechStackCarouselProps {
  techStacks: TechStack[]
}

export function TechStackCarousel({ techStacks }: TechStackCarouselProps) {
  const [currentPage, setCurrentPage] = useState(0)
  const [mounted, setMounted] = useState(false)

  // Definir número fixo de itens por breakpoint
  const mobileItems = 6  // 2 colunas x 3 linhas
  const tabletItems = 8  // 4 colunas x 2 linhas
  const desktopItems = 12 // 6 colunas x 2 linhas

  // Usar o número de itens baseado no breakpoint do grid
  const getItemsPerPage = () => {
    if (typeof window === 'undefined') return mobileItems
    if (window.matchMedia('(min-width: 1024px)').matches) return desktopItems
    if (window.matchMedia('(min-width: 640px)').matches) return tabletItems
    return mobileItems
  }

  const [itemsPerPage, setItemsPerPage] = useState(mobileItems)

  useEffect(() => {
    setMounted(true)
    setItemsPerPage(getItemsPerPage())

    const handleResize = () => {
      setItemsPerPage(getItemsPerPage())
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const totalPages = Math.ceil(techStacks.length / itemsPerPage)
  const startIndex = currentPage * itemsPerPage
  const displayedStacks = techStacks.slice(startIndex, startIndex + itemsPerPage)

  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages)
  }

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages)
  }

  if (!mounted) {
    return null
  }

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 md:-translate-x-12 z-10"
        onClick={prevPage}
      >
        <ChevronLeft className="h-8 w-8" />
      </Button>
      <div className="!grid !grid-cols-2 sm:!grid-cols-4 lg:!grid-cols-6 gap-8 px-8 md:px-0">
        {displayedStacks.slice(0, itemsPerPage).map((tech: TechStack, index: number) => (
          <div
            key={tech.name}
            className="flex flex-col items-center justify-center gap-2 p-4 rounded-lg hover:bg-muted/50 transition-colors"
          >
            <div className="relative w-12 h-12 flex items-center justify-center">
              {tech.icon}
            </div>
            <span className="text-sm text-center text-muted-foreground">{tech.name}</span>
          </div>
        ))}
      </div>
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 md:translate-x-12 z-10"
        onClick={nextPage}
      >
        <ChevronRight className="h-8 w-8" />
      </Button>
    </div>
  )
} 