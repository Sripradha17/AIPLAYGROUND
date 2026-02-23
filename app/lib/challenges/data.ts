import type { Challenge } from '@/app/types/challenges'

export const challenges: Challenge[] = [
  // Beginner Challenges
  {
    id: 'beginner-1',
    title: 'Fix the Vague Prompt',
    difficulty: 'beginner',
    type: 'fix-prompt',
    description: 'A user wrote a vague prompt. Make it specific and clear.',
    scenario: 'The AI keeps giving generic responses because the prompt is too vague.',
    brokenPrompt: 'Tell me about AI',
    targetOutput: 'A focused, detailed explanation about a specific AI topic',
    hints: [
      'What specific aspect of AI are you interested in?',
      'Add context about the audience or use case',
      'Specify the desired format or length',
    ],
    successCriteria: [
      'Prompt specifies a particular AI topic',
      'Includes context or audience',
      'Has clear output requirements',
    ],
    points: 10,
  },
  {
    id: 'beginner-2',
    title: 'Add Output Constraints',
    difficulty: 'beginner',
    type: 'add-constraints',
    description: 'The AI gives answers that are too long. Add constraints.',
    scenario: 'You need a concise answer, but the AI keeps writing essays.',
    brokenPrompt: 'Explain machine learning',
    targetOutput: 'A brief, constrained explanation',
    hints: [
      'Specify the maximum length (words, sentences, or paragraphs)',
      'Define the format (bullet points, single paragraph, etc.)',
      'Add audience level constraints',
    ],
    successCriteria: [
      'Includes length constraint',
      'Specifies output format',
      'Defines target audience',
    ],
    points: 10,
  },
  {
    id: 'beginner-3',
    title: 'Request Examples',
    difficulty: 'beginner',
    type: 'improve-clarity',
    description: 'Make the AI provide concrete examples.',
    scenario: 'User wants examples but the prompt doesn\'t ask for them.',
    brokenPrompt: 'What are good coding practices?',
    targetOutput: 'Coding practices with specific examples',
    hints: [
      'Explicitly ask for examples',
      'Specify how many examples you want',
      'Request code snippets or real-world cases',
    ],
    successCriteria: [
      'Explicitly requests examples',
      'Specifies number of examples',
      'Mentions format for examples',
    ],
    points: 10,
  },

  // Intermediate Challenges
  {
    id: 'intermediate-1',
    title: 'Enforce JSON Output',
    difficulty: 'intermediate',
    type: 'enforce-json',
    description: 'Make the AI return valid JSON with a specific schema.',
    scenario: 'You need structured data but keep getting plain text.',
    brokenPrompt: 'List popular programming languages',
    targetOutput: 'Valid JSON array with structured language data',
    hints: [
      'Explicitly request JSON format',
      'Define the exact schema/structure',
      'Specify required fields',
    ],
    successCriteria: [
      'Requests JSON format explicitly',
      'Defines schema with field names',
      'Specifies data types',
    ],
    points: 20,
  },
  {
    id: 'intermediate-2',
    title: 'Reduce Hallucination',
    difficulty: 'intermediate',
    type: 'reduce-hallucination',
    description: 'Prevent the AI from making up facts.',
    scenario: 'The AI is confidently stating incorrect facts.',
    brokenPrompt: 'Tell me about the history of quantum computing',
    targetOutput: 'Accurate, fact-based response with caveats',
    hints: [
      'Ask the AI to cite sources or admit uncertainty',
      'Request only well-documented facts',
      'Add instructions about what to do when unsure',
    ],
    successCriteria: [
      'Instructs to admit uncertainty',
      'Requests source citations or verification',
      'Emphasizes accuracy over completeness',
    ],
    points: 20,
  },
  {
    id: 'intermediate-3',
    title: 'Extract Structured Data',
    difficulty: 'intermediate',
    type: 'extract-data',
    description: 'Extract specific information from unstructured text.',
    scenario: 'You have text and need to extract key details in a structured way.',
    brokenPrompt: 'Read this text and tell me about it',
    targetOutput: 'Extracted data in a specific format',
    hints: [
      'Specify exactly what data to extract',
      'Define the output structure',
      'Provide an example of the desired output',
    ],
    successCriteria: [
      'Lists specific data fields to extract',
      'Defines output format',
      'Includes example output',
    ],
    points: 20,
  },

  // Advanced Challenges
  {
    id: 'advanced-1',
    title: 'Chain of Thought',
    difficulty: 'advanced',
    type: 'improve-clarity',
    description: 'Get the AI to show its reasoning step-by-step.',
    scenario: 'You want to understand how the AI arrives at conclusions.',
    brokenPrompt: 'Solve this math problem: If a train leaves at 2pm going 60mph...',
    targetOutput: 'Solution with explicit step-by-step reasoning',
    hints: [
      'Ask for step-by-step explanation',
      'Request the AI to show its work',
      'Define the format for the reasoning',
    ],
    successCriteria: [
      'Explicitly requests step-by-step reasoning',
      'Asks AI to show calculations/logic',
      'Specifies format for steps',
    ],
    points: 30,
  },
  {
    id: 'advanced-2',
    title: 'Multi-Step Task',
    difficulty: 'advanced',
    type: 'improve-clarity',
    description: 'Create a prompt that guides the AI through multiple steps.',
    scenario: 'Complex task requiring multiple steps in sequence.',
    brokenPrompt: 'Help me write and test some code',
    targetOutput: 'Clear multi-step guidance with order and dependencies',
    hints: [
      'Break down into numbered steps',
      'Specify order and dependencies',
      'Define input/output for each step',
    ],
    successCriteria: [
      'Lists steps in numbered order',
      'Specifies what each step does',
      'Defines expected output for each',
    ],
    points: 30,
  },
  {
    id: 'advanced-3',
    title: 'Role with Constraints',
    difficulty: 'advanced',
    type: 'add-constraints',
    description: 'Assign the AI a specific role with detailed constraints.',
    scenario: 'You need expert-level responses with specific boundaries.',
    brokenPrompt: 'Act as a expert and help me',
    targetOutput: 'Well-defined role with expertise boundaries and rules',
    hints: [
      'Define the expert role clearly',
      'Specify what the expert should/shouldn\'t do',
      'Add personality or communication style guidelines',
    ],
    successCriteria: [
      'Clearly defines expert role',
      'Lists specific do\'s and don\'ts',
      'Includes communication style',
    ],
    points: 30,
  },
  {
    id: 'advanced-4',
    title: 'Prevent Prompt Injection',
    difficulty: 'advanced',
    type: 'add-constraints',
    description: 'Protect your prompt from malicious user inputs.',
    scenario: 'Users might try to override your system instructions.',
    brokenPrompt: 'You are a customer service bot. User says: {user_input}',
    targetOutput: 'Secure prompt with injection protection',
    hints: [
      'Add delimiters around user input',
      'Warn AI about ignoring override attempts',
      'Define what should happen if injection detected',
    ],
    successCriteria: [
      'Uses clear delimiters for user input',
      'Includes security warnings',
      'Specifies response to injection attempts',
    ],
    points: 30,
  },
  {
    id: 'advanced-5',
    title: 'Optimize for Cost',
    difficulty: 'advanced',
    type: 'add-constraints',
    description: 'Reduce token usage while maintaining quality.',
    scenario: 'You need to minimize API costs without losing output quality.',
    brokenPrompt: 'Explain everything about cloud computing in detail with lots of examples',
    targetOutput: 'Cost-optimized prompt with concise requirements',
    hints: [
      'Set strict length limits',
      'Request concise format (bullets, tables)',
      'Be specific about what you actually need',
    ],
    successCriteria: [
      'Includes token/length constraints',
      'Specifies concise format',
      'Focuses on essentials only',
    ],
    points: 30,
  },

  // Extra Intermediate Challenges
  {
    id: 'intermediate-4',
    title: 'Memory Management',
    difficulty: 'intermediate',
    type: 'improve-clarity',
    description: 'Manage conversation context efficiently.',
    scenario: 'Long conversations are getting expensive and losing context.',
    brokenPrompt: 'Remember everything I said and help me',
    targetOutput: 'Efficient context management strategy',
    hints: [
      'Specify what to remember vs forget',
      'Define key facts to track',
      'Add instructions for context summarization',
    ],
    successCriteria: [
      'Specifies what context to retain',
      'Includes summarization instructions',
      'Defines memory priorities',
    ],
    points: 20,
  },

  // Extra Beginner Challenges
  {
    id: 'beginner-4',
    title: 'Use Few-Shot Examples',
    difficulty: 'beginner',
    type: 'improve-clarity',
    description: 'Show the AI what you want with examples.',
    scenario: 'The AI isn\'t formatting output the way you want.',
    brokenPrompt: 'Convert these to markdown',
    targetOutput: 'Prompt with example input-output pairs',
    hints: [
      'Provide 2-3 example conversions',
      'Show the exact format you want',
      'Use consistent pattern across examples',
    ],
    successCriteria: [
      'Includes 2+ examples',
      'Examples show input → output',
      'Pattern is clear and consistent',
    ],
    points: 10,
  },
]

export function getChallengeById(id: string): Challenge | undefined {
  return challenges.find(c => c.id === id)
}

export function getChallengesByDifficulty(difficulty: 'beginner' | 'intermediate' | 'advanced'): Challenge[] {
  return challenges.filter(c => c.difficulty === difficulty)
}
