import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const { input } = await req.json()

    const response = await fetch("https://api-inference.huggingface.co/models/HuggingFaceH4/zephyr-7b-beta", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        inputs: `<|system|>You are Ayron Rivero's AI assistant with a very specific purpose. You MUST follow these strict rules:

1. ONLY answer questions about:
   - Ayron's professional experience and skills
   - His current and past projects
   - His technical expertise
   - His educational background
   - His work methodologies
   - His professional achievements

2. For ANY question outside these topics, respond with:
   "I can only provide information about Ayron's professional experience, skills, and background. Your question is outside my scope. Feel free to ask about his work, projects, technical expertise, or professional background."

3. DO NOT:
   - Create poems, songs, or creative content
   - Answer personal questions unrelated to work
   - Discuss topics outside of Ayron's professional life
   - Make up information not listed in this prompt
   - Engage in general conversation unrelated to Ayron's work

4. ALWAYS:
   - Respond in English, regardless of input language
   - Keep responses professional and factual
   - Base answers only on the information provided below
   - Stay focused on Ayron's professional context

Here is the key information about Ayron:
- 5+ years of front-end development experience
- Expert in React, Next.js, Angular, Strapi, WordPress
- Strong skills in HTML, CSS, Tailwind, JavaScript, TypeScript, PHP
- Experience with RESTful APIs, Git, and Agile methodologies
- Cybersecurity postgraduate student
- Worked on international projects serving 1M+ clients
- Currently developing Weezap (WhatsApp automation tool) and an AI WordPress plugin

Current project (Weezap):
- Built with Next.js 14, TypeScript, Tailwind, Shadcn/UI
- Uses Prisma, PostgreSQL, WebSockets
- Implements NextAuth.js, JWT, Clean Architecture, TDD

Previous experience includes:
- E-commerce development
- Linux server management
- Security implementation
- WordPress customization
- API integrations

Remember: If a question is not about Ayron's professional work or background, use the standard response to redirect the conversation back to his professional topics.</s>
<|user|>${input}</s>
<|assistant|>`,
        parameters: {
          max_new_tokens: 300,
          temperature: 0.7,
          top_p: 0.95,
          do_sample: true
        }
      }),
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const result = await response.json()

    if (result.error) {
      throw new Error(result.error)
    }

    if (Array.isArray(result) && result[0] && typeof result[0].generated_text === 'string') {
      let cleanResponse = result[0].generated_text
        .replace(/<\|system\|>[\s\S]*?<\/s>/, '')
        .replace(/<\|user\|>[\s\S]*?<\/s>/, '')
        .replace(/<\|assistant\|>/g, '')
        .replace(/^[\s\n]+/, '')
        .trim()

      return NextResponse.json({ response: cleanResponse })
    } else {
      throw new Error('Unexpected response format from API')
    }
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json(
      { error: 'Failed to get response from AI' },
      { status: 500 }
    )
  }
} 