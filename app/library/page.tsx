'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Card from '@/app/components/ui/Card'
import Button from '@/app/components/ui/Button'
import Badge from '@/app/components/ui/Badge'
import TextArea from '@/app/components/ui/TextArea'
import { fadeInUp, staggerContainer, staggerItem } from '@/app/components/animations/variants'
import {
  loadLibrary,
  savePrompt,
  deletePrompt,
  toggleFavorite,
  searchPrompts,
  getFavorites,
  exportLibrary,
  importLibrary,
  type SavedPrompt,
} from '@/app/lib/storage/library'

export default function LibraryPage() {
  const [prompts, setPrompts] = useState<SavedPrompt[]>([])
  const [filteredPrompts, setFilteredPrompts] = useState<SavedPrompt[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [filterMode, setFilterMode] = useState<'all' | 'favorites'>('all')
  const [selectedPrompt, setSelectedPrompt] = useState<SavedPrompt | null>(null)
  const [isAddingNew, setIsAddingNew] = useState(false)
  const [newPrompt, setNewPrompt] = useState({
    title: '',
    content: '',
    systemPrompt: '',
    category: 'General',
    tags: '',
  })

  useEffect(() => {
    loadPrompts()
  }, [])

  useEffect(() => {
    applyFilters()
  }, [prompts, searchQuery, filterMode])

  const loadPrompts = () => {
    const library = loadLibrary()
    setPrompts(library.prompts.sort((a, b) => b.updatedAt - a.updatedAt))
  }

  const applyFilters = () => {
    let filtered = prompts

    if (filterMode === 'favorites') {
      filtered = prompts.filter(p => p.isFavorite)
    }

    if (searchQuery) {
      filtered = searchPrompts(searchQuery)
    }

    setFilteredPrompts(filtered)
  }

  const handleSave = () => {
    const tags = newPrompt.tags
      .split(',')
      .map(t => t.trim())
      .filter(t => t.length > 0)

    savePrompt({
      title: newPrompt.title,
      content: newPrompt.content,
      systemPrompt: newPrompt.systemPrompt || undefined,
      category: newPrompt.category,
      tags,
      isFavorite: false,
    })

    setNewPrompt({
      title: '',
      content: '',
      systemPrompt: '',
      category: 'General',
      tags: '',
    })
    setIsAddingNew(false)
    loadPrompts()
  }

  const handleDelete = (id: string) => {
    if (confirm('Delete this prompt?')) {
      deletePrompt(id)
      loadPrompts()
      setSelectedPrompt(null)
    }
  }

  const handleToggleFavorite = (id: string) => {
    toggleFavorite(id)
    loadPrompts()
  }

  const handleExport = () => {
    const json = exportLibrary()
    const blob = new Blob([json], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `promptforge-library-${Date.now()}.json`
    a.click()
  }

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (event) => {
      const json = event.target?.result as string
      if (importLibrary(json)) {
        alert('Library imported successfully!')
        loadPrompts()
      } else {
        alert('Failed to import library. Please check the file format.')
      }
    }
    reader.readAsText(file)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-bg via-dark-card to-dark-bg">
      {/* Header */}
      <header className="border-b border-gray-700 bg-dark-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/">
            <motion.h1
              className="text-2xl font-bold gradient-text cursor-pointer"
              whileHover={{ scale: 1.05 }}
            >
              PromptForge 🔥
            </motion.h1>
          </Link>
          <nav className="flex gap-6">
            <Link href="/playground" className="text-gray-400 hover:text-white transition-colors">
              Playground
            </Link>
            <Link href="/coach" className="text-gray-400 hover:text-white transition-colors">
              Prompt Coach
            </Link>
            <Link href="/challenges" className="text-gray-400 hover:text-white transition-colors">
              Challenges
            </Link>
            <Link href="/learn" className="text-gray-400 hover:text-white transition-colors">
              Learn
            </Link>
            <Link href="/templates" className="text-gray-400 hover:text-white transition-colors">
              Templates
            </Link>
            <Link href="/calculator" className="text-gray-400 hover:text-white transition-colors">
              Calculator
            </Link>
            <Link href="/tools" className="text-gray-400 hover:text-white transition-colors">
              Tools
            </Link>
            <Link href="/library" className="text-forge-orange font-semibold">
              Library
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="mb-8"
        >
          <h2 className="text-4xl font-bold mb-2">Prompt Library 📚</h2>
          <p className="text-gray-400">
            Save, organize, and reuse your best prompts
          </p>
        </motion.div>

        {/* Controls */}
        <div className="grid md:grid-cols-4 gap-4 mb-6">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="🔍 Search prompts..."
            className="md:col-span-2 px-4 py-2 bg-dark-card border border-gray-700 rounded-lg focus:border-forge-orange outline-none"
          />
          <div className="flex gap-2">
            <Button
              variant={filterMode === 'all' ? 'primary' : 'outline'}
              onClick={() => setFilterMode('all')}
              size="sm"
              className="flex-1"
            >
              All ({prompts.length})
            </Button>
            <Button
              variant={filterMode === 'favorites' ? 'primary' : 'outline'}
              onClick={() => setFilterMode('favorites')}
              size="sm"
              className="flex-1"
            >
              ⭐ Favorites
            </Button>
          </div>
          <div className="flex gap-2">
            <Button
              variant="primary"
              onClick={() => setIsAddingNew(true)}
              size="sm"
              className="flex-1"
            >
              + New
            </Button>
            <Button variant="outline" onClick={handleExport} size="sm">
              📥 Export
            </Button>
            <label className="cursor-pointer">
              <input
                type="file"
                accept=".json"
                onChange={handleImport}
                className="hidden"
              />
              <span className="inline-block">
                <Button variant="outline" size="sm">
                  📤 Import
                </Button>
              </span>
            </label>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Prompt List */}
          <div className="lg:col-span-1 space-y-3 max-h-[600px] overflow-y-auto">
            {filteredPrompts.length === 0 ? (
              <Card variant="glass" padding="lg" className="text-center">
                <div className="text-4xl mb-2">📭</div>
                <p className="text-gray-400">
                  {searchQuery ? 'No prompts found' : 'No saved prompts yet'}
                </p>
                <Button
                  variant="primary"
                  onClick={() => setIsAddingNew(true)}
                  size="sm"
                  className="mt-4"
                >
                  Create Your First Prompt
                </Button>
              </Card>
            ) : (
              <motion.div
                initial="hidden"
                animate="visible"
                variants={staggerContainer}
                className="space-y-3"
              >
                {filteredPrompts.map((prompt) => (
                  <motion.div key={prompt.id} variants={staggerItem}>
                    <Card
                      variant={selectedPrompt?.id === prompt.id ? 'default' : 'glass'}
                      padding="md"
                      hover
                      className={`cursor-pointer ${
                        selectedPrompt?.id === prompt.id ? 'border-forge-orange' : ''
                      }`}
                      onClick={() => setSelectedPrompt(prompt)}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-semibold flex-1">{prompt.title}</h3>
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            handleToggleFavorite(prompt.id)
                          }}
                          className="text-xl"
                        >
                          {prompt.isFavorite ? '⭐' : '☆'}
                        </button>
                      </div>
                      <p className="text-xs text-gray-400 line-clamp-2 mb-2">
                        {prompt.content}
                      </p>
                      <div className="flex flex-wrap gap-1">
                        <Badge variant="default" size="sm">
                          {prompt.category}
                        </Badge>
                        {prompt.tags.slice(0, 2).map((tag) => (
                          <Badge key={tag} variant="default" size="sm">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>

          {/* Prompt Detail */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              {isAddingNew ? (
                <motion.div
                  key="new"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <Card variant="gradient" padding="lg">
                    <h3 className="text-xl font-bold mb-4">New Prompt</h3>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">Title</label>
                        <input
                          type="text"
                          value={newPrompt.title}
                          onChange={(e) => setNewPrompt({ ...newPrompt, title: e.target.value })}
                          className="w-full px-3 py-2 bg-dark-bg border border-gray-700 rounded-lg focus:border-forge-orange outline-none"
                          placeholder="My awesome prompt"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-1">Prompt</label>
                        <TextArea
                          value={newPrompt.content}
                          onChange={(e) => setNewPrompt({ ...newPrompt, content: e.target.value })}
                          rows={6}
                          placeholder="Your prompt content..."
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-1">System Prompt (optional)</label>
                        <TextArea
                          value={newPrompt.systemPrompt}
                          onChange={(e) => setNewPrompt({ ...newPrompt, systemPrompt: e.target.value })}
                          rows={3}
                          placeholder="System instructions..."
                        />
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-1">Category</label>
                          <input
                            type="text"
                            value={newPrompt.category}
                            onChange={(e) => setNewPrompt({ ...newPrompt, category: e.target.value })}
                            className="w-full px-3 py-2 bg-dark-bg border border-gray-700 rounded-lg focus:border-forge-orange outline-none"
                            placeholder="General"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">Tags (comma-separated)</label>
                          <input
                            type="text"
                            value={newPrompt.tags}
                            onChange={(e) => setNewPrompt({ ...newPrompt, tags: e.target.value })}
                            className="w-full px-3 py-2 bg-dark-bg border border-gray-700 rounded-lg focus:border-forge-orange outline-none"
                            placeholder="coding, python, debug"
                          />
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <Button variant="primary" onClick={handleSave} className="flex-1">
                          Save Prompt
                        </Button>
                        <Button variant="outline" onClick={() => setIsAddingNew(false)}>
                          Cancel
                        </Button>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ) : selectedPrompt ? (
                <motion.div
                  key={selectedPrompt.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <Card variant="gradient" padding="lg">
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="text-2xl font-bold">{selectedPrompt.title}</h3>
                      <button
                        onClick={() => handleToggleFavorite(selectedPrompt.id)}
                        className="text-2xl"
                      >
                        {selectedPrompt.isFavorite ? '⭐' : '☆'}
                      </button>
                    </div>

                    <div className="mb-4">
                      <h4 className="text-sm font-semibold text-gray-400 mb-2">Prompt</h4>
                      <div className="p-4 bg-dark-bg rounded-lg border border-gray-700 text-sm whitespace-pre-wrap">
                        {selectedPrompt.content}
                      </div>
                    </div>

                    {selectedPrompt.systemPrompt && (
                      <div className="mb-4">
                        <h4 className="text-sm font-semibold text-gray-400 mb-2">System Prompt</h4>
                        <div className="p-4 bg-dark-bg rounded-lg border border-gray-700 text-sm whitespace-pre-wrap">
                          {selectedPrompt.systemPrompt}
                        </div>
                      </div>
                    )}

                    <div className="mb-4 flex flex-wrap gap-2">
                      <Badge variant="default">{selectedPrompt.category}</Badge>
                      {selectedPrompt.tags.map((tag) => (
                        <Badge key={tag} variant="default">{tag}</Badge>
                      ))}
                    </div>

                    <div className="flex gap-3">
                      <Link href={`/playground?prompt=${encodeURIComponent(selectedPrompt.content)}`} className="flex-1">
                        <Button variant="primary" className="w-full">
                          Use in Playground
                        </Button>
                      </Link>
                      <Button
                        variant="outline"
                        onClick={() => {
                          navigator.clipboard.writeText(selectedPrompt.content)
                          alert('Copied to clipboard!')
                        }}
                      >
                        📋 Copy
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => handleDelete(selectedPrompt.id)}
                      >
                        🗑️ Delete
                      </Button>
                    </div>

                    <div className="mt-4 text-xs text-gray-500 text-center">
                      Created: {new Date(selectedPrompt.createdAt).toLocaleDateString()} • 
                      Updated: {new Date(selectedPrompt.updatedAt).toLocaleDateString()}
                    </div>
                  </Card>
                </motion.div>
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <Card variant="glass" padding="lg" className="text-center">
                    <div className="text-6xl mb-4">👈</div>
                    <h3 className="text-xl font-bold mb-2">Select a Prompt</h3>
                    <p className="text-gray-400">
                      Choose a prompt from the list to view details
                    </p>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </main>
    </div>
  )
}
