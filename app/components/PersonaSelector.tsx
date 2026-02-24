'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { personas, type Persona } from '@/app/lib/personas/data'
import Card from '@/app/components/ui/Card'
import Badge from '@/app/components/ui/Badge'
import Button from '@/app/components/ui/Button'

interface PersonaSelectorProps {
  selectedPersona: string
  onSelectPersona: (personaId: string) => void
  onApply?: (systemPrompt: string) => void
}

export default function PersonaSelector({ 
  selectedPersona, 
  onSelectPersona,
  onApply 
}: PersonaSelectorProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [detailView, setDetailView] = useState<Persona | null>(null)

  const currentPersona = personas.find(p => p.id === selectedPersona) || personas[0]

  const handleSelect = (persona: Persona) => {
    onSelectPersona(persona.id)
    if (onApply) {
      onApply(persona.systemPrompt)
    }
    setIsOpen(false)
    setDetailView(null)
  }

  return (
    <div className="relative">
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-3 bg-dark-card border-2 border-gray-700 hover:border-forge-orange rounded-lg transition-all flex items-center justify-between"
      >
        <div className="flex items-center gap-3">
          <span className="text-2xl">{currentPersona.icon}</span>
          <div className="text-left">
            <div className="font-semibold">{currentPersona.name}</div>
            <div className="text-xs text-gray-400">{currentPersona.description}</div>
          </div>
        </div>
        <span className="text-gray-400">{isOpen ? '▲' : '▼'}</span>
      </button>

      {/* Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 right-0 mt-2 z-50"
          >
            <Card variant="default" padding="sm" className="max-h-96 overflow-y-auto">
              <div className="grid gap-2">
                {personas.map((persona) => (
                  <div key={persona.id} className="flex gap-2">
                    <button
                      onClick={() => setDetailView(persona)}
                      className="flex-1 px-3 py-2 bg-dark-bg hover:bg-gray-700 rounded-lg transition-all text-left flex items-center gap-3"
                    >
                      <span className="text-xl">{persona.icon}</span>
                      <div className="flex-1">
                        <div className="font-semibold text-sm">{persona.name}</div>
                        <div className="text-xs text-gray-400">{persona.description}</div>
                      </div>
                      {selectedPersona === persona.id && (
                        <Badge variant="success">Active</Badge>
                      )}
                    </button>
                    <button
                      onClick={() => handleSelect(persona)}
                      className="px-3 bg-forge-orange hover:bg-forge-red rounded-lg text-sm font-semibold"
                    >
                      Use
                    </button>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Detail Modal */}
      <AnimatePresence>
        {detailView && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
            onClick={() => setDetailView(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-2xl w-full"
            >
              <Card variant="gradient" padding="lg">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-4xl">{detailView.icon}</span>
                    <div>
                      <h3 className="text-2xl font-bold">{detailView.name}</h3>
                      <p className="text-gray-400">{detailView.description}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setDetailView(null)}
                    className="text-gray-400 hover:text-white text-2xl"
                  >
                    ×
                  </button>
                </div>

                {/* Traits */}
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-400 mb-2">Traits</h4>
                  <div className="flex flex-wrap gap-2">
                    {detailView.traits.map((trait) => (
                      <Badge key={trait} variant="default">{trait}</Badge>
                    ))}
                  </div>
                </div>

                {/* Expertise */}
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-400 mb-2">Expertise</h4>
                  <div className="flex flex-wrap gap-2">
                    {detailView.expertise.map((exp) => (
                      <Badge key={exp} variant="default">{exp}</Badge>
                    ))}
                  </div>
                </div>

                {/* Tone */}
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-400 mb-2">Tone</h4>
                  <p className="text-sm">{detailView.tone}</p>
                </div>

                {/* Example */}
                <div className="mb-4 p-3 bg-dark-bg rounded-lg border border-gray-700">
                  <h4 className="text-sm font-semibold text-gray-400 mb-2">Example Response</h4>
                  <p className="text-sm italic">"{detailView.example}"</p>
                </div>

                {/* System Prompt */}
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-400 mb-2">System Prompt</h4>
                  <div className="p-3 bg-dark-bg rounded-lg border border-gray-700 text-xs font-mono max-h-40 overflow-y-auto">
                    {detailView.systemPrompt}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <Button
                    variant="primary"
                    onClick={() => handleSelect(detailView)}
                    className="flex-1"
                  >
                    Use This Persona
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setDetailView(null)}
                  >
                    Close
                  </Button>
                </div>
              </Card>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
