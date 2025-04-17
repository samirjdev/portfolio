"use client"

import { useEffect, useState, useRef } from "react"
import { cn } from "@/lib/utils"

interface TypingEffectProps {
  text: string
  className?: string
  delay?: number
  onComplete?: () => void
  showCursor?: boolean
}

export function TypingEffect({ text, className, delay = 0, onComplete, showCursor = true }: TypingEffectProps) {
  const [displayedText, setDisplayedText] = useState("")
  const [isTyping, setIsTyping] = useState(true)
  const intervalRef = useRef<NodeJS.Timeout | undefined>(undefined)
  const hasCompletedRef = useRef<boolean>(false)

  useEffect(() => {
    // Only start typing if we haven't completed before
    if (hasCompletedRef.current) {
      return
    }

    let currentIndex = 0
    const startDelay = setTimeout(() => {
      intervalRef.current = setInterval(() => {
        if (currentIndex < text.length) {
          setDisplayedText(text.slice(0, currentIndex + 1))
          currentIndex++
        } else {
          clearInterval(intervalRef.current)
          setIsTyping(false)
          hasCompletedRef.current = true
          onComplete?.()
        }
      }, 100) // Fixed typing speed
    }, delay)

    return () => {
      clearTimeout(startDelay)
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, []) // Empty dependency array to run only once

  return (
    <span className={cn("inline-block", className)}>
      {displayedText}
      {showCursor && isTyping && <span className="w-2 h-5 bg-blue-500 animate-blink inline-block ml-1" />}
    </span>
  )
} 