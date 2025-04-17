"use client"

import { cn } from "@/lib/utils"

interface TerminalLayoutProps {
  children: React.ReactNode
  className?: string
}

export function TerminalLayout({ children, className }: TerminalLayoutProps) {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className={cn("w-full max-w-3xl h-[600px] bg-black border border-blue-500 rounded-lg p-4 flex flex-col", className)}>
        <div className="flex items-center gap-2 mb-4">
          <div className="w-3 h-3 rounded-full bg-red-500 cursor-pointer hover:bg-red-600 transition-colors"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500 cursor-pointer hover:bg-yellow-600 transition-colors"></div>
          <div className="w-3 h-3 rounded-full bg-green-500 cursor-pointer hover:bg-green-600 transition-colors"></div>
          <div className="text-sm ml-2 text-blue-500">terminal</div>
        </div>
        <div className="flex-1 overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  )
} 