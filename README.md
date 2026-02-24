# PromptForge 🔥

**Interactive AI Training Platform** - Master prompt engineering through hands-on challenges, real-time feedback, and beautiful visualizations.

![Tech Stack](https://img.shields.io/badge/Next.js-14-black?style=flat&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38B2AC?style=flat&logo=tailwind-css)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-11-ff69b4?style=flat)

---

## 📋 Table of Contents
- [Features](#-features)
- [Quick Start](#-quick-start)
- [Usage Guide](#-usage-guide)
- [Project Structure](#-project-structure)
- [AI Concepts Coverage](#-ai-concepts-coverage)
- [Development](#-development)
- [Build Summary](#-build-summary)
- [Troubleshooting](#-troubleshooting)

---

## ✨ Features

### 🎮 Live Playground
- Real-time AI prompt testing with streaming responses
- Configurable temperature (0-2) & token limits (100-4000)
- System instruction support for behavior control
- Token usage tracking (input/output/total)
- Beautiful, animated UI with Framer Motion
- Quick presets (Balanced, Creative, Precise)

### 🎯 Prompt Coach
- Real-time prompt quality scoring as you type
- Improvement suggestions with actionable feedback
- Side-by-side editing (original vs improved)
- Multi-factor analysis:
  - **Clarity** (0-100): How clear is your prompt?
  - **Specificity** (0-100): Are you specific enough?
  - **Structure** (0-100): Is it well-organized?
  - **Examples**: Do you provide examples?
  - **Constraints**: Do you set boundaries?
- Auto-evaluation with debouncing

### 🏆 Challenge Mode
- **15 gamified challenges** across 3 difficulty levels
- Automatic validation and detailed feedback
- Progressive difficulty (Beginner → Intermediate → Advanced)
- Points system (10/20/30 pts per difficulty)
- Hints system for guided learning
- Progress tracking and completion indicators

#### Challenge Topics
**Beginner (4 challenges)**
- Fix vague prompts
- Add constraints
- Request examples
- Use few-shot examples

**Intermediate (4 challenges)**
- Enforce JSON output
- Reduce hallucination
- Extract structured data
- Memory management

**Advanced (5 challenges)**
- Chain of thought reasoning
- Multi-step tasks
- Role with constraints
- Prevent prompt injection
- Optimize for cost

### 📚 Learn Diagrams
- **14 interactive animated diagrams** with smooth transitions
- All concepts visualized with real examples
- Interactive selection and hover states

#### Diagram Categories
**Core Concepts (4)**
- Prompt Flow: Basic AI interaction lifecycle
- System Instructions: Role-based prompting
- LLM Parameters: Temperature, tokens, Top P explained
- Few-Shot Learning: Teaching by examples

**Advanced Techniques (3)**
- Chain of Thought: Step-by-step reasoning
- RAG Pipeline: Retrieval-Augmented Generation
- Agent Tool Loop: Autonomous AI systems

**Production Topics (4)**
- Embeddings & Vectors: Text → numbers conversion
- Token Probabilities: Model confidence visualization
- Context Windows: Managing token limits
- Conversation Memory: Multi-turn context

**Security & Optimization (2)**
- Prompt Security: Injection attack prevention
- Cost Optimization: Budget management strategies

**Integrations (1)**
- MCP Architecture: Model Context Protocol

### 📝 Prompt Templates
- **10+ professional templates** ready to use
- **5 categories**: Coding, Writing, Analysis, Creative, Business
- Variable customization with live preview
- Example inputs and outputs included
- Copy-to-clipboard functionality
- Difficulty badges for each template

#### Featured Templates
- **Code Explainer**: Break down complex code
- **Bug Finder & Fixer**: Identify and fix bugs
- **API Endpoint Designer**: Design RESTful APIs
- **Code Review Assistant**: Constructive feedback
- **Professional Email Writer**: Business emails
- **Meeting Notes Summarizer**: Structure messy notes
- **Sentiment Analyzer**: JSON output with sentiment
- **Data Extractor**: Extract structured data
- **Story Generator**: Creative writing
- **Socratic Tutor**: Guided learning

### 💰 Cost Calculator
- **5 AI models** comparison (GPT-4, GPT-4 Turbo, GPT-3.5, Claude Opus, Claude Sonnet)
- **Interactive sliders** for usage estimation
  - Input tokens: 10-20,000
  - Output tokens: 10-10,000
  - Requests per day: 1-10,000
- **Real-time cost calculations**
  - Per-request cost
  - Daily, monthly, yearly projections
  - Input vs output cost breakdown
- **Comparison table** with savings percentages
- **6 optimization tips** for reducing costs
- Token conversions (tokens ↔ words ↔ pages)

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- OpenAI API key ([Get one here](https://platform.openai.com))

### Installation (5 minutes)

1. **Navigate to the project**
   ```bash
   cd AIPlayground/AIPLAYGROUND
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   ```bash
   # Copy the example file
   cp .env.example .env.local
   ```
   
   Open `.env.local` and add your API key:
   ```env
   OPENAI_API_KEY=sk-your-actual-key-here
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   ```
   http://localhost:3000
   ```

### First Steps
1. Click "Launch Playground" on the home page
2. Try this prompt: `Explain quantum computing in simple terms`
3. Navigate to `/coach` to get prompt feedback
4. Try `/challenges` to practice with gamified tasks
5. Explore `/learn` for interactive AI concept diagrams

---

## 🎮 Usage Guide

### Using the Playground

1. **Navigate to Playground**
   - Click "Launch Playground" on home page
   - Or go directly to `/playground`

2. **Enter Your Prompt**
   - Type in the main text area
   - Be specific and clear!

3. **Optional: Add System Instructions**
   - Define how the AI should behave
   - Example: "You are a helpful teacher"

4. **Adjust Settings** (Right Panel)
   - **Temperature**: 0-2 (0 = precise, 2 = creative)
   - **Max Tokens**: 100-4000 (response length)
   - Or use Quick Presets

5. **Generate**
   - Click the "Generate ⚡" button
   - Watch the animated loading
   - View output and token usage

6. **Copy & Iterate**
   - Click "Copy" to copy the output
   - Adjust your prompt
   - Try again!

### Example Prompts to Try

**Basic Test**
```
Explain quantum computing in simple terms.
```

**With Constraints**
```
Write a haiku about AI.
Must be exactly 3 lines with 5-7-5 syllables.
```

**Structured Output**
```
List 5 benefits of prompt engineering.
Format: JSON array with title and description fields.
```

**Creative Writing**
```
Write a short story about a time-traveling robot.
Make it funny and under 200 words.
```

### Prompt Coach Usage
1. Navigate to `/coach`
2. Enter original prompt on left
3. Edit and improve on right
4. See real-time scores and suggestions
5. Iterate until you get 80+ score

### Challenge Mode Usage
1. Navigate to `/challenges`
2. Filter by difficulty (beginner/intermediate/advanced)
3. Select a challenge
4. Read the scenario and broken prompt
5. Fix/improve the prompt
6. Submit for validation
7. Get instant feedback and points

---

## 🏗️ Project Structure

```
AIPlayground/
├── app/                          # Next.js App Router (unified client & server)
│   ├── (routes)/                 # Page routes
│   │   ├── playground/           # Live Playground page
│   │   ├── coach/                # Prompt Coach page
│   │   ├── challenges/           # Challenge Mode page
│   │   ├── learn/                # Animated Diagrams page (14 diagrams)
│   │   ├── templates/            # Prompt Templates Library
│   │   ├── calculator/           # Cost Calculator page
│   │   └── tools/                # AI Tools page
│   │
│   ├── api/                      # Backend API routes (server-side)
│   │   ├── generate/route.ts     # Main AI generation endpoint
│   │   ├── evaluate/route.ts     # Prompt evaluation endpoint
│   │   └── challenges/route.ts   # Challenge validation
│   │
│   ├── components/               # React components (client-side)
│   │   ├── playground/           # Playground-specific components
│   │   │   ├── PromptInput.tsx
│   │   │   ├── OutputDisplay.tsx
│   │   │   └── ControlPanel.tsx
│   │   ├── diagrams/             # 14 animated diagram components
│   │   │   ├── PromptFlowDiagram.tsx
│   │   │   ├── SystemPromptDiagram.tsx
│   │   │   ├── LLMParametersDiagram.tsx
│   │   │   ├── FewShotDiagram.tsx
│   │   │   ├── ChainOfThoughtDiagram.tsx
│   │   │   ├── RAGDiagram.tsx
│   │   │   ├── AgentLoopDiagram.tsx
│   │   │   ├── MCPDiagram.tsx
│   │   │   ├── EmbeddingsDiagram.tsx
│   │   │   ├── TokenProbabilitiesDiagram.tsx
│   │   │   ├── ContextWindowDiagram.tsx
│   │   │   ├── PromptSecurityDiagram.tsx
│   │   │   ├── ConversationMemoryDiagram.tsx
│   │   │   └── CostOptimizationDiagram.tsx
│   │   ├── ui/                   # 7 reusable UI components
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Slider.tsx
│   │   │   ├── Badge.tsx
│   │   │   ├── ProgressBar.tsx
│   │   │   ├── TextArea.tsx
│   │   │   └── Tooltip.tsx
│   │   ├── animations/           # Framer Motion animation presets
│   │   │   ├── variants.ts       # 20+ animation variants
│   │   │   └── transitions.ts    # Transition presets
│   │   ├── CostCalculator.tsx    # Cost estimation component
│   │   ├── TokenCounter.tsx
│   │   ├── PersonaSelector.tsx
│   │   └── ...other components
│   │
│   ├── lib/                      # Shared utilities & services
│   │   ├── ai/                   # AI service layer
│   │   │   ├── client.ts         # AI client wrapper
│   │   │   ├── prompts.ts        # Prompt builders
│   │   │   └── validators.ts     # Response validators
│   │   ├── challenges/           # Challenge system
│   │   │   ├── data.ts           # 15 challenge definitions
│   │   │   └── validator.ts      # Challenge validation logic
│   │   ├── personas/             # AI personality presets
│   │   │   └── data.ts
│   │   ├── storage/              # Local storage utilities
│   │   │   └── library.ts
│   │   └── utils/                # General utilities
│   │       └── validation.ts
│   │
│   ├── types/                    # TypeScript type definitions
│   │   ├── ai.ts
│   │   ├── challenges.ts
│   │   └── prompts.ts
│   │
│   ├── globals.css               # Global styles & responsive CSS
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Home page
│
├── public/                       # Static assets
│
├── .env.local                    # Environment variables (gitignored)
├── .env.example                  # Example env file
├── package.json                  # Dependencies
├── tsconfig.json                 # TypeScript configuration
├── tailwind.config.ts            # Tailwind CSS configuration
├── next.config.js                # Next.js configuration
└── README.md                     # This file!
```

---

## 📚 AI Concepts Coverage

### ✅ Fully Covered Concepts

#### 1. LLM Basics ✅
- **Prompt Flow** - Shows how prompts are sent to LLM → processed → output returned
- **System Instructions** - How to use system/user/assistant roles
- **LLM Parameters** - Detailed coverage of:
  - Temperature (0-2): randomness control
  - Max Tokens: output length limits
  - Top P: nucleus sampling for diversity

#### 2. MCP (Model Context Protocol) ✅
- Complete architecture diagram showing:
  - Host applications (Claude, VS Code, custom apps)
  - MCP Server (middleware layer)
  - Tool integration (file system, databases, APIs)
  - Bidirectional communication flow
- Explains standardized AI-tool connections

#### 3. Prompt Engineering Skills ✅
- **Few-Shot Learning** - Teaching by examples
  - Zero-shot vs Few-shot comparison
  - Best practices for examples
  - Format consistency
- **System Prompts** - Structuring instructions
  - Role definitions
  - Behavior constraints
  - Conversation context

#### 4. Advanced AI Patterns ✅
- **Chain of Thought** - Step-by-step reasoning
  - Breaking down complex problems
  - Showing intermediate steps
  - Verification processes
  
- **RAG (Retrieval-Augmented Generation)** - Context enhancement
  - Vector database search
  - Document retrieval
  - Context injection
  - LLM generation with context

- **Agent Loops** - Autonomous tool usage
  - Agent decision-making
  - Tool selection
  - Multi-step workflows
  - Reasoning cycles

#### 5. Production Concepts ✅
- **Embeddings & Vectors** - Text to numbers
  - 1536-dimension vectors
  - Cosine similarity
  - Semantic search
  
- **Token Probabilities** - Model confidence
  - Next token prediction
  - Logprobs visualization
  - Temperature effect on distribution

- **Context Windows** - Token management
  - Model limits (4K to 200K)
  - Truncation strategies
  - Sliding windows
  - Summarization

- **Conversation Memory** - Multi-turn context
  - Message array structure
  - Memory strategies
  - Token cost management
  - Entity extraction

#### 6. Security & Optimization ✅
- **Prompt Security** - Injection prevention
  - Attack patterns
  - Defense strategies
  - Delimiters and validation
  - Security best practices

- **Cost Optimization** - Budget management
  - Token counting
  - Model selection
  - Caching strategies
  - Prompt compression

### 📊 Coverage Summary

| Concept | Covered | Where | Interactive |
|---------|---------|-------|-------------|
| **LLM Basics** | ✅ | Prompt Flow Diagram | Yes |
| **System Instructions** | ✅ | System Prompt Diagram | Yes |
| **Temperature/Tokens** | ✅ | LLM Parameters Diagram | Yes |
| **Few-Shot Learning** | ✅ | Few-Shot Diagram | Yes |
| **Chain of Thought** | ✅ | CoT Diagram + Challenges | Yes |
| **RAG** | ✅ | RAG Diagram | Yes |
| **Agents** | ✅ | Agent Loop Diagram | Yes |
| **MCP** | ✅ | MCP Architecture Diagram | Yes |
| **Embeddings** | ✅ | Embeddings Diagram | Yes |
| **Token Probabilities** | ✅ | Token Prob Diagram | Yes |
| **Context Windows** | ✅ | Context Window Diagram | Yes |
| **Memory** | ✅ | Conversation Memory Diagram | Yes |
| **Security** | ✅ | Security Diagram + Challenges | Yes |
| **Cost** | ✅ | Cost Diagram + Calculator | Yes |

### 🎓 Learning Path

**Beginner Level**
1. **Start**: Prompt Flow Diagram - Understand the basics
2. **Learn**: System Prompt Diagram - How to structure instructions
3. **Practice**: LLM Parameters - Control AI behavior
4. **Apply**: Beginner Challenges (4 challenges)

**Intermediate Level**
1. **Explore**: Few-Shot Learning - Teach by examples
2. **Study**: Chain of Thought - Step-by-step reasoning
3. **Experiment**: Prompt Coach - Get real-time feedback
4. **Master**: Intermediate Challenges (4 challenges)

**Advanced Level**
1. **Understand**: RAG Pipeline - Context enhancement
2. **Learn**: Agent Loops - Autonomous AI systems
3. **Discover**: MCP Architecture - Standardized integrations
4. **Secure**: Prompt Security - Injection prevention
5. **Optimize**: Cost Optimization - Budget management
6. **Excel**: Advanced Challenges (5 challenges)

---

## 🔧 Development

### Tech Stack

#### Core Framework
- `next` (^14.0.0) - App Router with server components
- `react` & `react-dom` (^18.0.0)
- `typescript` (^5.0.0)

#### Styling & Animation
- `tailwindcss` (^3.4.0) - Utility-first CSS
- `framer-motion` (^11.0.0) - Smooth animations & transitions
- `autoprefixer` & `postcss` - CSS processing

#### Backend & Validation
- `zod` (^3.22.0) - Runtime type validation
- `openai` (^4.28.0) - AI API integration (supports streaming)

#### Development Tools
- `@types/node`, `@types/react`, `@types/react-dom`
- `eslint`, `eslint-config-next`

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `OPENAI_API_KEY` | Your OpenAI API key | *required* |

### Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm start        # Start production server
npm run lint     # Run ESLint
```

### API Endpoints

#### POST `/api/generate`
Generate AI responses with customizable parameters.

**Request Body:**
```json
{
  "prompt": "Explain quantum computing",
  "systemInstructions": "You are a helpful teacher",
  "temperature": 0.7,
  "maxTokens": 2000,
  "stream": false
}
```

**Response:**
```json
{
  "success": true,
  "output": "...",
  "tokensUsed": {
    "prompt": 10,
    "completion": 150,
    "total": 160
  },
  "model": "gpt-4-turbo-preview",
  "finishReason": "stop",
  "timestamp": "2026-02-06T..."
}
```

#### POST `/api/evaluate`
Evaluate prompt quality and get improvement suggestions.

**Request Body:**
```json
{
  "prompt": "Your prompt here"
}
```

**Response:**
```json
{
  "clarity": 85,
  "specificity": 70,
  "structure": 80,
  "hasExamples": true,
  "hasConstraints": false,
  "overallScore": 78,
  "suggestions": ["Add constraints for the output"]
}
```

#### POST `/api/challenges`
Validate challenge submissions.

**Request Body:**
```json
{
  "challengeId": "prompt-constraints",
  "userPrompt": "Write a haiku about AI. Must be exactly 3 lines."
}
```

---

## 📖 Build Summary

### Phase Progress

#### ✅ Phase 1: Foundation (COMPLETED)
- [x] Project structure created
- [x] Next.js project initialized
- [x] Dependencies installed (Framer Motion, Zod, OpenAI SDK)
- [x] Environment variables configured
- [x] TypeScript types defined

#### ✅ Phase 2: Backend Infrastructure (COMPLETED)
- [x] AI service layer (`lib/ai/client.ts`, `prompts.ts`, `validators.ts`)
- [x] Main API route (`/api/generate`) with streaming support
- [x] Evaluation API (`/api/evaluate`) for prompt scoring
- [x] Challenge validation API (`/api/challenges`)
- [x] Error handling & retry logic
- [x] Zod schema validation

#### ✅ Phase 3: Frontend Components (COMPLETED)
- [x] Home page with animated hero and feature cards
- [x] Live Playground page with full functionality
- [x] PromptInput component with system instructions
- [x] OutputDisplay component with token tracking
- [x] ControlPanel component with presets
- [x] Smooth Framer Motion animations
- [x] Reusable UI component library (Button, Card, Slider, Badge, etc.)
- [x] Animation presets and variants

#### ✅ Phase 4: Advanced Features (COMPLETED)
- [x] Prompt Coach (real-time scoring integration)
- [x] Challenge Mode (15 gamified challenges)
  - [x] Beginner: 4 challenges
  - [x] Intermediate: 4 challenges
  - [x] Advanced: 5 challenges
  - [x] Auto-validation system
  - [x] Points and progress tracking
  - [x] Hints and feedback system
- [x] Animated Diagrams (14 AI concept visualizations)
  - [x] Core Concepts (4): Prompt Flow, System Instructions, LLM Parameters, Few-Shot
  - [x] Advanced (3): Chain of Thought, RAG, Agent Loop
  - [x] Production (4): Embeddings, Token Probabilities, Context Windows, Memory
  - [x] Security & Optimization (2): Security, Cost Optimization
  - [x] Integrations (1): MCP Architecture

#### ✅ Phase 5: Production Features (COMPLETED)
- [x] Prompt Templates Library
  - [x] 10+ ready-to-use templates
  - [x] Categories: Coding, Writing, Analysis, Creative, Business
  - [x] Variable customization
  - [x] Live preview with examples
  - [x] Copy-to-clipboard functionality
- [x] Cost Calculator
  - [x] 5 AI model comparison (GPT-4, GPT-4 Turbo, GPT-3.5, Claude Opus, Sonnet)
  - [x] Token-to-cost conversion
  - [x] Daily/monthly/yearly projections
  - [x] Optimization tips
  - [x] Interactive sliders
- [x] Navigation updates across all pages
- [x] Documentation consolidation

### Statistics

**Components Created**: 30+ files
- 14 animated diagrams
- 7 UI components
- 10+ prompt templates
- 15 challenges
- 3 API routes
- 7 page routes

**Lines of Code**: ~8,000+
**Features**: 6 major sections
**Diagrams**: 14 interactive visualizations
**Challenges**: 15 gamified learning tasks

---

## 🔍 Troubleshooting

### Server won't start
```bash
# Clear Next.js cache
rm -rf .next
npm run dev
```

### API key error
- Check `.env.local` exists in root directory
- Verify key starts with `sk-`
- Restart dev server after changing env vars

### Build errors
```bash
# Clean install
rm -rf node_modules package-lock.json
npm install
```

### TypeScript errors
```bash
# Regenerate types
npm run build
```

---

## 🎯 Future Enhancements (Optional)

### Not Yet Implemented
- [ ] Fine-Tuning visualization - Custom model training
- [ ] Advanced streaming - Token-by-token display
- [ ] User authentication - Save progress
- [ ] Prompt history - Track past generations
- [ ] Leaderboards - Challenge ranking system
- [ ] RAG integration - Live document search
- [ ] MCP server - Tool connections
- [ ] Rate limiting - API protection
- [ ] Prompt Builder - Drag-and-drop interface
- [ ] Batch testing - Multiple prompt variants

---

## 🤝 Contributing

This is a personal learning project, but suggestions and feedback are welcome!

## 📄 License

MIT License - free to use for learning and building your own projects.

## 🙏 Acknowledgments

- OpenAI for the API and GPT models
- Next.js team for the amazing framework
- Framer Motion for smooth animations
- Tailwind CSS for rapid styling
- The AI community for inspiration

---

**Built with ❤️ using Next.js 14, TypeScript, Tailwind CSS, and Framer Motion**

*Last Updated: February 24, 2026*
