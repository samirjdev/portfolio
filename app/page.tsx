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
    <TerminalLayout>
      <div className="space-y-4 font-mono">
        {!Object.values(commands).some(cmd => cmd.showCommand) && (
          <TerminalPrompt isActive={true} />
        )}

        {commands.whoami.showCommand && (
          <>
            <TerminalPrompt 
              command="whoami" 
              onComplete={() => handleCommandComplete('whoami')}
              isActive={commands.whoami.isActive}
            />
            {commands.whoami.showDescription && (
              <>
                <p className="text-white">Samir Jihadi | Student •  Defensive Security • Full-Stack Development</p>
                {!commands.about.showCommand && <TerminalPrompt isActive={true} />}
              </>
            )}
          </>
        )}
        
        {commands.about.showCommand && (
          <>
            <TerminalPrompt 
              command="cat about.txt" 
              onComplete={() => handleCommandComplete('about')}
              isActive={commands.about.isActive}
            />
            {commands.about.showDescription && (
              <>
                <p className="text-white">
                  Hello, I&apos;m a cybersecurity professional and hobbyist software dev based in Tampa, attending the University of South Florida.
                  I am passionate about the role of blue teaming and exploring the intersection of security and
                  cutting-edge tech like AI. I like to frequently participate in hackathons and security competitions, where I
                  sharpen my skills in fun, high‑pressure environments while creating work I&apos;m proud of. I&apos;m committed to
                  innovating secure solutions that empower users or strengthen defenses.
                </p>
                {!commands.skills.showCommand && <TerminalPrompt isActive={true} />}
              </>
            )}
          </>
        )}

        {commands.skills.showCommand && (
          <>
            <TerminalPrompt 
              command="ls skills/" 
              onComplete={() => handleCommandComplete('skills')}
              isActive={commands.skills.isActive}
            />
            {commands.skills.showDescription && (
              <>
                <div className="text-white grid grid-cols-2 gap-2">
                  <p>• Defensive Cybersecurity</p>
                  <p>• Incident Response</p>
                  <p>• Security Automation</p>
                  <p>• Problem Solving</p>
                </div>
                {!commands.contact.showCommand && <TerminalPrompt isActive={true} />}
              </>
            )}
          </>
        )}

        {commands.contact.showCommand && (
          <>
            <TerminalPrompt 
              command="cat contact.txt" 
              onComplete={() => handleCommandComplete('contact')}
              isActive={commands.contact.isActive}
            />
            {commands.contact.showDescription && (
              <>
                <p className="text-white">
                  I&apos;m always open to new opportunities. Email me at <a href="mailto:contact@samirj.dev" className="text-green-500 hover:underline">contact@samirj.dev</a> or find me on <a href="https://github.com/samirjdev" className="text-green-500 hover:underline">GitHub</a> & <a href="https://linkedin.com/in/samirjihadi" className="text-green-500 hover:underline">LinkedIn</a>.
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
