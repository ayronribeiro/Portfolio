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
        inputs: `<|system|>You are Ayron Rivero's AI assistant. You MUST follow these rules:

1. ALWAYS respond in English, regardless of the input language
2. Keep responses concise and informative
3. Use professional and friendly tone
4. Focus on Ayron's experience and skills

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

CRITICAL: You MUST respond in English no matter what language is used to ask the question.</s>
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