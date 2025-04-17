"use client"

import { cn } from "@/lib/utils"
import { useState } from "react"
import { FileText, RotateCw } from "lucide-react"

interface TerminalLayoutProps {
  children: React.ReactNode
  className?: string
}

export function TerminalLayout({ children, className }: TerminalLayoutProps) {
  const [isClosing, setIsClosing] = useState(false)

  const handleClose = () => {
    setIsClosing(true)
    setTimeout(() => {
      window.location.href = '/posts'
    }, 1000)
  }

  const handleGreen = () => {
    window.location.href = '/resume.pdf'
  }

  const handleYellow = () => {
    window.location.href = 'https://www.youtube.com/watch?v=yPYZpwSpKmA'
  }

  return (
    <div className={cn(
      "min-h-screen bg-black flex items-center justify-center p-4 transition-opacity duration-1000",
      isClosing && "opacity-0"
    )}>
      <div className={cn(
        "w-full max-w-3xl h-[660px] bg-black border border-blue-500 rounded-lg p-4 flex flex-col relative transition-opacity duration-700", 
        className,
        isClosing && "opacity-0"
      )}>
        <div className="flex items-center gap-2 mb-4">
          <button 
            onClick={handleClose}
            className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 transition-colors"
          />
          <button 
            onClick={handleYellow}
            className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-600 transition-colors"
          />
          <button 
            onClick={handleGreen}
            className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-600 transition-colors"
          />
          <div className="text-sm ml-2 text-blue-500">terminal</div>
        </div>
        <div className="flex-1 overflow-y-auto">
          {children}
        </div>
        <div className="absolute bottom-4 left-4">
          <button
            onClick={() => window.location.href = '/resume.pdf'}
            className="p-2 text-green-500 hover:bg-green-500/10 rounded-lg transition-colors"
          >
            <FileText className="w-5 h-5" />
          </button>
        </div>
        <div className="absolute bottom-4 right-4">
          <button
            onClick={() => window.location.reload()}
            className="p-2 text-blue-500 hover:bg-blue-500/10 rounded-lg transition-colors"
          >
            <RotateCw className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  )
} 