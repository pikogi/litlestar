"use client"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

type Direction = "up" | "left" | "right"

interface RevealProps {
  children: React.ReactNode
  className?: string
  delay?: number
  direction?: Direction
}

const directionClass: Record<Direction, string> = {
  up: "translate-y-8",
  left: "-translate-x-10",
  right: "translate-x-10",
}

export function Reveal({ children, className, delay = 0, direction = "up" }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect() } },
      { threshold: 0.15 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={cn(
        "transition-all duration-700 ease-out",
        visible ? "opacity-100 translate-x-0 translate-y-0" : `opacity-0 ${directionClass[direction]}`,
        className
      )}
      style={{ transitionDelay: visible ? `${delay}ms` : "0ms" }}
    >
      {children}
    </div>
  )
}
