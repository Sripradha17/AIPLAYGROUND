'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Card from '@/app/components/ui/Card'
import Button from '@/app/components/ui/Button'
import Badge from '@/app/components/ui/Badge'
import ProgressBar from '@/app/components/ui/ProgressBar'

interface UsageRecord {
  timestamp: number
  tokens: number
  model: string
  cost: number
  responseTime: number
}

interface AnalyticsData {
  totalRequests: number
  totalTokens: number
  totalCost: number
  averageResponseTime: number
  modelUsage: Record<string, number>
  recentActivity: UsageRecord[]
  tokensPerDay: Record<string, number>
}

export default function AnalyticsDashboard() {
  const [analytics, setAnalytics] = useState<AnalyticsData>({
    totalRequests: 0,
    totalTokens: 0,
    totalCost: 0,
    averageResponseTime: 0,
    modelUsage: {},
    recentActivity: [],
    tokensPerDay: {},
  })

  useEffect(() => {
    loadAnalytics()
  }, [])

  const loadAnalytics = () => {
    const saved = localStorage.getItem('usage-analytics')
    if (saved) {
      const data: UsageRecord[] = JSON.parse(saved)
      
      const totalRequests = data.length
      const totalTokens = data.reduce((sum, r) => sum + r.tokens, 0)
      const totalCost = data.reduce((sum, r) => sum + r.cost, 0)
      const averageResponseTime = data.length > 0
        ? data.reduce((sum, r) => sum + r.responseTime, 0) / data.length
        : 0

      const modelUsage: Record<string, number> = {}
      data.forEach(r => {
        modelUsage[r.model] = (modelUsage[r.model] || 0) + 1
      })

      const tokensPerDay: Record<string, number> = {}
      data.forEach(r => {
        const date = new Date(r.timestamp).toLocaleDateString()
        tokensPerDay[date] = (tokensPerDay[date] || 0) + r.tokens
      })

      setAnalytics({
        totalRequests,
        totalTokens,
        totalCost,
        averageResponseTime,
        modelUsage,
        recentActivity: data.slice(-10).reverse(),
        tokensPerDay,
      })
    }
  }

  const clearAnalytics = () => {
    if (confirm('Are you sure you want to clear all analytics data?')) {
      localStorage.removeItem('usage-analytics')
      setAnalytics({
        totalRequests: 0,
        totalTokens: 0,
        totalCost: 0,
        averageResponseTime: 0,
        modelUsage: {},
        recentActivity: [],
        tokensPerDay: {},
      })
    }
  }

  const exportAnalytics = () => {
    const saved = localStorage.getItem('usage-analytics')
    if (!saved) {
      alert('No analytics data to export')
      return
    }

    const data = {
      exported: new Date().toISOString(),
      summary: {
        totalRequests: analytics.totalRequests,
        totalTokens: analytics.totalTokens,
        totalCost: analytics.totalCost,
        averageResponseTime: analytics.averageResponseTime,
      },
      records: JSON.parse(saved),
    }

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `promptforge-analytics-${Date.now()}.json`
    a.click()
  }

  // Demo data generator for testing
  const generateDemoData = () => {
    const models = ['gpt-4', 'gpt-3.5-turbo', 'claude-3-sonnet']
    const demoRecords: UsageRecord[] = []

    for (let i = 0; i < 50; i++) {
      const daysAgo = Math.floor(Math.random() * 7)
      demoRecords.push({
        timestamp: Date.now() - daysAgo * 24 * 60 * 60 * 1000 - Math.random() * 24 * 60 * 60 * 1000,
        tokens: Math.floor(Math.random() * 2000) + 100,
        model: models[Math.floor(Math.random() * models.length)],
        cost: Math.random() * 0.1,
        responseTime: Math.floor(Math.random() * 2000) + 500,
      })
    }

    localStorage.setItem('usage-analytics', JSON.stringify(demoRecords))
    loadAnalytics()
  }

  const topModel = Object.entries(analytics.modelUsage)
    .sort((a, b) => b[1] - a[1])[0]?.[0] || 'N/A'

  const last7Days = Object.entries(analytics.tokensPerDay)
    .sort((a, b) => new Date(b[0]).getTime() - new Date(a[0]).getTime())
    .slice(0, 7)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold mb-1">Analytics Dashboard 📊</h2>
          <p className="text-sm text-gray-400">
            Track your AI usage, costs, and performance metrics
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={generateDemoData}>
            🎲 Demo Data
          </Button>
          <Button variant="outline" size="sm" onClick={exportAnalytics}>
            📤 Export
          </Button>
          <Button variant="outline" size="sm" onClick={clearAnalytics}>
            🗑️ Clear
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card variant="gradient" padding="md">
          <div className="text-xs text-gray-400 mb-1">Total Requests</div>
          <div className="text-3xl font-bold text-electric-blue">
            {analytics.totalRequests.toLocaleString()}
          </div>
        </Card>

        <Card variant="gradient" padding="md">
          <div className="text-xs text-gray-400 mb-1">Total Tokens</div>
          <div className="text-3xl font-bold text-neon-purple">
            {analytics.totalTokens.toLocaleString()}
          </div>
        </Card>

        <Card variant="gradient" padding="md">
          <div className="text-xs text-gray-400 mb-1">Total Cost</div>
          <div className="text-3xl font-bold text-forge-orange">
            ${analytics.totalCost.toFixed(2)}
          </div>
        </Card>

        <Card variant="gradient" padding="md">
          <div className="text-xs text-gray-400 mb-1">Avg Response Time</div>
          <div className="text-3xl font-bold text-green-400">
            {Math.round(analytics.averageResponseTime)}ms
          </div>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Model Usage */}
        <Card variant="glass" padding="md">
          <h3 className="font-semibold mb-4">🤖 Model Usage</h3>
          {Object.keys(analytics.modelUsage).length === 0 ? (
            <div className="text-center py-8 text-gray-400">
              <p className="text-sm">No usage data yet</p>
            </div>
          ) : (
            <div className="space-y-3">
              {Object.entries(analytics.modelUsage)
                .sort((a, b) => b[1] - a[1])
                .map(([model, count]) => {
                  const percentage = (count / analytics.totalRequests) * 100
                  return (
                    <div key={model}>
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span className="font-medium">{model}</span>
                        <Badge variant="default">
                          {count} ({percentage.toFixed(0)}%)
                        </Badge>
                      </div>
                      <ProgressBar value={percentage} showValue={false} />
                    </div>
                  )
                })}
            </div>
          )}
        </Card>

        {/* Daily Token Usage */}
        <Card variant="glass" padding="md">
          <h3 className="font-semibold mb-4">📅 Last 7 Days (Tokens)</h3>
          {last7Days.length === 0 ? (
            <div className="text-center py-8 text-gray-400">
              <p className="text-sm">No usage data yet</p>
            </div>
          ) : (
            <div className="space-y-3">
              {last7Days.map(([date, tokens]) => {
                const maxTokens = Math.max(...last7Days.map(([, t]) => t))
                const percentage = (tokens / maxTokens) * 100
                return (
                  <div key={date}>
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="text-gray-400">{date}</span>
                      <Badge variant="default">{tokens.toLocaleString()}</Badge>
                    </div>
                    <ProgressBar value={percentage} showValue={false} />
                  </div>
                )
              })}
            </div>
          )}
        </Card>
      </div>

      {/* Insights */}
      <Card variant="gradient" padding="md">
        <h3 className="font-semibold mb-3">💡 Insights</h3>
        <div className="grid md:grid-cols-3 gap-4 text-sm">
          <div>
            <div className="text-gray-400 mb-1">Most Used Model</div>
            <div className="font-semibold text-electric-blue">{topModel}</div>
          </div>
          <div>
            <div className="text-gray-400 mb-1">Avg Cost Per Request</div>
            <div className="font-semibold text-forge-orange">
              ${analytics.totalRequests > 0
                ? (analytics.totalCost / analytics.totalRequests).toFixed(4)
                : '0.00'}
            </div>
          </div>
          <div>
            <div className="text-gray-400 mb-1">Avg Tokens Per Request</div>
            <div className="font-semibold text-neon-purple">
              {analytics.totalRequests > 0
                ? Math.round(analytics.totalTokens / analytics.totalRequests)
                : 0}
            </div>
          </div>
        </div>
      </Card>

      {/* Recent Activity */}
      <Card variant="glass" padding="md">
        <h3 className="font-semibold mb-4">🕒 Recent Activity</h3>
        {analytics.recentActivity.length === 0 ? (
          <div className="text-center py-8 text-gray-400">
            <div className="text-4xl mb-2">📊</div>
            <p className="text-sm">No recent activity</p>
            <p className="text-xs mt-1">Start using PromptForge to see analytics here</p>
          </div>
        ) : (
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {analytics.recentActivity.map((record, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
              >
                <Card variant="glass" padding="sm">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <Badge variant="default">{record.model}</Badge>
                      <span className="text-gray-400">
                        {new Date(record.timestamp).toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-gray-400">
                        {record.tokens.toLocaleString()} tokens
                      </span>
                      <span className="text-forge-orange font-semibold">
                        ${record.cost.toFixed(4)}
                      </span>
                      <span className="text-gray-400">
                        {record.responseTime}ms
                      </span>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </Card>

      {/* Tips */}
      <Card variant="glass" padding="sm">
        <div className="text-xs text-gray-400 space-y-1">
          <div>💡 <strong>Note:</strong> Analytics are stored locally in your browser</div>
          <div>📊 Track which models and prompts are most cost-effective</div>
          <div>💾 Export your data regularly for backup and analysis</div>
          <div>🎲 Use "Demo Data" to see how the dashboard looks with sample data</div>
        </div>
      </Card>
    </div>
  )
}
