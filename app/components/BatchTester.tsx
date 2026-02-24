'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Card from '@/app/components/ui/Card'
import Button from '@/app/components/ui/Button'
import TextArea from '@/app/components/ui/TextArea'
import Badge from '@/app/components/ui/Badge'
import ProgressBar from '@/app/components/ui/ProgressBar'

interface BatchResult {
  input: string
  output: string
  tokens: number
  success: boolean
  error?: string
}

export default function BatchTester() {
  const [prompt, setPrompt] = useState('')
  const [inputs, setInputs] = useState('')
  const [loading, setLoading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [results, setResults] = useState<BatchResult[]>([])

  const parseInputs = (): string[] => {
    return inputs
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0)
  }

  const handleRunBatch = async () => {
    if (!prompt) {
      alert('Please enter a prompt')
      return
    }

    const inputList = parseInputs()
    if (inputList.length === 0) {
      alert('Please enter at least one test input')
      return
    }

    if (inputList.length > 20) {
      alert('Maximum 20 inputs allowed for batch testing')
      return
    }

    setLoading(true)
    setProgress(0)
    setResults([])

    const batchResults: BatchResult[] = []

    for (let i = 0; i < inputList.length; i++) {
      const input = inputList[i]

      try {
        const response = await fetch('/api/generate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            messages: [
              { role: 'system', content: prompt },
              { role: 'user', content: input },
            ],
          }),
        })

        const data = await response.json()

        batchResults.push({
          input,
          output: data.content || 'No output',
          tokens: data.usage?.total_tokens || 0,
          success: !!data.content,
        })
      } catch (error) {
        batchResults.push({
          input,
          output: '',
          tokens: 0,
          success: false,
          error: error instanceof Error ? error.message : 'Unknown error',
        })
      }

      setProgress(((i + 1) / inputList.length) * 100)
      setResults([...batchResults])
    }

    setLoading(false)
  }

  const inputList = parseInputs()
  const successCount = results.filter(r => r.success).length
  const totalTokens = results.reduce((sum, r) => sum + r.tokens, 0)

  const handleExportResults = () => {
    const csv = [
      ['Input', 'Output', 'Tokens', 'Success'],
      ...results.map(r => [
        r.input,
        r.output.replace(/"/g, '""'), // Escape quotes
        r.tokens.toString(),
        r.success.toString(),
      ]),
    ]
      .map(row => row.map(cell => `"${cell}"`).join(','))
      .join('\n')

    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `batch-test-results-${Date.now()}.csv`
    a.click()
  }

  return (
    <div className="space-y-6">
      {/* Prompt Input */}
      <Card variant="gradient" padding="md">
        <label className="block text-sm font-semibold mb-2">
          System Prompt (will be used for all test cases)
        </label>
        <TextArea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter your prompt here..."
          rows={6}
        />
      </Card>

      {/* Batch Inputs */}
      <Card variant="glass" padding="md">
        <div className="flex items-center justify-between mb-2">
          <label className="text-sm font-semibold">
            Test Inputs (one per line, max 20)
          </label>
          <Badge variant="default">{inputList.length} inputs</Badge>
        </div>
        <TextArea
          value={inputs}
          onChange={(e) => setInputs(e.target.value)}
          placeholder={'Enter test cases, one per line:\n\nWhat is 2+2?\nExplain photosynthesis\nWrite a haiku about code\n...'}
          rows={10}
          className="font-mono"
        />
      </Card>

      {/* Run Button */}
      <div className="flex gap-4 items-center">
        <Button
          variant="primary"
          onClick={handleRunBatch}
          disabled={loading || !prompt || inputList.length === 0}
          className="flex-1"
          size="lg"
        >
          {loading ? `📦 Testing ${results.length}/${inputList.length}...` : '📦 Run Batch Test'}
        </Button>
        {results.length > 0 && (
          <Button variant="outline" onClick={handleExportResults}>
            📥 Export CSV
          </Button>
        )}
      </div>

      {/* Progress Bar */}
      {loading && (
        <div>
          <ProgressBar value={progress} showValue={false} />
          <p className="text-center text-sm text-gray-400 mt-2">
            {Math.round(progress)}% complete
          </p>
        </div>
      )}

      {/* Results Summary */}
      {results.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card variant="gradient" padding="md">
            <h3 className="font-semibold mb-4">📊 Batch Results Summary</h3>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-green-400">{successCount}</div>
                <div className="text-xs text-gray-400">Successful</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-red-400">
                  {results.length - successCount}
                </div>
                <div className="text-xs text-gray-400">Failed</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-forge-orange">
                  {totalTokens.toLocaleString()}
                </div>
                <div className="text-xs text-gray-400">Total Tokens</div>
              </div>
            </div>
          </Card>
        </motion.div>
      )}

      {/* Individual Results */}
      {results.length > 0 && (
        <div className="space-y-3">
          <h3 className="font-semibold">Individual Results</h3>
          {results.map((result, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.05 }}
            >
              <Card
                variant="glass"
                padding="md"
                className={result.success ? '' : 'border-red-500/50'}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant={result.success ? 'success' : 'error'}>
                        {result.success ? '✓' : '✗'}
                      </Badge>
                      <span className="text-xs text-gray-400">Test #{idx + 1}</span>
                      {result.success && (
                        <Badge variant="default">{result.tokens} tokens</Badge>
                      )}
                    </div>
                    <div className="text-sm font-semibold mb-2">
                      Input: <span className="text-gray-400 font-normal">{result.input}</span>
                    </div>
                  </div>
                </div>

                {result.success ? (
                  <div className="p-3 bg-dark-bg rounded-lg border border-gray-700 text-sm">
                    {result.output}
                  </div>
                ) : (
                  <div className="p-3 bg-red-900/20 rounded-lg border border-red-500/50 text-sm text-red-400">
                    Error: {result.error || 'Failed to generate'}
                  </div>
                )}
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      {/* Tips */}
      <Card variant="glass" padding="sm">
        <div className="text-xs text-gray-400 space-y-1">
          <div>💡 <strong>Tip:</strong> Test edge cases, different lengths, and formats</div>
          <div>📊 Export results to CSV for further analysis</div>
          <div>⚠️ Batch testing uses API calls - watch your token usage!</div>
          <div>🎯 Great for testing consistency across similar inputs</div>
        </div>
      </Card>
    </div>
  )
}
