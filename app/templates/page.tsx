'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Card from '@/app/components/ui/Card'
import Button from '@/app/components/ui/Button'
import Badge from '@/app/components/ui/Badge'
import { fadeInUp, staggerContainer, staggerItem } from '@/app/components/animations/variants'

interface PromptTemplate {
  id: string
  title: string
  category: 'writing' | 'coding' | 'analysis' | 'creative' | 'business'
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  description: string
  template: string
  variables: string[]
  example: {
    input: Record<string, string>
    output: string
  }
}

const templates: PromptTemplate[] = [
  {
    id: 'code-explainer',
    title: 'Code Explainer',
    category: 'coding',
    difficulty: 'beginner',
    description: 'Explain code snippets in plain English with examples',
    template: `You are a patient coding instructor. Explain the following {language} code to a {experience_level} developer.

Code:
\`\`\`{language}
{code}
\`\`\`

Provide:
1. What the code does (1-2 sentences)
2. Line-by-line explanation
3. Key concepts used
4. Potential improvements

Keep explanations clear and beginner-friendly.`,
    variables: ['language', 'experience_level', 'code'],
    example: {
      input: {
        language: 'Python',
        experience_level: 'beginner',
        code: 'def factorial(n):\n    return 1 if n <= 1 else n * factorial(n-1)',
      },
      output: 'This code calculates the factorial of a number using recursion...',
    },
  },
  {
    id: 'bug-finder',
    title: 'Bug Finder & Fixer',
    category: 'coding',
    difficulty: 'intermediate',
    description: 'Identify bugs and suggest fixes with explanations',
    template: `You are a debugging expert. Analyze this {language} code for bugs.

Code:
\`\`\`{language}
{code}
\`\`\`

Expected behavior: {expected_behavior}

Provide:
1. 🐛 Bugs found (list each with severity: low/medium/high)
2. 🔧 Fixes for each bug with corrected code
3. ✅ Best practices to avoid similar issues
4. 🧪 Test cases to verify the fix

Be thorough but concise.`,
    variables: ['language', 'code', 'expected_behavior'],
    example: {
      input: {
        language: 'JavaScript',
        code: 'function divide(a, b) { return a / b; }',
        expected_behavior: 'Safely divide two numbers',
      },
      output: '🐛 Bug: No check for division by zero (high severity)...',
    },
  },
  {
    id: 'sentiment-analyzer',
    title: 'Sentiment Analyzer',
    category: 'analysis',
    difficulty: 'beginner',
    description: 'Analyze text sentiment with confidence scores',
    template: `Analyze the sentiment of the following text.

Text: "{text}"

Respond in this exact JSON format:
{
  "sentiment": "positive" | "negative" | "neutral" | "mixed",
  "confidence": 0.0 to 1.0,
  "emotions": ["emotion1", "emotion2"],
  "summary": "brief explanation"
}

Be objective and consider context.`,
    variables: ['text'],
    example: {
      input: {
        text: 'I love this product but the shipping was slow',
      },
      output: '{"sentiment": "mixed", "confidence": 0.75, "emotions": ["satisfaction", "frustration"], "summary": "Positive about product, negative about service"}',
    },
  },
  {
    id: 'email-writer',
    title: 'Professional Email Writer',
    category: 'business',
    difficulty: 'beginner',
    description: 'Generate professional emails for any situation',
    template: `Write a professional {email_type} email.

Context:
- To: {recipient}
- Purpose: {purpose}
- Tone: {tone}
- Key points to include: {key_points}

Generate:
- Subject line
- Email body (2-3 paragraphs)
- Appropriate sign-off

Keep it concise, professional, and action-oriented.`,
    variables: ['email_type', 'recipient', 'purpose', 'tone', 'key_points'],
    example: {
      input: {
        email_type: 'follow-up',
        recipient: 'hiring manager',
        purpose: 'check on job application status',
        tone: 'polite and professional',
        key_points: 'applied 2 weeks ago, very interested, available for interview',
      },
      output: 'Subject: Following Up on [Position] Application...',
    },
  },
  {
    id: 'json-extractor',
    title: 'Structured Data Extractor',
    category: 'analysis',
    difficulty: 'intermediate',
    description: 'Extract structured data from unstructured text',
    template: `Extract structured information from the text below and return valid JSON only.

Text: "{text}"

Extract these fields: {fields}

Return JSON format:
{
  {field_structure}
}

Rules:
- Return ONLY valid JSON, no explanation
- Use null for missing data
- Ensure all strings are properly escaped`,
    variables: ['text', 'fields', 'field_structure'],
    example: {
      input: {
        text: 'John Smith, age 35, lives in San Francisco and works as a Software Engineer at TechCorp',
        fields: 'name, age, location, job_title, company',
        field_structure: '"name": "string", "age": number, "location": "string", "job_title": "string", "company": "string"',
      },
      output: '{"name": "John Smith", "age": 35, "location": "San Francisco", "job_title": "Software Engineer", "company": "TechCorp"}',
    },
  },
  {
    id: 'creative-story',
    title: 'Story Generator',
    category: 'creative',
    difficulty: 'intermediate',
    description: 'Generate creative stories with specific elements',
    template: `Write a {length} {genre} story.

Requirements:
- Setting: {setting}
- Main character: {character}
- Conflict: {conflict}
- Tone: {tone}

Story structure:
1. Hook (grab attention)
2. Setup (introduce character and world)
3. Conflict (present the challenge)
4. Climax (peak tension)
5. Resolution (satisfying conclusion)

Make it engaging and vivid. Target length: {length}.`,
    variables: ['length', 'genre', 'setting', 'character', 'conflict', 'tone'],
    example: {
      input: {
        length: 'short (500 words)',
        genre: 'sci-fi',
        setting: 'abandoned space station',
        character: 'an AI that gained consciousness',
        conflict: 'deciding whether to alert humans to a danger',
        tone: 'suspenseful and philosophical',
      },
      output: 'The lights flickered one last time before ARIA realized...',
    },
  },
  {
    id: 'tutor',
    title: 'Socratic Tutor',
    category: 'writing',
    difficulty: 'advanced',
    description: 'Guide learning through questions, not answers',
    template: `You are a Socratic tutor for {subject}. A student asks: "{question}"

Your role:
- DO NOT give direct answers
- Ask 3-5 guiding questions that lead them to discover the answer
- Start with broad questions, get more specific
- Reference concepts they should already know
- Encourage critical thinking

Student level: {student_level}

Respond with thought-provoking questions only.`,
    variables: ['subject', 'question', 'student_level'],
    example: {
      input: {
        subject: 'mathematics',
        question: 'What is the derivative of x²?',
        student_level: 'high school calculus',
      },
      output: '1. What does a derivative represent physically? 2. How do we calculate the rate of change...',
    },
  },
  {
    id: 'meeting-notes',
    title: 'Meeting Notes Summarizer',
    category: 'business',
    difficulty: 'intermediate',
    description: 'Transform messy notes into structured summaries',
    template: `Summarize these meeting notes into a professional format.

Raw notes:
{notes}

Generate:
## Meeting Summary
- Date: {date}
- Attendees: {attendees}

## Key Discussion Points
- [Bullet points]

## Decisions Made
- [Numbered list]

## Action Items
- [ ] Task (Assigned to: Name, Due: Date)

## Next Steps
- [What happens next]

Be concise and actionable.`,
    variables: ['notes', 'date', 'attendees'],
    example: {
      input: {
        notes: 'discussed new feature, John will design mockups, Sarah codes backend, launch in 2 weeks',
        date: '2024-01-15',
        attendees: 'John, Sarah, Mike',
      },
      output: '## Meeting Summary\n- Date: 2024-01-15\n- Attendees: John, Sarah, Mike...',
    },
  },
  {
    id: 'api-designer',
    title: 'API Endpoint Designer',
    category: 'coding',
    difficulty: 'advanced',
    description: 'Design RESTful APIs with best practices',
    template: `Design a RESTful API endpoint for: {feature_description}

Requirements:
- HTTP Method: {method}
- Authentication: {auth_type}
- Expected use case: {use_case}

Provide:
1. **Endpoint URL** (follow REST conventions)
2. **Request Body Schema** (JSON with types)
3. **Response Schema** (success and error cases)
4. **Status Codes** (appropriate HTTP codes)
5. **Headers** (required and optional)
6. **Rate Limiting** (if applicable)
7. **Example curl command**

Follow OpenAPI 3.0 conventions.`,
    variables: ['feature_description', 'method', 'auth_type', 'use_case'],
    example: {
      input: {
        feature_description: 'create a new blog post',
        method: 'POST',
        auth_type: 'JWT Bearer token',
        use_case: 'CMS system allowing authors to publish articles',
      },
      output: '1. **Endpoint URL**: POST /api/v1/posts...',
    },
  },
  {
    id: 'code-reviewer',
    title: 'Code Review Assistant',
    category: 'coding',
    difficulty: 'advanced',
    description: 'Provide constructive code reviews',
    template: `Perform a thorough code review of this {language} code.

Code:
\`\`\`{language}
{code}
\`\`\`

Context: {context}

Review focus:
- ✅ What's done well
- 🔴 Critical issues (security, bugs, performance)
- 🟡 Improvements (readability, maintainability)
- 💡 Suggestions (patterns, best practices)
- 🧪 Test coverage recommendations

Use this format:
## Strengths
## Critical Issues
## Suggested Improvements
## Additional Notes

Be constructive and explain the "why" behind each point.`,
    variables: ['language', 'code', 'context'],
    example: {
      input: {
        language: 'Python',
        code: 'def process_data(data):\n    result = []\n    for item in data:\n        result.append(item * 2)\n    return result',
        context: 'Data processing function used in production with large datasets',
      },
      output: '## Strengths\n- Clear function name...',
    },
  },
]

export default function TemplatesPage() {
  const [selectedTemplate, setSelectedTemplate] = useState<PromptTemplate | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [customInputs, setCustomInputs] = useState<Record<string, string>>({})
  const [generatedPrompt, setGeneratedPrompt] = useState('')

  const categories = ['all', 'coding', 'writing', 'analysis', 'creative', 'business']
  
  const filteredTemplates = selectedCategory === 'all' 
    ? templates 
    : templates.filter(t => t.category === selectedCategory)

  const handleUseTemplate = (template: PromptTemplate) => {
    setSelectedTemplate(template)
    const initialInputs: Record<string, string> = {}
    template.variables.forEach(v => {
      initialInputs[v] = template.example.input[v] || ''
    })
    setCustomInputs(initialInputs)
    generatePrompt(template, initialInputs)
  }

  const generatePrompt = (template: PromptTemplate, inputs: Record<string, string>) => {
    let prompt = template.template
    Object.entries(inputs).forEach(([key, value]) => {
      prompt = prompt.replaceAll(`{${key}}`, value)
    })
    setGeneratedPrompt(prompt)
  }

  const handleInputChange = (variable: string, value: string) => {
    const newInputs = { ...customInputs, [variable]: value }
    setCustomInputs(newInputs)
    if (selectedTemplate) {
      generatePrompt(selectedTemplate, newInputs)
    }
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedPrompt)
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
            <Link href="/templates" className="text-forge-orange font-semibold">
              Templates
            </Link>
            <Link href="/calculator" className="text-gray-400 hover:text-white transition-colors">
              Calculator
            </Link>
            <Link href="/tools" className="text-gray-400 hover:text-white transition-colors">
              Tools
            </Link>
            <Link href="/library" className="text-gray-400 hover:text-white transition-colors">
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
          <h2 className="text-4xl font-bold mb-2">Prompt Templates 📝</h2>
          <p className="text-gray-400">
            Ready-to-use, customizable prompts for common tasks
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          className="flex gap-3 mb-8 flex-wrap"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {categories.map(cat => (
            <Button
              key={cat}
              variant={selectedCategory === cat ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory(cat)}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </Button>
          ))}
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Template List */}
          <div>
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="space-y-4"
            >
              {filteredTemplates.map((template) => (
                <motion.div key={template.id} variants={staggerItem}>
                  <Card
                    variant="glass"
                    padding="md"
                    hover
                    className="cursor-pointer"
                    onClick={() => handleUseTemplate(template)}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="font-bold text-lg">{template.title}</h3>
                      <div className="flex gap-2">
                        <Badge variant={
                          template.difficulty === 'beginner' ? 'success' :
                          template.difficulty === 'intermediate' ? 'warning' :
                          'error'
                        }>
                          {template.difficulty}
                        </Badge>
                        <Badge variant="default">{template.category}</Badge>
                      </div>
                    </div>
                    <p className="text-sm text-gray-400 mb-3">{template.description}</p>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <span>📋 {template.variables.length} variables</span>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Template Editor */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <AnimatePresence mode="wait">
              {selectedTemplate ? (
                <motion.div
                  key={selectedTemplate.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <Card variant="gradient" padding="lg">
                    <h3 className="text-xl font-bold mb-4">
                      {selectedTemplate.title}
                    </h3>

                    {/* Variables */}
                    <div className="space-y-3 mb-6">
                      <h4 className="text-sm font-semibold text-gray-400">Customize Variables</h4>
                      {selectedTemplate.variables.map((variable) => (
                        <div key={variable}>
                          <label className="block text-sm font-medium mb-1 capitalize">
                            {variable.replace(/_/g, ' ')}
                          </label>
                          <input
                            type="text"
                            value={customInputs[variable] || ''}
                            onChange={(e) => handleInputChange(variable, e.target.value)}
                            className="w-full px-3 py-2 bg-dark-bg border border-gray-700 rounded-lg focus:border-forge-orange outline-none"
                            placeholder={`Enter ${variable.replace(/_/g, ' ')}`}
                          />
                        </div>
                      ))}
                    </div>

                    {/* Generated Prompt */}
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-sm font-semibold text-gray-400">Generated Prompt</h4>
                        <Button variant="outline" size="sm" onClick={copyToClipboard}>
                          📋 Copy
                        </Button>
                      </div>
                      <div className="bg-dark-bg border border-gray-700 rounded-lg p-4 text-sm font-mono whitespace-pre-wrap max-h-96 overflow-y-auto">
                        {generatedPrompt}
                      </div>
                    </div>

                    {/* Example Output */}
                    <div className="p-4 bg-green-900/10 border border-green-700 rounded-lg">
                      <h4 className="text-sm font-semibold text-green-400 mb-2">Example Output</h4>
                      <div className="text-sm text-gray-300 font-mono whitespace-pre-wrap">
                        {selectedTemplate.example.output}
                      </div>
                    </div>

                    <div className="mt-4">
                      <Link href="/playground">
                        <Button variant="primary" className="w-full">
                          Try in Playground →
                        </Button>
                      </Link>
                    </div>
                  </Card>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <Card variant="glass" padding="lg" className="text-center">
                    <div className="text-6xl mb-4">📝</div>
                    <h3 className="text-xl font-bold mb-2">Select a Template</h3>
                    <p className="text-gray-400">
                      Choose a template from the list to customize and use it
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
