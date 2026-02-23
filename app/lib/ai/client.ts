import OpenAI from 'openai'
import type { AIGenerateRequest, AIGenerateResponse } from '@/app/types/ai'

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || '',
})

/**
 * Call the AI model with retry logic and error handling
 */
export async function callAIModel(
  request: AIGenerateRequest
): Promise<AIGenerateResponse> {
  const {
    prompt,
    systemInstructions,
    temperature = 0.7,
    maxTokens = 2000,
    model = process.env.AI_MODEL || 'gpt-4-turbo-preview',
  } = request

  try {
    // Build messages array
    const messages: OpenAI.Chat.ChatCompletionMessageParam[] = []
    
    if (systemInstructions) {
      messages.push({
        role: 'system',
        content: systemInstructions,
      })
    }
    
    messages.push({
      role: 'user',
      content: prompt,
    })

    // Call OpenAI API
    const completion = await openai.chat.completions.create({
      model,
      messages,
      temperature,
      max_tokens: maxTokens,
    })

    const choice = completion.choices[0]
    
    return {
      success: true,
      output: choice.message.content || '',
      tokensUsed: {
        prompt: completion.usage?.prompt_tokens || 0,
        completion: completion.usage?.completion_tokens || 0,
        total: completion.usage?.total_tokens || 0,
      },
      model: completion.model,
      finishReason: choice.finish_reason,
      timestamp: new Date().toISOString(),
      metadata: request.metadata,
    }
  } catch (error: any) {
    console.error('AI Model Error:', error)
    
    return {
      success: false,
      output: '',
      tokensUsed: { prompt: 0, completion: 0, total: 0 },
      model: model,
      finishReason: 'error',
      timestamp: new Date().toISOString(),
      error: error.message || 'Unknown error occurred',
    }
  }
}

/**
 * Call AI with retry logic
 */
export async function callAIModelWithRetry(
  request: AIGenerateRequest,
  maxRetries: number = 3
): Promise<AIGenerateResponse> {
  let lastError: Error | null = null

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await callAIModel(request)
    } catch (error: any) {
      lastError = error
      console.error(`Attempt ${attempt} failed:`, error.message)
      
      if (attempt < maxRetries) {
        // Exponential backoff
        const delay = Math.pow(2, attempt) * 1000
        await new Promise(resolve => setTimeout(resolve, delay))
      }
    }
  }

  throw lastError || new Error('Failed after maximum retries')
}

/**
 * Stream AI responses (for real-time output)
 */
export async function* streamAIModel(
  request: AIGenerateRequest
): AsyncGenerator<string, void, unknown> {
  const {
    prompt,
    systemInstructions,
    temperature = 0.7,
    maxTokens = 2000,
    model = process.env.AI_MODEL || 'gpt-4-turbo-preview',
  } = request

  const messages: OpenAI.Chat.ChatCompletionMessageParam[] = []
  
  if (systemInstructions) {
    messages.push({
      role: 'system',
      content: systemInstructions,
    })
  }
  
  messages.push({
    role: 'user',
    content: prompt,
  })

  const stream = await openai.chat.completions.create({
    model,
    messages,
    temperature,
    max_tokens: maxTokens,
    stream: true,
  })

  for await (const chunk of stream) {
    const content = chunk.choices[0]?.delta?.content || ''
    if (content) {
      yield content
    }
  }
}
