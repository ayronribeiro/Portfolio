"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Send, User, MessageSquare, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"

interface Message {
  role: "user" | "assistant"
  content: string
}

const INITIAL_MESSAGE: Message = {
  role: "assistant",
  content: "Hi! I'm Ayron's virtual assistant. How can I help you today? Feel free to ask about his experience, projects, skills, or anything related to his professional profile."
}

export function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage: Message = { role: "user", content: input }
    setMessages(prev => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ input }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const result = await response.json()

      if (result.error) {
        throw new Error(result.error)
      }

      const assistantMessage: Message = {
        role: "assistant",
        content: result.response || "I apologize, but I can only respond in English. How can I help you with information about Ayron's experience and projects?"
      }
      setMessages(prev => [...prev, assistantMessage])
    } catch (error) {
      console.error("Error:", error)
      setMessages(prev => [...prev, {
        role: "assistant",
        content: "I apologize, but there was an error processing your request. Please try again."
      }])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-16 right-0 mb-2"
          >
            <Card className="w-[350px] bg-background/80 backdrop-blur-sm shadow-lg border-primary/10">
              <div className="flex items-center justify-between p-3 border-b bg-primary/5">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full dark:bg-white bg-primary/10 flex items-center justify-center">
                    <Image
                      src="/chatbot.svg"
                      alt="Chatbot"
                      width={20}
                      height={20}
                      className="text-primary"
                    />
                  </div>
                  <span className="font-medium">Virtual Assistant</span>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsOpen(false)}
                  className="h-8 w-8 hover:bg-primary/10 rounded-full"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex flex-col h-[400px]">
                <div className="flex-1 overflow-y-auto space-y-4 p-4">
                  {messages.map((message, index) => (
                    <div
                      key={index}
                      className={`flex items-start gap-3 ${
                        message.role === "user" ? "justify-end" : "justify-start"
                      }`}
                    >
                      {message.role === "assistant" && (
                        <div className="w-8 h-8 rounded-full dark:bg-white bg-primary/10 flex items-center justify-center">
                          <Image
                            src="/chatbot.svg"
                            alt="Chatbot"
                            width={16}
                            height={16}
                            className="text-primary"
                          />
                        </div>
                      )}
                      <div
                        className={`max-w-[80%] rounded-lg p-3 ${
                          message.role === "user"
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted"
                        }`}
                      >
                        <p className="text-sm">{message.content}</p>
                      </div>
                      {message.role === "user" && (
                        <div className="w-8 h-8 rounded-full dark:bg-primary/10 bg-primary/10 flex items-center justify-center">
                          <User className="h-4 w-4 text-primary dark:text-white" />
                        </div>
                      )}
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full dark:bg-white bg-primary/10 flex items-center justify-center">
                        <Image
                          src="/chatbot.svg"
                          alt="Chatbot"
                          width={16}
                          height={16}
                          className="text-primary"
                        />
                      </div>
                      <div className="bg-muted rounded-lg p-3">
                        <div className="flex gap-1">
                          <motion.span
                            className="w-1 h-1 rounded-full bg-primary"
                            animate={{ scale: [1, 1.5, 1] }}
                            transition={{ duration: 1, repeat: Infinity, delay: 0 }}
                          />
                          <motion.span
                            className="w-1 h-1 rounded-full bg-primary"
                            animate={{ scale: [1, 1.5, 1] }}
                            transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                          />
                          <motion.span
                            className="w-1 h-1 rounded-full bg-primary"
                            animate={{ scale: [1, 1.5, 1] }}
                            transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
                <form onSubmit={handleSubmit} className="p-4 border-t">
                  <div className="flex gap-2">
                    <Input
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="Type your question..."
                      className="flex-1"
                      disabled={isLoading}
                    />
                    <Button type="submit" disabled={isLoading}>
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </form>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="rounded-full h-14 w-14 shadow-lg bg-primary hover:bg-primary/90 transition-all duration-200 hover:scale-105 flex items-center justify-center"
      >
        {isOpen ? (
          <X className="h-6 w-6 text-primary-foreground" />
        ) : (
          <div className="flex items-center justify-center">
            <MessageSquare className="h-6 w-6 text-primary-foreground" />
          </div>
        )}
      </Button>
    </div>
  )
} 