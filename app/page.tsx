"use client"

import { TerminalLayout } from "./components/terminal-layout"
import { TerminalPrompt } from "./components/terminal-prompt"
import { useState, useEffect } from "react"

type CommandState = {
  showCommand: boolean
  showDescription: boolean
  isActive: boolean
}

export default function Home() {
  const [commands, setCommands] = useState<Record<string, CommandState>>({
    whoami: { showCommand: false, showDescription: false, isActive: false },
    about: { showCommand: false, showDescription: false, isActive: false },
    skills: { showCommand: false, showDescription: false, isActive: false },
    contact: { showCommand: false, showDescription: false, isActive: false }
  })

  useEffect(() => {
    let currentIndex = 0
    const sequence = [
      { command: 'whoami', delay: 1000 },
      { command: 'about', delay: 3000 },
      { command: 'skills', delay: 3000 },
      { command: 'contact', delay: 3000 }
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

    // Cleanup function to prevent any lingering timeouts
    return () => {
      currentIndex = sequence.length // This will prevent any further commands from starting
    }
  }, []) // Empty dependency array ensures this only runs once on mount

  const handleCommandComplete = (command: string) => {
    setTimeout(() => {
      setCommands(prev => ({
        ...prev,
        [command]: { ...prev[command], showDescription: true, isActive: false }
      }))
    }, 500)
  }

  return (
    <TerminalLayout>
      <div className="space-y-4 font-mono">
        {commands.whoami.showCommand && (
          <>
            <TerminalPrompt 
              key="whoami"
              command="whoami" 
              onComplete={() => handleCommandComplete('whoami')}
              isActive={commands.whoami.isActive}
            />
            {commands.whoami.showDescription && (
              <p className="text-white">Samir Jihadi - Cybersecurity professional and enthusiast full stack developer</p>
            )}
          </>
        )}
        
        {commands.about.showCommand && (
          <>
            <TerminalPrompt 
              key="about"
              command="cat about.txt" 
              onComplete={() => handleCommandComplete('about')}
              isActive={commands.about.isActive}
            />
            {commands.about.showDescription && (
              <p className="text-white">
                Hello! I'm a cybersecurity professional and full stack developer based in Tampa, FL. 
                I'm passionate about exploring the intersection of security and cutting-edge technologies like AI, Machine Learning, and Computer Vision. 
                I frequently participate in hackathons and cybersecurity competitions, where I love solving complex puzzles and challenges. 
                My goal is to create innovative projects that help people and make a positive impact in the tech community.
              </p>
            )}
          </>
        )}

        {commands.skills.showCommand && (
          <>
            <TerminalPrompt 
              key="skills"
              command="ls skills/" 
              onComplete={() => handleCommandComplete('skills')}
              isActive={commands.skills.isActive}
            />
            {commands.skills.showDescription && (
              <div className="text-white grid grid-cols-2 gap-2">
                <p>• Defensive Cybersecurity</p>
                <p>• Software Development</p>
                <p>• Project Management</p>
                <p>• Problem Solving</p>
              </div>
            )}
          </>
        )}

        {commands.contact.showCommand && (
          <>
            <TerminalPrompt 
              key="contact"
              command="cat contact.txt" 
              onComplete={() => handleCommandComplete('contact')}
              isActive={commands.contact.isActive}
            />
            {commands.contact.showDescription && (
              <p className="text-white">
                Feel free to reach out! I'm always open to new opportunities and collaborations.
              </p>
            )}
          </>
        )}
      </div>
    </TerminalLayout>
  )
}
