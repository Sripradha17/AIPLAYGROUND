/**
 * Build a well-structured prompt from components
 */
export function buildPrompt(components: {
  task?: string
  context?: string
  examples?: string[]
  constraints?: string[]
  format?: string
}): string {
  const parts: string[] = []

  if (components.context) {
    parts.push(`Context:\n${components.context}\n`)
  }

  if (components.task) {
    parts.push(`Task:\n${components.task}\n`)
  }

  if (components.examples && components.examples.length > 0) {
    parts.push(`Examples:`)
    components.examples.forEach((example, i) => {
      parts.push(`${i + 1}. ${example}`)
    })
    parts.push('')
  }

  if (components.constraints && components.constraints.length > 0) {
    parts.push(`Constraints:`)
    components.constraints.forEach((constraint, i) => {
      parts.push(`- ${constraint}`)
    })
    parts.push('')
  }

  if (components.format) {
    parts.push(`Output Format:\n${components.format}`)
  }

  return parts.join('\n')
}

/**
 * System instructions for different use cases
 */
export const systemInstructions = {
  helpful: 'You are a helpful AI assistant. Provide clear, accurate, and concise responses.',
  
  structured: 'You are a precise AI assistant. Always provide structured, well-formatted responses with clear reasoning.',
  
  creative: 'You are a creative AI assistant. Generate imaginative and engaging content while maintaining accuracy.',
  
  coder: 'You are an expert programmer. Provide clean, efficient, and well-documented code with explanations.',
  
  teacher: 'You are a patient teacher. Explain concepts clearly with examples and break down complex topics into simple steps.',
}

/**
 * Common prompt templates
 */
export const promptTemplates = {
  summarize: (text: string) => 
    `Summarize the following text concisely:\n\n${text}`,
  
  explain: (concept: string) => 
    `Explain ${concept} in simple terms with examples.`,
  
  extract: (text: string, dataType: string) => 
    `Extract all ${dataType} from the following text:\n\n${text}`,
  
  translate: (text: string, targetLang: string) => 
    `Translate the following text to ${targetLang}:\n\n${text}`,
  
  improve: (text: string) => 
    `Improve the following text for clarity and impact:\n\n${text}`,
}
