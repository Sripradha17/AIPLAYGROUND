# PromptForge 🔥

**Interactive AI Training Platform** - Master prompt engineering through hands-on challenges, real-time feedback, and beautiful visualizations.

![Tech Stack](https://img.shields.io/badge/Next.js-14-black?style=flat&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38B2AC?style=flat&logo=tailwind-css)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-11-ff69b4?style=flat)

## ✨ Features

### 🎮 Live Playground
- Real-time AI prompt testing
- Configurable temperature & token limits
- System instruction support
- Token usage tracking
- Beautiful, animated UI

### 🎯 Prompt Coach
- Real-time prompt quality scoring
- Improvement suggestions
- Before/after comparisons
- Clarity, specificity, and structure metrics

### 🏆 Challenge Mode
- 15 gamified challenges across 3 difficulty levels
- Automatic validation and feedback
- Progressive difficulty (Beginner → Intermediate → Advanced)
- Points and progress tracking
- Hints system for guided learning
- New challenges: Security, Memory, Cost Optimization, Few-Shot

### 📚 Learn Diagrams
- 14 interactive animated diagrams
- **Core Concepts**: Prompt Flow, System Instructions, LLM Parameters, Few-Shot Learning
- **Advanced Techniques**: Chain of Thought, RAG Pipeline, Agent Tool Loop
- **Production Topics**: Embeddings/Vectors, Token Probabilities, Context Windows
- **Security & Optimization**: Prompt Security, Conversation Memory, Cost Optimization
- **Integrations**: MCP Architecture

### 📝 Prompt Templates
- 10+ ready-to-use templates
- Categories: Coding, Writing, Analysis, Creative, Business
- Variable customization
- Live preview with example outputs
- Copy-to-clipboard functionality
- Templates include: Code Explainer, Bug Finder, Sentiment Analyzer, Email Writer, and more

### 💰 Cost Calculator
- Real-time cost estimation across 5+ AI models
- Token-to-cost conversion
- Daily/monthly/yearly projections
- Model comparison table
- Optimization tips and best practices
- Helps you choose the right model for your budget

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- OpenAI API key

### Installation

1. **Clone or navigate to the project**
   ```bash
   cd AIPlayground
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   ```bash
   # Copy the example file
   cp .env.example .env.local
   
   # Edit .env.local and add your OpenAI API key
   OPENAI_API_KEY=sk-your-key-here
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   ```
   http://localhost:3000
   ```

## 🏗️ Project Structure

```
AIPlayground/
├── app/
│   ├── api/              # Backend API routes
│   │   ├── generate/     # AI generation endpoint
│   │   ├── evaluate/     # Prompt evaluation endpoint
│   │   └── challenges/   # Challenge validation endpoint
│   ├── components/       # React components
│   │   ├── playground/   # Playground-specific components
│   │   ├── diagrams/     # 14 animated AI concept diagrams
│   │   ├── ui/           # 7 reusable UI components
│   │   ├── animations/   # Animation presets & variants
│   │   └── CostCalculator.tsx  # Cost estimation component
│   ├── lib/              # Utilities & services
│   │   ├── ai/           # AI service layer
│   │   ├── challenges/   # Challenge data and validation
│   │   ├── challenges/   # Challenge data & validation
│   │   └── utils/        # Validation & helpers
│   ├── types/            # TypeScript definitions
│   ├── playground/       # Playground page
│   ├── coach/            # Prompt Coach page
│   ├── challenges/       # Challenge Mode page
│   └── learn/            # Learn Diagrams page
├── public/               # Static assets
└── PROJECT.md            # Detailed project documentation
```

## 🔧 Configuration

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `OPENAI_API_KEY` | Your OpenAI API key | *required* |
| `AI_MODEL` | Model to use | `gpt-4-turbo-preview` |
| `AI_MAX_TOKENS` | Default max tokens | `2000` |
| `AI_TEMPERATURE` | Default temperature | `0.7` |

### Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm start        # Start production server
npm run lint     # Run ESLint
```

## 🎨 Tech Stack

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **UI Components**: Custom-built with accessibility in mind

### Backend
- **Runtime**: Next.js API Routes
- **Validation**: Zod
- **AI Integration**: OpenAI SDK
- **Error Handling**: Comprehensive with retry logic

## 📡 API Endpoints

### POST `/api/generate`
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

### POST `/api/evaluate`
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

## 🎯 Roadmap

- [x] Live Playground with real-time generation
- [x] Token usage tracking
- [x] Temperature & token configuration
- [x] System instructions support
- [ ] Prompt Builder (drag-and-drop)
- [ ] Prompt Coach integration
- [ ] Animated concept diagrams
- [ ] Challenge Mode
- [ ] User authentication
- [ ] Prompt history & favorites
- [ ] RAG integration
- [ ] MCP server support

## 🤝 Contributing

This is a personal project, but suggestions are welcome!

## 📄 License

MIT License - feel free to use this for learning and building your own projects!

## 🙏 Acknowledgments

- OpenAI for the API
- Next.js team for the amazing framework
- Framer Motion for smooth animations
- Tailwind CSS for rapid styling

---

Built with ❤️ using Next.js, TypeScript, and AI
