'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Card from '@/app/components/ui/Card'
import Button from '@/app/components/ui/Button'
import TextArea from '@/app/components/ui/TextArea'
import Input from '@/app/components/ui/Input'
import Badge from '@/app/components/ui/Badge'

interface ChainStep {
  id: string
  type: 'prompt' | 'transform' | 'condition'
  label: string
  prompt?: string
  transform?: 'summarize' | 'extract' | 'format'
  condition?: string
  output?: string
}

interface Chain {
  id: string
  name: string
  steps: ChainStep[]
}

export default function ChainBuilder() {
  const [chain, setChain] = useState<Chain>({
    id: 'chain-1',
    name: 'My Workflow',
    steps: [],
  })
  const [initialInput, setInitialInput] = useState('')
  const [running, setRunning] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)

  const addStep = (type: ChainStep['type']) => {
    const newStep: ChainStep = {
      id: `step-${Date.now()}`,
      type,
      label: `${type.charAt(0).toUpperCase() + type.slice(1)} Step ${chain.steps.length + 1}`,
    }
    setChain({ ...chain, steps: [...chain.steps, newStep] })
  }

  const updateStep = (id: string, updates: Partial<ChainStep>) => {
    setChain({
      ...chain,
      steps: chain.steps.map(s => s.id === id ? { ...s, ...updates } : s),
    })
  }

  const deleteStep = (id: string) => {
    setChain({
      ...chain,
      steps: chain.steps.filter(s => s.id !== id),
    })
  }

  const moveStep = (id: string, direction: 'up' | 'down') => {
    const idx = chain.steps.findIndex(s => s.id === id)
    if (idx === -1) return
    if (direction === 'up' && idx === 0) return
    if (direction === 'down' && idx === chain.steps.length - 1) return

    const newSteps = [...chain.steps]
    const targetIdx = direction === 'up' ? idx - 1 : idx + 1
    ;[newSteps[idx], newSteps[targetIdx]] = [newSteps[targetIdx], newSteps[idx]]
    setChain({ ...chain, steps: newSteps })
  }

  const runChain = async () => {
    if (!initialInput || chain.steps.length === 0) {
      alert('Add input and at least one step to run the chain')
      return
    }

    setRunning(true)
    setCurrentStep(0)

    let currentOutput = initialInput

    for (let i = 0; i < chain.steps.length; i++) {
      setCurrentStep(i + 1)
      const step = chain.steps[i]

      try {
        if (step.type === 'prompt' && step.prompt) {
          const response = await fetch('/api/generate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              messages: [
                { role: 'system', content: step.prompt },
                { role: 'user', content: currentOutput },
              ],
            }),
          })
          const data = await response.json()
          currentOutput = data.content || currentOutput
        } else if (step.type === 'transform') {
          // Simple transforms (in real app, these could be more sophisticated)
          if (step.transform === 'summarize') {
            const response = await fetch('/api/generate', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                messages: [
                  { role: 'system', content: 'Provide a concise summary of the following text in 2-3 sentences.' },
                  { role: 'user', content: currentOutput },
                ],
              }),
            })
            const data = await response.json()
            currentOutput = data.content || currentOutput
          } else if (step.transform === 'extract') {
            currentOutput = currentOutput.split('\n').filter(line => line.trim()).join('\n')
          } else if (step.transform === 'format') {
            currentOutput = JSON.stringify({ result: currentOutput }, null, 2)
          }
        }

        updateStep(step.id, { output: currentOutput })
      } catch (error) {
        updateStep(step.id, { output: `Error: ${error}` })
        break
      }
    }

    setRunning(false)
    setCurrentStep(0)
  }

  const saveChain = () => {
    const saved = localStorage.getItem('saved-chains')
    const chains = saved ? JSON.parse(saved) : []
    chains.push(chain)
    localStorage.setItem('saved-chains', JSON.stringify(chains))
    alert('Chain saved successfully!')
  }

  const exportChain = () => {
    const blob = new Blob([JSON.stringify(chain, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `chain-${chain.name.toLowerCase().replace(/\s+/g, '-')}.json`
    a.click()
  }

  return (
    <div className="space-y-6">
      {/* Chain Header */}
      <Card variant="gradient" padding="md">
        <div className="flex items-center justify-between mb-4">
          <Input
            value={chain.name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setChain({ ...chain, name: e.target.value })}
            placeholder="Workflow name..."
            className="text-lg font-semibold max-w-xs"
          />
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={saveChain}>
              💾 Save
            </Button>
            <Button variant="outline" size="sm" onClick={exportChain}>
              📤 Export
            </Button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">Initial Input</label>
          <TextArea
            value={initialInput}
            onChange={(e) => setInitialInput(e.target.value)}
            placeholder="Enter the input that will start your chain..."
            rows={4}
          />
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => addStep('prompt')}>
              ➕ Prompt Step
            </Button>
            <Button variant="outline" size="sm" onClick={() => addStep('transform')}>
              ➕ Transform Step
            </Button>
          </div>

          <Button
            variant="primary"
            onClick={runChain}
            disabled={running || !initialInput || chain.steps.length === 0}
          >
            {running ? `⚙️ Running Step ${currentStep}/${chain.steps.length}...` : '▶️ Run Chain'}
          </Button>
        </div>
      </Card>

      {/* Chain Steps */}
      {chain.steps.length === 0 ? (
        <Card variant="glass" padding="lg" className="text-center">
          <div className="text-6xl mb-4">🔗</div>
          <h3 className="text-xl font-bold mb-2">No Steps Yet</h3>
          <p className="text-gray-400 mb-4">
            Add prompt or transform steps to build your workflow
          </p>
        </Card>
      ) : (
        <div className="space-y-3">
          <AnimatePresence>
            {chain.steps.map((step, idx) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ delay: idx * 0.05 }}
              >
                <Card variant="glass" padding="md">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Badge variant="default">Step {idx + 1}</Badge>
                      <Badge variant={step.type === 'prompt' ? 'success' : 'info'}>
                        {step.type}
                      </Badge>
                      <Input
                        value={step.label}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateStep(step.id, { label: e.target.value })}
                        className="text-sm font-semibold max-w-xs"
                      />
                    </div>

                    <div className="flex gap-1">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => moveStep(step.id, 'up')}
                        disabled={idx === 0}
                      >
                        ↑
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => moveStep(step.id, 'down')}
                        disabled={idx === chain.steps.length - 1}
                      >
                        ↓
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => deleteStep(step.id)}
                      >
                        🗑️
                      </Button>
                    </div>
                  </div>

                  {step.type === 'prompt' && (
                    <TextArea
                      value={step.prompt || ''}
                      onChange={(e) => updateStep(step.id, { prompt: e.target.value })}
                      placeholder="Enter the system prompt for this step..."
                      rows={4}
                    />
                  )}

                  {step.type === 'transform' && (
                    <select
                      value={step.transform || ''}
                      onChange={(e) =>
                        updateStep(step.id, {
                          transform: e.target.value as ChainStep['transform'],
                        })
                      }
                      className="w-full bg-dark-bg border border-gray-700 rounded-lg px-3 py-2"
                    >
                      <option value="">Select transformation...</option>
                      <option value="summarize">Summarize</option>
                      <option value="extract">Extract/Clean</option>
                      <option value="format">Format as JSON</option>
                    </select>
                  )}

                  {step.output && (
                    <div className="mt-3">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant="success">✓ Output</Badge>
                        <span className="text-xs text-gray-400">
                          {step.output.length} characters
                        </span>
                      </div>
                      <div className="p-3 bg-dark-bg rounded-lg border border-green-500/30 text-sm max-h-48 overflow-y-auto whitespace-pre-wrap">
                        {step.output}
                      </div>
                    </div>
                  )}
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* Tips */}
      <Card variant="glass" padding="sm">
        <div className="text-xs text-gray-400 space-y-1">
          <div>💡 <strong>Chain Building:</strong> Each step's output becomes the next step's input</div>
          <div>📝 Use prompt steps to process content with AI</div>
          <div>🔧 Use transform steps to clean, summarize, or format data</div>
          <div>💾 Save and export chains to reuse complex workflows</div>
        </div>
      </Card>
    </div>
  )
}
