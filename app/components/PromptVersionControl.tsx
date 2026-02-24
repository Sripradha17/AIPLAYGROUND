'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Card from '@/app/components/ui/Card'
import Button from '@/app/components/ui/Button'
import TextArea from '@/app/components/ui/TextArea'
import Input from '@/app/components/ui/Input'
import Badge from '@/app/components/ui/Badge'

interface PromptVersion {
  id: string
  version: number
  content: string
  label: string
  timestamp: number
  changes?: string
}

export default function PromptVersionControl() {
  const [currentPrompt, setCurrentPrompt] = useState('')
  const [versionLabel, setVersionLabel] = useState('')
  const [versions, setVersions] = useState<PromptVersion[]>([])
  const [selectedVersions, setSelectedVersions] = useState<[number, number] | null>(null)
  const [showDiff, setShowDiff] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('prompt-versions')
    if (saved) {
      setVersions(JSON.parse(saved))
    }
  }, [])

  const saveVersion = () => {
    if (!currentPrompt.trim()) {
      alert('Please enter a prompt before saving')
      return
    }

    const newVersion: PromptVersion = {
      id: `v${Date.now()}`,
      version: versions.length + 1,
      content: currentPrompt,
      label: versionLabel || `Version ${versions.length + 1}`,
      timestamp: Date.now(),
      changes: versions.length > 0 ? calculateChanges(versions[versions.length - 1].content, currentPrompt) : 'Initial version',
    }

    const updated = [...versions, newVersion]
    setVersions(updated)
    localStorage.setItem('prompt-versions', JSON.stringify(updated))
    setVersionLabel('')
  }

  const loadVersion = (version: PromptVersion) => {
    setCurrentPrompt(version.content)
  }

  const deleteVersion = (id: string) => {
    const updated = versions.filter(v => v.id !== id)
    setVersions(updated)
    localStorage.setItem('prompt-versions', JSON.stringify(updated))
  }

  const compareVersions = (v1: number, v2: number) => {
    setSelectedVersions([v1, v2])
    setShowDiff(true)
  }

  const calculateChanges = (oldText: string, newText: string): string => {
    const oldWords = oldText.split(/\s+/).length
    const newWords = newText.split(/\s+/).length
    const diff = newWords - oldWords
    if (diff > 0) return `+${diff} words`
    if (diff < 0) return `${diff} words`
    return 'Minor edits'
  }

  const exportVersions = () => {
    const data = {
      exported: new Date().toISOString(),
      versions,
    }
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `prompt-versions-${Date.now()}.json`
    a.click()
  }

  const importVersions = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target?.result as string)
        if (data.versions && Array.isArray(data.versions)) {
          const imported = data.versions.map((v: PromptVersion, idx: number) => ({
            ...v,
            id: `imported-${Date.now()}-${idx}`,
            version: versions.length + idx + 1,
          }))
          const updated = [...versions, ...imported]
          setVersions(updated)
          localStorage.setItem('prompt-versions', JSON.stringify(updated))
          alert(`Imported ${imported.length} versions successfully!`)
        }
      } catch (error) {
        alert('Invalid file format')
      }
    }
    reader.readAsText(file)
    e.target.value = '' // Reset input
  }

  return (
    <div className="space-y-6">
      {/* Current Working Version */}
      <Card variant="gradient" padding="md">
        <h3 className="font-semibold mb-3">📝 Current Working Version</h3>
        <TextArea
          value={currentPrompt}
          onChange={(e) => setCurrentPrompt(e.target.value)}
          placeholder="Write your prompt here..."
          rows={8}
        />
        
        <div className="mt-4 flex gap-3">
          <Input
            value={versionLabel}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setVersionLabel(e.target.value)}
            placeholder="Version label (optional)"
            className="flex-1"
          />
          <Button variant="primary" onClick={saveVersion}>
            💾 Save Version
          </Button>
        </div>
      </Card>

      {/* Version History */}
      <Card variant="glass" padding="md">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold">🕒 Version History</h3>
          <div className="flex gap-2">
            <label className="cursor-pointer">
              <input
                type="file"
                accept=".json"
                onChange={importVersions}
                className="hidden"
              />
              <span className="inline-block">
                <Button variant="outline" size="sm">
                  📥 Import
                </Button>
              </span>
            </label>
            {versions.length > 0 && (
              <Button variant="outline" size="sm" onClick={exportVersions}>
                📤 Export
              </Button>
            )}
          </div>
        </div>

        {versions.length === 0 ? (
          <div className="text-center py-8 text-gray-400">
            <div className="text-4xl mb-2">📦</div>
            <p>No saved versions yet</p>
            <p className="text-sm">Save your first version to start tracking changes</p>
          </div>
        ) : (
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {[...versions].reverse().map((version, idx) => (
              <motion.div
                key={version.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
              >
                <Card variant="glass" padding="sm" hover>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant="default">v{version.version}</Badge>
                        <span className="font-semibold text-sm">{version.label}</span>
                        {version.changes && (
                          <Badge variant="info" size="sm">
                            {version.changes}
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-gray-400 mb-2">
                        {new Date(version.timestamp).toLocaleString()}
                      </p>
                      <p className="text-sm text-gray-300 line-clamp-2">
                        {version.content}
                      </p>
                    </div>
                    <div className="flex gap-2 ml-4">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => loadVersion(version)}
                      >
                        🔄
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => deleteVersion(version.id)}
                      >
                        🗑️
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </Card>

      {/* Compare Versions */}
      {versions.length >= 2 && (
        <Card variant="glass" padding="md">
          <h3 className="font-semibold mb-3">🔍 Compare Versions</h3>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="text-sm text-gray-400 mb-1 block">Version 1</label>
              <select
                className="w-full bg-dark-bg border border-gray-700 rounded-lg px-3 py-2 text-sm"
                onChange={(e) => {
                  const v1 = parseInt(e.target.value)
                  if (selectedVersions) {
                    setSelectedVersions([v1, selectedVersions[1]])
                  } else {
                    setSelectedVersions([v1, versions[versions.length - 1].version])
                  }
                }}
              >
                <option value="">Select version...</option>
                {versions.map(v => (
                  <option key={v.id} value={v.version}>
                    v{v.version} - {v.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-sm text-gray-400 mb-1 block">Version 2</label>
              <select
                className="w-full bg-dark-bg border border-gray-700 rounded-lg px-3 py-2 text-sm"
                onChange={(e) => {
                  const v2 = parseInt(e.target.value)
                  if (selectedVersions) {
                    setSelectedVersions([selectedVersions[0], v2])
                  } else {
                    setSelectedVersions([versions[0].version, v2])
                  }
                }}
              >
                <option value="">Select version...</option>
                {versions.map(v => (
                  <option key={v.id} value={v.version}>
                    v{v.version} - {v.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {selectedVersions && (
            <div className="grid grid-cols-2 gap-4">
              {selectedVersions.map((vNum, idx) => {
                const version = versions.find(v => v.version === vNum)
                return version ? (
                  <div key={idx}>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant={idx === 0 ? 'default' : 'success'}>
                        v{version.version}
                      </Badge>
                      <span className="text-sm font-semibold">{version.label}</span>
                    </div>
                    <div className="p-3 bg-dark-bg rounded-lg border border-gray-700 text-sm max-h-48 overflow-y-auto">
                      {version.content}
                    </div>
                  </div>
                ) : null
              })}
            </div>
          )}
        </Card>
      )}

      {/* Tips */}
      <Card variant="glass" padding="sm">
        <div className="text-xs text-gray-400 space-y-1">
          <div>💡 <strong>Tip:</strong> Save versions before making big changes</div>
          <div>🔄 Click the reload icon to restore a previous version</div>
          <div>📤 Export your version history for backup or sharing</div>
          <div>🔍 Compare versions to understand what changed</div>
        </div>
      </Card>
    </div>
  )
}
