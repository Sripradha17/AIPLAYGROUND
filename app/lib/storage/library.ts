export interface SavedPrompt {
  id: string
  title: string
  content: string
  systemPrompt?: string
  tags: string[]
  category: string
  createdAt: number
  updatedAt: number
  isFavorite: boolean
  temperature?: number
  maxTokens?: number
}

export interface PromptLibrary {
  prompts: SavedPrompt[]
  tags: string[]
  categories: string[]
}

const STORAGE_KEY = 'promptforge_library'

export function loadLibrary(): PromptLibrary {
  if (typeof window === 'undefined') {
    return { prompts: [], tags: [], categories: [] }
  }

  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      return JSON.parse(stored)
    }
  } catch (error) {
    console.error('Failed to load prompt library:', error)
  }

  return { prompts: [], tags: [], categories: [] }
}

export function saveLibrary(library: PromptLibrary): void {
  if (typeof window === 'undefined') return

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(library))
  } catch (error) {
    console.error('Failed to save prompt library:', error)
  }
}

export function savePrompt(prompt: Omit<SavedPrompt, 'id' | 'createdAt' | 'updatedAt'>): SavedPrompt {
  const library = loadLibrary()
  
  const newPrompt: SavedPrompt = {
    ...prompt,
    id: Date.now().toString(),
    createdAt: Date.now(),
    updatedAt: Date.now(),
  }

  library.prompts.push(newPrompt)
  
  // Update tags and categories
  prompt.tags.forEach(tag => {
    if (!library.tags.includes(tag)) {
      library.tags.push(tag)
    }
  })
  
  if (!library.categories.includes(prompt.category)) {
    library.categories.push(prompt.category)
  }

  saveLibrary(library)
  return newPrompt
}

export function updatePrompt(id: string, updates: Partial<SavedPrompt>): void {
  const library = loadLibrary()
  const index = library.prompts.findIndex(p => p.id === id)
  
  if (index !== -1) {
    library.prompts[index] = {
      ...library.prompts[index],
      ...updates,
      updatedAt: Date.now(),
    }
    saveLibrary(library)
  }
}

export function deletePrompt(id: string): void {
  const library = loadLibrary()
  library.prompts = library.prompts.filter(p => p.id !== id)
  saveLibrary(library)
}

export function toggleFavorite(id: string): void {
  const library = loadLibrary()
  const prompt = library.prompts.find(p => p.id === id)
  
  if (prompt) {
    prompt.isFavorite = !prompt.isFavorite
    prompt.updatedAt = Date.now()
    saveLibrary(library)
  }
}

export function searchPrompts(query: string): SavedPrompt[] {
  const library = loadLibrary()
  const lowerQuery = query.toLowerCase()
  
  return library.prompts.filter(p =>
    p.title.toLowerCase().includes(lowerQuery) ||
    p.content.toLowerCase().includes(lowerQuery) ||
    p.tags.some(t => t.toLowerCase().includes(lowerQuery)) ||
    p.category.toLowerCase().includes(lowerQuery)
  )
}

export function getPromptsByCategory(category: string): SavedPrompt[] {
  const library = loadLibrary()
  return library.prompts.filter(p => p.category === category)
}

export function getPromptsByTag(tag: string): SavedPrompt[] {
  const library = loadLibrary()
  return library.prompts.filter(p => p.tags.includes(tag))
}

export function getFavorites(): SavedPrompt[] {
  const library = loadLibrary()
  return library.prompts.filter(p => p.isFavorite)
}

export function exportLibrary(): string {
  const library = loadLibrary()
  return JSON.stringify(library, null, 2)
}

export function importLibrary(jsonString: string): boolean {
  try {
    const imported: PromptLibrary = JSON.parse(jsonString)
    
    // Validate structure
    if (!imported.prompts || !Array.isArray(imported.prompts)) {
      throw new Error('Invalid library format')
    }

    // Merge with existing library
    const library = loadLibrary()
    
    imported.prompts.forEach(prompt => {
      // Check if prompt already exists by title
      const existingIndex = library.prompts.findIndex(p => p.title === prompt.title)
      
      if (existingIndex !== -1) {
        // Update existing
        library.prompts[existingIndex] = {
          ...prompt,
          updatedAt: Date.now(),
        }
      } else {
        // Add new with new ID
        library.prompts.push({
          ...prompt,
          id: Date.now().toString() + Math.random(),
          createdAt: Date.now(),
          updatedAt: Date.now(),
        })
      }
    })

    // Merge tags and categories
    library.tags = Array.from(new Set([...library.tags, ...(imported.tags || [])]))
    library.categories = Array.from(new Set([...library.categories, ...(imported.categories || [])]))

    saveLibrary(library)
    return true
  } catch (error) {
    console.error('Failed to import library:', error)
    return false
  }
}
