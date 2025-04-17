"use client"

import { cn } from "@/lib/utils"
import { TypingEffect } from "./typing-effect"

interface TerminalPromptProps {
  className?: string
  command?: string
  onComplete?: () => void
  isActive?: boolean
}

export function TerminalPrompt({ className, command, onComplete, isActive = true }: TerminalPromptProps) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <span className="text-blue-500">samir@usf:~$</span>
      <div className="relative inline-flex">
        {command ? (
          <TypingEffect
            text={command}
            className="text-white"
            onComplete={onComplete}
            showCursor={isActive}
          />
        ) : isActive && (
          <span className="w-2 h-4 bg-blue-500 animate-blink" />
        )}
      </div>
    </div>
  )
} 