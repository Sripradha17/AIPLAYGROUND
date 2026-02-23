'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Card from '@/app/components/ui/Card'
import Button from '@/app/components/ui/Button'
import PromptFlowDiagram from '@/app/components/diagrams/PromptFlowDiagram'
import RAGDiagram from '@/app/components/diagrams/RAGDiagram'
import AgentLoopDiagram from '@/app/components/diagrams/AgentLoopDiagram'
import ChainOfThoughtDiagram from '@/app/components/diagrams/ChainOfThoughtDiagram'
import MCPDiagram from '@/app/components/diagrams/MCPDiagram'
import LLMParametersDiagram from '@/app/components/diagrams/LLMParametersDiagram'
import FewShotDiagram from '@/app/components/diagrams/FewShotDiagram'
import SystemPromptDiagram from '@/app/components/diagrams/SystemPromptDiagram'
import EmbeddingsDiagram from '@/app/components/diagrams/EmbeddingsDiagram'
import TokenProbabilitiesDiagram from '@/app/components/diagrams/TokenProbabilitiesDiagram'
import ContextWindowDiagram from '@/app/components/diagrams/ContextWindowDiagram'
import PromptSecurityDiagram from '@/app/components/diagrams/PromptSecurityDiagram'
import ConversationMemoryDiagram from '@/app/components/diagrams/ConversationMemoryDiagram'
import CostOptimizationDiagram from '@/app/components/diagrams/CostOptimizationDiagram'
import { fadeInUp, staggerContainer, staggerItem } from '@/app/components/animations/variants'

type DiagramType = 'prompt-flow' | 'rag' | 'agent-loop' | 'chain-of-thought' | 'mcp' | 'llm-params' | 'few-shot' | 'system-prompt' | 'embeddings' | 'token-probs' | 'context-window' | 'security' | 'memory' | 'cost'

interface DiagramInfo {
  id: DiagramType
  title: string
  description: string
  icon: string
  component: React.ComponentType
}

export default function LearnPage() {
  const [selectedDiagram, setSelectedDiagram] = useState<DiagramType>('prompt-flow')

  const diagrams: DiagramInfo[] = [
    {
      id: 'prompt-flow',
      title: 'Prompt → Model → Output',
      description: 'Basic flow of how prompts are processed by AI models',
      icon: '⚡',
      component: PromptFlowDiagram,
    },
    {
      id: 'system-prompt',
      title: 'System Instructions',
      description: 'How to structure prompts with system, user, and assistant roles',
      icon: '📋',
      component: SystemPromptDiagram,
    },
    {
      id: 'llm-params',
      title: 'LLM Parameters',
      description: 'Understanding temperature, tokens, and Top P settings',
      icon: '🎛️',
      component: LLMParametersDiagram,
    },
    {
      id: 'few-shot',
      title: 'Few-Shot Learning',
      description: 'Teaching AI by providing examples in your prompts',
      icon: '📚',
      component: FewShotDiagram,
    },
    {
      id: 'chain-of-thought',
      title: 'Chain of Thought',
      description: 'Step-by-step reasoning process in AI responses',
      icon: '🧠',
      component: ChainOfThoughtDiagram,
    },
    {
      id: 'embeddings',
      title: 'Embeddings & Vectors',
      description: 'How text is converted to numerical vectors for semantic search',
      icon: '🔢',
      component: EmbeddingsDiagram,
    },
    {
      id: 'token-probs',
      title: 'Token Probabilities',
      description: 'How AI models calculate confidence for each generated token',
      icon: '📊',
      component: TokenProbabilitiesDiagram,
    },
    {
      id: 'context-window',
      title: 'Context Windows',
      description: 'Token limits and how much text models can process',
      icon: '🪟',
      component: ContextWindowDiagram,
    },
    {
      id: 'security',
      title: 'Prompt Security',
      description: 'Protecting against injection attacks and vulnerabilities',
      icon: '🛡️',
      component: PromptSecurityDiagram,
    },
    {
      id: 'memory',
      title: 'Conversation Memory',
      description: 'How AI systems remember context across messages',
      icon: '💾',
      component: ConversationMemoryDiagram,
    },
    {
      id: 'cost',
      title: 'Cost Optimization',
      description: 'Managing API costs and choosing the right model',
      icon: '💰',
      component: CostOptimizationDiagram,
    },
    {
      id: 'rag',
      title: 'RAG Pipeline',
      description: 'Retrieval-Augmented Generation with vector databases',
      icon: '🗄️',
      component: RAGDiagram,
    },
    {
      id: 'agent-loop',
      title: 'Agent Tool Loop',
      description: 'How AI agents interact with tools and make decisions',
      icon: '🤖',
      component: AgentLoopDiagram,
    },
    {
      id: 'mcp',
      title: 'MCP Architecture',
      description: 'Model Context Protocol for standardized AI tool integration',
      icon: '🔌',
      component: MCPDiagram,
    },
  ]

  const currentDiagram = diagrams.find(d => d.id === selectedDiagram)
  const DiagramComponent = currentDiagram?.component

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
            <Link href="/learn" className="text-forge-orange font-semibold">
              Learn
            </Link>
            <Link href="/templates" className="text-gray-400 hover:text-white transition-colors">
              Templates
            </Link>
            <Link href="/calculator" className="text-gray-400 hover:text-white transition-colors">
              Calculator
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
          <h2 className="text-4xl font-bold mb-2">Learn AI Concepts 📚</h2>
          <p className="text-gray-400">
            Interactive, animated diagrams explaining how AI systems work
          </p>
        </motion.div>

        {/* Diagram Selector */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="grid md:grid-cols-4 gap-3 mb-8"
        >
          {diagrams.map((diagram) => (
            <motion.div key={diagram.id} variants={staggerItem}>
              <Card
                variant={selectedDiagram === diagram.id ? 'default' : 'glass'}
                padding="md"
                hover
                className={`cursor-pointer ${
                  selectedDiagram === diagram.id ? 'border-forge-orange' : ''
                }`}
                onClick={() => setSelectedDiagram(diagram.id)}
              >
                <div className="text-center">
                  <div className="text-4xl mb-3">{diagram.icon}</div>
                  <h3 className="font-semibold mb-2 text-sm">{diagram.title}</h3>
                  <p className="text-xs text-gray-400">{diagram.description}</p>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Diagram Display */}
        <AnimatePresence mode="wait">
          {currentDiagram && (
            <motion.div
              key={selectedDiagram}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Card variant="gradient" padding="lg">
                <div className="mb-6">
                  <h3 className="text-2xl font-bold mb-2 flex items-center gap-2">
                    <span>{currentDiagram.icon}</span>
                    {currentDiagram.title}
                  </h3>
                  <p className="text-gray-400">{currentDiagram.description}</p>
                </div>

                <div className="bg-dark-bg rounded-lg p-6 min-h-96">
                  {DiagramComponent && <DiagramComponent />}
                </div>

                {/* Explanation */}
                <div className="mt-6 p-4 bg-dark-bg rounded-lg border border-gray-700">
                  <h4 className="font-semibold mb-2 text-forge-orange">💡 Key Concepts</h4>
                  <div className="text-sm text-gray-300 space-y-2">
                    {selectedDiagram === 'prompt-flow' && (
                      <>
                        <p>• <strong>Prompt:</strong> Your input instruction to the AI</p>
                        <p>• <strong>Model:</strong> The AI that processes your prompt</p>
                        <p>• <strong>Output:</strong> The generated response</p>
                        <p>• This is the fundamental flow for all AI interactions</p>
                      </>
                    )}
                    {selectedDiagram === 'rag' && (
                      <>
                        <p>• <strong>Query:</strong> User's question or search</p>
                        <p>• <strong>Vector DB:</strong> Database storing document embeddings</p>
                        <p>• <strong>Retrieval:</strong> Finding relevant documents</p>
                        <p>• <strong>Augmentation:</strong> Adding context to the prompt</p>
                        <p>• RAG helps AI give more accurate, context-aware answers</p>
                      </>
                    )}
                    {selectedDiagram === 'agent-loop' && (
                      <>
                        <p>• <strong>Agent:</strong> AI that can use tools and make decisions</p>
                        <p>• <strong>Tools:</strong> External capabilities (search, APIs, etc.)</p>
                        <p>• <strong>Loop:</strong> Agent decides which tool to use based on task</p>
                        <p>• Agents can chain multiple tool calls to solve complex problems</p>
                      </>
                    )}
                    {selectedDiagram === 'system-prompt' && (
                      <>
                        <p>• <strong>System:</strong> Persistent behavior instructions</p>
                        <p>• <strong>User:</strong> Your questions and requests</p>
                        <p>• <strong>Assistant:</strong> AI responses in conversation</p>
                        <p>• System messages set the tone, constraints, and expertise level</p>
                      </>
                    )}
                    {selectedDiagram === 'llm-params' && (
                      <>
                        <p>• <strong>Temperature:</strong> Controls randomness (0=deterministic, 2=creative)</p>
                        <p>• <strong>Max Tokens:</strong> Output length limit (~0.75 words per token)</p>
                        <p>• <strong>Top P:</strong> Nucleus sampling for diversity control</p>
                        <p>• Adjust parameters based on your use case (factual vs creative)</p>
                      </>
                    )}
                    {selectedDiagram === 'few-shot' && (
                      <>
                        <p>• <strong>Examples teach format:</strong> Show desired input→output pairs</p>
                        <p>• <strong>No training needed:</strong> Works immediately in prompts</p>
                        <p>• <strong>Better consistency:</strong> AI follows your pattern</p>
                        <p>• Use 2-5 diverse examples covering edge cases</p>
                      </>
                    )}
                    {selectedDiagram === 'chain-of-thought' && (
                      <>
                        <p>• <strong>Step-by-step:</strong> Breaking down complex reasoning</p>
                        <p>• <strong>Intermediate steps:</strong> Showing the work</p>
                        <p>• <strong>Verification:</strong> Checking each step</p>
                        <p>• CoT helps AI solve problems more accurately by reasoning explicitly</p>
                      </>
                    )}
                    {selectedDiagram === 'mcp' && (
                      <>
                        <p>• <strong>Host:</strong> Your application (Claude, VS Code, etc.)</p>
                        <p>• <strong>MCP Server:</strong> Middleware that routes requests</p>
                        <p>• <strong>Tools:</strong> External capabilities (files, APIs, databases)</p>
                        <p>• MCP standardizes how AI systems connect to tools and resources</p>
                      </>
                    )}
                    {selectedDiagram === 'embeddings' && (
                      <>
                        <p>• <strong>Vector Representation:</strong> Text converted to 1536+ dimension numbers</p>
                        <p>• <strong>Semantic Similarity:</strong> Similar meanings cluster together in space</p>
                        <p>• <strong>Cosine Similarity:</strong> Measures how close two vectors are (0-1)</p>
                        <p>• Embeddings power semantic search, RAG, and recommendation systems</p>
                      </>
                    )}
                    {selectedDiagram === 'token-probs' && (
                      <>
                        <p>• <strong>Confidence Scores:</strong> Each token has a probability (0-100%)</p>
                        <p>• <strong>Temperature:</strong> Controls how the model uses these probabilities</p>
                        <p>• <strong>Top Alternatives:</strong> Model considers multiple token options</p>
                        <p>• Low temp = always picks highest probability; High temp = more random</p>
                      </>
                    )}
                    {selectedDiagram === 'context-window' && (
                      <>
                        <p>• <strong>Token Limit:</strong> Maximum input + output size (4K to 200K+)</p>
                        <p>• <strong>Management:</strong> Truncate, summarize, or sliding window</p>
                        <p>• <strong>Cost Impact:</strong> Larger context = higher API costs</p>
                        <p>• Choose models based on your context needs (long docs vs short chat)</p>
                      </>
                    )}
                    {selectedDiagram === 'security' && (
                      <>
                        <p>• <strong>Prompt Injection:</strong> Malicious inputs that override instructions</p>
                        <p>• <strong>Delimiters:</strong> Mark user input clearly (###USER_INPUT###)</p>
                        <p>• <strong>Validation:</strong> Check output for policy violations</p>
                        <p>• Always treat user input as untrusted in production systems</p>
                      </>
                    )}
                    {selectedDiagram === 'memory' && (
                      <>
                        <p>• <strong>Message History:</strong> Full conversation array sent each request</p>
                        <p>• <strong>Strategies:</strong> Short-term (context), summarization, vector DB, entities</p>
                        <p>• <strong>Token Trade-off:</strong> More memory = more tokens = higher cost</p>
                        <p>• Keep 10-20 recent messages for optimal balance</p>
                      </>
                    )}
                    {selectedDiagram === 'cost' && (
                      <>
                        <p>• <strong>Per-Token Pricing:</strong> Input tokens + output tokens charged separately</p>
                        <p>• <strong>Model Selection:</strong> GPT-3.5 for simple tasks, GPT-4 for complex reasoning</p>
                        <p>• <strong>Optimization:</strong> Batch requests, cache responses, truncate history</p>
                        <p>• Track usage daily to avoid unexpected bills in production</p>
                      </>
                    )}
                  </div>
                </div>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Try it out CTA */}
        <motion.div
          className="mt-8 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <p className="text-gray-400 mb-4">
            Ready to put these concepts into practice?
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/playground">
              <Button variant="primary">
                Try Playground
              </Button>
            </Link>
            <Link href="/challenges">
              <Button variant="outline">
                Take Challenges
              </Button>
            </Link>
          </div>
        </motion.div>
      </main>
    </div>
  )
}
