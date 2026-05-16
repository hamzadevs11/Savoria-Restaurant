'use client'
// src/components/ui/AIChatbot.tsx
import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Send, Bot } from 'lucide-react'

interface Message { role: 'user' | 'assistant'; content: string }

const QUICK_REPLIES = ['📋 Show menu', '📅 Book a table', '🚚 Track my order', '⭐ Today\'s specials']

export default function AIChatbot() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Hello! 👋 I\'m your Savoria AI assistant. I can help you discover menu items, make reservations, or track your order. What can I do for you?' }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [messages, loading])

  const sendMessage = async (text?: string) => {
    const msg = text || input.trim()
    if (!msg || loading) return
    setInput('')
    const newMessages: Message[] = [...messages, { role: 'user', content: msg }]
    setMessages(newMessages)
    setLoading(true)

    try {
      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 300,
          system: `You are Savoria, a premium restaurant AI assistant. Be helpful, concise, warm, and charming. 
Restaurant info: 12 Gourmet Lane NY, open 12pm–11pm daily, 3 Michelin stars. 
Menu highlights: Wagyu Beef ($68), Pan-Seared Halibut ($48), Wild Mushroom Risotto ($36), Chocolate Soufflé ($22).
You help with: menu recommendations, reservations, order tracking, dietary info, specials.
Keep replies under 2–3 sentences. Use emojis sparingly.`,
          messages: newMessages.map(m => ({ role: m.role, content: m.content }))
        })
      })
      const data = await res.json()
      const reply = data.content?.[0]?.text || "I'm having a moment — please try again or call us at +1 (555) 123-4567."
      setMessages(prev => [...prev, { role: 'assistant', content: reply }])
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', content: "Sorry, I'm having trouble connecting. Please call us at +1 (555) 123-4567 for assistance!" }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {/* FAB */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-br from-gold to-gold-light text-black flex items-center justify-center shadow-[0_4px_20px_rgba(201,168,76,0.4)] text-xl"
      >
        {open ? <X size={20} /> : <Bot size={22} />}
      </motion.button>

      {/* Chat window */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-6 z-50 w-80 h-[440px] bg-savoria-bg2 border border-gold/15 rounded-2xl flex flex-col overflow-hidden shadow-2xl"
          >
            {/* Header */}
            <div className="px-4 py-3 bg-gradient-to-r from-gold/10 to-transparent border-b border-gold/10 flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gold to-gold-light flex items-center justify-center text-black text-sm font-bold">S</div>
              <div>
                <div className="text-sm font-semibold">Savoria AI</div>
                <div className="text-[10px] text-green-400 flex items-center gap-1"><span className="w-1.5 h-1.5 bg-green-400 rounded-full" />Online</div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-3 space-y-2.5">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] px-3 py-2 rounded-2xl text-xs leading-relaxed ${
                    msg.role === 'user' ? 'bg-gold text-black font-medium rounded-br-sm' : 'bg-savoria-bg3 text-white/80 rounded-bl-sm'
                  }`}>
                    {msg.content}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-savoria-bg3 px-3 py-2 rounded-2xl rounded-bl-sm">
                    <div className="flex gap-1">
                      {[0, 1, 2].map(i => <span key={i} className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />)}
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick replies */}
            {messages.length <= 1 && (
              <div className="px-3 pb-1 flex gap-1 flex-wrap">
                {QUICK_REPLIES.map(qr => (
                  <button key={qr} onClick={() => sendMessage(qr)} className="text-[10px] px-2 py-1 border border-gold/20 text-white/50 rounded-full hover:border-gold/50 hover:text-gold transition-all">{qr}</button>
                ))}
              </div>
            )}

            {/* Input */}
            <div className="p-3 border-t border-gold/10 flex gap-2">
              <input
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && sendMessage()}
                placeholder="Ask me anything..."
                className="flex-1 px-3 py-2 bg-savoria-bg3 border border-gold/15 rounded-xl text-xs focus:outline-none focus:border-gold/35 text-white placeholder:text-white/30"
              />
              <button onClick={() => sendMessage()} disabled={!input.trim() || loading}
                className="w-8 h-8 bg-gold text-black rounded-xl flex items-center justify-center hover:bg-gold-light transition-all disabled:opacity-40">
                <Send size={13} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
