'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Card from '@/app/components/ui/Card'
import Button from '@/app/components/ui/Button'
import TextArea from '@/app/components/ui/TextArea'
import Badge from '@/app/components/ui/Badge'

interface ComparisonResult {
  promptA: string
  promptB: string
  outputA: string
  outputB: string
  tokensA: number
  tokensB: number
  timeA: number
  timeB: number
}

export default function PromptComparison() {
  const [input, setInput] = useState('')
  const [promptA, setPromptA] = useState('')
  const [promptB, setPromptB] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<ComparisonResult | null>(null)

  const handleCompare = async () => {
    if (!input || !promptA || !promptB) {
      alert('Please fill in all fields')
      return
    }

    setLoading(true)

    try {
      // Run both prompts in parallel
      const startTimeA = Date.now()
      const responseA = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [
            { role: 'system', content: promptA },
            { role: 'user', content: input },
          ],
        }),
      })
      const timeA = Date.now() - startTimeA
      const dataA = await responseA.json()

      const startTimeB = Date.now()
      const responseB = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [
            { role: 'system', content: promptB },
            { role: 'user', content: input },
          ],
        }),
      })
      const timeB = Date.now() - startTimeB
      const dataB = await responseB.json()

      setResult({
        promptA,
        promptB,
        outputA: dataA.content || 'Error',
        outputB: dataB.content || 'Error',
        tokensA: dataA.usage?.total_tokens || 0,
        tokensB: dataB.usage?.total_tokens || 0,
        timeA,
        timeB,
      })
    } catch (error) {
      console.error('Comparison failed:', error)
      alert('Comparison failed. Check your API key.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Input Section */}
      <Card variant="gradient" padding="md">
        <label className="block text-sm font-semibold mb-2">
          Test Input (same for both prompts)
        </label>
        <TextArea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter the input you want to test both prompts with..."
          rows={4}
        />
      </Card>

      {/* Prompts Side-by-Side */}
      <div className="grid md:grid-cols-2 gap-4">
        <Card variant="glass" padding="md">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold text-electric-blue">Prompt A</h3>
            <Badge variant="default">Variant 1</Badge>
          </div>
          <TextArea
            value={promptA}
            onChange={(e) => setPromptA(e.target.value)}
            placeholder="Enter your first prompt variant..."
            rows={8}
          />
        </Card>

        <Card variant="glass" padding="md">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold text-neon-purple">Prompt B</h3>
            <Badge variant="default">Variant 2</Badge>
          </div>
          <TextArea
            value={promptB}
            onChange={(e) => setPromptB(e.target.value)}
            placeholder="Enter your second prompt variant..."
            rows={8}
          />
        </Card>
      </div>

      {/* Compare Button */}
      <div className="text-center">
        <Button
          variant="primary"
          onClick={handleCompare}
          disabled={loading || !input || !promptA || !promptB}
          size="lg"
        >
          {loading ? '⚖️ Comparing...' : '⚖️ Compare Prompts'}
        </Button>
      </div>

      {/* Results */}
      {result && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          {/* Metrics Comparison */}
          <div className="grid md:grid-cols-2 gap-4">
            <Card variant="glass" padding="md">
              <h4 className="font-semibold text-electric-blue mb-3">Prompt A Metrics</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Tokens:</span>
                  <Badge variant="default">{result.tokensA}</Badge>
                </div>
                <div className="flex justify-between">
                  <span>Response Time:</span>
                  <Badge variant="default">{result.timeA}ms</Badge>
                </div>
                <div className="flex justify-between">
                  <span>Output Length:</span>
                  <Badge variant="default">{result.outputA.length} chars</Badge>
                </div>
              </div>
            </Card>

            <Card variant="glass" padding="md">
              <h4 className="font-semibold text-neon-purple mb-3">Prompt B Metrics</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Tokens:</span>
                  <Badge variant={result.tokensB < result.tokensA ? 'success' : 'default'}>
                    {result.tokensB}
                    {result.tokensB < result.tokensA && ' 🏆'}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span>Response Time:</span>
                  <Badge variant={result.timeB < result.timeA ? 'success' : 'default'}>
                    {result.timeB}ms
                    {result.timeB < result.timeA && ' 🏆'}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span>Output Length:</span>
                  <Badge variant="default">{result.outputB.length} chars</Badge>
                </div>
              </div>
            </Card>
          </div>

          {/* Outputs Side-by-Side */}
          <div className="grid md:grid-cols-2 gap-4">
            <Card variant="glass" padding="md">
              <h4 className="font-semibold text-electric-blue mb-3">Output A</h4>
              <div className="p-4 bg-dark-bg rounded-lg border border-electric-blue/30 text-sm whitespace-pre-wrap max-h-96 overflow-y-auto">
                {result.outputA}
              </div>
            </Card>

            <Card variant="glass" padding="md">
              <h4 className="font-semibold text-neon-purple mb-3">Output B</h4>
              <div className="p-4 bg-dark-bg rounded-lg border border-neon-purple/30 text-sm whitespace-pre-wrap max-h-96 overflow-y-auto">
                {result.outputB}
              </div>
            </Card>
          </div>

          {/* Winner Declaration */}
          <Card variant="gradient" padding="md" className="text-center">
            <h4 className="font-semibold mb-2">🏆 Recommendation</h4>
            <p className="text-sm text-gray-300">
              {result.tokensB < result.tokensA && result.timeB < result.timeA
                ? 'Prompt B is more efficient (fewer tokens, faster response)'
                : result.tokensA < result.tokensB && result.timeA < result.timeB
                ? 'Prompt A is more efficient (fewer tokens, faster response)'
                : 'Both prompts have similar performance. Choose based on output quality.'}
            </p>
          </Card>
        </motion.div>
      )}

      {/* Tips */}
      <Card variant="glass" padding="sm">
        <div className="text-xs text-gray-400 space-y-1">
          <div>💡 <strong>Tip:</strong> Test different phrasings, lengths, and structures</div>
          <div>📊 Green badges indicate better performance</div>
          <div>⚡ Fewer tokens = lower cost (but evaluate output quality!)</div>
        </div>
      </Card>
    </div>
  )
}
