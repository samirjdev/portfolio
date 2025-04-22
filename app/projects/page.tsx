"use client"

import { TerminalLayout } from "../components/terminal-layout"
import { TerminalPrompt } from "../components/terminal-prompt"
import { useState, useEffect } from "react"

type CommandState = {
  showCommand: boolean
  showDescription: boolean
  isActive: boolean
}

const projects = [
  {
    title: "Curv",
    description: "An app designed to combat social media addiction by providing a healthy alternative.",
    skills: ["Next.JS", "Python", "MongoDB"]
  },
  {
    title: "Starphish",
    description: "A proof-of-concept phishing and social engineering game to raise cyber security awareness.",
    skills: ["React", "Go"]
  },
  {
    title: "Cable",
    description: "A secure, privacy-focused decentralized messaging platform alternative.",
    skills: ["Flutter", "Javascript", "Python"]
  },
  {
    title: "Coming Soon",
    description: "An overlay tool that proactively detects and covers sensitive information, objects, and images",
    skills: ["Python"]
  },
]

export default function ProjectsPage() {
  const [commands, setCommands] = useState<Record<string, CommandState>>({
    ls: { showCommand: false, showDescription: false, isActive: false },
    cat: { showCommand: false, showDescription: false, isActive: false }
  })

  useEffect(() => {
    let currentIndex = 0
    const sequence = [
      { command: 'ls', delay: 1000 },
      { command: 'cat', delay: 3000 }
    ]

    const startNextCommand = () => {
      if (currentIndex < sequence.length) {
        const { command, delay } = sequence[currentIndex]
        setTimeout(() => {
          setCommands(prev => ({
            ...prev,
            [command]: { ...prev[command], showCommand: true, isActive: true }
          }))
          currentIndex++
          startNextCommand()
        }, delay)
      }
    }

    startNextCommand()

    return () => {
      currentIndex = sequence.length
    }
  }, [])

  const handleCommandComplete = (command: string) => {
    setTimeout(() => {
      setCommands(prev => ({
        ...prev,
        [command]: { ...prev[command], showDescription: true, isActive: false }
      }))
    }, 500)
  }

  return (
    <TerminalLayout rightButtonTooltip="About" rightButtonHref="/">
      <div className="space-y-4 font-mono pb-16">
        {!Object.values(commands).some(cmd => cmd.showCommand) && (
          <TerminalPrompt isActive={true} />
        )}

        {commands.ls.showCommand && (
          <>
            <TerminalPrompt 
              command="ls projects/" 
              onComplete={() => handleCommandComplete('ls')}
              isActive={commands.ls.isActive}
            />
            {commands.ls.showDescription && (
              <>
                <div className="text-white grid grid-cols-2 gap-4">
                  {projects.map((project, index) => (
                    <div key={index} className="border border-blue-500 rounded-lg p-4 hover:bg-blue-500/5 transition-colors">
                      <h2 className="text-xl font-bold text-green-500 mb-2">{project.title}</h2>
                      <p className="text-gray-400 mb-4">{project.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {project.skills.map((skill, skillIndex) => (
                          <span key={skillIndex} className="px-3 py-1 bg-blue-500/10 text-blue-500 rounded-full text-sm">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                {!commands.cat.showCommand && <TerminalPrompt isActive={true} />}
              </>
            )}
          </>
        )}

        {commands.cat.showCommand && (
          <>
            <TerminalPrompt 
              command="cat README.md" 
              onComplete={() => handleCommandComplete('cat')}
              isActive={commands.cat.isActive}
            />
            {commands.cat.showDescription && (
              <>
                <p className="text-white">
                  Welcome to my projects page! Here you can find a collection of my work.
                  Each project showcases different skills and technologies I&apos;ve worked with.
                  Feel free to explore and learn more about each project.
                </p>
                <TerminalPrompt isActive={true} />
              </>
            )}
          </>
        )}
      </div>
    </TerminalLayout>
  )
} 