# 🚀 Quick Start Guide - PromptForge

## Prerequisites
- Node.js 18+ installed
- OpenAI API key (get one at https://platform.openai.com)

## Setup (5 minutes)

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure API Key
Open `.env.local` and replace with your actual key:
```env
OPENAI_API_KEY=sk-your-actual-key-here
```

### 3. Start Development Server
```bash
npm run dev
```

### 4. Open Browser
Navigate to: **http://localhost:3000**

---

## 🎮 Using the Playground

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

---

## 🧪 Example Prompts to Try

### Basic Test
```
Explain quantum computing in simple terms.
```

### With Constraints
```
Write a haiku about AI.
Must be exactly 3 lines with 5-7-5 syllables.
```

### Structured Output
```
List 5 benefits of prompt engineering.
Format: JSON array with title and description fields.
```

### Creative Writing
```
Write a short story about a time-traveling robot.
Make it funny and under 200 words.
```

---

## 🔧 Troubleshooting

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

### TypeScript errors
```bash
# Rebuild types
npm run build
```

### Port 3000 already in use
```bash
# Use different port
PORT=3001 npm run dev
```

---

## 📚 Next Steps

1. **Explore the API**
   - Check `/api/generate` endpoint
   - Test with Postman or curl

2. **Read PROJECT.md**
   - Detailed architecture
   - Complete feature list
   - Future roadmap

3. **Customize**
   - Modify colors in `tailwind.config.ts`
   - Add new prompt templates in `lib/ai/prompts.ts`
   - Create custom animations

4. **Build Features**
   - Implement Prompt Builder
   - Add Prompt Coach UI
   - Create Challenge Mode

---

## 🎯 Key Files to Know

| File | Purpose |
|------|---------|
| `app/page.tsx` | Home page |
| `app/playground/page.tsx` | Playground UI |
| `app/api/generate/route.ts` | AI generation API |
| `app/lib/ai/client.ts` | OpenAI integration |
| `tailwind.config.ts` | Design system |
| `.env.local` | Your secrets |

---

## 💡 Tips

1. **Temperature**:
   - 0.3 = Factual, precise
   - 0.7 = Balanced (default)
   - 1.2 = Creative, varied

2. **Better Prompts**:
   - Be specific
   - Include examples
   - Define constraints
   - Specify output format

3. **Token Management**:
   - Shorter prompts = lower cost
   - Max tokens controls response length
   - Monitor usage in output panel

---

## 🆘 Need Help?

- Check README.md for full documentation
- Review PROJECT.md for architecture details
- Examine code comments for implementation details

---

**Ready to forge some prompts? Let's go! 🔥**
