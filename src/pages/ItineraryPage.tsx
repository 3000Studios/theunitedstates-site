import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Seo } from '@/components/seo/Seo'
import { AdSlot } from '@/components/ads/AdSlot'

type Message = {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

export function ItineraryPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Hello! I'm your AI Trip Architect. Where in the United States would you like to explore? I can help you build a custom itinerary for any state or city.",
      timestamp: new Date()
    }
  ])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  const handleSend = async () => {
    if (!input.trim()) return
    
    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date()
    }
    
    setMessages(prev => [...prev, userMsg])
    setInput('')
    setIsTyping(true)

    // Simulate AI response (In a real app, this calls the Worker API)
    setTimeout(() => {
      const assistantMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `That sounds like a fantastic trip! Planning an adventure in ${input} is my specialty. I'll need to know a bit more: how many days are you staying, and what's your budget style (budget, mid-range, or luxury)?`,
        timestamp: new Date()
      }
      setMessages(prev => [...prev, assistantMsg])
      setIsTyping(false)
    }, 1500)
  }

  return (
    <>
      <Seo
        title="AI Trip Architect | Custom USA Itineraries"
        description="Plan your perfect American adventure with our AI-powered travel assistant. Custom routes, hotel links, and local secrets."
        path="/itinerary"
      />

      <header className="mb-8">
        <div className="text-xs font-bold uppercase tracking-widest text-sky-200/80">Premium Utility</div>
        <h1 className="mt-2 font-[family-name:var(--font-display)] text-4xl font-extrabold text-white md:text-5xl">
          AI Trip Architect
        </h1>
        <p className="mt-3 max-w-3xl text-base text-slate-300/90">
          Tell us where you want to go, and our AI will build a bookable, family-friendly itinerary in seconds.
        </p>
      </header>

      <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
        <section className="flex flex-col rounded-[2.5rem] border border-white/10 bg-black/30 backdrop-blur-xl h-[600px] overflow-hidden">
          <div 
            ref={scrollRef}
            className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide"
          >
            <AnimatePresence>
              {messages.map((m) => (
                <motion.div
                  key={m.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`max-w-[80%] rounded-[1.5rem] px-5 py-3 text-sm leading-relaxed ${
                      m.role === 'user' 
                        ? 'bg-sky-600 text-white shadow-lg' 
                        : 'bg-white/5 border border-white/10 text-slate-200'
                    }`}
                  >
                    {m.content}
                  </div>
                </motion.div>
              ))}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="bg-white/5 border border-white/10 text-slate-400 rounded-full px-4 py-2 text-xs">
                    Architect is thinking...
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="p-6 border-t border-white/10 bg-white/[0.02]">
            <form 
              onSubmit={(e) => { e.preventDefault(); handleSend(); }}
              className="relative"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Where do you want to go?"
                className="w-full rounded-2xl border border-white/10 bg-black/20 px-5 py-4 pr-16 text-sm text-white outline-none focus:ring-2 focus:ring-sky-500/50"
              />
              <button
                type="submit"
                disabled={!input.trim()}
                className="absolute right-2 top-2 bottom-2 rounded-xl bg-sky-500 px-4 text-xs font-bold text-white transition hover:bg-sky-600 disabled:opacity-50"
              >
                Send
              </button>
            </form>
          </div>
        </section>

        <aside className="space-y-6">
          <div className="glass-panel rounded-3xl p-6">
            <h3 className="text-xs font-bold uppercase tracking-widest text-sky-200/80">Saved Itineraries</h3>
            <p className="mt-4 text-sm text-slate-400">Sign in to save your AI-generated plans and sync them to your phone.</p>
            <button className="mt-4 w-full rounded-2xl bg-white/5 border border-white/10 py-3 text-sm font-bold text-white hover:bg-white/10">
              Sign In
            </button>
          </div>

          <AdSlot slotKey="sidebar" className="hidden lg:block" />

          <div className="glass-panel rounded-3xl p-6">
            <h3 className="text-xs font-bold uppercase tracking-widest text-sky-200/80">Trip Stats</h3>
            <div className="mt-4 space-y-3">
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Plans generated today</span>
                <span className="text-white font-bold">1,240</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Total bookings</span>
                <span className="text-white font-bold">8,492</span>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </>
  )
}
