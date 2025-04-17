"use client"

import { Terminal, Home } from "lucide-react"
import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

export default function PostsPage() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <div className={cn(
      "min-h-screen bg-black text-white transition-opacity duration-1000",
      !isVisible && "opacity-0"
    )}>
      <nav className="border-b border-blue-500">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Terminal className="text-blue-500" />
            <span className="text-blue-500 font-mono">samir@usf:~$</span>
          </div>
          <button
            onClick={() => window.location.href = '/'}
            className="flex items-center gap-2 px-3 py-2 text-blue-500 hover:text-blue-400 border border-blue-500 rounded-lg transition-colors hover:bg-blue-500/10"
          >
            <Home className="w-4 h-4" />
            <span>Home</span>
          </button>
        </div>
      </nav>
      
      <main className="max-w-3xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-green-500 mb-8">Posts</h1>
        
        <div className="space-y-8">
          <article className="border border-blue-500 rounded-lg p-6 hover:bg-blue-500/5 transition-colors">
            <h2 className="text-xl font-bold text-green-500 mb-2">Welcome!</h2>
            <p className="text-gray-400 mb-4">Hello! This is where I want to share more of my thoughts and experiences about cybersecur...</p>
            <div className="flex items-center gap-4 text-sm text-blue-500">
              <span>April 18, 2024</span>
              <span>2 min read</span>
            </div>
          </article>
        </div>
      </main>
    </div>
  )
} 