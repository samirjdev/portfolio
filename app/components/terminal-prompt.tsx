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
      {command && (
        <TypingEffect
          text={command}
          className="text-white"
          onComplete={onComplete}
          showCursor={isActive}
        />
      )}
    </div>
  )
} 