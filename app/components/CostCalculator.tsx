'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Card from '@/app/components/ui/Card'
import Badge from '@/app/components/ui/Badge'

interface ModelPricing {
  name: string
  inputCost: number  // per 1K tokens
  outputCost: number // per 1K tokens
  contextWindow: number
  color: string
}

const models: ModelPricing[] = [
  { name: 'GPT-4 Turbo', inputCost: 0.01, outputCost: 0.03, contextWindow: 128000, color: 'orange' },
  { name: 'GPT-4', inputCost: 0.03, outputCost: 0.06, contextWindow: 8192, color: 'red' },
  { name: 'GPT-3.5 Turbo', inputCost: 0.0005, outputCost: 0.0015, contextWindow: 16385, color: 'green' },
  { name: 'Claude 3 Opus', inputCost: 0.015, outputCost: 0.075, contextWindow: 200000, color: 'purple' },
  { name: 'Claude 3 Sonnet', inputCost: 0.003, outputCost: 0.015, contextWindow: 200000, color: 'blue' },
]

export default function CostCalculator() {
  const [inputTokens, setInputTokens] = useState(1000)
  const [outputTokens, setOutputTokens] = useState(500)
  const [requestsPerDay, setRequestsPerDay] = useState(100)
  const [selectedModel, setSelectedModel] = useState(models[0])

  const calculateCost = (model: ModelPricing) => {
    const inputCost = (inputTokens / 1000) * model.inputCost
    const outputCost = (outputTokens / 1000) * model.outputCost
    return inputCost + outputCost
  }

  const costPerRequest = calculateCost(selectedModel)
  const costPerDay = costPerRequest * requestsPerDay
  const costPerMonth = costPerDay * 30
  const costPerYear = costPerMonth * 12

  // Token to text conversions
  const inputWords = Math.round(inputTokens * 0.75)
  const outputWords = Math.round(outputTokens * 0.75)
  const inputPages = Math.round(inputTokens / 500)
  const outputPages = Math.round(outputTokens / 500)

  return (
    <div className="space-y-6">
      {/* Model Selector */}
      <Card variant="glass" padding="md">
        <h3 className="text-lg font-semibold mb-4">Select AI Model</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {models.map((model) => (
            <motion.button
              key={model.name}
              onClick={() => setSelectedModel(model)}
              className={`p-4 rounded-lg border-2 transition-all text-left ${
                selectedModel.name === model.name
                  ? 'border-forge-orange bg-forge-orange/10'
                  : 'border-gray-700 bg-dark-bg hover:border-gray-600'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="font-semibold text-sm mb-1">{model.name}</div>
              <div className="text-xs text-gray-400">
                {model.contextWindow.toLocaleString()} tokens
              </div>
              <div className="text-xs text-gray-500 mt-2">
                ${model.inputCost}/1K in • ${model.outputCost}/1K out
              </div>
            </motion.button>
          ))}
        </div>
      </Card>

      {/* Token Inputs */}
      <Card variant="glass" padding="md">
        <h3 className="text-lg font-semibold mb-4">Request Size</h3>
        
        {/* Input Tokens */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium">Input Tokens</label>
            <div className="text-sm font-mono text-forge-orange">
              {inputTokens.toLocaleString()} tokens
            </div>
          </div>
          <input
            type="range"
            min="10"
            max="20000"
            step="10"
            value={inputTokens}
            onChange={(e) => setInputTokens(Number(e.target.value))}
            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-forge-orange"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>≈ {inputWords} words</span>
            <span>≈ {inputPages} pages</span>
          </div>
        </div>

        {/* Output Tokens */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium">Output Tokens</label>
            <div className="text-sm font-mono text-electric-blue">
              {outputTokens.toLocaleString()} tokens
            </div>
          </div>
          <input
            type="range"
            min="10"
            max="10000"
            step="10"
            value={outputTokens}
            onChange={(e) => setOutputTokens(Number(e.target.value))}
            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-electric-blue"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>≈ {outputWords} words</span>
            <span>≈ {outputPages} pages</span>
          </div>
        </div>

        {/* Requests Per Day */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium">Requests per Day</label>
            <div className="text-sm font-mono text-neon-purple">
              {requestsPerDay.toLocaleString()} requests
            </div>
          </div>
          <input
            type="range"
            min="1"
            max="10000"
            step="10"
            value={requestsPerDay}
            onChange={(e) => setRequestsPerDay(Number(e.target.value))}
            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-neon-purple"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>1</span>
            <span>10,000</span>
          </div>
        </div>
      </Card>

      {/* Cost Breakdown */}
      <Card variant="gradient" padding="lg">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          💰 Cost Estimate <Badge variant="default">{selectedModel.name}</Badge>
        </h3>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-dark-bg rounded-lg p-4 text-center">
            <div className="text-xs text-gray-400 mb-1">Per Request</div>
            <div className="text-2xl font-bold text-forge-orange">
              ${costPerRequest.toFixed(4)}
            </div>
          </div>
          <div className="bg-dark-bg rounded-lg p-4 text-center">
            <div className="text-xs text-gray-400 mb-1">Per Day</div>
            <div className="text-2xl font-bold text-electric-blue">
              ${costPerDay.toFixed(2)}
            </div>
          </div>
          <div className="bg-dark-bg rounded-lg p-4 text-center">
            <div className="text-xs text-gray-400 mb-1">Per Month</div>
            <div className="text-2xl font-bold text-neon-purple">
              ${costPerMonth.toFixed(2)}
            </div>
          </div>
          <div className="bg-dark-bg rounded-lg p-4 text-center">
            <div className="text-xs text-gray-400 mb-1">Per Year</div>
            <div className="text-2xl font-bold text-green-400">
              ${costPerYear.toFixed(2)}
            </div>
          </div>
        </div>

        {/* Detailed Breakdown */}
        <div className="bg-dark-bg rounded-lg p-4 space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-400">Input Cost:</span>
            <span className="font-mono">
              {inputTokens.toLocaleString()} tokens × ${selectedModel.inputCost}/1K = 
              <span className="text-forge-orange ml-2">
                ${((inputTokens / 1000) * selectedModel.inputCost).toFixed(4)}
              </span>
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Output Cost:</span>
            <span className="font-mono">
              {outputTokens.toLocaleString()} tokens × ${selectedModel.outputCost}/1K = 
              <span className="text-electric-blue ml-2">
                ${((outputTokens / 1000) * selectedModel.outputCost).toFixed(4)}
              </span>
            </span>
          </div>
          <div className="border-t border-gray-700 pt-2 mt-2 flex justify-between font-semibold">
            <span>Total per Request:</span>
            <span className="text-neon-purple">${costPerRequest.toFixed(4)}</span>
          </div>
        </div>
      </Card>

      {/* Comparison Table */}
      <Card variant="glass" padding="md">
        <h3 className="text-lg font-semibold mb-4">Model Comparison</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left pb-2">Model</th>
                <th className="text-right pb-2">Per Request</th>
                <th className="text-right pb-2">Per Day</th>
                <th className="text-right pb-2">Per Month</th>
                <th className="text-center pb-2">Savings vs {selectedModel.name}</th>
              </tr>
            </thead>
            <tbody>
              {models.map((model) => {
                const modelCost = calculateCost(model)
                const dailyCost = modelCost * requestsPerDay
                const monthlyCost = dailyCost * 30
                const savings = ((costPerMonth - monthlyCost) / costPerMonth) * 100

                return (
                  <tr
                    key={model.name}
                    className={`border-b border-gray-800 ${
                      model.name === selectedModel.name ? 'bg-forge-orange/5' : ''
                    }`}
                  >
                    <td className="py-3 font-medium">{model.name}</td>
                    <td className="text-right font-mono">${modelCost.toFixed(4)}</td>
                    <td className="text-right font-mono">${dailyCost.toFixed(2)}</td>
                    <td className="text-right font-mono">${monthlyCost.toFixed(2)}</td>
                    <td className="text-center">
                      {savings !== 0 ? (
                        <Badge variant={savings > 0 ? 'success' : 'error'}>
                          {savings > 0 ? '-' : '+'}{Math.abs( savings).toFixed(0)}%
                        </Badge>
                      ) : (
                        <Badge variant="default">Selected</Badge>
                      )}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Tips */}
      <Card variant="glass" padding="md">
        <h3 className="text-sm font-semibold text-forge-orange mb-3">💡 Cost Optimization Tips</h3>
        <ul className="text-sm text-gray-300 space-y-2">
          <li>• <strong>Use the right model:</strong> GPT-3.5 for simple tasks, GPT-4 for complex reasoning</li>
          <li>• <strong>Truncate context:</strong> Keep only recent conversation history to reduce input tokens</li>
          <li>• <strong>Batch requests:</strong> Combine multiple queries when possible</li>
          <li>• <strong>Cache responses:</strong> Store and reuse common outputs</li>
          <li>• <strong>Set max_tokens:</strong> Limit output length to avoid unnecessary costs</li>
          <li>• <strong>Monitor usage:</strong> Track daily costs with alerts for budget limits</li>
        </ul>
      </Card>
    </div>
  )
}
